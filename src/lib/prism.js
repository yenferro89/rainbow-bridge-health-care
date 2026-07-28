/**
 * The Bridge of Light
 * ------------------------------------------------------------------
 * A full-viewport refraction. White light bends through an unseen prism and
 * separates into the six bands sampled from the Rainbow Bridge logo, drifting
 * over a soft cloud field.
 *
 * The rainbow is never drawn as stripes. Every band here is additive light
 * with a Gaussian falloff, which is why it reads as atmosphere rather than
 * as a graphic.
 *
 * Performance notes, because this runs on older Intel integrated GPUs:
 *   - device pixel ratio is capped at 1.5
 *   - rendering stops when the hero scrolls out of view or the tab is hidden
 *   - fbm is limited to 4 octaves
 *   - reduced-motion freezes time at a composed still frame
 */

import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2  uResolution;
  uniform float uTime;
  uniform vec2  uMouse;    // -1..1, lerped
  uniform float uScroll;   // 0..1 through the hero
  uniform float uIntro;    // 0..1 load-in

  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.03;
      a *= 0.5;
    }
    return v;
  }

  // The six logo bands, sampled from the source PNG.
  vec3 spectrum(float t) {
    t = clamp(t, 0.0, 1.0) * 5.0;
    vec3 col = vec3(0.851, 0.141, 0.157);            // #D92428 red
    col = mix(col, vec3(0.957, 0.467, 0.133), smoothstep(0.0, 1.0, t)); // #F47722
    col = mix(col, vec3(0.988, 0.878, 0.125), smoothstep(1.0, 2.0, t)); // #FCE020
    col = mix(col, vec3(0.486, 0.753, 0.267), smoothstep(2.0, 3.0, t)); // #7CC044
    col = mix(col, vec3(0.596, 0.851, 0.922), smoothstep(3.0, 4.0, t)); // #98D9EB
    col = mix(col, vec3(0.565, 0.408, 0.675), smoothstep(4.0, 5.0, t)); // #9068AC
    return col;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
    float t = uTime;

    // ---- cloud bank --------------------------------------------------
    // Banked toward the bottom of the frame, the way the logo's clouds sit
    // beneath the arc.
    vec2 cp = vec2(p.x * 1.05 + t * 0.011, p.y * 2.1 - t * 0.005);
    float clouds = fbm(cp * 1.7 + fbm(cp * 0.75) * 0.85);
    clouds *= smoothstep(0.22, -0.62, p.y);
    clouds = pow(max(clouds, 0.0), 1.35);

    // ---- the arc -----------------------------------------------------
    // Centre sits well below frame so only the crown of the span is visible,
    // and it lifts slightly as the visitor scrolls.
    //
    // Pushed right of centre on purpose: the headline occupies the left third
    // of the hero, and light crossing behind type is light that has to be
    // veiled back down to keep the type readable. Better to put the span where
    // it can be bright.
    vec2 centre = vec2(0.46 + uMouse.x * 0.09, -0.66 + uScroll * 0.20 + uMouse.y * 0.035);
    float baseR   = 0.80 + 0.025 * sin(t * 0.10);
    float spread  = 0.155 + 0.030 * sin(t * 0.067) + uScroll * 0.06;

    // Light through moving air — the arc breathes rather than sitting still.
    float shimmer = fbm(p * 2.6 + vec2(t * 0.045, -t * 0.028));

    // Fade the span toward the sides so it never closes into a full circle.
    float ang = atan(p.x - centre.x, max(p.y - centre.y, 1e-4));
    float angMask = smoothstep(1.15, 0.28, abs(ang));

    vec3 light = vec3(0.0);
    const int BANDS = 14;
    for (int i = 0; i < BANDS; i++) {
      float s = float(i) / float(BANDS - 1);
      // Longer wavelengths bend least, so red rides the outside of the span.
      float r = baseR + (0.5 - s) * spread;
      float d = abs(length(p - centre) - r);
      // Wide Gaussian falloff. Tighten this and the bands resolve into a
      // drawn rainbow; the whole point is that they stay diffuse.
      float band = exp(-d * d * 1500.0);
      light += spectrum(s) * band;
    }
    light /= float(BANDS);
    light *= angMask * (0.40 + 0.80 * shimmer);

    // A soft bloom around the crown, so the span has a source rather than
    // looking like a drawn line.
    float crown = exp(-pow(length(p - centre) - baseR, 2.0) * 55.0);
    light += spectrum(0.5) * crown * 0.055 * angMask;

    // ---- compose -----------------------------------------------------
    vec3 col = vec3(0.094, 0.043, 0.149);              // --dusk
    col += vec3(0.878, 0.941, 0.973) * clouds * 0.155; // vapor-lit cloud
    col += light * 2.25 * uIntro;

    // Light spilling down onto the cloud bank, tinted by the band above it.
    col += spectrum(clamp(vUv.x * 0.9 + 0.05, 0.0, 1.0))
         * clouds * 0.085 * uIntro;

    float vig = smoothstep(1.45, 0.30, length(p * vec2(0.82, 1.0)));
    col *= mix(0.66, 1.0, vig);

    // Dither. Without this, the dark violet field bands badly on 8-bit panels.
    col += (hash(vUv * uResolution + fract(t)) - 0.5) * 0.018;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function initPrism(canvas, options = {}) {
  if (!canvas) return null;

  const reduced = options.reduced === true;

  // Bail cleanly if WebGL is unavailable — the CSS gradient underneath the
  // canvas is a designed fallback, not an accident.
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: false,
    });
  } catch (err) {
    console.warn("[prism] WebGL unavailable, using static fallback.", err);
    return null;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    uResolution: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
    uIntro: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const targetMouse = new THREE.Vector2(0, 0);
  let rafId = null;
  let running = false;
  let clockStart = performance.now();
  let lastFrame = 0;

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    uniforms.uResolution.value.set(
      w * renderer.getPixelRatio(),
      h * renderer.getPixelRatio()
    );
  }

  function render(now) {
    rafId = requestAnimationFrame(render);

    // Cap to ~40fps. This shader is fill-rate bound and the drift is slow
    // enough that the extra frames buy nothing but heat.
    if (now - lastFrame < 25) return;
    lastFrame = now;

    if (!reduced) {
      uniforms.uTime.value = (now - clockStart) / 1000;
      uniforms.uMouse.value.lerp(targetMouse, 0.045);
    }

    renderer.render(scene, camera);
  }

  function start() {
    if (running) return;
    running = true;
    lastFrame = 0;
    clockStart = performance.now() - uniforms.uTime.value * 1000;
    rafId = requestAnimationFrame(render);
  }

  function stop() {
    if (!running) return;
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  resize();

  // Reduced motion: compose one still frame at a time offset that puts the
  // arc in a pleasing position, then never animate again.
  if (reduced) {
    uniforms.uTime.value = 14.0;
    uniforms.uIntro.value = 1;
    renderer.render(scene, camera);
    canvas.classList.add("is-lit");
  } else {
    start();
  }

  // ---- input -------------------------------------------------------
  const onPointerMove = (e) => {
    targetMouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -((e.clientY / window.innerHeight) * 2 - 1)
    );
  };

  const onResize = () => resize();

  if (!reduced) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }
  window.addEventListener("resize", onResize, { passive: true });

  // Stop drawing when the hero is off-screen or the tab is backgrounded.
  let visible = true;
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (reduced) return;
      visible && !document.hidden ? start() : stop();
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  const onVisibility = () => {
    if (reduced) return;
    !document.hidden && visible ? start() : stop();
  };
  document.addEventListener("visibilitychange", onVisibility);

  return {
    uniforms,
    /** Fades the refraction up on load. Driven by GSAP in main.js. */
    setIntro(v) {
      uniforms.uIntro.value = v;
    },
    setScroll(v) {
      uniforms.uScroll.value = v;
    },
    destroy() {
      stop();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}

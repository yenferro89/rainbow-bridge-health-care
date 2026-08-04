import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget = container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    // PATCHED (local change to the vendored React Bits component).
    //
    // The wrapper renders with inline visibility:hidden and only becomes
    // visible when the ScrollTrigger fires. When it doesn't fire, the content
    // is invisible permanently — and it demonstrably didn't: with several of
    // these on one page, two of the three service categories rendered as blank
    // space. The single delayed timeout that used to sit here only helped if
    // the element happened to be on screen at that exact moment, so anything
    // below the fold stayed hidden.
    //
    // An IntersectionObserver is the reliable backstop: it fires on real
    // visibility regardless of what ScrollTrigger computed, including when
    // lazy images and webfonts shift the layout after positions were measured.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tl.play();
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    // Last resort: if neither path has run by the time everything has settled,
    // show the content anyway. Nothing on this site is worth hiding behind a
    // failed animation.
    const failsafe = setTimeout(() => {
      if (!tl.progress()) {
        ScrollTrigger.refresh();
        if (!tl.progress()) gsap.set(el, { [axis]: 0, scale: 1, opacity: 1 });
      }
    }, 3000);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;

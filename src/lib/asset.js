/** Resolves a file in /public against the deployed base path. */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

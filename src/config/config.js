function getEnvOrDefault(key, defaultValue) {
  const value = import.meta.env[key];
  return value !== undefined ? value : defaultValue;
}

export const config = Object.freeze({
  API_URL: getEnvOrDefault("VITE_API_URL_LOCAL", "http://localhost:8001"),
});

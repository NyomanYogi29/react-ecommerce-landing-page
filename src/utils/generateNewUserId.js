export function generateNewUserId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `usr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

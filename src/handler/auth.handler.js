export const AuthHandler = {
  registerPayload(formData) {
    return {
      name: formData.name || formData.firstName || "",
      email: formData.email || "",
      password: formData.password || "",
      confirm_password:
        formData.confirm_password || formData.confirmPassword || "",
    };
  },

  loginPayload(formData) {
    return {
      email: formData.email || "",
      password: formData.password || "",
    };
  },
};

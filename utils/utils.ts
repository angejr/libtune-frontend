export function goToPath(path: string) {
    return navigateTo({ path })
}

// Form validation rules
export const validationRules = {
  required: (value: any) => !!value || "Required.",
  email: (value: any) => /.+@.+\..+/.test(value) || "Invalid e-mail.",
  min: (length: any) => (value: any) =>
    value.length >= length || `Min ${length} characters.`,
};

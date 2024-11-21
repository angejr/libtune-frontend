export function goToPath(path: string) {
    return navigateTo({ path })
}

// Form validation rules
export const validationRules = {
  required: (value: any) => !!value || "Required.",
  email: (value: any) => /.+@.+\..+/.test(value) || "Invalid e-mail.",
  min: (length: any) => (value: any) =>
    value.length >= length || `Min ${length} characters.`,
  max: (length: any) => (value: any) =>
    value.length <= length || `Max ${length} characters.`,
  safe: (value :any) => value == useSanitize(value) || "Unsafe input",
  number: (value: any) => /^[0-9]*$/.test(value) || "Needs to be a number",
};

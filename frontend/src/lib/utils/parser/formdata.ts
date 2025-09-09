export const parseFormData = (form: HTMLFormElement): Record<string, FormDataEntryValue> => {
  const formData = new FormData(form);

  return Object.fromEntries(formData.entries());
};

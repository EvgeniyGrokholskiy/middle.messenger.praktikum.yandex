export const createFormData = (data: Record<string, string>): FormData => {
  const newFormData = new FormData();

  Object.entries(data).forEach(item => {
    newFormData.append(item[0], item[1]);
  });

  return newFormData;
};

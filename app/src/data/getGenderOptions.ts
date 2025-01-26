export const getGenderOptions = () => {
  return [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Feminino" },
    { value: "other", label: "Outro" },
  ];
};

export const getGender = (value: string): string | undefined => {
  return getGenderOptions().find((gender) => gender.value === value)?.label;
};

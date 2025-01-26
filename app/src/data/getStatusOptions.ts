export type TStatus = {
  value: "available" | "unavailable" | "active" | "inactive";
  label?: string;
  icon?: string;
  color: "primary" | "success" | "danger" | "warning" | "default" | "secondary";
};

export function getStatusOptions(): TStatus[] {
  return [
    {
      value: "available",
      label: "Disponível",
      color: "success",
    },
    {
      value: "unavailable",
      label: "Indisponível",
      color: "default",
    },
    {
      value: "inactive",
      label: "Inativo",
      color: "danger",
    },
  ];
}

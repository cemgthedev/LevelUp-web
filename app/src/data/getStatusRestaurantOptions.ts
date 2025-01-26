export type TStatus = {
  value: "active" | "inactive";
  label?: string;
  icon?: string;
  color: "primary" | "success" | "danger" | "warning" | "default" | "secondary";
};

export function getStatusRestaurantOptions(): TStatus[] {
  return [
    {
      value: "active",
      label: "Aberto",
      color: "success",
    },
    {
      value: "inactive",
      label: "Fechado",
      color: "default",
    },
  ];
}

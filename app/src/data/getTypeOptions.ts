export type TType = {
    value: "cafe-da-manha" | "lanche" | "entrada" | "almoco" | "jantar" | "sobremesa";
    label?: string;
};
  
export function getTypeOptions(): TType[] {
    return [
        {
            value: "cafe-da-manha",
            label: "Café da manhã"
        },
        {
            value: "lanche",
            label: "Lanche"
        },
        {
            value: "entrada",
            label: "Entrada"
        },
        {
            value: "almoco",
            label: "Almoço"
        },
        {
            value: "jantar",
            label: "Jantar"
        },
        {
            value: "sobremesa",
            label: "Sobremesa"
        },
    ]
}

export function getType(value: string): string | undefined {
    return getTypeOptions().find((type) => type.value === value)?.label
}
export type TAddress = {
    name: string; // Nome (obrigatorio)
    uf?: string | null; // Unidade Federativa (opcional)
    city: string;
    street: string;
    neighborhood: string;
    number?: string | null; // Número (opcional)
    complement?: string | null; // Complemento (opcional)
    cep?: string | null; // CEP (opcional)
};
import { TAddress } from "@/types/TAddress";

export function formatAddress(address: TAddress): string {
    const {
      name,
      uf,
      city,
      street,
      neighborhood,
      number,
      complement,
      cep,
    } = address;
  
    // Cria o endereço formatado
    const formattedAddress = [
      `${name}`,
      street && number ? `${street}, ${number}` : street || null,
      neighborhood || null,
      city && uf ? `${city} - ${uf}` : city || uf || null,
      cep ? `CEP: ${cep}` : null,
      complement ? `Complemento: ${complement}` : null,
    ]
      .filter(Boolean) // Remove partes nulas ou undefined
      .join(', '); // Junta as partes com vírgulas
  
    return formattedAddress;
}
import { useNavigate } from "react-router-dom";

import { URLS } from "@/constants/urls";
import { Button } from "@nextui-org/button";

export default function UnauthorizedError() {
  const navigate = useNavigate();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">401</h1>
        <span className="font-medium">
          Oops! Você não tem permissão para acessar essa página.
        </span>
        <p className="text-center text-muted-foreground">
          Parece que você tentou acessar um recurso que é necessário ter
          permissões adicionais. <br />
          Por favor, solicite permissão a este recurso ou tente entrar com uma
          conta que possui permissão a este recurso.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="bordered" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button onClick={() => navigate(URLS.dashboard)}>
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}

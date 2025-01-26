import { useNavigate } from "react-router-dom";

import { URLS } from "@/constants/urls";
import { Button } from "@nextui-org/button";

export default function NotFoundError() {
  const navigate = useNavigate();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Oops! Página não encontrada!</span>
        <p className="text-center text-muted-foreground">
          Parece que a página que você está procurando <br />
          não existe ou pode ter sido removida.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="bordered" onClick={() => navigate(-1)}>
            Voltar para a página anterior
          </Button>
          <Button onClick={() => navigate(URLS.dashboard)}>
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}

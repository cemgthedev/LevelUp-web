"use client";
import { URLS } from "@/constants/urls";
import { Link as LinkUI } from "@nextui-org/react";

export const FooterDefault = () => {
  return (
    <footer>
      <LinkUI
        as={"a"}
        href={URLS.dashboard}
        onClick={() => window.scrollTo(0, 0)}
        title="Site da InovAssessoria"
        color="primary"
        target="_blank" // Abre o link em uma nova janela
        rel="noopener noreferrer" // Boa prática de segurança ao usar _blank
      >
        <span className="flex items-center justify-center text-medium font-semibold gap-1">
          <p className="text-default-400">&copy; 2024 InovAssessoria.</p>
          <img
            src={"/logo.svg"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </span>
      </LinkUI>
    </footer>
  );
};

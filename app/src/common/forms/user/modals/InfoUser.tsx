import { PopoverDelete } from "@/components/ui/PopoverDelete";
import { URLS } from "@/constants/urls";
import { getGender } from "@/data/getGenderOptions";
import { TUser } from "@/types/TUser";
import { logout } from "@/utils/logout.util";
import { notify } from "@/utils/notify.util";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import {
  Blend,
  CalendarClock,
  IdCard,
  LogOut,
  MapPinHouse,
  Phone,
  SquarePen,
  Trash,
} from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUserMutation } from "../mutations/user.mutation";
import { UpdateUser } from "./UpdateUser";

interface InfoUserProps {
  isOpen: boolean;
  onOpenChange: () => void;
  item: TUser;
}

export const InfoUser = ({ isOpen, onOpenChange, item }: InfoUserProps) => {
  const navigate = useNavigate();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenEditChange,
  } = useDisclosure();

  const mutateUserDelete = useMutation({
    mutationFn: deleteUserMutation,
    onSuccess() {
      notify("Usuário deletado com sucesso!", { type: "success" });
      logout();
      navigate(URLS.login);
    },
    onError() {
      notify("Falha ao deletar", { type: "error" });
    },
  });

  const onDeleteItem = useCallback((id: number) => {
    mutateUserDelete.mutate(id);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Perfil de Usuário
          </ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-3">
              <User
                name={item.name}
                description={
                  <div className="flex flex-col gap-1">
                    <p>{item.email}</p>
                    <Button
                      size="sm"
                      type="button"
                      color="danger"
                      variant="bordered"
                      onClick={() => {
                        logout();
                        navigate(URLS.login);
                      }}
                      startContent={<LogOut className="w-5 h-5" />}
                    >
                      Sair
                    </Button>
                  </div>
                }
                avatarProps={{
                  size: "lg",
                  classNames: {
                    base: "w-20 h-20",
                  },
                }}
              />
              <hr />
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-end">
                  <IdCard className="w-6 h-6" />
                  <p>CPF: {item.cpf}</p>
                </div>
                {item.phone_number && (
                  <div className="flex gap-1 items-end">
                    <Phone className="w-6 h-6" />
                    <p>Telefone: {item.phone_number}</p>
                  </div>
                )}
                {item.gender && (
                  <div className="flex gap-1 items-end">
                    <Blend className="w-6 h-6" />
                    <p>Gênero: {getGender(item.gender)}</p>
                  </div>
                )}
                {item.age && (
                  <div className="flex gap-1 items-end">
                    <CalendarClock className="w-6 h-6" />
                    <p>Idade: {item.age}</p>
                  </div>
                )}
                {item.address && (
                  <div className="flex gap-1 items-end">
                    <MapPinHouse className="w-6 h-6" />
                    <p>Endereço: {item.address}</p>
                  </div>
                )}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              type="button"
              color="danger"
              variant="shadow"
              startContent={<Trash className="w-5 h-5" />}
            >
              <PopoverDelete
                onContinue={() => {
                  onDeleteItem(item.id);
                }}
                title="Remover Perfil"
                message="Tem certeza de que deseja excluir? Deseja continuar?"
              />
            </Button>
            <Button
              type="button"
              color="primary"
              variant="shadow"
              onClick={onOpenEdit}
              startContent={<SquarePen className="w-5 h-5" />}
            >
              Atualizar Perfil
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <UpdateUser
        isOpen={isOpenEdit}
        onOpenChange={onOpenEditChange}
        item={item as TUser}
      />
    </>
  );
};

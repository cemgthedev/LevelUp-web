import { UserForm } from "@/common/forms/user/UserForm";
import { CreateUserFormData, createUserFormSchema } from "@/common/forms/user/validations/register-user.schema";
import { notify } from "@/utils/notify.util";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { createUserMutation } from "../mutations/user.mutation";

interface CreateUserProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const CreateUser = ({ isOpen, onOpenChange }: CreateUserProps) => {
  const methods = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const mutateUserCreate = useMutation({
    mutationFn: createUserMutation,
    onSuccess() {
      methods.reset();
      notify("Usuário cadastrado com sucesso!", { type: "success" });
      onOpenChange();
    },
    onError() {
      notify("Cadastramento falhou.", { type: "error" });
    },
  });

  const onHandleSubmitCreate = methods.handleSubmit((data) => {
    mutateUserCreate.mutate(data);
  });

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size="3xl" 
        classNames={{
          body: "max-h-[63vh] overflow-y-scroll",
          backdrop: "bg-gradient-to-t from-[#075985] to-[#5B21B6]"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <form onSubmit={onHandleSubmitCreate}>
                <ModalHeader className="flex flex-col gap-1">
                  Cadastro de Usuário
                </ModalHeader>

                <ModalBody>
                  <UserForm />
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="button"
                    color="danger"
                    variant="shadow"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    color="success"
                    variant="shadow"
                    isLoading={mutateUserCreate.isPending}
                  >
                    Cadastrar
                  </Button>
                </ModalFooter>
              </form>
            </FormProvider>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
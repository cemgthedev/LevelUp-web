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
import { RefetchOptions, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createProductMutation } from "../mutations/product.mutation";
import { ProductForm } from "../ProductForm";
import { CreateProductFormData, createProductFormSchema } from "../validations/create-form.schema";

interface CreateProductProps {
  isOpen: boolean;
  onOpenChange: () => void;
  seller_id: string;
  refetch: (options?: RefetchOptions | undefined) => void;
}

export const CreateProduct = ({
  isOpen,
  onOpenChange,
  seller_id,
  refetch,
}: CreateProductProps) => {
  const methods = useForm<CreateProductFormData>({
    defaultValues: {
        seller_id
    },
    resolver: zodResolver(createProductFormSchema),
  });

  useEffect(() => {
    methods.reset({ seller_id });
  }, [seller_id, methods]);

  const mutateProductCreate = useMutation({
    mutationFn: createProductMutation,
    onSuccess() {
      methods.reset();
      notify("Produto cadastrado com sucesso!", { type: "success" });
      onOpenChange();
      refetch();
    },
    onError() {
      notify("Cadastramento falhou.", { type: "error" });
    },
  });

  const onHandleSubmitCreate = methods.handleSubmit((data) => {
    mutateProductCreate.mutate(data);
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        classNames={{ body: "max-h-[63vh] overflow-y-auto" }}
      >
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <form onSubmit={onHandleSubmitCreate}>
                <ModalHeader className="flex flex-col gap-1">
                  Cadastro de Produto
                </ModalHeader>

                <ModalBody>
                  <ProductForm />
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="button"
                    color="danger"
                    variant="shadow"
                    onPress={onClose}
                  >
                    Fechar
                  </Button>
                  <Button
                    type="submit"
                    color="success"
                    variant="shadow"
                    isLoading={mutateProductCreate.isPending}
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
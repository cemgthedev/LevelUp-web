import { queryKeysProduct } from "@/common/queries/get-products.query";
import { TProduct } from "@/types/TProduct";
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
import { RefetchOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { updateProductMutation } from "../mutations/product.mutation";
import { ProductForm } from "../ProductForm";
import { UpdateProductFormData, updateProductFormSchema } from "../validations/update-form.schema";

interface UpdateProductProps {
  isOpen: boolean;
  onOpenChange: () => void;
  item: TProduct;
  refetch: (options?: RefetchOptions | undefined) => void;
}

export const UpdateProduct = ({
  isOpen,
  onOpenChange,
  item,
  refetch,
}: UpdateProductProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<UpdateProductFormData>({
    defaultValues: {
      ...item,
    },
    resolver: zodResolver(updateProductFormSchema),
  });

  const mutateProductUpdate = useMutation({
    mutationFn: updateProductMutation,
    onSuccess() {
      methods.reset();
      notify("Produto atualizado com sucesso!", { type: "success" });
      queryClient.invalidateQueries({
        queryKey: [queryKeysProduct.get_list_products],
      });
      onOpenChange();
      refetch();
    },
    onError() {
      notify("Atualização falhou.", { type: "error" });
    },
  });

  useEffect(() => {
    if (!item) return;
   
    methods.reset({ ...item });
  }, [item, methods]);

  const onHandleSubmitUpdate = methods.handleSubmit((data) => {
    mutateProductUpdate.mutate(data);
  });

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size="3xl"
        classNames={{ body: "max-h-[63vh] overflow-y-scroll" }}
      >
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <form onSubmit={onHandleSubmitUpdate}>
                <ModalHeader className="flex flex-col gap-1">
                  Editar Produto
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
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="shadow"
                    isLoading={mutateProductUpdate.isPending}
                  >
                    Salvar
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
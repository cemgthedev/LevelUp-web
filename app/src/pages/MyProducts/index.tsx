import { CreateProduct } from "@/common/forms/product/modals/CreateProduct";
import { InfoProduct } from "@/common/forms/product/modals/InfoProduct";
import { UpdateProduct } from "@/common/forms/product/modals/UpdateProduct";
import { deleteProductMutation } from "@/common/forms/product/mutations/product.mutation";
import {
  IFilterProducts,
  queryKeysProduct,
  searchProductQuery,
} from "@/common/queries/get-products.query";
import { FilterProducts } from "@/components/ui/FilterProducts";
import { useAuthentication } from "@/hooks/use-authentication.hook";
import { TProduct } from "@/types/TProduct";
import { notify } from "@/utils/notify.util";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { useCallback, useState } from "react";
import { TableProducts } from "./components/table";

export const MyCoursesPage = () => {
  const { user } = useAuthentication();
  const [filterProducts, setFilterProducts] = useState<IFilterProducts>({});

  const [editItem, setEditItem] = useState<TProduct>();

  const onEditItem = useCallback((product: TProduct) => {
    setEditItem(product);
    onOpenEdit();
  }, []);

  const mutateProductDelete = useMutation({
    mutationFn: deleteProductMutation,
    onSuccess() {
      notify("Produto deletado com sucesso!", { type: "success" });
      refetch();
    },
    onError() {
      notify("Falha ao deletar", { type: "error" });
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    mutateProductDelete.mutate(id);
  }, []);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeysProduct.get_list_products + "my", filterProducts, user],
    queryFn: async () => {
      const enterpriseResponse = await searchProductQuery({
        ...filterProducts,
        seller_id: user?.id,
      });

      return Array.isArray(enterpriseResponse.products)
        ? enterpriseResponse.products
        : [];
    },
  });

  const clearSubject = () => {
    setFilterProducts?.({ ...filterProducts, subject: undefined });
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState<TProduct>();

  const onSelectItem = (product: TProduct) => {
    setSelectedItem(product);
    onOpen();
  };

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenEditChange,
  } = useDisclosure();

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onOpenChange: onOpenCreateChange,
  } = useDisclosure();

  const items = products ? products : [];

  return (
    <section className="flex flex-col gap-4 m-4">
      <TableProducts
        topContent={
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              <Input
                isClearable
                placeholder="Pesquisar por nome"
                startContent={<Search className="h-5 w-5 opacity-50" />}
                variant="bordered"
                type="text"
                aria-label="Pesquisa por produto"
                value={filterProducts?.subject}
                onChange={(e) => {
                  console.log(e.target.value);
                  setFilterProducts?.({
                    ...filterProducts,
                    subject: e.target.value,
                  });
                }}
                onClear={clearSubject}
              />
              <FilterProducts
                filterProducts={filterProducts}
                setFilterProducts={setFilterProducts}
              />
            </div>
            <Button
              type="button"
              color="success"
              variant="shadow"
              onClick={onOpenCreate}
              startContent={<PlusCircle className="h-5 w-5" />}
              className="text-white"
            >
              Adicionar Produto
            </Button>
          </div>
        }
        products={items}
        emptyContent="Nenhum produto encontrado"
        loadingState={isLoading}
        onOpenDetails={onSelectItem}
        onOpenEdit={onEditItem}
        remove={onDeleteItem}
      />

      {selectedItem && (
        <InfoProduct
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          item={selectedItem as TProduct}
        />
      )}

      <CreateProduct
        isOpen={isOpenCreate}
        onOpenChange={onOpenCreateChange}
        seller_id={user?.id as string}
        refetch={refetch}
      />

      <UpdateProduct
        isOpen={isOpenEdit}
        onOpenChange={onOpenEditChange}
        item={editItem as TProduct}
        refetch={refetch}
      />
    </section>
  );
};

import { InfoProduct } from "@/common/forms/product/modals/InfoProduct";
import {
  IFilterProducts,
  queryKeysProduct,
  searchProductQuery,
} from "@/common/queries/get-products.query";
import { FilterProducts } from "@/components/ui/FilterProducts";
import { TProduct } from "@/types/TProduct";
import { Input } from "@nextui-org/input";
import {
  Button,
  Card,
  CardBody,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

export const DashboardPage = () => {
  const [filterProducts, setFilterProducts] = useState<IFilterProducts>({});

  const { data: products } = useQuery({
    queryKey: [queryKeysProduct.get_list_products, filterProducts],
    queryFn: async () => {
      const enterpriseResponse = await searchProductQuery(filterProducts);

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

  return (
    <section className="flex flex-col gap-4 m-4">
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Cursos</p>
          <p>
            {products?.length
              ? `${products.length} cursos(s) encontrado(s)`
              : "Nenhum curso encontrado"}
          </p>
        </div>
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
      </div>

      <div className="flex gap-4 flex-wrap">
        {products?.map((product) => (
          <Card
            key={product.id}
            classNames={{
              base: "border-1 border-default-800",
              body: "px-0 pt-0 gap-3",
            }}
          >
            <CardBody>
              <div className="border-b-1 border-default-800">
                <Image
                  alt="Imagem do produto"
                  fallbackSrc={"/image-off.svg"}
                  height={216}
                  src={product.image_url}
                  width={256}
                  className="w-[256px] h-[216px] rounded-none"
                />
              </div>
              <div className="flex flex-col gap-1 px-4 w-[256px] min-h-[108px] max-h-[108px]">
                <p className="line-clamp-1 text-lg font-semibold">
                  {product.title}
                </p>
                <p className="line-clamp-2">{product.description}</p>
                <p>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div className="px-4">
                <Button
                  fullWidth
                  type="button"
                  color="secondary"
                  variant="shadow"
                  onClick={() => onSelectItem(product)}
                >
                  ver detalhes
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedItem && (
        <InfoProduct
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          item={selectedItem as TProduct}
        />
      )}
    </section>
  );
};

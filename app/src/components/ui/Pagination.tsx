import { Input, Pagination, Select, SelectItem } from "@nextui-org/react";

export type TPageProps = {
  // Pagination backend
  page?: number;
  items_per_page?: number;
  // Pagination frontend response backend
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
};

interface IPaginationProps {
  // Pagination
  pageProps: TPageProps;
  setPageProps: (pageProps: TPageProps) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export function PaginationCustom({
  pageProps,
  setPageProps,
  setItemsPerPage,
}: IPaginationProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Input
        type="number"
        title="Quantidade total de itens"
        variant="bordered"
        defaultValue={String(pageProps.totalItems)}
        size="sm"
        aria-label="selecionar pagina"
        className="w-16 text-center"
        readOnly
        value={String(pageProps.totalItems)}
      />
      <Pagination
        isCompact
        showControls
        showShadow
        color="default"
        page={pageProps.currentPage}
        total={pageProps.totalPages || 0}
        classNames={{
          base: "w-full flex justify-center",
        }}
        onChange={(selectedPage) =>
          setPageProps({ ...pageProps, page: selectedPage })
        }
      />
      <Select
        size="sm"
        variant="bordered"
        title="Quantidade de itens por pagina"
        aria-label="selecionar quantidade de intens por pagina"
        selectedKeys={[pageProps.items_per_page?.toString() || "10"]}
        classNames={{
          base: "w-20",
          listboxWrapper: "w-full",
        }}
        listboxProps={{
          itemClasses: {
            base: "text-center data-[selectable=true]:focus:bg-primary-400",
            selectedIcon: "hidden",
          },
        }}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
      >
        <SelectItem key={50} value={50}>
          50
        </SelectItem>
        <SelectItem key={40} value={40}>
          40
        </SelectItem>
        <SelectItem key={30} value={30}>
          30
        </SelectItem>
        <SelectItem key={20} value={20}>
          20
        </SelectItem>
        <SelectItem key={10} value={10}>
          10
        </SelectItem>
      </Select>
    </div>
  );
}

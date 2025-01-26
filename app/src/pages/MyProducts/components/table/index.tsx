import { PopoverDelete } from "@/components/ui/PopoverDelete";
import { TableCustom } from "@/components/ui/TableCustom";
import { TProduct } from "@/types/TProduct";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Spinner,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";

import { EllipsisVertical, Eye, SquarePen, Trash } from "lucide-react";
import { Key } from "react";

interface TableProps {
  products?: TProduct[];
  emptyContent?: string;
  loadingState?: boolean;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  // Events
  onOpenDetails?: (product: TProduct) => void;
  onOpenEdit?: (product: TProduct) => void;
  remove?: (id: string) => void;
}

export const TableProducts = ({
  products = [],
  emptyContent,
  loadingState = false,
  topContent,
  bottomContent,
  onOpenDetails,
  onOpenEdit,
  remove,
}: TableProps) => {
  const headerColumns = [
    {
      id: "title",
      label: "Produto",
    },
    {
        id: "category",
        label: "Categoria",
    },
    {
        id: "price",
        label: "Preço",
    },
    {
        id: "quantity",
        label: "Quantidade",
    },
    {
        id: "actions",
        label: "Ações",
    }
  ];

  const renderCell = (product: TProduct, columnKey: Key) => {
    switch (columnKey) {
      case "title":
        return (
            <User
                avatarProps={{
                    src: product.image_url,
                }}
                description={product.description}
                name={product.title}
                classNames={{
                    wrapper: "w-[212px]",
                    name: "text-md line-clamp-1",
                    description: "line-clamp-2",
                }}
            />
        );
      case "category":
        return <span className="text-md text-purple-600">{product.category}</span>;
      case "price":
        return <span className="text-md">{product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>;
      case "quantity":
        return <span className="text-md">{product.quantity}</span>;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Dynamic Actions">
                <DropdownItem
                  key="details"
                  hidden={!onOpenDetails}
                  onClick={() => onOpenDetails?.(product)}
                >
                    <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4"/>
                        Visualizar
                    </div>
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  hidden={!onOpenEdit}
                  onClick={() => onOpenEdit?.(product)}
                >
                    <div className="flex items-center gap-2">
                        <SquarePen className="w-4 h-4"/>
                        Editar
                    </div>
                </DropdownItem>
                <DropdownItem isReadOnly key="remove" hidden={!remove}>
                  <PopoverDelete
                    onContinue={() => remove?.(product.id)}
                    message="Tem certeza de que deseja excluir? Deseja continuar?"
                    triggerButton={
                        <div className="flex items-center gap-2">
                            <Trash className="w-4 h-4"/>
                            Deletar
                        </div>
                    }
                  />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
    }
  };

  return (
    <TableCustom
      aria-label="Table of bimesters"
      topContent={topContent}
      bottomContent={bottomContent}
      isVirtualized
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.id}
            align={column.id === "actions" ? "center" : "start"}
            width={column.id === "actions" ? 10 : undefined}
            className="uppercase"
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        isLoading={loadingState}
        loadingContent={
          <Spinner
            size="sm"
            classNames={{ base: "opacity-50 p-2 rounded-lg" }}
          />
        }
        items={products}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </TableCustom>
  );
};
import { PopoverDelete } from "@/components/ui/PopoverDelete";
import { TableCustom } from "@/components/ui/TableCustom";
import { TCourse } from "@/types/TCourse";
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
  User,
} from "@nextui-org/react";

import { EllipsisVertical, Eye, SquarePen, Trash } from "lucide-react";
import { Key } from "react";

interface TableProps {
  courses?: TCourse[];
  emptyContent?: string;
  loadingState?: boolean;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  // Events
  onOpenDetails?: (course: TCourse) => void;
  onOpenEdit?: (course: TCourse) => void;
  remove?: (id: number) => void;
}

export const TableCourses = ({
  courses = [],
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
      id: "price",
      label: "Preço",
    },
    {
      id: "workload",
      label: "Carga Horária",
    },
    {
      id: "actions",
      label: "Ações",
    },
  ];

  const renderCell = (course: TCourse, columnKey: Key) => {
    switch (columnKey) {
      case "title":
        return (
          <User
            avatarProps={{
              src: course.banner_url,
            }}
            description={course.description}
            name={course.title}
            classNames={{
              wrapper: "w-[212px]",
              name: "text-md line-clamp-1",
              description: "line-clamp-2",
            }}
          />
        );
      case "price":
        return (
          <span className="text-md">
            {course.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        );
      case "workload":
        return <span className="text-md">{course.workload}</span>;
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
                  onClick={() => onOpenDetails?.(course)}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Visualizar
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  hidden={!onOpenEdit}
                  onClick={() => onOpenEdit?.(course)}
                >
                  <div className="flex items-center gap-2">
                    <SquarePen className="w-4 h-4" />
                    Editar
                  </div>
                </DropdownItem>
                <DropdownItem isReadOnly key="remove" hidden={!remove}>
                  <PopoverDelete
                    onContinue={() => remove?.(course.id)}
                    message="Tem certeza de que deseja excluir? Deseja continuar?"
                    triggerButton={
                      <div className="flex items-center gap-2">
                        <Trash className="w-4 h-4" />
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
      aria-label="Table of courses"
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
        items={courses}
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

import { Table, TableProps } from "@nextui-org/table";

interface TableCustomProps extends TableProps {}

export const TableCustom = ({ ...props }: TableCustomProps) => {
  return (
    <Table
      isHeaderSticky
      bottomContentPlacement="outside"
      topContentPlacement="outside"
      classNames={{
        wrapper: "h-[56vh] sm:h-[62vh] bg-transparent p-0 my-1",
      }}
      {...props}
    />
  );
};

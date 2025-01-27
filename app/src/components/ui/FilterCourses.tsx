import { IFilterCourses } from "@/common/queries/get-courses.query";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { CalendarClock, DollarSign, Filter } from "lucide-react";

interface FilterCoursesProps {
  filterCourses: IFilterCourses;
  setFilterCourses: (filter: IFilterCourses) => void;
}

export function FilterCourses({
  filterCourses,
  setFilterCourses,
}: FilterCoursesProps) {
  return (
    <Popover showArrow offset={10} placement="bottom">
      <PopoverTrigger>
        <Button
          variant="flat"
          isIconOnly
          className="bg-default-900 text-default-50"
        >
          <Filter className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] max-md:w-full">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Filtros
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <Input
                  size="sm"
                  type="number"
                  variant="bordered"
                  label="Preço mínimo"
                  min={0}
                  startContent={<DollarSign className="h-5 w-5" />}
                  value={filterCourses?.min_price?.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setFilterCourses?.({
                      ...filterCourses,
                      min_price: value > 0 ? value : undefined,
                    });
                  }}
                />
                <Input
                  size="sm"
                  type="number"
                  variant="bordered"
                  label="Preço máximo"
                  min={0}
                  startContent={<DollarSign className="h-5 w-5" />}
                  value={filterCourses?.max_price?.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setFilterCourses?.({
                      ...filterCourses,
                      max_price: value > 0 ? value : undefined,
                    });
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  size="sm"
                  type="number"
                  variant="bordered"
                  label="Carga horária mínima"
                  min={0}
                  startContent={<CalendarClock className="h-5 w-5" />}
                  value={filterCourses?.min_workload?.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setFilterCourses?.({
                      ...filterCourses,
                      min_workload: value > 0 ? value : undefined,
                    });
                  }}
                />
                <Input
                  size="sm"
                  type="number"
                  variant="bordered"
                  label="Carga horária máxima"
                  min={0}
                  startContent={<CalendarClock className="h-5 w-5" />}
                  value={filterCourses?.max_workload?.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setFilterCourses?.({
                      ...filterCourses,
                      max_workload: value > 0 ? value : undefined,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

import { InfoCourse } from "@/common/forms/course/modals/InfoCourse";
import {
  IFilterCourses,
  queryKeysCourse,
  searchCourseQuery,
} from "@/common/queries/get-courses.query";
import { FilterCourses } from "@/components/ui/FilterCourses";
import { useAuthentication } from "@/hooks/use-authentication.hook";
import { TCourse } from "@/types/TCourse";
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
  const { user } = useAuthentication();
  const [filterCourses, setFilterCourses] = useState<IFilterCourses>({});

  const { data: courses } = useQuery({
    queryKey: [queryKeysCourse.get_list_courses, filterCourses],
    queryFn: async () => {
      const courseResponse = await searchCourseQuery(filterCourses);

      return Array.isArray(courseResponse.data)
        ? courseResponse.data.filter((item) => item.seller_id != user?.id)
        : [];
    },
  });

  const clearTitle = () => {
    setFilterCourses?.({ ...filterCourses, title: undefined });
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState<TCourse>();

  const onSelectItem = (course: TCourse) => {
    setSelectedItem(course);
    onOpen();
  };

  return (
    <section className="flex flex-col gap-4 m-4">
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Cursos</p>
          <p>
            {courses?.length
              ? `${courses.length} cursos(s) encontrado(s)`
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
            value={filterCourses?.title}
            onChange={(e) => {
              setFilterCourses?.({
                ...filterCourses,
                title: e.target.value,
              });
            }}
            onClear={clearTitle}
          />
          <FilterCourses
            filterCourses={filterCourses}
            setFilterCourses={setFilterCourses}
          />
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {courses?.map((course) => (
          <Card
            key={course.id}
            classNames={{
              base: "border-1 border-default-800",
              body: "px-0 pt-0 gap-3",
            }}
          >
            <CardBody>
              <div className="border-b-1 border-default-800">
                <Image
                  alt="Imagem do curso"
                  fallbackSrc={"/image-off.svg"}
                  height={216}
                  src={course.banner_url}
                  width={256}
                  className="w-[256px] h-[216px] rounded-none"
                />
              </div>
              <div className="flex flex-col gap-1 px-4 w-[256px] min-h-[108px] max-h-[108px]">
                <p className="line-clamp-1 text-lg font-semibold">
                  {course.title}
                </p>
                <p className="line-clamp-2">{course.description}</p>
                <p>
                  {course.price.toLocaleString("pt-BR", {
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
                  onClick={() => onSelectItem(course)}
                >
                  ver detalhes
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedItem && (
        <InfoCourse
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          item={selectedItem as TCourse}
        />
      )}
    </section>
  );
};

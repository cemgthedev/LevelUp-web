import { CreateCourse } from "@/common/forms/course/modals/CreateCourse";
import { InfoCourse } from "@/common/forms/course/modals/InfoCourse";
import { UpdateCourse } from "@/common/forms/course/modals/UpdateCourse";
import { deleteCourseMutation } from "@/common/forms/course/mutations/course.mutation";
import {
  IFilterCourses,
  queryKeysCourse,
  searchCourseQuery,
} from "@/common/queries/get-courses.query";
import { FilterCourses } from "@/components/ui/FilterCourses";
import { useAuthentication } from "@/hooks/use-authentication.hook";
import { TCourse } from "@/types/TCourse";
import { notify } from "@/utils/notify.util";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { useCallback, useState } from "react";
import { TableCourses } from "./components/table";

export const MyCoursesPage = () => {
  const { user } = useAuthentication();
  const [filterCourses, setFilterCourses] = useState<IFilterCourses>({});

  const [editItem, setEditItem] = useState<TCourse>();

  const onEditItem = useCallback((Course: TCourse) => {
    setEditItem(Course);
    onOpenEdit();
  }, []);

  const mutateCourseDelete = useMutation({
    mutationFn: deleteCourseMutation,
    onSuccess() {
      notify("Curso deletado com sucesso!", { type: "success" });
      refetch();
    },
    onError() {
      notify("Falha ao deletar", { type: "error" });
    },
  });

  const onDeleteItem = useCallback((id: number) => {
    mutateCourseDelete.mutate(id);
  }, []);

  const {
    data: Courses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeysCourse.get_list_courses + "my", filterCourses, user],
    queryFn: async () => {
      const courseResponse = await searchCourseQuery({
        ...filterCourses,
        seller_id: user?.id,
      });

      return Array.isArray(courseResponse.data) ? courseResponse.data : [];
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

  const items = Courses ? Courses : [];

  return (
    <section className="flex flex-col gap-4 m-4">
      <TableCourses
        topContent={
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              <Input
                isClearable
                placeholder="Pesquisar por nome"
                startContent={<Search className="h-5 w-5 opacity-50" />}
                variant="bordered"
                type="text"
                aria-label="Pesquisa por curso"
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
            <Button
              type="button"
              color="success"
              variant="shadow"
              onClick={onOpenCreate}
              startContent={<PlusCircle className="h-5 w-5" />}
              className="text-white"
            >
              Adicionar Curso
            </Button>
          </div>
        }
        courses={items}
        emptyContent="Nenhum curso encontrado"
        loadingState={isLoading}
        onOpenDetails={onSelectItem}
        onOpenEdit={onEditItem}
        remove={onDeleteItem}
      />

      {selectedItem && (
        <InfoCourse
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          item={selectedItem as TCourse}
        />
      )}

      <CreateCourse
        isOpen={isOpenCreate}
        onOpenChange={onOpenCreateChange}
        seller_id={user?.id as number}
        phone_number={user?.phone_number as string}
        refetch={refetch}
      />

      <UpdateCourse
        isOpen={isOpenEdit}
        onOpenChange={onOpenEditChange}
        item={editItem as TCourse}
        refetch={refetch}
      />
    </section>
  );
};

import { queryKeysCourse } from "@/common/queries/get-courses.query";
import { TCourse } from "@/types/TCourse";
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
import {
  RefetchOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CourseForm } from "../CourseForm";
import { updateCourseMutation } from "../mutations/course.mutation";
import {
  UpdateCourseFormData,
  updateCourseFormSchema,
} from "../validations/update-form.schema";

interface UpdateCourseProps {
  isOpen: boolean;
  onOpenChange: () => void;
  item: TCourse;
  refetch: (options?: RefetchOptions | undefined) => void;
}

export const UpdateCourse = ({
  isOpen,
  onOpenChange,
  item,
  refetch,
}: UpdateCourseProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<UpdateCourseFormData>({
    defaultValues: {
      ...item,
    },
    resolver: zodResolver(updateCourseFormSchema),
  });

  const mutateCourseUpdate = useMutation({
    mutationFn: updateCourseMutation,
    onSuccess() {
      methods.reset();
      notify("Curso atualizado com sucesso!", { type: "success" });
      queryClient.invalidateQueries({
        queryKey: [queryKeysCourse.get_list_courses],
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
    mutateCourseUpdate.mutate(data);
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
                  Editar Curso
                </ModalHeader>

                <ModalBody>
                  <CourseForm />
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
                    isLoading={mutateCourseUpdate.isPending}
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

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
import { RefetchOptions, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CourseForm } from "../CourseForm";
import { createCourseMutation } from "../mutations/course.mutation";
import {
  CreateCourseFormData,
  createCourseFormSchema,
} from "../validations/create-form.schema";

interface CreateCourseProps {
  isOpen: boolean;
  onOpenChange: () => void;
  seller_id: number;
  phone_number: string;
  refetch: (options?: RefetchOptions | undefined) => void;
}

export const CreateCourse = ({
  isOpen,
  onOpenChange,
  seller_id,
  phone_number,
  refetch,
}: CreateCourseProps) => {
  const methods = useForm<CreateCourseFormData>({
    defaultValues: {
      seller_id,
      phone_number,
    },
    resolver: zodResolver(createCourseFormSchema),
  });

  useEffect(() => {
    methods.reset({ seller_id, phone_number });
  }, [seller_id, phone_number, methods]);

  const mutateCourseCreate = useMutation({
    mutationFn: createCourseMutation,
    onSuccess() {
      methods.reset();
      notify("Curso cadastrado com sucesso!", { type: "success" });
      onOpenChange();
      refetch();
    },
    onError() {
      notify("Cadastramento falhou.", { type: "error" });
    },
  });

  const onHandleSubmitCreate = methods.handleSubmit((data) => {
    mutateCourseCreate.mutate(data);
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        classNames={{ body: "max-h-[63vh] overflow-y-auto" }}
      >
        <ModalContent>
          {(onClose) => (
            <FormProvider {...methods}>
              <form onSubmit={onHandleSubmitCreate}>
                <ModalHeader className="flex flex-col gap-1">
                  Cadastro de Curso
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
                    Fechar
                  </Button>
                  <Button
                    type="submit"
                    color="success"
                    variant="shadow"
                    isLoading={mutateCourseCreate.isPending}
                  >
                    Cadastrar
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

import { Image, Input, Textarea } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateCourseFormData } from "./validations/create-form.schema";

export const CourseForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateCourseFormData>();

  return (
    <>
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="banner_url"
          render={({ field: { onChange, onBlur, ref, value } }) => (
            <div className="flex flex-col items-center gap-2">
              <Image
                alt="Imagem do curso"
                fallbackSrc={"/image-off.svg"}
                src={value}
                width={256}
                height={256}
                className="w-[256px] h-[256px]"
              />
              <Input
                size="sm"
                ref={ref}
                type="text"
                onBlur={onBlur}
                variant="bordered"
                onChange={onChange}
                value={value || ""}
                label="Url da imagem"
                isInvalid={!!errors.banner_url}
                errorMessage={errors.banner_url?.message}
              />
            </div>
          )}
        />
        <div className="flex gap-2">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <>
                <Input
                  size="sm"
                  ref={ref}
                  type="text"
                  onBlur={onBlur}
                  variant="bordered"
                  onChange={onChange}
                  value={value || ""}
                  label="Título do curso"
                  isRequired
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="course_url"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <>
                <Input
                  size="sm"
                  ref={ref}
                  type="text"
                  onBlur={onBlur}
                  variant="bordered"
                  onChange={onChange}
                  value={value || ""}
                  label="Url do curso"
                  isRequired
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              </>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <>
                <Input
                  size="sm"
                  ref={ref}
                  type="number"
                  onBlur={onBlur}
                  variant="bordered"
                  onChange={(priceValue) => {
                    const price = Number(priceValue.target.value);

                    onChange(price);
                  }}
                  value={value as any}
                  label="Preço do produto"
                  isRequired
                  isInvalid={!!errors.price}
                  errorMessage={errors.price?.message}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="workload"
            render={({ field: { onChange, onBlur, ref, value } }) => (
              <>
                <Input
                  size="sm"
                  ref={ref}
                  type="number"
                  onBlur={onBlur}
                  variant="bordered"
                  onChange={(quantityValue) => {
                    const quantity = Number(quantityValue.target.value);

                    onChange(quantity);
                  }}
                  value={value as any}
                  label="Carga horária"
                  isRequired
                  isInvalid={!!errors.workload}
                  errorMessage={errors.workload?.message}
                />
              </>
            )}
          />
        </div>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, ref, value } }) => (
            <>
              <Textarea
                size="sm"
                ref={ref}
                type="text"
                onBlur={onBlur}
                variant="bordered"
                onChange={onChange}
                value={value || ""}
                label="Descrição do curso"
                isRequired
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
              />
            </>
          )}
        />
      </div>
    </>
  );
};

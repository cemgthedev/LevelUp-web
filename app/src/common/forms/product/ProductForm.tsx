import { getCategoryOptions } from "@/data/getCategoryOptions";
import {
    Autocomplete,
    AutocompleteItem,
    Image,
    Input,
    Textarea
} from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateProductFormData } from "./validations/create-form.schema";

export const ProductForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateProductFormData>();

  const categoriesOptions = getCategoryOptions();
  console.log(categoriesOptions);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Controller
            control={control}
            name="image_url"
            render={({ field: { onChange, onBlur, ref, value } }) => (
                <div className="flex flex-col items-center gap-2">
                    <Image
                        alt="Imagem do produto"
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
                        isInvalid={!!errors.image_url}
                        errorMessage={errors.image_url?.message}
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
                            label="Título do produto"
                            isRequired
                            isInvalid={!!errors.title}
                            errorMessage={errors.title?.message}
                        />
                    </>
                )}
            />
            <Controller
                control={control}
                name="category"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                    <>
                        <Autocomplete
                            size="sm"
                            radius="sm"
                            ref={ref}
                            onBlur={onBlur}
                            label="Selecione uma categoria"
                            variant="bordered"
                            aria-label="Opções de categoria de produto"
                            defaultItems={categoriesOptions}
                            selectedKey={value || ""}
                            inputValue={categoriesOptions.find((option) => option.value === value)?.label}
                            onSelectionChange={(categoryValue) => {
                            const category = categoryValue?.toString();

                            onChange(category);
                            }}
                            isRequired
                            isInvalid={!!errors.category}
                            errorMessage={errors.category?.message}
                        >
                            {(category) => (
                            <AutocompleteItem key={category.value} value={category.value}>
                                {category.label}
                            </AutocompleteItem>
                            )}
                        </Autocomplete>
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
            name="quantity"
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
                  label="Quantidade em estoque"
                  isRequired
                  isInvalid={!!errors.quantity}
                  errorMessage={errors.quantity?.message}
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
                        label="Descrição do produto"
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
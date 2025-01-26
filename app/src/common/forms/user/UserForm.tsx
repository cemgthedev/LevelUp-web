import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

import { CreateUserFormData } from "@/common/forms/user/validations/register-user.schema";
import { getGenderOptions } from "@/data/getGenderOptions";

export const UserForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormData>();

  const genders = getGenderOptions();

  return (
    <>
      <Accordion
        defaultExpandedKeys={["dados-pessoais"]}
        itemClasses={{ title: "text-lg font-semibold" }}
      >
        <AccordionItem
          key="dados-pessoais"
          aria-label="Dados pessoais"
          title="Dados pessoais"
        >
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <>
                  <Input
                    ref={ref}
                    isRequired
                    errorMessage={errors.name?.message}
                    isInvalid={!!errors.name}
                    label="Informe seu nome"
                    size="sm"
                    type="text"
                    value={value ? String(value) : ""}
                    variant="bordered"
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <>
                  <Input
                    ref={ref}
                    isRequired
                    errorMessage={errors.cpf?.message}
                    isInvalid={!!errors.cpf}
                    label="CPF do usuário"
                    size="sm"
                    type="text"
                    value={value ? String(value) : ""}
                    variant="bordered"
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <>
                  <Input
                    ref={ref}
                    isRequired
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                    label="Informe seu email"
                    size="sm"
                    type="email"
                    value={value ? String(value) : ""}
                    variant="bordered"
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
            <div className="flex gap-2">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      isRequired
                      errorMessage={errors.password?.message}
                      isInvalid={!!errors.password}
                      label="Senha da conta"
                      size="sm"
                      type="password"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      isRequired
                      errorMessage={errors.passwordConfirmation?.message}
                      isInvalid={!!errors.passwordConfirmation}
                      label="Confirme a senha"
                      size="sm"
                      type="password"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Autocomplete
                      ref={ref}
                      defaultSelectedKey={value}
                      errorMessage={errors.gender?.message}
                      inputValue={
                        genders.find((option) => option.value === value)?.label
                      }
                      isInvalid={!!errors.gender}
                      items={genders}
                      label="Informe seu sexo"
                      size="sm"
                      value={value ? String(value) : ""}
                      onBlur={onBlur}
                      onSelectionChange={onChange}
                    >
                      {(item) => (
                        <AutocompleteItem key={item.value} value={item.label}>
                          {item.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </>
                )}
              />
              <Controller
                control={control}
                name="age"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      errorMessage={errors.age?.message}
                      isInvalid={!!errors.age}
                      label="Informe sua idade"
                      min={1}
                      size="sm"
                      type="number"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={(ageValue) => {
                        const age = Number(ageValue.target.value);

                        onChange(age);
                      }}
                    />
                  </>
                )}
              />
            </div>
            <Controller
              control={control}
              name="phone_number"
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <>
                  <Input
                    ref={ref}
                    isRequired
                    errorMessage={errors.phone_number?.message}
                    isInvalid={!!errors.phone_number}
                    label="Telefone de contato"
                    size="sm"
                    type="text"
                    value={value ? String(value) : ""}
                    variant="bordered"
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
          </div>
        </AccordionItem>
        <AccordionItem
          key="dados-de-localizacao"
          aria-label="Dados de localização"
          title="Dados de localização"
        >
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="address.name"
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <>
                  <Input
                    ref={ref}
                    errorMessage={errors.address?.name?.message}
                    isInvalid={!!errors.address?.name}
                    label="Título do endereço"
                    size="sm"
                    type="text"
                    value={value ? String(value) : ""}
                    variant="bordered"
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
            <div className="flex gap-2">
              <Controller
                control={control}
                name="address.cep"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      errorMessage={errors.address?.cep?.message}
                      isInvalid={!!errors.address?.cep}
                      label="CEP"
                      size="sm"
                      type="text"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.city"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      errorMessage={errors.address?.city?.message}
                      isInvalid={!!errors.address?.city}
                      label="Cidade"
                      size="sm"
                      type="text"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.uf"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      className="w-42"
                      errorMessage={errors.address?.uf?.message}
                      isInvalid={!!errors.address?.uf}
                      label="UF"
                      size="sm"
                      type="text"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Controller
                control={control}
                name="address.neighborhood"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      errorMessage={errors.address?.neighborhood?.message}
                      isInvalid={!!errors.address?.neighborhood}
                      label="Bairro"
                      size="sm"
                      type="text"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.street"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      errorMessage={errors.address?.street?.message}
                      isInvalid={!!errors.address?.street}
                      label="Nome da rua/avenida"
                      size="sm"
                      type="text"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="address.number"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      className="w-42"
                      errorMessage={errors.address?.number?.message}
                      isInvalid={!!errors.address?.number}
                      label="Número"
                      size="sm"
                      type="text"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Controller
                control={control}
                name="address.complement"
                render={({ field: { onChange, onBlur, ref, value } }) => (
                  <>
                    <Input
                      ref={ref}
                      errorMessage={errors.address?.complement?.message}
                      isInvalid={!!errors.address?.complement}
                      label="Complemento (Ap, casa etc.)"
                      size="sm"
                      type="text"
                      value={value ? String(value) : ""}
                      variant="bordered"
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};

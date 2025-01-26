import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import {
  ACCESS_TOKEN
} from "@/constants/tokens";
import { URLS } from "@/constants/urls";
import { TUser } from "@/types/TUser";
import { cache } from "@/utils/cache.util";
import { notify } from "@/utils/notify.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input, Link, useDisclosure } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../common/forms/user/modals/CreateUser";
import { loginMutation } from "./mutations/login.mutation";
import {
  LoginFormData,
  loginFormSchema,
} from "./validations/login-form.schema";

export const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutation,
    onSuccess(user: TUser) {
      cache.setValue(ACCESS_TOKEN, JSON.stringify({ email: user.email, password: user.password }));
  
      navigate(URLS.dashboard);
    },
    onError() {
      notify("Usuário ou senha inválida.", { type: "error" });
    },
  });

  const onHandleSubmit = handleSubmit((data) => {
    mutate(data);
  });

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onOpenChange: onOpenCreateChange,
  } = useDisclosure();

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-t from-[#075985] to-[#5B21B6]">
      <span className="absolute inset-0 bg-[url(/blur-background.svg)]"/>

      <div className="absolute right-4 top-4">
        <ThemeSwitcher />
      </div>

      <Card className="w-1/3 px-2 py-4 max-lg:w-3/5 max-md:w-4/5">
        <CardHeader className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-center text-lg">Seja bem-vindo(a) novamente</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={onHandleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <Input
                  {...register("email")}
                  size="lg"
                  variant="bordered"
                  type="email"
                  labelPlacement="outside"
                  label="Email"
                  placeholder="Digite seu email"
                  startContent={<Mail className="h-4 w-4 text-gray-600" />}
                  errorMessage={errors.email?.message}
                  isRequired
                />

                <Input
                  {...register("password")}
                  size="lg"
                  variant="bordered"
                  labelPlacement="outside"
                  label="Senha"
                  placeholder="Digite sua senha"
                  startContent={<Lock className="h-4 w-4 text-gray-600" />}
                  endContent={
                    <Button
                      variant="light"
                      isIconOnly
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <Eye className="h-5 w-5 opacity-50" />
                      ) : (
                        <EyeOff className="h-5 w-5 opacity-50" />
                      )}
                    </Button>
                  }
                  type={passwordVisible ? "text" : "password"}
                  isRequired
                />
              </div>

              <div className="flex gap-2">
                <span>Não possui cadastro?</span>
                <Link showAnchorIcon className="cursor-pointer" onClick={onOpenCreate}>Cadastre-se</Link>
              </div>

              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  color="primary"
                  className="w-1/2 text-lg font-semibold"
                  isLoading={isPending}
                >
                  Entrar
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <CreateUser
        isOpen={isOpenCreate}
        onOpenChange={onOpenCreateChange}
      />
    </section>
  );
};

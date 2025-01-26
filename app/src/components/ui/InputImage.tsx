import { notify } from "@/utils/notify.util";
import { Avatar } from "@nextui-org/react";
import { User, XCircle } from "lucide-react";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";

export function InputImage({
  name,
  label,
  control,
}: {
  name: string;
  label: string;
  control: Control<any>;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> {
    notify("A imagem é muito grande. Redimensionando...", { type: "info" });
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        img.src = event.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL(file.type));
          notify("Imagem redimensionada com sucesso", { type: "success" });
        } else {
          notify("Falha ao redimensionar a imagem", { type: "warning" });
          reject(new Error("Falha ao redimensionar a imagem"));
        }
      };

      img.onerror = reject;
    });
  }

  async function onChangeImage(
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) {
    const file = e.target.files?.[0];
    const maxSize = 1024 * 1024; // 1MB
    const maxWidth = 800;
    const maxHeight = 800;

    if (file) {
      if (file.size > maxSize) {
        const resizedBase64 = await resizeImage(file, maxWidth, maxHeight);
        setImagePreview(resizedBase64);
        onChange(resizedBase64); // Passar a string Base64 redimensionada para o formulário
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setImagePreview(base64String);
          onChange(base64String); // Passar a string Base64 para o formulário aqui
        };
      }
    }
  }

  function onRemoveImage(onChange: (value: string) => void) {
    setImagePreview(null);
    onChange(""); // Limpar o campo no formulário
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur, ref } }) => (
        <div className="relative flex flex-col gap-2 items-center justify-center">
          <Avatar
            showFallback
            fallback={<User className="w-20 h-20" />}
            src={imagePreview || value}
            className="w-[110px] h-[110px]"
          />
          {value && (
            <XCircle
              className="absolute top-1 right-1 cursor-pointer text-red-600 hover:opacity-80"
              onClick={() => onRemoveImage(onChange)}
            />
          )}
          <div className="w-[256px] flex flex-col">
            <label
              htmlFor="avatar"
              className="text-center font-semibold w-full bg-default-800 px-3 py-2 rounded-md text-default-50 hover:opacity-90"
            >
              {value ? "Editar imagem" : label}
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              ref={ref}
              onBlur={onBlur}
              onChange={(e) => onChangeImage(e, onChange)}
            />
          </div>
        </div>
      )}
    />
  );
}

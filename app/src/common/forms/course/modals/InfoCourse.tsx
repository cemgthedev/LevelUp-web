import { TCourse } from "@/types/TCourse";
import {
  Button,
  Card,
  CardBody,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { MessageCircle } from "lucide-react";

interface InfoCourseProps {
  isOpen: boolean;
  onOpenChange: () => void;
  item: TCourse;
}

export const InfoCourse = ({ isOpen, onOpenChange, item }: InfoCourseProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        backdrop="blur"
        classNames={{ body: "max-h-[63vh] overflow-y-scroll" }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detalhes de Curso
          </ModalHeader>

          <ModalBody>
            <Card
              shadow="none"
              classNames={{ body: "bg-none px-0 pt-0 gap-3" }}
            >
              <CardBody>
                <div className="flex justify-center overflow-auto">
                  <Image
                    alt="Imagem do curso"
                    fallbackSrc={"/image-off.svg"}
                    height={216}
                    src={item.banner_url}
                    width={256}
                    className="w-[256px] h-[216px]"
                  />
                </div>
                <div className="flex flex-col px-4">
                  <div className="flex gap-1 justify-between">
                    <p className="line-clamp-2 text-xl font-semibold">
                      {item.title}
                    </p>
                    <p>
                      {item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                  <p className="text-purple-600 font-semibold">
                    {item.workload} horas
                  </p>
                  <p>
                    {item.description}
                    {item.phone_number}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Button
                    fullWidth
                    type="button"
                    color="success"
                    variant="shadow"
                    startContent={<MessageCircle className="h-5 w-5" />}
                    className="text-white"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${item.phone_number.replace("-", "").replace("(", "").replace(")", "")}`,
                        "_blank"
                      )
                    }
                  >
                    Falar com o vendedor
                  </Button>
                </div>
              </CardBody>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

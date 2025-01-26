import {
    Button,
    Card,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
  
  type PopoverDeleteProps = {
    title?: string;
    message: string;
    triggerButton?: React.ReactNode;
    onContinue?: () => void | Promise<void>;
  };
  
  export const PopoverDelete = ({
    message,
    onContinue,
    triggerButton,
    title = "Excluir",
  }: PopoverDeleteProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const onRequestContinue = () => {
      setIsLoading(true);
  
      try {
        onContinue?.();
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleIsOpen = () => setIsOpen((prev) => !prev);
  
    return (
      <Popover showArrow isOpen={isOpen} backdrop="opaque" placement="left">
        <PopoverTrigger onClick={handleIsOpen}>
          {triggerButton ? triggerButton : title}
        </PopoverTrigger>
  
        <PopoverContent>
          <Card shadow="none" className="max-w-[25rem] border-none p-4">
            <div className="box-border flex flex-shrink-0 items-center gap-2">
              <AlertTriangle className="min-h-[1.25rem] min-w-[1.25rem] text-yellow-500" />
              <p className="text-xs">{message}</p>
            </div>
  
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                color="default"
                onClick={handleIsOpen}
                disabled={isLoading}
              >
                Não
              </Button>
  
              <Button
                size="sm"
                color="danger"
                variant="solid"
                disabled={isLoading}
                onClick={onRequestContinue}
              >
                Sim
              </Button>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    );
};  
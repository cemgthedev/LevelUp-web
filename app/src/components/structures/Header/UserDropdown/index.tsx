import { InfoUser } from "@/common/forms/user/modals/InfoUser";
import { URLS } from "@/constants/urls";
import { useAuthentication } from "@/hooks/use-authentication.hook";
import { TUser } from "@/types/TUser";
import { logout } from "@/utils/logout.util";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UserDropdown = () => {
  const { user } = useAuthentication();
  const navigate = useNavigate();

  const {
    isOpen,
    onOpen,
    onOpenChange,
  } = useDisclosure();


  const onAction = (key: string) => {
    switch (key) {
      case "details":
        console.log("details");
        onOpen();
        break;
      case "logout":
        logout();
        navigate(URLS.login);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            color="secondary"
            name={user?.name?.slice(0, 2) || "ME"}
            className="transition-transform uppercase"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={(key) => onAction(String(key))}
        >
          <DropdownSection aria-label="User Details" showDivider>
            <DropdownItem
              isReadOnly
              key="profile"
              className="h-14 gap-2 opacity-100"
            >
              <User
                name={user?.name}
                description={user?.email}
                classNames={{
                  name: "text-default-600",
                  description: "text-default-500",
                }}
              />
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Actions">
            <DropdownItem key="details">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Configurações</span>
              </div>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </div>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      {
        user && (
          <InfoUser
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            item={user as TUser}
          />   
        )
      }
    </>
  );
};

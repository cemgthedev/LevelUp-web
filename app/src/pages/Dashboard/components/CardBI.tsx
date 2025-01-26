import { cn } from "@/lib/utils";
import { BIType } from "@/types/TBI";
import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";

export const CardBI = ({
  title,
  subtitle,
  icon,
  color,
  description,
  href,
}: BIType) => {
  return (
    <Card
      className={cn("max-w-md min-w-md bg-opacity-45 h-full", color)}
      as={Link}
      href={href}
      key={title}
    >
      <CardHeader className="grid-cols-2 justify-between">
        <div>
          <h1 className="text-xl font-bold  line-clamp-2">{title}</h1>
          {subtitle && <small className="text-xs">{subtitle}</small>}
        </div>
        {icon && (
          <div className="min-w-8 max-w-14 max-h-14 p-2  border border-collapse rounded-full flex items-center justify-center">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardBody>
        {description && <div className="">{description}</div>}
      </CardBody>
    </Card>
  );
};

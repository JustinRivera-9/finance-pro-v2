import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { type ReactNode } from "react";

type FormCardProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

const FormCard = ({ children, title, description }: FormCardProps) => {
  return (
    <div className="mx-auto w-10/12">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default FormCard;

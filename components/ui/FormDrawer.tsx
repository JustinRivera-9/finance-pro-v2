import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

type FormDrawerProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  triggerLabel?: string | ReactNode;
  color?: string;
  open?: boolean;
};

const FormDrawer = ({
  children,
  title,
  description,
  triggerLabel,
  color,
  open,
}: FormDrawerProps) => {
  if (open) {
    return (
      <Drawer open>
        <DrawerTrigger className="" asChild>
          <button className={`text-${color} text-md`}>{triggerLabel}</button>
        </DrawerTrigger>
        <DrawerContent className="border-dark py-2 pb-6">
          <DrawerHeader className="text-light mx-auto">
            <DrawerTitle className="font-semibold text-2xl text-center">
              {title}
            </DrawerTitle>
            <DrawerDescription className="text-light text-center">
              {description}
            </DrawerDescription>
          </DrawerHeader>
          <Separator className="mt-2 mb-4 w-10/12" />
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger className="" asChild>
        <button className={`text-${color} text-md`}>{triggerLabel}</button>
      </DrawerTrigger>
      <DrawerContent className="border-dark py-2 pb-6">
        <DrawerHeader className="text-light mx-auto">
          <DrawerTitle className="font-semibold text-2xl text-center">
            {title}
          </DrawerTitle>
          <DrawerDescription className="text-light text-center">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <Separator className="mt-2 mb-4 w-10/12" />
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawer;

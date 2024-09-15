import { ComponentProps } from "react";
import { Switch } from "./switch";

type SwitchBoxProps = {
  label: string;
  description?: string;
  id: string;
  isChecked?: boolean;
};

const SwitchBox = ({
  label,
  description,
  id,
  isChecked = true,
}: SwitchBoxProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold">{label}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} defaultChecked={isChecked} />
    </div>
  );
};

export default SwitchBox;

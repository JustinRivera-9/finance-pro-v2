import { ReactNode } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const AccountOption = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full py-2 px-8 justify-between items-center border-t border-b border-light/60">
      <p className="text-lg">{children}</p>
      <p>{<ArrowRightAltIcon fontSize="large" />}</p>
    </div>
  );
};

export default AccountOption;

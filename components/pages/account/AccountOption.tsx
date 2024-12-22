import { ReactNode } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const AccountOption = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: string;
}) => {
  return (
    <div
      className={`${style} flex w-full py-2 px-8 justify-between items-center border-b border-light/60`}
    >
      <p className="text-lg">{children}</p>
      <ArrowRightAltIcon fontSize="large" />
    </div>
  );
};

export default AccountOption;

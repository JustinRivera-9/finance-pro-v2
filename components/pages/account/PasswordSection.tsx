import FormDrawer from "@/components/ui/FormDrawer";
import React from "react";
import AccountOption from "./AccountOption";
import PasswordForm from "./forms/PasswordForm";

const PasswordSection = () => {
  return (
    <FormDrawer
      title="Password"
      description="Update your password."
      triggerLabel={<AccountOption>Password</AccountOption>}
    >
      <PasswordForm />
    </FormDrawer>
  );
};

export default PasswordSection;

import FormDrawer from "@/components/ui/FormDrawer";
import PreferenceForm from "./forms/PreferenceForm";
import AccountOption from "./AccountOption";

const PreferenceSection = () => {
  return (
    <FormDrawer
      title="Account Preferences"
      description="Manage your account preferences."
      triggerLabel={<AccountOption>Preferences</AccountOption>}
    >
      <PreferenceForm />
    </FormDrawer>
  );
};

export default PreferenceSection;

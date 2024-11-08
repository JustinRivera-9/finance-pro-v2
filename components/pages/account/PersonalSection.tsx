import { createClient } from "@/lib/supabase/server";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import FormDrawer from "@/components/ui/FormDrawer";
import AccountOption from "./AccountOption";

const PersonalSection = async () => {
  const supabase = createClient();

  // gets user email
  const { data: userEmail, error: emailError } = await supabase.auth.getUser();

  // gets user name
  let { data: fullName, error: nameError } = await supabase
    .from("account")
    .select("fullName");

  const name = fullName![0].fullName;
  const email = userEmail.user!.email;

  return (
    <FormDrawer
      title="Personal Information"
      description="Update your personal details."
      triggerLabel={
        <AccountOption style="border-t">Personal information</AccountOption>
      }
    >
      <PersonalInfoForm data={{ name, email }} />
    </FormDrawer>
  );
};

export default PersonalSection;

import { createClient } from "@/lib/supabase/server";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import FormDrawer from "@/components/ui/FormDrawer";
import AccountOption from "./AccountOption";
import { getUser } from "@/lib/supabase/actions";

const PersonalSection = async () => {
  const supabase = createClient();
  const user_id = await getUser();

  // gets user email
  const { data: userEmail, error: emailError } = await supabase.auth.getUser();

  // gets user name
  let { data: name, error: nameError } = await supabase
    .from("account")
    .select("name")
    .eq("user_id", user_id);

  const userName = name![0].name;
  const email = userEmail.user!.email;

  return (
    <FormDrawer
      title="Personal Information"
      description="Update your personal details."
      triggerLabel={
        <AccountOption style="border-t">Personal Information</AccountOption>
      }
    >
      <PersonalInfoForm data={{ userName, email }} />
    </FormDrawer>
  );
};

export default PersonalSection;

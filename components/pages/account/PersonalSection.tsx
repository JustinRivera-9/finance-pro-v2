import { createClient } from "@/lib/supabase/server";
import PersonalInfoForm from "./forms/PersonalInfoForm";

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

  return <PersonalInfoForm data={{ name, email }} />;
};

export default PersonalSection;

import ContactForm from "@/components/pages/account/ContactForm";
import DeleteAccount from "@/components/pages/account/DeleteAccount";
import PasswordSection from "@/components/pages/account/PasswordSection";
import PersonalSection from "@/components/pages/account/PersonalSection";
import UpgradeAccount from "@/components/pages/account/Upgrade/UpgradeAccount";
import LogoutButton from "@/components/pages/account/LogoutButton";
import PreferenceSection from "@/components/pages/account/PreferenceSection";

const AccountPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <PersonalSection />
      <PasswordSection />
      <PreferenceSection />
      <ContactForm />
      <UpgradeAccount />
      <LogoutButton />
      <DeleteAccount />
    </div>
  );
};

export default AccountPage;

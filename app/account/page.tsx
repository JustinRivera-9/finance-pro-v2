import AccountSection from "@/components/pages/account/AccountSection";
import ContactForm from "@/components/pages/account/ContactForm";
import DeleteAccount from "@/components/pages/account/DeleteAccount";
import PasswordSection from "@/components/pages/account/PasswordSection";
import PersonalSection from "@/components/pages/account/PersonalSection";
import UpgradeAccount from "@/components/pages/account/Upgrade/UpgradeAccount";
import LogoutButton from "@/components/pages/account/LogoutButton";

const AccountPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <PersonalSection />
      <PasswordSection />
      <AccountSection />
      <ContactForm />
      <UpgradeAccount />
      <LogoutButton />
      <DeleteAccount />
    </div>
  );
};

export default AccountPage;

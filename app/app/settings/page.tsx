import DeleteAccount from "@/components/pages/account/DeleteAccount";
import PersonalSection from "@/components/pages/account/PersonalSection";
import UpgradeAccount from "@/components/pages/account/Upgrade/UpgradeAccount";
import LogoutButton from "@/components/pages/account/LogoutButton";
import PasswordSection from "@/components/pages/account/PasswordSection";
import PreferenceSection from "@/components/pages/account/PreferenceSection";
import ContactSection from "@/components/pages/account/ContactSection";
import ManageAccountSection from "@/components/pages/account/ManageAccountSection";

const AccountPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <PersonalSection />
        <PasswordSection />
        <ManageAccountSection />
        <PreferenceSection />
        <ContactSection />
        <UpgradeAccount />
      </div>
      <div className="flex flex-col gap-4">
        <LogoutButton />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default AccountPage;

import FormDrawer from "@/components/ui/FormDrawer";
import ContactForm from "./ContactForm";
import AccountOption from "./AccountOption";

const ContactSection = () => {
  return (
    <FormDrawer
      title="Contact Us"
      description="Get in touch with us by filling out the form below, and we'll respond as soon as possible."
      triggerLabel={<AccountOption>Contact Us</AccountOption>}
    >
      <ContactForm />
    </FormDrawer>
  );
};

export default ContactSection;

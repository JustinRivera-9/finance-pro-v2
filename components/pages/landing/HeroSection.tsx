import SignupBtn from "./SignupBtn";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl text-accent">Personal Finance Made Easy</h1>
      <p className="text-lg">
        Our app streamlines the management of your personal finances through
        budget tracking, bank connectivity, and robust tools for monitoring
        investments and loans, empowering you to stay laser-focused on your
        financial goals.
      </p>
      <SignupBtn />
    </div>
  );
};

export default HeroSection;

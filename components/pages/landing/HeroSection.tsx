import Image from "next/image";
import SignupBtn from "./SignupBtn";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <p className="text-3xl">Finance</p>
          <p className="text-4xl text-accent">Made Easy</p>
        </div>
        <Image
          alt="hero section background"
          src="/features/dollar-icon-1.png"
          width={125}
          height={125}
        />
      </div>
      <p className="text-lg pb-4">
        Simplified budget tracking, bank integration, and investment monitoring
        for goal-focused management
      </p>
      <SignupBtn />
    </div>
  );
};

export default HeroSection;

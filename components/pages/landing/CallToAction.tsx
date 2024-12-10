import Link from "next/link";
import SignupBtn from "./SignupBtn";
import Image from "next/image";

const CallToAction = () => {
  return (
    <div className="flex flex-col gap-4 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Start your journey today!</h1>
        <Image
          alt="hand grabbing money"
          src="/features/hand-grabbing-money.png"
          width={125}
          height={125}
        />
      </div>
      <Link
        href="/auth/signup"
        className="bg-accent text-lg text-center w-full py-2 px-4 rounded-lg text-dark font-semibold mx-auto"
      >
        Sign Up Today
      </Link>
    </div>
  );
};

export default CallToAction;

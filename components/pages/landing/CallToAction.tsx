import Link from "next/link";
import SignupBtn from "./SignupBtn";

const CallToAction = () => {
  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-xl">
      <h1 className="text-3xl text-accent">
        Take back control of your finances
      </h1>
      <p className="text-lg">
        Start managing your personal finance with ease and confidence by signing
        up today!
      </p>
      <Link
        href="/auth/signup"
        className="bg-secondary w-fit py-2 px-4 rounded-lg text-dark font-semibold"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default CallToAction;

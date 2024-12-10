import Link from "next/link";

const SignupBtn = () => {
  return (
    <Link
      href="/auth/signup"
      className="bg-accent w-fit py-2 px-4 rounded-lg text-dark font-semibold"
      // className="border border-accent w-fit py-2 px-4 rounded-lg text-accent font-semibold"
      // className="border border-secondary w-fit py-2 px-4 rounded-lg text-secondary font-semibold"
      // className="bg-secondary w-fit py-2 px-4 rounded-lg text-dark font-semibold"
    >
      Sign Up
    </Link>
  );
};

export default SignupBtn;

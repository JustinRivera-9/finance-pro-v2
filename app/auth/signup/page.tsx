import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 bg-dark">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;

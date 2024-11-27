"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="pl-6 pb-4 text-secondary"
    >
      <ArrowLeft size={30} />
    </button>
  );
};

export default BackBtn;

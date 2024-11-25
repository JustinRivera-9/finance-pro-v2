"use client";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

const ConfirmTransactionBtn = () => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  if (isConfirmed) {
    return (
      <CircleCheck
        className="text-dark bg-accent rounded-full"
        onClick={() => setIsConfirmed((prev) => !prev)}
      />
    );
  } else {
    return (
      <CircleCheck
        className="text-light bg-dark rounded-full"
        onClick={() => setIsConfirmed((prev) => !prev)}
      />
    );
  }
};

export default ConfirmTransactionBtn;

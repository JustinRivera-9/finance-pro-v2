"use client";

import { useUser } from "@/context/UserContext";

const TestUserContext = () => {
  const user = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  return <div>UserID: {user}</div>;
};

export default TestUserContext;

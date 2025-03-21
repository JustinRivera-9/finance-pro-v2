import Spinner from "@/components/ui/Spinner";
import React from "react";

const loading = () => {
  return <Spinner size="lg" message="Getting account information..." />;
};

export default loading;

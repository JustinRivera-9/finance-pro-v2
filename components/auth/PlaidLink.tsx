"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  usePlaidLink,
  type PlaidLinkOnSuccess,
  type PlaidLinkOptions,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/userActions";

const PlaidLink = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    // Update user argument in createLinkToken()
    const getLinkToken = async () => {
      const data = await createLinkToken({});
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, user) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/dashboard");
    },
    []
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button onClick={() => open} className="bg-info" disabled={!ready}>
      Connect Bank
    </Button>
  );
};

export default PlaidLink;

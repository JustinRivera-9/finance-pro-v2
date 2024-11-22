"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  usePlaidLink,
  type PlaidLinkOnSuccess,
  type PlaidLinkOptions,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/plaid/actions";
import { ButtonLoading } from "../ui/buttonLoading";

type PlaidLinkProps = {
  user: string;
  variant: string;
};

const ConnectAccountBtn = ({ user, variant }: PlaidLinkProps) => {
  const hasInitialized = useRef(false);
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const fetchToken = async () => {
      const data = await createLinkToken(user);
      setToken(data);
    };

    fetchToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/app/connected-accounts");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, exit, ready, error } = usePlaidLink(config);

  return ready ? (
    <Button onClick={() => open()} className="bg-accent" disabled={!ready}>
      Connect Bank
    </Button>
  ) : (
    <ButtonLoading />
  );
};

export default ConnectAccountBtn;

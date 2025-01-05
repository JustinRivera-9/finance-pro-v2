import { redirect } from "next/navigation";
import { ExchangePublicTokenProps } from "../../types/types";

export const createLinkToken = async (user: string) => {
  try {
    const response = await fetch("/api/plaid/create-link-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      throw new Error("Failed to create link token");
    }

    const data = await response.json();
    const { link_token } = data;
    return link_token;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: ExchangePublicTokenProps) => {
  try {
    const response = await fetch("/api/plaid/exchange-public-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicToken }),
    });

    if (!response.ok) throw Error;
    redirect("app/connected-accounts");
  } catch (error) {
    console.log("An error occured while creating exhange token:", error);
  }
};

export const fetchTransactions = async (
  accessToken: string,
  cursor: string | null = null,
  itemId: string,
  user: string
) => {
  try {
    const response = await fetch(
      // `https://finance-pro-eight.vercel.app/api/plaid/transactions-sync`,
      `http://localhost:3000/api/plaid/transactions-sync`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastCursor: cursor,
          accessToken: accessToken,
          itemId,
          user,
        }),
      }
    );

    if (!response.ok)
      throw new Error("There was an issue fetching transaction data");

    const data = response.json();
    return data;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

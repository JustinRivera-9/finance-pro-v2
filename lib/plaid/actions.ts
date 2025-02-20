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
      body: JSON.stringify({ publicToken, user }),
    });

    if (!response.ok) throw Error;
    redirect("app/connected-accounts");
  } catch (error) {
    console.log("An error occured while exhanging Plaid link token");
  }
};

export const syncTransactions = async (
  access_token: string,
  transaction_cursor: string,
  item_id: string,
  user: string
) => {
  try {
    const response = await fetch(
      `https://finance-pro-eight.vercel.app/api/plaid/transactions-sync`,
      // `http://localhost:3000/api/plaid/transactions-sync`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_cursor,
          access_token,
          item_id,
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

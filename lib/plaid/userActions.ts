import {
  CountryCode,
  CreditAccountSubtype,
  DepositoryAccountSubtype,
  LinkTokenCreateRequest,
  type Products,
} from "plaid";
import { plaidClient } from "./plaid";
import { ExchangePublicTokenProps } from "../../types/types";

export const createLinkToken = async (user: string) => {
  // const tokenParams = {
  //   user: {
  //     client_user_id: user.userId,
  //   },
  //   client_name: user.name,
  //   products: ["auth"] as Products[],
  //   language: "en",
  //   country_codes: ["US"] as CountryCode[],
  // };

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
    // Exchange public token for permanent access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    console.log(`accessToken: ${accessToken}`);
    console.log(`itemId: ${itemId}`);

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    console.log(`accountsResponse: ${accountsResponse}`);

    // Get account data from account
    const accountData = accountsResponse.data.accounts[0];
    console.log(`accountsData: ${accountData}`);
  } catch (error) {
    console.log("An error occured while creating exhange token:", error);
  }
};

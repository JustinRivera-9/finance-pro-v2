import { CountryCode, type Products } from "plaid";
import { plaidClient } from "./plaid";
import { parseStringify } from "../utils";
import { ExchangePublicTokenProps } from "../../types/types";

export const createLinkToken = async (user: any) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: "123456789",
      },
      client_name: "jman199610",
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log("An error occured while creating exhange token", error);
  }
};

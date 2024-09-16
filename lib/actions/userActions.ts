import { CountryCode, type Products } from "plaid";
import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

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

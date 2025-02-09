// app/api/plaid/create-link-token/route.ts (Server-side in App Router)
import { plaidClient } from "@/lib/plaid/plaid";
import { NextRequest, NextResponse } from "next/server";
import {
  CountryCode,
  CreditAccountSubtype,
  DepositoryAccountSubtype,
  Products,
} from "plaid";

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();

    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user,
      },
      client_name: "Finance Pro",
      products: ["transactions"] as Products[],
      transactions: {
        days_requested: 60,
      },
      country_codes: ["US"] as CountryCode[],
      language: "en",
      // webhook: "https://sample-web-hook.com",
      // redirect_uri: "https://domainname.com/oauth-page.html",
      account_filters: {
        depository: {
          account_subtypes: [
            "checking",
            "savings",
          ] as DepositoryAccountSubtype[],
        },
        credit: {
          account_subtypes: ["credit card"] as CreditAccountSubtype[],
        },
      },
    });

    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error("Error creating Plaid link token:", error);
    return NextResponse.json(
      { error: "Error creating link token" },
      { status: 500 }
    );
  }
}

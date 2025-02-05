import { addItem } from "@/app/app/connected-accounts/actions";
import { plaidClient } from "@/lib/plaid/plaid";
import { NextRequest, NextResponse } from "next/server";
import { ItemPublicTokenExchangeRequest } from "plaid";

export async function POST(req: NextRequest) {
  const { publicToken, user } = await req.json();
  const request: ItemPublicTokenExchangeRequest = {
    public_token: publicToken,
  };

  try {
    // Exchanges link token for access token. Used to identify a connected bank (item)
    const response = await plaidClient.itemPublicTokenExchange(request);
    const { access_token, item_id, request_id } = response.data;
    if (!response.data.access_token) throw Error;

    await addItem({
      access_token,
      item_id,
      user_id: user,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error exchanging Plaid link token:", error);
    return NextResponse.json(
      { error: "Error creating link token" },
      { status: 500 }
    );
  }
}

import { plaidClient } from "@/lib/plaid/plaid";
import { NextRequest, NextResponse } from "next/server";
import { ItemPublicTokenExchangeRequest } from "plaid";

export async function POST(req: NextRequest) {
  const { publicToken } = await req.json();

  const request: ItemPublicTokenExchangeRequest = {
    public_token: publicToken,
  };

  try {
    const response = await plaidClient.itemPublicTokenExchange(request);
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    const requestId = response.data.request_id;

    return NextResponse.json({ accessToken, itemId, requestId });
  } catch (error) {
    console.error("Error creating Plaid link token:", error);
    return NextResponse.json(
      { error: "Error creating link token" },
      { status: 500 }
    );
  }
}

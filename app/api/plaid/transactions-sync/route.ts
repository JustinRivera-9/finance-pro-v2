import { updateTransactions } from "@/app/app/connected-accounts/actions";
import { plaidClient } from "@/lib/plaid/plaid";
import { NextRequest, NextResponse } from "next/server";
import {
  AccountBase,
  RemovedTransaction,
  Transaction,
  TransactionsSyncRequest,
} from "plaid";

export async function POST(req: NextRequest) {
  const { lastCursor, accessToken } = await req.json();
  try {
    // Provide a cursor from your database if you've previously
    // received one for the Item. Leave null if this is your
    // first sync call for this Item. The first request will
    // return a cursor.
    let cursor = lastCursor;

    // New transaction updates since "cursor"
    let added: Array<Transaction> = [];
    let modified: Array<Transaction> = [];
    // Removed transaction ids
    let removed: Array<RemovedTransaction> = [];
    let hasMore = true;
    let accounts: AccountBase[] = [];

    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const request: TransactionsSyncRequest = {
        access_token: accessToken,
        cursor,
      };
      const response = await plaidClient.transactionsSync(request);
      const data = response.data;

      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      accounts = data.accounts;

      hasMore = data.has_more;

      // Update cursor to the next cursor
      cursor = data.next_cursor;
    }

    await updateTransactions({ accounts, added, modified, removed, cursor });
    // Persist cursor and updated data
    // database.applyUpdates(itemId, added, modified, removed, cursor);
    return NextResponse.json({ accounts, added, modified, removed, cursor });
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Error fetching transactions", details: error.message },
      { status: 500 }
    );
  }
}

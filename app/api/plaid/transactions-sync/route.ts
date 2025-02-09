import {
  syncTransactionsToDatabase,
  updateAccounts,
} from "@/app/app/connected-accounts/actions";
import { plaidClient } from "@/lib/plaid/plaid";
import { NextRequest, NextResponse } from "next/server";
import {
  AccountBase,
  RemovedTransaction,
  Transaction,
  TransactionsSyncRequest,
} from "plaid";

export async function POST(req: NextRequest) {
  const { transaction_cursor, access_token, item_id, user } = await req.json();
  try {
    let cursor = transaction_cursor;
    // let cursor = "";

    // New transaction updates since "cursor"
    let added: Transaction[] = [];
    let modified: Transaction[] = [];
    // Removed transaction ids
    let removed: RemovedTransaction[] = [];
    let accounts: AccountBase[] = [];
    let hasMore = true;

    // 2) Fetch all the transactions since the last cursor
    while (hasMore) {
      const request: TransactionsSyncRequest = {
        access_token,
        cursor,
      };
      const response = await plaidClient.transactionsSync(request);
      const data = response.data;

      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      accounts = data.accounts;
      hasMore = data.has_more;
      cursor = data.next_cursor;
    }

    updateAccounts(accounts, item_id, user);

    // Adds transactions to the database
    await syncTransactionsToDatabase({
      accounts,
      added,
      modified,
      removed,
      cursor,
      user,
    });

    return NextResponse.json({ cursor });
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Error fetching transactions", details: error.message },
      { status: 500 }
    );
  }
}

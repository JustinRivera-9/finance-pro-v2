import {
  updateAccounts,
  updateTransactions,
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
    // 1) Fetch the most recent cursor from the database
    let cursor = transaction_cursor;

    // New transaction updates since "cursor"
    let added: Array<Transaction> = [];
    let modified: Array<Transaction> = [];
    // Removed transaction ids
    let removed: Array<RemovedTransaction> = [];
    let hasMore = true;
    let accounts: AccountBase[] = [];

    // 2) Fetch all the transactions since the last cursor
    while (hasMore) {
      const request: TransactionsSyncRequest = {
        access_token,
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

      // 6) Save the most recent cursor
      cursor = data.next_cursor;
    }

    // 3) Add new transactions to the database
    // await updateTransactions({
    //   accounts,
    //   added,
    //   modified,
    //   removed,
    //   cursor,
    //   user,
    // });

    ////////////////////////////////////////////////////////////////
    // 4) Update any modified transactions
    // 5) Do something with removed transactions

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

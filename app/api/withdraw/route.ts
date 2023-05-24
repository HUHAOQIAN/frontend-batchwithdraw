import { NextRequest, NextResponse } from "next/server";
import { withdrawalToSingleAddress } from "../../okx/batch-withdraw-okx";

export async function POST(request: NextRequest) {
  const { api, secret, passPhrase, ccy, chain, toAddress, amount } =
    await request.json();
  console.log(`api ${api}`);
  try {
    const res = await withdrawalToSingleAddress(
      api,
      secret,
      passPhrase,
      ccy,
      chain,
      toAddress,
      amount
    );
    console.log(res);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

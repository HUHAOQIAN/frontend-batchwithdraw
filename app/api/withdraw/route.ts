import { NextResponse } from "next/server";

// 这是一个示例，你应该在这里替换成你的实际批量提现逻辑
async function processWithdraw(amount: number, api: string, secret: string) {
  // 在这里调用你的提现逻辑
  console.log(`提现成功`);
  // ...
  return { message: "提现成功" };
}

export async function POST(request: Request) {
  const { amount, api, secret } = JSON.parse(await request.text());

  try {
    const result = await processWithdraw(amount, api, secret);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}

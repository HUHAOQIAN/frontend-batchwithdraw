import { okxRequest } from "./signatures";
// import fs from "fs";
import { SocksProxyAgent } from "socks-proxy-agent";
type OkxWithdraw = {
  ccy: string;
  amt: string;
  dest: "4";
  toAddr: string;
  fee: string;
  chain: string;
};

async function okxWithdraw(
  apikey: string,
  secret: string,
  passphrase: string,
  requestBodyRaw: OkxWithdraw,
  proxy?: SocksProxyAgent
) {
  const timestamp = new Date().toISOString();
  const endpointPath = "/api/v5/asset/withdrawal";

  const requestBody = JSON.stringify(requestBodyRaw);
  const res = await okxRequest(
    timestamp,
    apikey,
    secret,
    "POST",
    endpointPath,
    passphrase,
    requestBody,
    proxy
  );
  console.log(`下单成功 ${JSON.stringify(res)}`);
  return res;
}

async function getWithdrawFee( //获取自己账户余额
  apiKey: string,
  secret: string,
  passphrase: string,
  currency: string,
  chain: string,
  proxy?: SocksProxyAgent
) {
  try {
    const timestamp = new Date().toISOString();
    const endpointPath = `/api/v5/asset/currencies`;
    // const endpointPath = "/api/v5/asset/balances";
    const method = "GET";
    const datas = await okxRequest(
      timestamp,
      apiKey,
      secret,
      method,
      endpointPath,
      passphrase,
      proxy
    );
    const withdrawalFee = datas.filter((ccy: any) => {
      return ccy.ccy == currency && ccy.chain == chain; //注释掉 && 后面的 可以 看到 chain 的名字
    });
    console.log(withdrawalFee);
    console.log(withdrawalFee[0]["minFee"]);
    return withdrawalFee[0]["minFee"];
  } catch (e) {
    console.error(e);
  }
}
// async function test() {
//   const accounts = JSON.parse(
//     fs.readFileSync("okx/constants/apis-wit-sui.json", "utf-8")
//   );
//   // const apikey = process.env.API_KEY_OKX_JAZSHOW2017;
//   // const secret = process.env.SECRET_KEY_OKX_JAZZSHOW2017;
//   // const passphrase = process.env.PASSPHRASE_OKX_JAZZSHOW2017;
//   const apikey = accounts[0]["api"];
//   const secret = accounts[0]["secret"];
//   const suiAddress = accounts[0]["suiAddress"];
//   const passphrase = process.env.API_PASSWORD_OKX!;
//   const proxyUrl = accounts[0]["proxy"];
//   const proxy = new SocksProxyAgent(proxyUrl);
//   const ccy = "SUI";
//   const chain = "SUI-SUI";
//   const fee = await getWithdrawFee(
//     apikey!,
//     secret!,
//     passphrase!,
//     ccy,
//     chain,
//     proxy
//   );
//   const requestBodyRaw: OkxWithdraw = {
//     ccy: ccy,
//     amt: "0.1",
//     dest: "4",
//     toAddr: suiAddress,
//     fee: fee,
//     chain: chain,
//   };
//   await okxWithdraw(apikey!, secret!, passphrase!, requestBodyRaw, proxy);
// }
// test();

export async function withdrawalToSingleAddress(
  apiKey: string,
  secret: string,
  passphrase: string,
  ccy: string,
  chain: string,
  toAddr: string,
  amt: string
) {
  const fee = await getWithdrawFee(apiKey, secret, passphrase, ccy, chain);
  const requestBodyRaw: OkxWithdraw = {
    ccy: ccy,
    amt: amt,
    dest: "4",
    toAddr: toAddr,
    fee: fee,
    chain: chain,
  };
  const res = await okxWithdraw(apiKey, secret, passphrase, requestBodyRaw);
  return res;
}

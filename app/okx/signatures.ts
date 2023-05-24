import { SocksProxyAgent } from "socks-proxy-agent";
import crypto from "crypto";
import axios from "axios";
export type HeadersOkx = {
  "Content-Type": "application/json";
  "OK-ACCESS-KEY": string;
  "OK-ACCESS-SIGN": string;
  "OK-ACCESS-TIMESTAMP": string;
  "OK-ACCESS-PASSPHRASE": string;
};

export function signatureOkx(
  timestamp: string,
  secret: string,
  method: string,
  endpointPath: string,
  requestBody?: string
) {
  const strForSign = timestamp + method + endpointPath + (requestBody || "");
  // const strForSign = timestamp + method + endpointPath + requestBody;
  const hmac = crypto.createHmac("sha256", secret);
  const signature = hmac.update(strForSign).digest("base64");
  return signature;
}

export async function okxRequest(
  timestamp: string,
  apiKey: string,
  secret: string,
  method: string,
  endpointPath: string,
  passphrase: string,
  requestBody?: any, // 修改参数类型
  proxy?: SocksProxyAgent
) {
  const signature = signatureOkx(
    timestamp,
    secret,
    method,
    endpointPath,
    method === "POST" ? requestBody : undefined // 根据方法传入 requestBody 或 undefined
  );
  const headers: HeadersOkx = {
    "Content-Type": "application/json",
    "OK-ACCESS-KEY": apiKey,
    "OK-ACCESS-SIGN": signature,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": passphrase,
  };
  const url = `https://aws.okx.com${endpointPath}`;
  const res = await axios.request({
    url: url,
    method: method,
    headers: headers,
    data: method === "POST" ? requestBody : undefined, // 根据方法为 data 赋值或保持为 undefined
    httpAgent: proxy,
    httpsAgent: proxy,
  });
  if (res.data.code != "0") {
    throw Error(res.data.msg);
  }
  return res.data.data;
}

"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
const Withdraw: React.FC = () => {
  const [api, setApi] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [passPhrase, setPassPhrase] = useState<string>("");
  const [ccy, setCcy] = useState<string>("");
  const [chain, setChain] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        body: JSON.stringify({
          api: api,
          secret: secret,
          passPhrase: passPhrase,
          ccy: ccy,
          chain: chain,
          toAddress: toAddress,
          amount: amount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setStatus(`${res}`);
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          <label>
            API:
            <input
              className="form-input"
              type="text"
              value={api}
              onChange={(e) => handleInputChange(e, setApi)}
            />
          </label>
        </div>
        <div>
          {" "}
          <label>
            SECRET:
            <input
              className="form-input"
              type="password"
              value={secret}
              onChange={(e) => handleInputChange(e, setSecret)}
            />
          </label>
        </div>
        <div>
          {" "}
          <label>
            PASSPHRASE:
            <input
              className="form-input"
              type="password"
              value={passPhrase}
              onChange={(e) => handleInputChange(e, setPassPhrase)}
            />
          </label>
        </div>
        <div>
          {" "}
          <label>
            提现金额:
            <input
              type="number"
              value={amount}
              onChange={(e) => handleInputChange(e, setAmount)}
            />
          </label>
        </div>
        <div>
          {" "}
          <label>
            Ccy:
            <input
              type="text"
              value={ccy}
              onChange={(e) => handleInputChange(e, setCcy)}
            />
          </label>
        </div>
        <div>
          {" "}
          <label>
            Chain:
            <input
              type="text"
              value={chain}
              onChange={(e) => handleInputChange(e, setChain)}
            />
          </label>
        </div>
        <div>
          {" "}
          <label>
            toAddress:
            <input
              type="text"
              value={toAddress}
              onChange={(e) => handleInputChange(e, setToAddress)}
            />
          </label>
        </div>
        <div>
          {" "}
          <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
            提现
          </button>
        </div>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Withdraw;

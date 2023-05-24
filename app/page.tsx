"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

const Withdraw: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [api, setApi] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [ccy, setCcy] = useState<string>("");
  const [chain, setChain] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/withdraw", {
        method: "POST",
        body: JSON.stringify({ amount, api, secret }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setStatus(data.message);
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
        <label>
          API:
          <input
            type="text"
            value={api}
            onChange={(e) => handleInputChange(e, setApi)}
          />
        </label>
        <label>
          Secret:
          <input
            type="password"
            value={secret}
            onChange={(e) => handleInputChange(e, setSecret)}
          />
        </label>
        <label>
          提现金额:
          <input
            type="number"
            value={amount}
            onChange={(e) => handleInputChange(e, setAmount)}
          />
        </label>
        <label>
          Ccy:
          <input
            type="text"
            value={ccy}
            onChange={(e) => handleInputChange(e, setCcy)}
          />
        </label>
        <label>
          Chain:
          <input
            type="text"
            value={chain}
            onChange={(e) => handleInputChange(e, setChain)}
          />
        </label>
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          提现
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Withdraw;

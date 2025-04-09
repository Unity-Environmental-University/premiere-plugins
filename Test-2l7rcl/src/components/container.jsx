import React, { useState } from "react";
import { Content } from "./content";
import { Footer } from "./footer";
import { Header } from "./header";
import { FileProcessor } from "./fileProcessor";

export const Container = () => {
  const [message, setMessage] = useState([]);

  const writeToConsole = (consoleMessage) => {
    setMessage((prevMessage) => [...prevMessage, consoleMessage]);
  };

  const clearConsole = () => {
    setMessage([]);
  };

  return (
    <>
      <div className="plugin-container">
        <Header />
        <FileProcessor />
        <Content message={message} />
        <Footer writeToConsole={writeToConsole} clearConsole={clearConsole} />
      </div>
      <style>
        {`
    .plugin-container {
  color: white;
  padding: 0 16px;
  }
    `}
      </style>
    </>
  );
};

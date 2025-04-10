import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { FileProcessor } from "./fileProcessor";
import "./container.css"

export const Container = () => {

  return (
    <>
      <div className="plugin-container">
        <Header />
        <div className="wrapper"></div>
        <FileProcessor />
        <Footer />
      </div>
    </>
  );
};

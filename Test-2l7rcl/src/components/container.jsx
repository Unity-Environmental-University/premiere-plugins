import React, { useEffect, useState } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { FileProcessor } from "./fileProcessor";
import "./container.css"

export const Container = () => {
  const [isFileProcessed, setIsFileProcessed] = useState(false)

  useEffect(() => {
    console.log("File Processed Status:", isFileProcessed);
  }, [isFileProcessed]);

  return (
    <>
      <div className="plugin-container">
        <Header />
        <div className="wrapper"></div>
        <FileProcessor setIsFileProcessed={setIsFileProcessed}/>
        <Footer isFileProcessed={isFileProcessed}/>
      </div>
    </>
  );
};

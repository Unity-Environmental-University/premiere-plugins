import React, { useEffect, useState } from "react";
import { StatusComplete } from "./statusComplete";
import { Header } from "./header";
import { FileProcessor } from "./fileProcessor";
import "./container.css"

export const Container = () => {
  const [isFileProcessed, setIsFileProcessed] = useState(false)

  useEffect(() => {
    console.log("File Processed Status:", isFileProcessed);
  }, [isFileProcessed]);

  // conditionally render the footer component when isFileProcessed is truthy
  // in Footer, render a button or icon to indicate success
  // use setTimeOut method to reset button/icon for accurate user validation

  return (
    <>
      <div className="plugin-container">
        <Header />
        <FileProcessor setIsFileProcessed={setIsFileProcessed}/>
        {!isFileProcessed ? (
        <StatusComplete />
    ) : null }
      </div>
    </>
  );
};

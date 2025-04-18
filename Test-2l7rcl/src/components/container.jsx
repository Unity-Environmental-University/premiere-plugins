import React, { useEffect, useState } from "react";
import { StatusComplete } from "./statusComplete";
import { StatusIncomplete } from "./statusIncomplete";
import { Header } from "./header";
import { FileProcessor } from "./fileProcessor";
import "./container.css"


export const Container = () => {
  const [isFileProcessed, setIsFileProcessed] = useState(false)
  const [errorOccurred, setErrorOccurred] = useState(false)

  useEffect(() => {
    console.log("File Processed Status:", isFileProcessed);
    console.log("Error Occurred:", errorOccurred);
  }, [isFileProcessed, errorOccurred]);

  return (
    <>
      <div className="plugin-container">
        <Header />
        <FileProcessor setIsFileProcessed={setIsFileProcessed} setErrorOccurred={setErrorOccurred}/>
        {errorOccurred ? <StatusIncomplete /> : isFileProcessed ? <StatusComplete /> : null}
      </div>
    </>
  );
};

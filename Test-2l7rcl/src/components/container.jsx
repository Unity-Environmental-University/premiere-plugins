import React, { useState } from "react";
import { StatusComplete } from "./statusComplete";
import { StatusIncomplete } from "./statusIncomplete";
import { Header } from "./header";
import { FileProcessor } from "./fileProcessor";
import "./container.css"

export const Container = () => {
  const [isFileProcessed, setIsFileProcessed] = useState(false)
  const [errorOccurred, setErrorOccurred] = useState(false)

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

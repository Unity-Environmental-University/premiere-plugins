import React, { useState } from "react";
import { StatusComplete } from "./statusComplete";
import { StatusIncomplete } from "./statusIncomplete";
import { Header } from "./header";
import { FileProcessor } from "./fileProcessor";
import { OutputFolderSettings } from "./outputFolderSettings";
import "./container.css"

export const Container = () => {
  const [isFileProcessed, setIsFileProcessed] = useState(false)
  const [errorOccurred, setErrorOccurred] = useState(false)

  return (
    <>
      <div>
        <Header />
        <div className="plugin-container">
        <OutputFolderSettings />
        <FileProcessor setIsFileProcessed={setIsFileProcessed} setErrorOccurred={setErrorOccurred}/>
        {errorOccurred ? <StatusIncomplete /> : isFileProcessed ? <StatusComplete /> : null}
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { BatchStatus } from "./batchStatus";
import { Header } from "./header";
import { FileProcessor } from "./fileProcessor";
import { OutputFolderSettings } from "./outputFolderSettings";
import "./container.css"

export const Container = () => {
  const [batchResult, setBatchResult] = useState(null);

  // auto-hide status after 5s only when fully successful
  useEffect(() => {
    if (!batchResult) return;
    if (batchResult.status !== 'success') return;
    const t = setTimeout(() => setBatchResult(null), 5000);
    return () => clearTimeout(t);
  }, [batchResult]);

  return (
    <>
      <div>
        <Header />
        <div className="plugin-container">
        <OutputFolderSettings />
        <FileProcessor onBatchComplete={setBatchResult}/>
        <BatchStatus result={batchResult} />
        </div>
      </div>
    </>
  );
};

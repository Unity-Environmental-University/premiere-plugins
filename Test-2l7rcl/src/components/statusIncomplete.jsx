import React from "react";
import { AlertCircleIcon } from "./alertCircle";

export const StatusIncomplete = () => {
  return (
      <div className="status-complete-container">
         <sp-body>Error processing file</sp-body>
        <div className="icon-container">
          <AlertCircleIcon fillColor="#A30B00" className="checkmark"/>
        </div>
      </div>
  );
};

import React from "react";
import { CheckmarkCircleIcon } from "./checkMarkCircle";

export const StatusComplete = () => {
  return (
      <div className="status-complete-container">
         <sp-body>Complete</sp-body>
        <div className="icon-container">
          <CheckmarkCircleIcon fillColor="#008729" className="checkmark"/>
        </div>
      </div>
  );
};

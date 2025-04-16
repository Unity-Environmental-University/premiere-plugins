import React from "react";
import "./footer.css";

export const Footer = ({isFileProcessed}) => {
  console.log("inside FOOTER", isFileProcessed)

  if(isFileProcessed) {
    // change the value to 100
  }

  return (
    <sp-body>
      <div className="plugin-footer">
        <sp-detail>Completion Status</sp-detail>
        <sp-progressbar max={100} value={isFileProcessed ? 100 : 0}>
          <sp-label slot="label">Uploading...</sp-label>
        </sp-progressbar>
      </div>
    </sp-body>
  );
};

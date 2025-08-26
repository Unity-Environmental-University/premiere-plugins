import React from 'react';

export const FolderIcon = ({ fillColor = "#FFFFFF" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="18"
    width="18"
    viewBox="0 0 18 18"
  >
    <title>Folder</title>
    <rect id="Canvas" fill="none" opacity="0" width="18" height="18" />
    <path
      style={{ fill: fillColor }}
      d="M16.5,4l-7.166.004-1.65-1.7A1,1,0,0,0,6.9645,2H2A1,1,0,0,0,1,3V14.5a.5.5,0,0,0,.5.5h15a.5.5,0,0,0,.5-.5V4.5A.5.5,0,0,0,16.5,4ZM2,3H6.9645L8.908,5H2Z"
    />
  </svg>
);
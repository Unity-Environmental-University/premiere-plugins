import React, { useState } from "react";
import './fileProcessor.css'

function FileProcessor() {
    const [text, setText] = useState('');

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          const cleanedText = processSrt(content);
          setText(cleanedText);
        };
        reader.readAsText(file);
      }
    };
  
    const processSrt = (content) => {
      // Remove time codes and sequence numbers using regex
      return content.replace(/(\d+\n)?\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\n/g, '');
    };
  
    const downloadTxtFile = () => {
      const blob = new Blob([text], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'captions.txt';
      link.click();
    };
  
    return (
      <div>
        <label>Choose an SRT file</label>
        <input type="file" accept=".srt" onChange={handleFileUpload} />
        <sp-button onClick={downloadTxtFile} disabled={!text}>Download TXT</sp-button>
      </div>
    );
}

export default FileProcessor
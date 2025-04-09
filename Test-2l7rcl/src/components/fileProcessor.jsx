import React from 'react';
const fs = require('uxp').storage.localFileSystem;

export const FileProcessor = () => {
  const selectAndReadFile = async () => {
    try {
      // Prompt user to select a file
      const file = await fs.getFileForOpening({ types: ['srt'] });
      if (!file) {
        console.log('No file selected');
        return;
      }

      // Read the file content
      const content = await file.read();
      const cleanedText = processSrt(content);
      console.log(cleanedText);
    } catch (error) {
      console.error('Error selecting or reading file:', error);
    }
  };

  const processSrt = (content) => {
    return content.replace(/(\d+\n)?\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\n/g, '');
  };

  return (
    <div>
      <button onClick={selectAndReadFile}>Select SRT File</button>
    </div>
  );
}

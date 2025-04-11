import React from 'react';
import "./fileProcessor.css"

const fsProvider = require('uxp').storage.localFileSystem;


export const FileProcessor = () => {
  const convertSrtToTxt = async () => {
    try {
      // select a file
      const file = await fsProvider.getFileForOpening({ types: ['srt'] });
      if (!file) {
        console.log('No file selected');
        return;
      }

      // read file content
      const content = await file.read();
      const middleMan = content
      const cleanedText = processSrt(middleMan);
      console.log("CLEANED TEXT", cleanedText);

   // select a location to save TXT file
      const txtFile = await fsProvider.getFileForSaving('cleaned_subtitles.txt', { types: ['txt'] });
      console.log(`File content: ${txtFile}`);
      if (!txtFile) {
        console.log('No location selected to save the file');
        return;
      }

      await txtFile.write(cleanedText);
      console.log('File saved successfully');
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  // strip sequence numbers and timecode
  const processSrt = (content) => {
    console.log("BEFORE", content);
  
    let processedContent = content
      .replace(/(?:\r?\n)?^\d+\r?\n/gm, '')  // remove sequence numbers
      .replace(/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\r?\n/gm, '')  // remove timecodes
      .replace(/^\s*[\r\n]+/gm, '')  // remove any empty lines left
      .trim();
    console.log("AFTER", processedContent);
    return processedContent;
  };

  return (
    <div className="plugin-content">
      <sp-button onClick={convertSrtToTxt}>Select SRT File</sp-button>
    </div>
  );
}

import React, { useEffect } from 'react';
const fsProvider = require('uxp').storage.localFileSystem;


export const FileProcessor = () => {
  const selectAndReadFile = async () => {
    try {
      // selects a file
      // const file = await fsProvider.getEntryForPersistentToken(token);

      const file = await fsProvider.getFileForOpening({ types: ['srt'] });
      if (!file) {
        console.log('No file selected');
        return;
      }

      // reads file content
      const content = await file.read();
      const middleMan = content
      const cleanedText = processSrt(middleMan);
      console.log("CLEANED TEXT", cleanedText);

   // selects a location to save TXT file
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

  // useEffect(() => {
  //   const testString = `1\n00:00:00,458 --> 00:00:03,461\nWhat if you could see the world through an animal's eyes?\n\n2\n00:00:03,545 --> 00:00:07,382\nImagine understanding not just what they do, but why they do it.\n\n3\n00:00:07,674 --> 00:00:12,137\nAnd using that knowledge to build trust, improve care and enhance their wellbeing.\n`;
  //   console.log("Test String Before:", testString);
  //   const result = processSrt(testString);
  //   console.log("Test String After:", result);
  // }, []);
  
  // strips sequence numbers and timecode
  const processSrt = (content) => {
    console.log("BEFORE", content)
    let processedContent = content
    .replace(/^\d+\n/gm, '')
    .replace(/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\n/g, '')
    .replace(/^\s*[\r\n]/gm, '')
    .trim();
    console.log("AFTER", processedContent)
    return processedContent
  };

  // console.log(cleanedText, "Cleaned Text")

  return (
    <div>
      <button onClick={selectAndReadFile}>Select SRT File</button>
    </div>
  );
}

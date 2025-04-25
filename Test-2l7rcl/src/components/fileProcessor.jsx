import React from 'react';
import "./fileProcessor.css"
import { FileAddIcon } from './fileAdd';

const fsProvider = require('uxp').storage.localFileSystem;

export const FileProcessor = ({ setIsFileProcessed, setErrorOccurred }) => {
  
  const convertSrtToTxt = async () => {
    try {
      // select an SRT file
      const file = await fsProvider.getFileForOpening({ types: ['srt'] });
      if (!file) {
        console.log('No file selected');
        return;
      }

      // store file name with extension removed
      const fileNameWithoutExtention = file.name.replace(/.srt$/, '').replace(/.mp4$/, '');
      // read file content
      const content = await file.read();
      // remove SRT formatting
      const cleanedText = processSrt(content);

      if(cleanedText) {
        setIsFileProcessed(true)
      }

      setTimeout(() => {
        setIsFileProcessed(false)
      }, 5000)
    
      // use original filename for default save name
      const txtFileName = `${fileNameWithoutExtention}`;

      // select a location to save TXT file
      const txtFile = await fsProvider.getFileForSaving(txtFileName, { types: ['txt'] });
      console.log(`File content: ${txtFile}`);
      if (!txtFile) {
        console.log('No location selected to save the file');
        return;
      }

      await txtFile.write(cleanedText);
      console.log('File saved successfully');
    } catch (error) {
      setErrorOccurred(true);
      console.error('Error processing file:', error);
    }
    
    setTimeout(() => {
      setErrorOccurred(false);
    }, 5000);
  };

  // strip sequence numbers and timecode
  const processSrt = (content) => {

    let processedContent = content
      .replace(/(?:\r?\n)?^\d+\r?\n/gm, '')  // remove sequence numbers
      .replace(/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\r?\n/gm, '')  // remove timecodes
      .replace(/^\s*[\r\n]+/gm, '')  // remove any empty lines left
      .trim();
    return processedContent;
  };

  return (
    <div className="plugin-content">
      <div className='import-icon-container'>
        <FileAddIcon />
      </div>
      <sp-button onClick={convertSrtToTxt}>
        Select SRT
      </sp-button>
    </div>
  );
}

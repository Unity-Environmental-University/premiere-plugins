import React from 'react';
import "./fileProcessor.css"
import { FileAddIcon } from './fileAdd';
import { processSrt } from '../utils/processSrt';

const fsProvider = require('uxp').storage.localFileSystem;
 // Adobe File System Provider Docs: https://developer.adobe.com/xd/uxp/uxp/reference-js/Modules/uxp/Persistent%20File%20Storage/FileSystemProvider/

export const FileProcessor = ({ setIsFileProcessed, setErrorOccurred }) => {
  
  const convertSrtToTxt = async () => {
    try {
      // select an SRT file
      const file = await fsProvider.getFileForOpening({ types: ['srt'] });
      if (!file) {
        console.log('No file selected');
        return;
      }

      "Template_Timeline_01.mp4.srt" // remove

      // store file name with extension removed
      const fileNameWithoutExtention = file.name.replace(/\.mp4\.srt$/, '')
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

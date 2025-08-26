import React from 'react';
import "./fileProcessor.css"
import { FileAddIcon } from './fileAdd';
import { processSrt } from '../utils/processSrt';
import { resolveDefaultOutputFolder } from '../utils/settings';

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

      // derive base name by stripping .srt and optional trailing .mp4
      const fileNameBase = file.name
        .replace(/\.srt$/i, '')
        .replace(/\.mp4$/i, '');
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
    
      // Try default output folder first; fall back to Save dialog
      const targetName = `${fileNameBase}.txt`;
      try {
        const folder = await resolveDefaultOutputFolder();
        if (folder && typeof folder.createFile === 'function') {
          const txtFile = await folder.createFile(targetName, { overwrite: true });
          await txtFile.write(cleanedText);
          console.log('File saved to default folder:', targetName);
        } else {
          const txtFile = await fsProvider.getFileForSaving(targetName);
          if (!txtFile) {
            console.log('No location selected to save the file');
            return;
          }
          await txtFile.write(cleanedText);
          console.log('File saved:', targetName);
        }
      } catch (saveErr) {
        setErrorOccurred(true);
        console.error('Error saving file:', saveErr);
      }
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

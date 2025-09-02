import React from 'react';
import "./fileProcessor.css"
import { FileAddIcon } from './fileAdd';
import { processSrt } from '../utils/processSrt';
import { resolveDefaultOutputFolder, chooseAndStoreDefaultOutputFolder } from '../utils/settings';

const fsProvider = require('uxp').storage.localFileSystem;
 // Adobe File System Provider Docs: https://developer.adobe.com/xd/uxp/uxp/reference-js/Modules/uxp/Persistent%20File%20Storage/FileSystemProvider/

export const FileProcessor = ({ onBatchComplete }) => {
  
  const convertSrtToTxt = async () => {
    try {
      // let user select one or multiple SRT files
      const selection = await fsProvider.getFileForOpening({ types: ['srt'], allowMultiple: true });
      if (!selection || (Array.isArray(selection) && selection.length === 0)) {
        console.log('No file selected');
        return;
      }

      const files = Array.isArray(selection) ? selection : [selection];

      // resolve output folder once; if none set, prompt once to choose and persist
      let outputFolder = await resolveDefaultOutputFolder();
      if (!outputFolder) {
        try {
          outputFolder = await chooseAndStoreDefaultOutputFolder();
        } catch (e) {
          // user may cancel; we'll fall back to per-file save dialog below
          outputFolder = null;
        }
      }

      let successCount = 0;
      let errorCount = 0;

      if (outputFolder && typeof outputFolder.createFile === 'function') {
        // process and save concurrently into the chosen/default folder
        await Promise.all(
          files.map(async (file) => {
            try {
              const fileNameBase = file.name
                .replace(/\.srt$/i, '')
                .replace(/\.mp4$/i, '');
              const content = await file.read();
              const cleanedText = processSrt(content);
              const targetName = `${fileNameBase}.txt`;
              const txtFile = await outputFolder.createFile(targetName, { overwrite: true });
              await txtFile.write(cleanedText);
              console.log('Saved to folder:', targetName);
              successCount += 1;
            } catch (err) {
              console.error('Error processing/saving file:', file && file.name, err);
              errorCount += 1;
            }
          })
        );
      } else {
        // fallback: prompt save location per file
        for (const file of files) {
          try {
            const fileNameBase = file.name
              .replace(/\.srt$/i, '')
              .replace(/\.mp4$/i, '');
            const content = await file.read();
            const cleanedText = processSrt(content);
            const targetName = `${fileNameBase}.txt`;
            const txtFile = await fsProvider.getFileForSaving(targetName);
            if (!txtFile) {
              console.log('No location selected to save the file');
              errorCount += 1;
              continue;
            }
            await txtFile.write(cleanedText);
            console.log('File saved:', targetName);
            successCount += 1;
          } catch (err) {
            console.error('Error processing/saving file:', file && file.name, err);
            errorCount += 1;
          }
        }
      }

      const total = files.length;
      const status = successCount === 0 ? 'error' : (errorCount === 0 ? 'success' : 'partial');
      if (typeof onBatchComplete === 'function') {
        onBatchComplete({ total, success: successCount, failed: errorCount, status });
      }
    } catch (error) {
      console.error('Error processing file:', error);
      if (typeof onBatchComplete === 'function') {
        onBatchComplete({ total: 0, success: 0, failed: 0, status: 'error' });
      }
    }
  };

  return (
    <div className="plugin-content">
      <div className='import-icon-container'>
        <FileAddIcon />
      </div>
      <sp-button onClick={convertSrtToTxt}>
        Select SRT Files
      </sp-button>
    </div>
  );
}

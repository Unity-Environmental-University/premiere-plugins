import React, { useEffect, useState } from 'react';
import './outputFolderSettings.css';
import {
  resolveDefaultOutputFolder,
  chooseAndStoreDefaultOutputFolder,
  clearDefaultOutputFolderToken,
} from '../utils/settings';
import { FolderIcon } from "./openFolder";

export const OutputFolderSettings = () => {
  const [folderName, setFolderName] = useState('');
  const [hasFolder, setHasFolder] = useState(false);

  const refresh = async () => {
    const folder = await resolveDefaultOutputFolder();
    if (folder) {
      setFolderName(folder.name || '(selected folder)');
      setHasFolder(true);
    } else {
      setFolderName('');
      setHasFolder(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onChoose = async () => {
    const folder = await chooseAndStoreDefaultOutputFolder();
    if (folder) {
      setFolderName(folder.name || '(selected folder)');
      setHasFolder(true);
    }
  };

  const onClear = async () => {
    clearDefaultOutputFolderToken();
    await refresh();
  };

  return (
    <div className="settings-card">
      <div className="settings-row">
        <div className="default-output-container">
          <p className="default-output">Default Output Folder:</p>
          <div className="settings-subtle">
            {hasFolder ? folderName : 'Not set'}
          </div>
        </div>
        <div className="folder-selection-container">
          <div className="icon-container">
            <FolderIcon />
          </div>
          <sp-button onClick={onChoose}>
            Select Folder
          </sp-button>
          {hasFolder ? (
            <sp-button
              variant="secondary"
              style={{ marginLeft: 8 }}
              onClick={onClear}
            >
              Clear
            </sp-button>
          ) : (
            <sp-button
              variant="secondary"
              style={{ marginLeft: 8 }}
              disabled
            >
              Clear
            </sp-button>
          )}
        </div>
      </div>
    </div>
  );
};

  // strip sequence numbers and timecode from srt file
export const processSrt = (content) => {

    let processedContent = content
      .replace(/^(\r?\n|)\d+\r?\n/gm, '')  // remove sequence numbers
      .replace(/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\r?\n/gm, '')  // remove timecodes
      .replace(/^\s*[\r\n]+/gm, '')  // remove any empty lines left
      .trim();
    return processedContent;
  };
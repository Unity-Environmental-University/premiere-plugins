  // strip sequence numbers and timecode from srt file
  export function processSrt(srtText) {
    // normalize Windows line endings to Unix style.
    const normalizedText = srtText.replace(/\r\n/g, "\n");

    // process the normalized text:
    return normalizedText
        .split("\n")
        .filter(line => {
            // filter out sequence numbers:
            if (/^\d+$/.test(line)) return false;
            // filter out timecode lines:
            if (/^\d{2}:\d{2}:\d{2}[,\.]\d{3}\s*-->/i.test(line)) return false;
            return line.trim() !== "";
        })
        .join("\n")
        .trim();
}
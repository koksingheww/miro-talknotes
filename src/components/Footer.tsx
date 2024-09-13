import React from "react";
import { Button, Icon } from "mirotone-react";
import styles from "./Footer.module.css";

interface FooterProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onLocateText: () => void;
  onCreateStickyNote: () => void;
}

const Footer: React.FC<FooterProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  onLocateText,
  onCreateStickyNote,
}) => {
  return (
    <div className={styles.footer}>
      {!isRecording ? (
        <>
          <Button size="large" variant="primary" onClick={onStartRecording}>
            <Icon name="mic-on" />
          </Button>
          {/* Add the new button here */}
          <Button
            onClick={onCreateStickyNote}
            className={styles.stickyNoteButton}
          >
            Create Sticky Note
          </Button>
        </>
      ) : (
        <>
          <Button onClick={onStopRecording} className={styles.stopButton}>
            Stop Recording
          </Button>
          <Button onClick={onLocateText} className={styles.locateButton}>
            Locate Text
          </Button>
        </>
      )}
    </div>
  );
};

export default Footer;

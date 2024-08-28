import React from "react";
import { Button, Icon } from "mirotone-react";
import styles from "./Footer.module.css";

interface FooterProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onLocateText: () => void;
}

const Footer: React.FC<FooterProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  onLocateText,
}) => {
  return (
    <div className={styles.footer}>
      {!isRecording ? (
        <>
          {/* this is the record button */}
          <Button size="large" variant="primary" onClick={onStartRecording}>
            <Icon name="mic-on" />
          </Button>
          {/* <Tag className={styles.tagButton}>
            <TagButton icon="activity" />
            <Text>Ask AI</Text>
          </Tag>
          <Tag className={styles.tagButton}>
            <TagButton icon="star" />
            <Text>Brainstorm ideas</Text>
          </Tag>
          <Tag className={styles.tagButton}>
            <TagButton icon="edit" />
            <Text>Draft an outline</Text>
          </Tag> */}
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

import React from "react";
import { Button } from "mirotone-react";
import styles from "./Header.module.css";

interface HeaderProps {
  isRecording: boolean;
  onStopRecording: () => void;
  onLocateText: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isRecording,
  onStopRecording,
  onLocateText,
}) => {
  if (!isRecording) return null;

  return (
    <div className={styles.header}>
      <Button onClick={onStopRecording} className={styles.stopButton}>
        Stop Recording
      </Button>
      <Button onClick={onLocateText} className={styles.locateButton}>
        Locate Text
      </Button>
    </div>
  );
};

export default Header;

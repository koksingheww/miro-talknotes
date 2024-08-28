"use client";

import React, { useState } from "react";
import { Button } from "mirotone-react";
import styles from "./TalkNotes.module.css";

const TalkNotes: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual recording logic
  };

  const handleSendToMiro = () => {
    // TODO: Implement sending notes to Miro board
  };

  return (
    <div className={styles.talkNotes}>
      <div className={styles.notesContainer}>
        <textarea
          className={styles.notesTextarea}
          placeholder="Your notes will appear here..."
          readOnly
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={handleToggleRecording}
          className={`${styles.recordButton} ${
            isRecording ? styles.recordingButton : ""
          }`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        <Button onClick={handleSendToMiro} className={styles.sendButton}>
          Send to Miro
        </Button>
      </div>
    </div>
  );
};

export default TalkNotes;

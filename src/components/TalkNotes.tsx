"use client";

import React, { useState } from "react";
import { TextArea } from "mirotone-react";
import styles from "./TalkNotes.module.css";
import Footer from "./Footer";

const TalkNotes: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Implement actual recording logic
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Implement stop recording logic
  };

  const handleLocateText = () => {
    // TODO: Implement locate text logic
  };

  return (
    <div className={styles.talkNotes}>
      <div className={styles.notesContainer}>
        <TextArea
          className={styles.notesTextarea}
          placeholder="Your notes will appear here..."
        />
      </div>
      <Footer
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        onLocateText={handleLocateText}
      />
    </div>
  );
};

export default TalkNotes;

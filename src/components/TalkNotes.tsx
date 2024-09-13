"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { TextArea } from "mirotone-react";
import styles from "./TalkNotes.module.css";
import Footer from "./Footer";

type AudioResources = {
  stream: MediaStream;
  audioContext: AudioContext;
  source: MediaStreamAudioSourceNode;
  processor: ScriptProcessorNode;
} | null;

const TalkNotes: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioResources, setAudioResources] = useState<AudioResources>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      const segments = data.segments;
      if (segments && segments.length > 0) {
        const newText = segments.map((seg: any) => seg.text).join(" ");
        if (textareaRef.current) {
          const currentValue = textareaRef.current.value;
          const updatedTranscription = (currentValue + " " + newText).trim();
          textareaRef.current.value = updatedTranscription;
          console.log("Transcription updated:", updatedTranscription);
        }
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  }, []);

  console.log("isRecording", isRecording);

  useEffect(() => {
    let stream: MediaStream;
    let audioContext: AudioContext;
    let source: MediaStreamAudioSourceNode;
    let processor: ScriptProcessorNode;
    let ws: WebSocket | null = null;

    const startAudioCapture = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)({
          sampleRate: 16000,
        });
        source = audioContext.createMediaStreamSource(stream);
        processor = audioContext.createScriptProcessor(4096, 1, 1);

        ws = new WebSocket("ws://localhost:9090");

        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              uid: crypto.randomUUID(),
              language: "en",
              model: "small",
              task: "transcribe",
              use_vad: true,
            })
          );
        };

        ws.onerror = (error) => console.error("WebSocket Error:", error);
        ws.onmessage = handleWebSocketMessage;

        setSocket(ws);

        source.connect(processor);
        processor.connect(audioContext.destination);

        processor.onaudioprocess = function (e: AudioProcessingEvent) {
          const inputData = e.inputBuffer.getChannelData(0);
          const buffer = new Float32Array(inputData);
          ws.send(buffer);
        };

        setAudioResources({
          stream,
          audioContext,
          source,
          processor,
        });
      } catch (err) {
        console.error("The following getUserMedia error occurred: ", err);
      }
    };

    const stopAudioCapture = () => {
      if (audioResources) {
        const { stream, audioContext, source, processor } = audioResources;
        processor.disconnect();
        source.disconnect();
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        audioContext.close();
        socket?.close();
        setAudioResources(null);
      }
    };

    if (isRecording) {
      startAudioCapture();
    } else {
      stopAudioCapture();
    }

    return () => {
      stopAudioCapture();
      if (ws) {
        ws.close();
      }
    };
  }, [isRecording, handleWebSocketMessage]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleLocateText = () => {
    // TODO: Implement locate text logic
  };

  const handleCreateStickyNote = useCallback(async () => {
    if (textareaRef.current && textareaRef.current.value) {
      try {
        const viewport = await miro.board.viewport.get();
        const center = {
          x: viewport.x + viewport.width / 2,
          y: viewport.y + viewport.height / 2,
        };

        const stickyNote = await miro.board.createStickyNote({
          content: textareaRef.current.value,
          x: center.x,
          y: center.y,
        });
        console.log("Sticky note created:", stickyNote);

        await miro.board.viewport.zoomTo(stickyNote);

        await miro.board.select({ id: stickyNote.id });
      } catch (error) {
        console.error("Error creating or zooming to sticky note:", error);
      }
    } else {
      console.log("No content to create a sticky note");
    }
  }, []);

  return (
    <div className={styles.talkNotes}>
      <div className={styles.notesContainer}>
        <TextArea
          className={styles.notesTextarea}
          placeholder="Your notes will appear here..."
          ref={textareaRef}
          readOnly
        />
      </div>
      <Footer
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        onLocateText={handleLocateText}
        onCreateStickyNote={handleCreateStickyNote}
      />
    </div>
  );
};

export default TalkNotes;

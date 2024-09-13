# Miro TalkNotes

## Overview

Miro TalkNotes is an AI-powered speech-to-text application integrated with Miro, the online collaborative whiteboard platform. This tool allows users to convert spoken words into text in real-time directly on Miro boards, enhancing collaboration and idea capture during meetings and brainstorming sessions.

## Features

- Real-time speech-to-text conversion within Miro boards
- Powered by OpenAI's Whisper model via WhisperLive
- Multi-language support
- Seamless integration with Miro's existing functionality

## Technology Stack

- Frontend: React.js with TypeScript
- Backend: Node.js
- AI Model: WhisperLive (OpenAI's Whisper model)
- Integration: Miro SDK
- Real-time Communication: WebSockets

## Prerequisites

- Node.js (v14 or later)
- Docker
- Miro developer account

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/koksingheww/miro-talknotes.git
   cd miro-talknotes
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   MIRO_CLIENT_ID=your_miro_client_id
   MIRO_CLIENT_SECRET=your_miro_client_secret
   MIRO_REDIRECT_URL=your_redirect_url
   ```

4. Start the WhisperLive server using Docker:

   ```
   docker run -it --gpus all -p 9090:9090 ghcr.io/collabora/whisperlive-gpu:latest
   ```

   For CPU-only usage:

   ```
   docker run -it -p 9090:9090 ghcr.io/collabora/whisperlive-cpu:latest
   ```

5. Start the development server:
   ```
   npm run start
   ```

## Usage

1. Open a Miro board
2. Locate and activate the "TalkNotes" app in the Miro toolbar
3. Click the microphone icon to start recording
4. Speak clearly, and watch as your words appear on the Miro board in real-time
5. Click the stop button to end the recording session
6. Click the "Create Sticky Note" button to create a sticky note with the transcribed text

## Known Issues

- Transcription speed may be slower on less powerful machines due to the resource-intensive nature of the Whisper model.

## Future Improvements

- Explore cloud-based solutions for better scalability
- Implement user authentication and personalized settings

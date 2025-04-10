import { useState, useCallback } from 'react';

interface UseVoiceRecorderProps {
  onTranscript?: (text: string) => void;
  onError?: (error: string) => void;
}

export const useVoiceRecorder = ({ onTranscript, onError }: UseVoiceRecorderProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startRecording = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      onError?.('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'da-DK'; // Danish language

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      onTranscript?.(transcript);
    };

    recognition.onerror = (event) => {
      onError?.(event.error);
    };

    setRecognition(recognition);
    recognition.start();
  }, [onTranscript, onError]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  }, [recognition]);

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
}; 
import { useState, useCallback, useEffect } from 'react';

interface UseTextToSpeechProps {
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export const useTextToSpeech = ({ onError, onEnd }: UseTextToSpeechProps = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load available voices when the component mounts
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Load voices immediately if available
    loadVoices();

    // Also load voices when they become available
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback((text: string) => {
    // Cancel any ongoing speech
    if (utterance) {
      window.speechSynthesis.cancel();
    }

    // Remove English translations in parentheses
    const danishText = text.replace(/\([^)]*\)/g, '').trim();

    const newUtterance = new SpeechSynthesisUtterance(danishText);
    
    // Try to find a Danish voice
    const danishVoices = voices.filter(voice => 
      voice.lang.includes('da') || voice.lang.includes('da-DK')
    );

    // If Danish voices are available, use the first one
    if (danishVoices.length > 0) {
      newUtterance.voice = danishVoices[0];
    } else {
      // Fallback to any available voice but set the language to Danish
      newUtterance.lang = 'da-DK';
    }

    // Adjust speech parameters for better Danish pronunciation
    newUtterance.rate = 0.9; // Slightly slower rate for better pronunciation
    newUtterance.pitch = 1.0; // Normal pitch
    newUtterance.volume = 1.0; // Full volume

    newUtterance.onstart = () => {
      setIsSpeaking(true);
    };

    newUtterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };

    newUtterance.onerror = (event) => {
      setIsSpeaking(false);
      onError?.(event.error);
    };

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
  }, [utterance, voices, onError, onEnd]);

  const stop = useCallback(() => {
    if (utterance) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [utterance]);

  return {
    isSpeaking,
    speak,
    stop,
  };
}; 
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  useColorModeValue,
  Textarea,
  IconButton,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FiSend, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function Practice() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [topic, setTopic] = useState(searchParams?.get('topic') || 'greetings');
  const [duration, setDuration] = useState('5');
  const [isLoading, setIsLoading] = useState(false);
  const { isSpeaking, speak, stop } = useTextToSpeech({
    onError: (error) => {
      toast({
        title: 'Text-to-Speech Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
    onEnd: () => {
      if (isRecording) {
        stopRecording();
      }
    },
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const { isRecording, startRecording, stopRecording } = useVoiceRecorder({
    onTranscript: (text) => {
      setInput(text);
    },
    onError: (error) => {
      toast({
        title: 'Voice Recording Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const topics = [
    { value: 'greetings', label: 'Greetings & Introductions' },
    { value: 'daily-routine', label: 'Daily Routine' },
    { value: 'directions', label: 'Asking for Directions' },
    { value: 'ordering', label: 'Ordering at a Café or Restaurant' },
    { value: 'shopping', label: 'Shopping & Buying Things' },
    { value: 'airport', label: 'At the Airport' },
    { value: 'hotel', label: 'Checking into a Hotel' },
    { value: 'transport', label: 'Using Public Transport' },
    { value: 'doctor', label: 'Going to the Doctor' },
    { value: 'post-bank', label: 'At the Post Office or Bank' },
    { value: 'weather', label: 'Talking About the Weather' },
    { value: 'weekend', label: 'Weekend Plans' },
    { value: 'hobbies', label: 'Hobbies & Interests' },
    { value: 'news', label: 'Talking About the News' },
    { value: 'holidays', label: 'Holidays & Traditions' },
    { value: 'food', label: 'Danish Food & Cuisine' },
    { value: 'work-culture', label: 'Danish Work Culture' },
    { value: 'education', label: 'Danish Education System' },
    { value: 'cities', label: 'Danish Cities & Landmarks' },
    { value: 'sustainability', label: 'Sustainable Living in Denmark' },
    { value: 'storytelling', label: 'Telling a Story About Your Past' },
    { value: 'planning', label: 'Making Plans with Friends' },
    { value: 'instructions', label: 'Giving & Following Instructions' },
    { value: 'describing', label: 'Describing a Picture or Scene' },
    { value: 'interview', label: 'Roleplaying a Job Interview' },
  ];

  const durations = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' },
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (isRecording) {
      stopRecording();
    }

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(({ role, content }) => ({ role, content })),
          topic,
          skillLevel: 'BEGINNER', // TODO: Get from user profile
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Automatically speak the AI's response
      speak(data.response);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch" h="calc(100vh - 200px)">
      <Heading size="lg">Practice Danish</Heading>

      <Flex gap={4}>
        <Select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          flex={1}
        >
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>

        <Select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          flex={1}
        >
          {durations.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Select>
      </Flex>

      <Box
        flex={1}
        overflowY="auto"
        p={4}
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
      >
        {messages.length === 0 ? (
          <Text color="gray.500" textAlign="center">
            Start a conversation by typing or speaking in Danish!
          </Text>
        ) : (
          messages.map((message, index) => (
            <Box
              key={index}
              mb={4}
              p={3}
              bg={message.role === 'user' ? 'blue.50' : 'gray.50'}
              borderRadius="lg"
              maxW="80%"
              ml={message.role === 'user' ? 'auto' : '0'}
              mr={message.role === 'user' ? '0' : 'auto'}
            >
              <Flex align="center" justify="space-between">
                <Text>{message.content}</Text>
                {message.role === 'assistant' && (
                  <IconButton
                    aria-label={isSpeaking ? 'Stop speaking' : 'Speak message'}
                    icon={isSpeaking ? <FiVolumeX /> : <FiVolume2 />}
                    size="sm"
                    variant="ghost"
                    onClick={() => isSpeaking ? stop() : speak(message.content)}
                    ml={2}
                  />
                )}
              </Flex>
              <Text fontSize="xs" color="gray.500" mt={1}>
                {message.timestamp.toLocaleTimeString()}
              </Text>
            </Box>
          ))
        )}
      </Box>

      <HStack>
        <IconButton
          aria-label="Record voice"
          icon={isRecording ? <FiStopCircle /> : <FiMic />}
          onClick={isRecording ? stopRecording : startRecording}
          colorScheme={isRecording ? 'red' : 'blue'}
          isDisabled={isLoading || isSpeaking}
        />
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message in Danish..."
          resize="none"
          rows={1}
          isDisabled={isLoading || isSpeaking}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <IconButton
          aria-label="Send message"
          icon={<FiSend />}
          onClick={handleSend}
          colorScheme="blue"
          isLoading={isLoading}
          isDisabled={isSpeaking}
        />
      </HStack>
    </VStack>
  );
} 
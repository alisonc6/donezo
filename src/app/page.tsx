'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Stack,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { LinkButton } from '@/components/LinkButton';

const topics = {
  basicConversations: {
    title: 'Basic Conversations',
    items: [
      { id: 'greetings', label: 'Greetings & Introductions', description: 'Saying hello, introducing yourself, asking someone\'s name.' },
      { id: 'daily-routine', label: 'Daily Routine', description: 'Talking about your day, morning routines, work or school activities.' },
      { id: 'directions', label: 'Asking for Directions', description: 'How to ask for and understand basic directions in Danish.' },
      { id: 'ordering', label: 'Ordering at a Café or Restaurant', description: 'Ordering food and drinks, asking for recommendations.' },
      { id: 'shopping', label: 'Shopping & Buying Things', description: 'Asking for prices, sizes, and making purchases.' },
    ]
  },
  practicalSituations: {
    title: 'Practical Situations',
    items: [
      { id: 'airport', label: 'At the Airport', description: 'Basic travel phrases for checking in, customs, and boarding.' },
      { id: 'hotel', label: 'Checking into a Hotel', description: 'Booking a room, asking about amenities, and making requests.' },
      { id: 'transport', label: 'Using Public Transport', description: 'Asking about bus schedules, metro stops, and ticket prices.' },
      { id: 'doctor', label: 'Going to the Doctor', description: 'Describing symptoms, asking for medicine, and making an appointment.' },
      { id: 'post-bank', label: 'At the Post Office or Bank', description: 'Asking about sending mail, withdrawing money, and opening an account.' },
    ]
  },
  weatherAndSmallTalk: {
    title: 'Weather & Small Talk',
    items: [
      { id: 'weather', label: 'Talking About the Weather', description: 'Describing the temperature, seasons, and weather conditions.' },
      { id: 'weekend', label: 'Weekend Plans', description: 'Discussing what you\'re doing over the weekend.' },
      { id: 'hobbies', label: 'Hobbies & Interests', description: 'Talking about sports, music, movies, and favorite pastimes.' },
      { id: 'news', label: 'Talking About the News', description: 'Discussing current events in simple terms.' },
      { id: 'holidays', label: 'Holidays & Traditions', description: 'Learning about Danish holidays like Julefrokost and Sankt Hans Aften.' },
    ]
  },
  culturalAndSocial: {
    title: 'Cultural & Social Topics',
    items: [
      { id: 'food', label: 'Danish Food & Cuisine', description: 'Talking about traditional dishes like smørrebrød and frikadeller.' },
      { id: 'work-culture', label: 'Danish Work Culture', description: 'Discussing work-life balance, meetings, and office etiquette.' },
      { id: 'education', label: 'Danish Education System', description: 'Talking about schools, universities, and learning.' },
      { id: 'cities', label: 'Danish Cities & Landmarks', description: 'Learning about Copenhagen, Aarhus, and famous sights.' },
      { id: 'sustainability', label: 'Sustainable Living in Denmark', description: 'Talking about biking, recycling, and green energy.' },
    ]
  },
  conversationalChallenges: {
    title: 'Conversational Challenges',
    items: [
      { id: 'storytelling', label: 'Telling a Story About Your Past', description: 'Practicing past tense in Danish.' },
      { id: 'planning', label: 'Making Plans with Friends', description: 'Using future tense and coordinating events.' },
      { id: 'instructions', label: 'Giving & Following Instructions', description: 'Practicing imperative sentences.' },
      { id: 'describing', label: 'Describing a Picture or Scene', description: 'Improving vocabulary by describing what you see.' },
      { id: 'interview', label: 'Roleplaying a Job Interview', description: 'Practicing professional conversation skills.' },
    ]
  }
};

export default function Home() {
  const { user, isLoading } = useUser();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const toast = useToast();

  const handleTopicSelect = (topicId: string) => {
    if (!user) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to start practicing.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl" textAlign="center">
          Welcome to Danish Language Learning
        </Heading>
        <Text fontSize="xl" color={textColor} textAlign="center">
          Practice Danish through AI-powered conversations and improve your fluency
        </Text>
        
        {isLoading ? (
          <Text>Loading...</Text>
        ) : user ? (
          <VStack spacing={8} align="stretch" w="full">
            {Object.entries(topics).map(([category, { title, items }]) => (
              <Box key={category}>
                <Heading size="md" mb={4} color="danish.red">{title}</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  {items.map((topic) => (
                    <Card key={topic.id} bg={cardBgColor}>
                      <CardHeader>
                        <Stack direction="row" justify="space-between" align="center">
                          <Heading size="sm">{topic.label}</Heading>
                          <Badge colorScheme="blue">Beginner</Badge>
                        </Stack>
                      </CardHeader>
                      <CardBody>
                        <Text fontSize="sm" color={textColor}>
                          {topic.description}
                        </Text>
                      </CardBody>
                      <CardFooter>
                        <LinkButton
                          href={`/practice?topic=${topic.id}`}
                          colorScheme="blue"
                          width="100%"
                        >
                          Start Practice
                        </LinkButton>
                      </CardFooter>
                    </Card>
                  ))}
                </SimpleGrid>
              </Box>
            ))}
          </VStack>
        ) : (
          <VStack spacing={4}>
            <Text fontSize="lg" textAlign="center">
              Please log in to access all conversation topics and start practicing Danish!
            </Text>
            <LinkButton
              href="/api/auth/login"
              colorScheme="blue"
              size="lg"
            >
              Get Started
            </LinkButton>
          </VStack>
        )}
      </VStack>
    </Container>
  );
} 
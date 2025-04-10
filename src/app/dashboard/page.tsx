'use client';

import { Box, Grid, Heading, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Text, VStack, useColorModeValue, Image, Flex } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Dashboard() {
  const { user } = useUser();
  const bgColor = useColorModeValue('danish.white', 'danish.gray.800');
  const borderColor = useColorModeValue('danish.gray.200', 'danish.gray.700');

  return (
    <VStack spacing={8} align="stretch">
      <Flex align="center" justify="space-between">
        <Heading size="lg" color="danish.red">Welcome back, {user?.name}!</Heading>
        <Image
          src="/danish-flag.svg"
          alt="Danish Flag"
          width="60px"
          height="40px"
          objectFit="cover"
          borderRadius="md"
        />
      </Flex>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        <Box p={6} bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
          <Stat>
            <StatLabel color="danish.red">Overall Progress</StatLabel>
            <StatNumber>75%</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              5% from last week
            </StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
          <Stat>
            <StatLabel color="danish.red">Conversations</StatLabel>
            <StatNumber>12</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              2 new this week
            </StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
          <Stat>
            <StatLabel color="danish.red">Vocabulary</StatLabel>
            <StatNumber>450</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              25 new words
            </StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
          <Stat>
            <StatLabel color="danish.red">Grammar Score</StatLabel>
            <StatNumber>85%</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              3% improvement
            </StatHelpText>
          </Stat>
        </Box>
      </Grid>

      <Box p={6} bg={bgColor} borderWidth="1px" borderColor={borderColor} borderRadius="lg">
        <Heading size="md" mb={4} color="danish.red">Recent Activity</Heading>
        <Text>No recent conversations. Start practicing to see your progress!</Text>
      </Box>
    </VStack>
  );
} 
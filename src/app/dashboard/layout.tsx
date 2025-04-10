'use client';

import { Box, Container, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import NextLink from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box borderBottom="1px" borderColor={borderColor} py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Flex gap={8}>
              <NextLink href="/dashboard" passHref>
                <Link>Dashboard</Link>
              </NextLink>
              <NextLink href="/practice" passHref>
                <Link>Practice</Link>
              </NextLink>
              <NextLink href="/profile" passHref>
                <Link>Profile</Link>
              </NextLink>
            </Flex>
            <Flex align="center" gap={4}>
              <Text>Welcome, {user?.name}</Text>
              <NextLink href="/api/auth/logout" passHref>
                <Link>Logout</Link>
              </NextLink>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
} 
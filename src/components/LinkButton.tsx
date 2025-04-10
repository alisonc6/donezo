import { Button, ButtonProps } from '@chakra-ui/react';
import Link from 'next/link';

interface LinkButtonProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
}

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <Button {...props}>
        {children}
      </Button>
    </Link>
  );
} 
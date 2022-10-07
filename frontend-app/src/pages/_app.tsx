import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra/theme';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;

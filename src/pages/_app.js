import { ChakraProvider } from "@chakra-ui/react";
import defaultTheme from "@/theme/default";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

import React from 'react';
import Dashboard from './components/Dashboard';
import { Global } from "@emotion/react";
import {
  ChakraProvider,
  extendTheme
} from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    blue: {
      500: '#3182CE',
    },
  },
  fonts: {
    body: "'Lato', sans-serif",
  },
});
const GlobalStyles = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'),
          url(https:
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `}
  />
);



function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <Dashboard />
    </ChakraProvider>
  );
}

export default App;

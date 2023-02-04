import React from 'react';
import {
  Flex,
  Text,
  Textarea,
  Button,
  Slider,
  SliderTrack,
  SliderFileldTrack,
  SliderThumb,
  SliderMark,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

function App() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      mt={10}
      w={{ base: '95%', md: '90%', xl: '1024px' }}
      ml="auto"
      mr="auto"
    >
      <Textarea placeholder="Put your sentence here" size="lg" />
    </Flex>
  );
}

export default App;

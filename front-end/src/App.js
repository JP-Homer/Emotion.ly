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

import { AutoResizeTextarea } from './ResizableTextarea';

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
      <AutoResizeTextarea
        placeholder="Put your sentence here"
        size="lg"
        fontSize="5xl"
      />
    </Flex>
  );
}

export default App;

import React, { useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { AutoResizeTextarea } from './ResizableTextarea';

function App() {
  const [sliderValue, setSliderValue] = useState(50);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  const request = e => {
    e.preventDefault();
    console.log('Request had been sent');
  };

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

      <Button colorScheme="teal" size="lg" mt="10" onClick={request}>
        Find adjectives
      </Button>

      <Flex w="100%" mt="10">
        <Slider
          aria-label="slider-ex-6"
          onChange={val => setSliderValue(val)}
          colorScheme="teal"
          step="5"
        >
          <SliderMark value={25} {...labelStyles}>
            25%
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            50%
          </SliderMark>
          <SliderMark value={75} {...labelStyles}>
            75%
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign="center"
            bg="teal"
            color="white"
            mt="-10"
            ml="-5"
            w="12"
          >
            {sliderValue}%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    </Flex>
  );
}

export default App;

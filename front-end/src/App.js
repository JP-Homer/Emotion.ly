import React, { useState } from 'react';
import {
  Flex,
  Box,
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
import { FaAngry } from 'react-icons/fa';

import { AutoResizeTextarea } from './ResizableTextarea';

const BASE_INFO = {
  color: 'teal',
  words: {
    irate: 'Feeling or showing extreme anger',
    mad: 'Roused to anger',
  },
};

function App() {
  const [sliderValue, setSliderValue] = useState(50);
  const [scale, setScale] = useState(BASE_INFO);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'lg',
  };

  const request = e => {
    e.preventDefault();
    console.log('Request had been sent');
    console.log(scale);
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

      <Flex w="100%" mt="16" px="10">
        <Slider
          aria-label="slider-ex-6"
          onChange={val => setSliderValue(val)}
          colorScheme={scale.color}
          step="5"
        >
          <SliderMark value={10} {...labelStyles} mt={5}>
            Less Intense
          </SliderMark>
          <SliderMark value={{ base: 48, md: 46 }} {...labelStyles} mt={5}>
            Your Word
          </SliderMark>
          <SliderMark value={75} {...labelStyles} mt={5}>
            More Intense
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign="center"
            bg={scale.color}
            color="white"
            mt="-12"
            ml="-6"
            w="12"
          >
            {sliderValue}%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            position="relative"
            right={-10}
            boxSize={10}
            borderColor={scale.color}
            ml={-5}
          >
            <Box color={scale.color} as={FaAngry} />
          </SliderThumb>
        </Slider>
      </Flex>
    </Flex>
  );
}

export default App;

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
  useClipboard,
} from '@chakra-ui/react';

import { AutoResizeTextarea } from './ResizableTextarea';

const BASE_INFO = {
  base: 'anger',
  color: 'teal',
  words: {
    irate: 'Feeling or showing extreme anger',
    mad: 'Roused to anger',
  },
};

function App() {
  const [sliderValue, setSliderValue] = useState(50);
  const [data, setData] = useState();
  const [color, setColor] = useState();
  const [emoji, setEmoji] = useState();
  const [words, setWords] = useState();
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  const labelStyles = {
    mt: '5',
    ml: '-2.5',
    fontSize: 'lg',
  };

  const setScaleData = () => {
    // eslint-disable-next-line default-case
    switch (BASE_INFO.base) {
      case 'anger':
        setEmoji('😡');
        break;
      case 'sadness':
        setEmoji('🙁');
        break;
      case 'disgust':
        setEmoji('🤢');
        break;
      case 'fear':
        setEmoji('😱');
        break;
      case 'surprise':
        setEmoji('😲');
        break;
      case 'joy':
        setEmoji('😁');
        break;
    }

    setColor(BASE_INFO.color);
    setWords(BASE_INFO.words);
  };

  const request = e => {
    e.preventDefault();
    console.log('Request had been sent');
    setScaleData();
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
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Put your sentence here"
        size="lg"
        fontSize="5xl"
      />

      <Button colorScheme="teal" size="lg" mt="10" onClick={request}>
        Find adjectives
      </Button>

      <Button colorScheme="teal" size="lg" mt="10" onClick={onCopy}>
        {hasCopied ? 'Copied!' : 'Copy'}
      </Button>

      <Flex w="100%" mt="16" px="10" direction="column">
        <Slider
          aria-label="slider-ex-6"
          onChange={val => setSliderValue(val)}
          colorScheme={color}
          step="5"
        >
          <SliderMark value={5} {...labelStyles}>
            Less Intense
          </SliderMark>
          <SliderMark value={40} {...labelStyles}>
            Your Word
          </SliderMark>
          <SliderMark value={75} {...labelStyles}>
            More Intense
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign="center"
            bg={color}
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
            borderColor={color}
            ml={-5}
          >
            <Text color={color}>{emoji}</Text>
          </SliderThumb>
        </Slider>

        <Flex direction="row" justify="left" align="center" mt="20">
          <Text fontSize="4xl">
            <Text as="b">Definition: </Text>
            {BASE_INFO.words.irate}
          </Text>
        </Flex>

        <Alert status="error" borderRadius={10} fontSize="4xl" mt="10">
          <AlertIcon boxSize={14} />
          No adjectives that portray emotions were found. Try another sentence.
        </Alert>
      </Flex>
    </Flex>
  );
}

export default App;

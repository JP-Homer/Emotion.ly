import React, { useState, useEffect } from 'react';
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

import { AutoResizeInput } from './ResizableInput';

const BASE_INFO = {
  irate: {
    base: 'anger',
    color: 'teal',
    words: {
      irate: 'Feeling or showing extreme anger',
      mad: 'Roused to anger',
    },
  },
};

const URL = 'https://emotionly.herokuapp.com';
const LOCAL = 'localhost:8080';

/* 
  TODO:

  1. Input text and click Find Adjectives many times.
     Disable that ability somehow.
     
  2. Underline or highlight the adjectives.

  3. Substitute the adjective for a newly selected one.

*/

function App() {
  const [sliderValue, setSliderValue] = useState(50);
  const [defaultRank, setDefaultRank] = useState();
  const [word, setWord] = useState();
  const [base, setBase] = useState();
  const [color, setColor] = useState();
  const [emoji, setEmoji] = useState();
  const [words, setWords] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [currentValue, setCurrentValue] = useState('');
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  const getData = async () => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence: value }),
    });

    if (response.ok) {
      const finishedData = await response.json();
      console.log(finishedData.mad);
      return finishedData.mad;
    } else {
      setErrorMsg(
        "The adjective in the sentence isn't in our database. Please, try another sentence."
      );
      return;
    }
  };

  const labelStyles = {
    mt: '5',
    ml: '-2.5',
    fontSize: 'lg',
  };

  const setScaleData = newData => {
    setBase(newData.base);
    setColor(newData.color);
    setWords(newData.words);
    setDefaultRank(newData.rank);
    setWord(newData.word);

    // eslint-disable-next-line default-case
    switch (newData.base) {
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
  };

  const styleInput = () => {
    const [left, right] = value.split(base);
    const underlinedAdj = (
      <Text textDecoration="underline" textDecorationColor={color}>
        {base}
      </Text>
    );
    console.log(left, right, underlinedAdj);
    return `${left}${underlinedAdj.props.children}${right}`;
  };

  const substituteInput = () => {};

  const request = async e => {
    setErrorMsg('');
    const newData = await getData();
    console.log(newData);
    setScaleData(newData);
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
      <AutoResizeInput
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Put your sentence here"
        size="lg"
        fontSize="5xl"
      />
      <Flex>
        {currentValue === value ? (
          <Button colorScheme="teal" size="lg" mt="10" isDisabled>
            Find adjectives
          </Button>
        ) : (
          <Button
            colorScheme="teal"
            size="lg"
            mt="10"
            onClick={e => {
              request(e);
              setValue(styleInput());
              setCurrentValue(value);
            }}
          >
            Find adjectives
          </Button>
        )}

        <Button colorScheme="teal" size="lg" ml="10" mt="10" onClick={onCopy}>
          {hasCopied ? 'Copied!' : 'Copy'}
        </Button>
      </Flex>

      {base ? (
        <Flex w="100%" mt="16" px="10" direction="column">
          <Slider
            aria-label="slider-ex-6"
            onChange={val => setSliderValue(val)}
            colorScheme={color}
            min={1}
            max={19}
            step={1}
          >
            <SliderMark value={1} {...labelStyles}>
              Less Intense
            </SliderMark>
            <SliderMark value={10} {...labelStyles}>
              Your Word
            </SliderMark>
            <SliderMark value={19} {...labelStyles}>
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
              {BASE_INFO.irate.words.irate}
            </Text>
          </Flex>
        </Flex>
      ) : null}

      {errorMsg ? (
        <Alert status="error" borderRadius={10} fontSize="4xl" mt="10">
          <AlertIcon boxSize={14} />
          {errorMsg}
        </Alert>
      ) : null}
    </Flex>
  );
}

export default App;

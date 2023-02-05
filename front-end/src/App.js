import React, { useState, useEffect, useRef } from 'react';
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

const URL = 'https://emotionly.herokuapp.com';
const LOCAL = 'localhost:8080';

/* 
  TODO:

  1. Make a component that works like an input but also
     like a regural text box

  2. Underline or highlight the adjectives.

  3. Substitute the adjective for a newly selected one.

  4. Map all of the definitions to a numbered list items.

*/

const useCustomClipboard = () => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const innerHTML = { __html: value };

  return { onCopy, innerHTML, setValue, hasCopied };
};

function App() {
  const [sliderValue, setSliderValue] = useState();
  const [word, setWord] = useState('mad');
  const [base, setBase] = useState();
  const [color, setColor] = useState();
  const [emoji, setEmoji] = useState();
  const [words, setWords] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [currentValue, setCurrentValue] = useState('');
  const { onCopy, innerHTML, setValue, hasCopied } = useCustomClipboard();

  const getData = async () => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence: innerHTML.__html }),
    });

    if (response.ok) {
      const finishedData = await response.json();
      console.log(finishedData);
      return finishedData;
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
    setSliderValue(newData.rank);
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
    const [left, right] = innerHTML.__html.split(word);
    const underlinedAdj = (
      <Text textDecoration="underline" textDecorationColor={color}>
        {word}
      </Text>
    );
    console.log(left, right, underlinedAdj);
    return `${left}${underlinedAdj}${right}`;
  };

  const substituteInput = () => {};

  const request = async e => {
    setErrorMsg('');
    const newData = await getData();
    setScaleData(newData[0]);
    e.preventDefault();
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
      <AutoResizeInput setValue={setValue} />
      <Flex>
        {currentValue === innerHTML.__html ? (
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
              setCurrentValue(innerHTML.__html);
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
            defaultValue={sliderValue}
            min={0}
            max={20}
            step={1}
          >
            <SliderMark value={1} {...labelStyles}>
              Less Intense
            </SliderMark>
            <SliderMark value={10} {...labelStyles}>
              Your Word
            </SliderMark>
            <SliderMark value={16} {...labelStyles}>
              More Intense
            </SliderMark>
            <SliderMark
              value={sliderValue}
              textAlign="center"
              bg={color}
              color="white"
              mt="-16"
              ml="-12"
              px="5"
              py="2"
              borderRadius={6}
            >
              {words[sliderValue].word}
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
              position="relative"
              right={-10}
              boxSize={10}
              borderColor={color}
            >
              <Text color={color}>{emoji}</Text>
            </SliderThumb>
          </Slider>

          <Flex direction="row" justify="left" align="center" mt="20">
            <Text fontSize="4xl">
              <Text as="b">Definition: </Text>
              {words[sliderValue].definition[0]}
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

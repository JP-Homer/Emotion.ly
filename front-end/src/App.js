import React, { useState, useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
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
  UnorderedList,
  ListItem,
  Box,
  Image,
} from '@chakra-ui/react';

const URL = 'https://emotionly.herokuapp.com';
const LOCAL = 'localhost:8080';

/* 
  TODO:

  1. Make a component that works like an input but also
     like a regural text box

  2. Underline or highlight the adjectives.

  4. Map all of the definitions to a numbered list items.

*/

const useCustomClipboard = () => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const innerHTML = { __html: value };

  return { onCopy, innerHTML, setValue, hasCopied };
};

function App() {
  const [sliderValue, setSliderValue] = useState();
  const [word, setWord] = useState();
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
    mt: { base: '5', md: '10' },
    ml: '-2.5',
    fontSize: { base: 'lg', md: 'xl', lg: '3xl' },
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
      <Text textDecoration="underline" textDecorationColor={'black'}>
        {word}
      </Text>
    );

    const underlinedAdjHTML = renderToString(underlinedAdj);
    console.log(`${left}${underlinedAdjHTML}${right}`);
    return `${left}${underlinedAdjHTML}${right}`;
  };

  const request = async e => {
    setErrorMsg('');
    const newData = await getData();
    setScaleData(newData[0]);
    e.preventDefault();
  };

  const AutoResizeInput = props => {
    const ref = useRef(null);

    const setCaretToEnd = () => {
      const el = ref.current;
      if (!el) return;
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };

    useEffect(() => {
      setCaretToEnd();
    }, [ref]);

    return (
      <Box
        dangerouslySetInnerHTML={innerHTML}
        overflow="hidden"
        minH="85px"
        minW="100%"
        resize="none"
        ref={ref}
        minRows={1}
        contentEditable="true"
        display="inline-block"
        className="editable"
        border="1px solid gray"
        px="10px"
        py="5px"
        borderRadius={10}
        color="black"
        onInput={e => {
          setCaretToEnd();
          setValue(e.target.innerHTML);
        }}
        _placeholder="Put your sentence here"
        size="lg"
        fontSize="5xl"
      />
    );
  };

  return (
    <Flex
      direction="column"
      align="center"
      mt={10}
      w={{ base: '95%', md: '90%', xl: '1024px' }}
      h="100vh"
      ml="auto"
      mr="auto"
    >
      {/* <Box mt={10}>
        <Image boxsize="100%" src="emotionlly-logo-1-remove.png" />
      </Box> */}
      <AutoResizeInput />
      <Flex>
        {currentValue === innerHTML.__html ? (
          <Button
            colorScheme={color ? color : 'teal'}
            size="lg"
            mt="10"
            isDisabled
          >
            Find adjectives
          </Button>
        ) : (
          <Button
            colorScheme={color ? color : 'teal'}
            size="lg"
            mt="10"
            onClick={e => {
              request(e);
              setValue(innerHTML.__html);
              setCurrentValue(innerHTML.__html);
            }}
          >
            Find adjectives
          </Button>
        )}

        <Button
          colorScheme={color ? color : 'teal'}
          size="lg"
          ml="10"
          mt="10"
          onClick={onCopy}
        >
          {hasCopied ? 'Copied!' : 'Copy'}
        </Button>
      </Flex>

      {base ? (
        <Flex w="100%" mt={32} px="10" direction="column">
          <Slider
            aria-label="slider-ex-6"
            onChange={val => {
              setSliderValue(val);
              setWord(words[val].word);
              const newValue = currentValue.replace(word, words[val].word);
              console.log(newValue);
              setValue(newValue);
              setCurrentValue(newValue);
            }}
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
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
              bg={color}
              color="white"
              mt={{ base: '-75px', md: '-95px', lg: '-110px' }}
              ml={{ base: '-15%', md: '-10%', lg: '-5%' }}
              px="5"
              py="2"
              borderRadius={10}
            >
              {words[sliderValue].word}
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
              position="relative"
              right={-10}
              boxSize={{ base: 10, md: 16, lg: 16 }}
              borderColor={color}
            >
              <Text
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                color={color}
              >
                {emoji}
              </Text>
            </SliderThumb>
          </Slider>

          <Flex direction="row" justify="left" align="center" mt="20">
            <Text fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              <Text as="b">Definitions: </Text>
              <UnorderedList>
                {words[sliderValue].definition.map((def, index) => (
                  <ListItem key={index}>{def}</ListItem>
                ))}
              </UnorderedList>
            </Text>
          </Flex>
        </Flex>
      ) : null}

      {errorMsg ? (
        <Alert
          status="error"
          borderRadius={10}
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          mt="10"
        >
          <AlertIcon boxSize={14} />
          {errorMsg}
        </Alert>
      ) : null}
    </Flex>
  );
}

export default App;

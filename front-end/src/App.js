import React, { useState, useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import {
  Flex,
  Text,
  Button,
  Alert,
  AlertIcon,
  useClipboard,
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Box,
} from '@chakra-ui/react';

import Definitions from './Definitions';

import { v4 as uuidv4 } from 'uuid';

const URL = 'https://emotionly.herokuapp.com';
const LOCAL = 'localhost:8080';

/* 
  TODO:

  1. Make a component that works like an input but also
     like a regural text box

  2. Underline or highlight the adjectives.

*/

const useCustomClipboard = () => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const innerHTML = { __html: value };

  return { onCopy, value, innerHTML, setValue, hasCopied };
};

function App() {
  const [data, setData] = useState();
  const [sliderValue, setSliderValue] = useState();
  const [word, setWord] = useState();
  const [color, setColor] = useState();
  const [emoji, setEmoji] = useState();
  const [words, setWords] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [currentValue, setCurrentValue] = useState('');
  const { onCopy, value, innerHTML, setValue, hasCopied } =
    useCustomClipboard();

  const labelStyles = {
    mt: '5',
    ml: '-2.5',
    fontSize: 'lg',
  };

  const InputBox = props => {
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
        value={value}
        dangerouslySetInnerHTML={innerHTML}
        minH="unset"
        overflow="hidden"
        w="100%"
        resize="none"
        ref={ref}
        minRows={1}
        contentEditable="true"
        display="inline-block"
        className="editable"
        onInput={e => {
          console.log(e.target);
          setCaretToEnd();
          setValue(e.target.innerHTML);
        }}
        placeholder="Put your sentence here"
        size="lg"
        fontSize="5xl"
      />
    );
  };

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
      setScaleData(finishedData);
    } else {
      setErrorMsg(
        "The adjective in the sentence isn't in our database. Please, try another sentence."
      );
      return;
    }
  };

  const setScaleData = newData => {
    setData(newData);
    newData.forEach((datum, index) => {
      setColor(prev => {
        return {
          [index]: datum.color,
          ...prev,
        };
      });
      setWords(prev => {
        return {
          [index]: datum.words,
          ...prev,
        };
      });
      setSliderValue(prev => {
        return {
          [index]: datum.rank,
          ...prev,
        };
      });
      setWord(prev => {
        return {
          [index]: datum.word,
          ...prev,
        };
      });
      // eslint-disable-next-line default-case
      switch (datum.base) {
        case 'anger':
          setEmoji(prev => {
            return { [index]: '😡', ...prev };
          });
          break;
        case 'sadness':
          setEmoji(prev => {
            return { [index]: '🙁', ...prev };
          });
          break;
        case 'disgust':
          setEmoji(prev => {
            return { [index]: '🤢', ...prev };
          });
          break;
        case 'fear':
          setEmoji(prev => {
            return { [index]: '😱', ...prev };
          });
          break;
        case 'surprise':
          setEmoji(prev => {
            return { [index]: '😲', ...prev };
          });
          break;
        case 'joy':
          setEmoji(prev => {
            return { [index]: '😁', ...prev };
          });
          break;
      }
    });
  };

  const styleInput = word => {
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
    e.preventDefault();
    setErrorMsg(undefined);
    await getData();
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
      <InputBox />
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
              setValue(innerHTML.__html);
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

      {data ? (
        <Flex w="100%" mt="16" px="10" direction="column">
          {data.map((datum, index) => (
            <>
              <Text as="b" textAlign="center" fontSize="6xl">
                {datum.word}
              </Text>
              <Slider
                mt={10}
                onChange={val => {
                  setSliderValue(prev => {
                    return {
                      [index]: val,
                      ...prev,
                    };
                  });

                  setWord(prev => {
                    return {
                      [index]: datum.words[val].word,
                      ...prev,
                    };
                  });

                  const newValue = currentValue.replace(
                    word[index],
                    datum.words[val].word
                  );
                  console.log(newValue);
                  setValue(newValue);
                  setCurrentValue(newValue);
                }}
                colorScheme={color[index]}
                defaultValue={sliderValue[index]}
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
                  value={sliderValue[index]}
                  textAlign="center"
                  bg={color[index]}
                  color="white"
                  mt="-16"
                  ml="-12"
                  px="5"
                  py="2"
                  borderRadius={6}
                >
                  {datum.words[sliderValue[index]].word}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  position="relative"
                  right={-10}
                  boxSize={10}
                  borderColor={color[index]}
                >
                  <Text color={color[index]}>{emoji[index]}</Text>
                </SliderThumb>
              </Slider>

              <Definitions
                key={uuidv4()}
                words={words[index]}
                sliderValue={sliderValue[index]}
              />
            </>
          ))}
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

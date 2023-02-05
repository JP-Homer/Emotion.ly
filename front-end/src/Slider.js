import {
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Text,
} from '@chakra-ui/react';

export default function CustomSlider({
  setSliderValue,
  setWord,
  setValue,
  setCurrentValue,
  word,
  words,
  currentValue,
  color,
  sliderValue,
  emoji,
  index,
}) {
  console.log({
    word,
    words,
    currentValue,
    color,
    sliderValue,
    emoji,
  });

  const labelStyles = {
    mt: '5',
    ml: '-2.5',
    fontSize: 'lg',
  };
  return (
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
            [index]: words[val].word,
            ...prev,
          };
        });

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
  );
}

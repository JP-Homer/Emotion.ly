import { Box, Flex, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

export default function Definitions({ words, sliderValue }) {
  return (
    <Flex direction="row" justify="left" align="center" my="20">
      <Box fontSize="4xl">
        <Text as="b">Definitions: </Text>
        <UnorderedList>
          {words[sliderValue].definition.map(def => (
            <ListItem key={uuidv4()}>{def}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
}

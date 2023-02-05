import { Input } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import React from 'react';

export const AutoResizeInput = React.forwardRef((props, ref) => {
  return (
    <Input
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={1}
      as={ResizeTextarea}
      {...props}
    />
  );
});

import { Box } from '@chakra-ui/react';
import React, { useRef, useEffect, useState } from 'react';

export const AutoResizeInput = props => {
  const ref = useRef(null);
  const [value, setValue] = useState('');

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
  }, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Box
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
        setValue(e.target.innerHTML);
        setCaretToEnd();
        props.setValue(value);
      }}
      placeholder="Put your sentence here"
      size="lg"
      fontSize="5xl"
      dangerouslySetInnerHTML={{ __html: value }}
      {...props}
    />
  );
};

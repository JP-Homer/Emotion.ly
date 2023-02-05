import { Box } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';

export const AutoResizeInput = props => {
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
        props.setValue(e.target.innerHTML);
      }}
      placeholder="Put your sentence here"
      size="lg"
      fontSize="5xl"
      {...props}
    />
  );
};

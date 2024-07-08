// components/QuillEditor.js
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // import bubble theme styles
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // import a highlight.js style

const QuillEditor = ({ value }: { value: string }) => {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block: any) => {
      hljs.highlightBlock(block);
    });
  }, [value]);

  return (
    <ReactQuill
      value={value}
      readOnly={true}
      theme="bubble"
      modules={{
        syntax: true, // Enable syntax module
        toolbar: false, // Disable toolbar for readOnly editor
      }}
    />
  );
};

export default QuillEditor;

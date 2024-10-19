// "use client";

// import React, { useEffect, useRef } from "react";
// // import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import hljs from "highlight.js";
// import "react-quill/dist/quill.core.css";
// import "react-quill/dist/quill.bubble.css";
// // import "highlight.js/styles/darcula.css";

// function Editor({ value, onChange, className }: any) {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     //@ts-ignore
//     const editor = editorRef.current.getEditor();
//     editor.root.style.height = "20vh"; // Set the desired height for scrolling
//     editor.root.style.overflowY = "auto"; // Enable vertical scrolling
//   }, []);

//   const toolbarOptions = [
//     ["bold", "italic", "underline", "strike"], // toggled buttons
//     ["blockquote", "code-block"],
//     ["link", "image", "formula"],

//     [{ header: 1 }, { header: 2 }], // custom button values
//     [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//     [{ script: "sub" }, { script: "super" }], // superscript/subscript
//     [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//     [{ direction: "rtl" }], // text direction

//     [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],

//     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//     [{ font: [] }],
//     [{ align: [] }],

//     ["clean"], // remove formatting button
//   ];

//   const modules = {
//     toolbar: {
//       container: toolbarOptions,
//     },
//   };

//   const formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "video",
//     "code-block",
//   ];

//   return (
//     <ReactQuill
//       //@ts-ignore
//       ref={editorRef}
//       theme="snow"
//       modules={modules}
//       value={value}
//       onChange={onChange}
//       formats={formats}
//     />
//   );
// }

// export default Editor;

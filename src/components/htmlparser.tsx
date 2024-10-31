import { set } from "date-fns";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import CopyButton from "./copyButton";

const convertToReactElements = (htmlString: any) => {
  // Create a temporary div to parse HTML string
  const div = document.createElement("div");
  div.innerHTML = htmlString;

  // Function to convert DOM nodes to React elements
  const domToReact = (node: any) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes).map(domToReact);

      // Map common HTML elements to their React equivalents
      switch (node.tagName.toLowerCase()) {
        case "p":
          return <p className="mb-4">{children}</p>;
        case "h1":
          return <h1 className="text-3xl font-bold mb-4">{children}</h1>;
        case "h2":
          return <h2 className="text-2xl font-bold mb-3">{children}</h2>;
        case "h3":
          return <h3 className="text-xl font-bold mb-2">{children}</h3>;
        case "strong":
        case "b":
          return <strong className="font-bold">{children}</strong>;
        case "em":
        case "i":
          return <em className="italic">{children}</em>;
        case "ul":
          return <ul className="list-disc ml-6 mb-4">{children}</ul>;
        case "ol":
          return <ol className="list-decimal ml-6 mb-4">{children}</ol>;
        case "li":
          return <li className="mb-1">{children}</li>;
        case "a":
          return (
            <a
              href={node.getAttribute("href")}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        case "blockquote":
          return (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
              {children}
            </blockquote>
          );
        case "pre":
          const content = node.textContent;
          return (
            <div className="relative">
              <pre className="bg-neutral-700 p-4 rounded my-4 overflow-x-auto">
                {children}
              </pre>

              <CopyButton text={content} />
            </div>
          );
        case "code":
          return (
            <code className="bg-transparent px-1 rounded">{children}</code>
          );
        case "br":
          return <br />;
        default:
          return <div>{children}</div>;
      }
    }

    return null;
  };

  return Array.from(div.childNodes).map((node, index) => (
    <React.Fragment key={index}>{domToReact(node)}</React.Fragment>
  ));
};

export default convertToReactElements;

"use client";
import { useState } from "react";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "../multiselect";

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const MultiSelectTest = ({ placeHolder }: { placeHolder: string }) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="bg-transparent">

    <MultiSelector values={value} onValuesChange={setValue} loop={false} >
      <MultiSelectorTrigger >
        <MultiSelectorInput placeholder={`select your ${placeHolder}`} />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((option, i) => (
            <MultiSelectorItem key={i} value={option.value}>
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
          </div>
  );
};

export default MultiSelectTest;

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";
import { useEffect } from "react";

interface Props {
  onChange: (value: string) => void,
  placeholder?: string,
  options: string[],
  label?: string,
  value?: string,
}

export function SelectComponent({onChange, placeholder, label, options, value} : Props) {
  useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <Select onValueChange={onChange} value={value?.toLowerCase()}>
      <SelectTrigger className="w-[180px]" showIcon={options.length > 1}>
        <SelectValue placeholder={placeholder ?? '' } />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option, index) => (
            <SelectItem key={option + index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

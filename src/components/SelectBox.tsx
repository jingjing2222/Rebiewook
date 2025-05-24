import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export type SelectBoxProps = {
  value: {
    name: string;
    value: string;
  }[];
  onChange: (value: string) => void;
};

export const SelectBox = ({ value, onChange }: SelectBoxProps) => {
  const [selectedValue, setSelectedValue] = useState(value[0].value);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {value.map((el) => {
          return (
            <SelectItem key={el.value} value={el.value}>
              {el.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

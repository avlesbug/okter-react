import { Badge } from "~/components/ui/badge";
import { prettyString } from "~/lib/utils";

interface Props {
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
  selected?: string;
}

export const OptionsSelector = ({
  options,
  onSelect,
  className,
  selected,
}: Props) => {
  const onClick = (option: string) => {
    onSelect(option);
  };

  return (
    <div className={className ?? ""}>
      {options.map((option, index) => (
        <Badge
          className="px-4 py-2 text-sm"
          variant={option !== selected ? "outline" : "default"}
          key={option + index}
          onClick={() => onClick(option)}
        >
          {prettyString(option)}
        </Badge>
      ))}
    </div>
  );
};

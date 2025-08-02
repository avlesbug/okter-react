import { Badge } from "~/components/ui/badge";

interface Props {
  options: [string,string][];
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
  const onClick = (option: string, index: number) => {
    onSelect(option);
  };

  return (
    <div className={className ?? ""}>
      {options.map((option, index) => (
        <Badge
          className="px-4 py-2 text-sm"
          variant={option[1] !== selected ? "outline" : "default"}
          key={option[1] + index}
          onClick={() => onClick(option[1], index)}
        >
          {option[0]}
        </Badge>
      ))}
    </div>
  );
};

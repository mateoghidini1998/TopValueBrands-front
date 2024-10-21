import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TextAreaCellProps = {
  title: string;
  onChange: (value: string) => void;
  value: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
};

export function NoteCell({
  title,
  onChange,
  value,
  defaultValue,
  placeholder,
  description,
}: TextAreaCellProps) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">{title}</Label>
      <Textarea
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} // Handling change here
        value={value}
        id="message-2"
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

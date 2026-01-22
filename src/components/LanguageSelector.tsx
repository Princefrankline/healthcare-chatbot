import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language, SUPPORTED_LANGUAGES } from "@/hooks/useHealthChat";

interface LanguageSelectorProps {
  selected: Language;
  onSelect: (language: Language) => void;
}

export function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <Select
      value={selected.code}
      onValueChange={(code) => {
        const language = SUPPORTED_LANGUAGES.find((l) => l.code === code);
        if (language) onSelect(language);
      }}
    >
      <SelectTrigger className="w-auto gap-2 border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-card transition-colors">
        <Globe className="h-4 w-4 text-primary" />
        <SelectValue>
          <span className="hidden sm:inline">{selected.nativeName}</span>
          <span className="sm:hidden">{selected.code.toUpperCase()}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-muted-foreground text-sm">({lang.name})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

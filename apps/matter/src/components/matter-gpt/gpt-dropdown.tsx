import type { roomType, themeType } from '#/lib/matter-gpt/dropdown-types';

import { CheckIcon } from '@heroicons/react/20/solid';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@envi/ui/dropdown-menu';

interface GptDropDownProps {
  theme: themeType | roomType;
  setTheme: (theme: themeType | roomType) => void;
  themes: themeType[] | roomType[];
}

export default function GptDropDown({
  theme,
  setTheme,
  themes,
}: GptDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex w-full items-center justify-between rounded-md border bg-secondary px-4 py-2 text-foreground shadow-sm hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-ring">
        {theme}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-full overflow-hidden"
        key={theme}
      >
        {themes.map((themeItem) => (
          <DropdownMenuItem
            key={themeItem}
            onSelect={() => setTheme(themeItem)}
            className={`${
              themeItem === theme
                ? 'bg-primary-foreground font-bold text-primary'
                : 'text-secondary-foreground'
            } flex w-56 items-center justify-between space-x-2 text-left text-sm`}
          >
            <span>{themeItem}</span>
            {themeItem === theme && <CheckIcon className="text-bold h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

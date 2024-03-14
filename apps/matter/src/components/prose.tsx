import type { FunctionComponent } from 'react';

import { cn } from '@envi/ui';

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  return (
    <div
      className={cn(
        'prose prose-stone dark:prose-invert prose-a:font-semibold prose-a:text-primary prose-a:hover:text-primary/80 prose-a:hover:underline prose-a:hover:underline-offset-4',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;

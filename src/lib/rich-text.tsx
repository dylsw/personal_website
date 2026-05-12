import { ReactNode } from 'react';

// Supports **bold** and _italic_ inline markers.
// Usage in data strings: "Grew revenue by **42%** through _data-driven_ experimentation"
export function renderRichText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('_') && part.endsWith('_')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

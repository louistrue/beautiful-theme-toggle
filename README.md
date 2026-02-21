# beautiful-theme-toggle

A beautiful animated SVG theme toggle with smooth sun/moon transitions and tiny day/night easter eggs.

## Install

```bash
npm install beautiful-theme-toggle
```

## React usage

```tsx
import { useEffect, useRef } from 'react';
import { ThemeToggle } from 'beautiful-theme-toggle';

export function ThemeSwitch() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const toggle = new ThemeToggle({
      element: ref.current,
      size: 120,
      initialState: 'system',
      onChange: (state) => {
        // Example: Tailwind or custom dark class on root
        document.documentElement.classList.toggle('dark', state === 'dark');
      },
    });

    return () => toggle.destroy();
  }, []);

  return <div ref={ref} />;
}
```

## Vanilla usage

```ts
import { ThemeToggle } from 'beautiful-theme-toggle';

const toggle = new ThemeToggle({
  element: '#toggle-container',
  size: '8rem', // number = px, string = CSS width value
  initialState: 'system',
  onChange: (state) => {
    document.body.classList.toggle('dark-mode', state === 'dark');
  },
});
```

## API

- `new ThemeToggle(options)`
  - `element`: `HTMLElement | string` (required)
  - `size`: `number | string` (optional, default: `140px`)
  - `initialState`: `'light' | 'dark' | 'system'` (optional, default: `'system'`)
  - `onChange`: `(state: 'light' | 'dark') => void` (optional)
- Methods:
  - `toggle()`
  - `setTheme(state)`
  - `getTheme()`
  - `destroy()`

## License

MIT

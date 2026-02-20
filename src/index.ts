import { getSvgTemplate, getStyles } from './template.js';

export type ThemeState = 'light' | 'dark';

export interface ThemeToggleOptions {
  /** The container element or a CSS selector string */
  element: HTMLElement | string;
  /** Starting state — defaults to 'system' (follows OS preference) */
  initialState?: ThemeState | 'system';
  /** Callback fired whenever the toggle state changes */
  onChange?: (state: ThemeState) => void;
}

export class ThemeToggle {
  private button: HTMLButtonElement;
  private currentState: ThemeState = 'light';
  private onChange?: (state: ThemeState) => void;
  private id: string;
  private systemMedia?: MediaQueryList;

  constructor(options: ThemeToggleOptions) {
    const container =
      typeof options.element === 'string'
        ? document.querySelector<HTMLElement>(options.element)
        : options.element;

    if (!container) {
      throw new Error('ThemeToggle: Container element not found.');
    }

    // Unique ID so multiple toggles on one page don't clash
    this.id = 'theme-toggle-' + Math.random().toString(36).substring(2, 9);
    this.onChange = options.onChange;

    // 1. Inject scoped styles
    this.injectStyles();

    // 2. Create the accessible button wrapper
    this.button = document.createElement('button');
    this.button.className = `${this.id}-btn`;
    this.button.setAttribute('role', 'switch');
    this.button.setAttribute('aria-label', 'Toggle dark mode');
    this.button.innerHTML = getSvgTemplate();

    // 3. Mount into the DOM
    container.appendChild(this.button);

    // 4. Bind click
    this.button.addEventListener('click', this.toggle);

    // 5. Set initial state
    this.initTheme(options.initialState ?? 'system');
  }

  private injectStyles(): void {
    if (!document.getElementById('theme-toggle-global-styles')) {
      const style = document.createElement('style');
      style.id = 'theme-toggle-global-styles';
      document.head.appendChild(style);
    }
    const styleEl = document.getElementById(
      'theme-toggle-global-styles',
    ) as HTMLStyleElement;
    styleEl.textContent += getStyles(this.id);
  }

  private initTheme(initial: ThemeState | 'system'): void {
    if (initial === 'system') {
      this.systemMedia = window.matchMedia('(prefers-color-scheme: dark)');
      this.setTheme(this.systemMedia.matches ? 'dark' : 'light', false);

      // Keep in sync if the OS theme changes while the page is open
      this.systemMedia.addEventListener('change', this.handleSystemChange);
    } else {
      this.setTheme(initial, false);
    }
  }

  private handleSystemChange = (e: MediaQueryListEvent): void => {
    this.setTheme(e.matches ? 'dark' : 'light');
  };

  /** Toggle between light and dark */
  public toggle = (): void => {
    this.setTheme(this.currentState === 'light' ? 'dark' : 'light');
  };

  /** Programmatically set the theme */
  public setTheme(state: ThemeState, triggerCallback = true): void {
    this.currentState = state;

    if (state === 'dark') {
      this.button.classList.add('tgl-dark');
      this.button.setAttribute('aria-checked', 'true');
    } else {
      this.button.classList.remove('tgl-dark');
      this.button.setAttribute('aria-checked', 'false');
    }

    if (triggerCallback && this.onChange) {
      this.onChange(this.currentState);
    }
  }

  /** Get the current theme state */
  public getTheme(): ThemeState {
    return this.currentState;
  }

  /** Remove event listeners and the element from the DOM */
  public destroy(): void {
    this.button.removeEventListener('click', this.toggle);
    if (this.systemMedia) {
      this.systemMedia.removeEventListener('change', this.handleSystemChange);
    }
    this.button.remove();
  }
}

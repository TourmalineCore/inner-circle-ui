import {
  createContext, useState, useMemo, ReactNode, Dispatch, SetStateAction,
} from 'react';

import { themeColors } from './themeColors';

type ThemProviderStateProps = {
  themeColor: string
  themeColors: ThemeElement[];
  setThemeColor: Dispatch<SetStateAction<string>>;
};

const ThemeContext = createContext<ThemProviderStateProps>({
  themeColor: '',
  themeColors: [],
  setThemeColor: () => '',
});

function ThemeProvider({
  initialColor = themeColors[0].key,
  children,
}: {
  initialColor?: string;
  children?: ReactNode;
}) {
  const [themeColor, setThemeColor] = useState(initialColor);

  const value = useMemo(() => ({
    themeColor,
    themeColors,
    setThemeColor,
  }), [themeColor, themeColors, setThemeColor]);

  return (
    <ThemeContext.Provider
      value={value}
    >
      <div className={`theme-color-${themeColor}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export {
  ThemeProvider,
  ThemeContext,
};

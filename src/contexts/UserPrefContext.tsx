import { useMediaQuery, Theme, createTheme, PaletteMode } from "@mui/material";
import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/UseLocalStorage";
import { enUS, Localization, zhHK } from "@mui/material/locale";
import { useTranslation } from "react-i18next";
import { Constants } from "../Constants";

export type LanguageKey = "en" | "zh-HK";

export type UserPrefContextType = {
  theme: Theme;
  toggleTheme: () => void;
  language: LanguageKey;
  changeLanguage: (language: LanguageKey) => void;
};

export const languageMapping: { [language: string]: Localization } = {
  en: enUS,
  "zh-HK": zhHK,
};

const contextDefaultValues = {
  theme: createTheme(),
  toggleTheme: () => {},
  language: "en" as LanguageKey,
  changeLanguage: () => {},
};

export const UserPrefContext =
  createContext<UserPrefContextType>(contextDefaultValues);

export const UserPrefContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { i18n } = useTranslation();
  const [langauge, setLangauge] = useLocalStorage<LanguageKey>(
    Constants.localStorageKeys.language,
    "en"
  );

  const [colorMode, setColorMode] = useLocalStorage<PaletteMode>(
    Constants.localStorageKeys.theme,
    prefersDarkMode ? "dark" : "light"
  );

  const theme = useMemo(
    () =>
      createTheme(
        {
          components: {
            MuiButtonBase: {
              defaultProps: {
                disableRipple: true,
              },
            },
          },
          palette: {
            mode: colorMode,
          },
        },
        languageMapping[langauge]
      ),
    [colorMode, langauge]
  );

  return (
    <UserPrefContext.Provider
      value={{
        theme: theme,
        toggleTheme: () => {
          if (colorMode === "light") {
            setColorMode("dark");
          } else {
            setColorMode("light");
          }
        },
        language: langauge,
        changeLanguage: (langauge: LanguageKey) => {
          setLangauge(langauge);
          i18n.changeLanguage(langauge);
        },
      }}
    >
      {children}
    </UserPrefContext.Provider>
  );
};

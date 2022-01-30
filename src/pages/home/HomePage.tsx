import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LanguageKey, UserPrefContext } from "../../contexts/UserPrefContext";
import { useContext } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LoginIcon from "@mui/icons-material/Login";
import ErrorIcon from "@mui/icons-material/Error";
import SecurityIcon from "@mui/icons-material/Security";

export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isUserLoggedIn } = useContext(UserAuthContext);

  return (
    <UserPrefContext.Consumer>
      {({ theme, toggleTheme, language, changeLanguage }) => {
        return (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            spacing={1}
          >
            <Box width={{ xs: 300, sm: 540, md: 800, lg: 1024, xl: 1280 }}>
              <Grid container spacing={1} direction="column">
                <Grid item marginBottom={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("change-language")}
                    </InputLabel>
                    <Select
                      id="demo-simple-select-label"
                      label="Language"
                      variant="standard"
                      onChange={(e) => {
                        changeLanguage(e.target.value as LanguageKey);
                      }}
                      defaultValue={language}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="zh-HK">中文</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h3">{t("homepage-message")}</Typography>
                </Grid>

                <Grid item xs={12}>
                  {isUserLoggedIn ? (
                    <Button
                      startIcon={<SecurityIcon />}
                      color="inherit"
                      onClick={() => navigate("/private")}
                    >
                      {t("home-page-nav-to-private-button-title")}
                    </Button>
                  ) : (
                    <Button
                      startIcon={<LoginIcon />}
                      color="inherit"
                      onClick={() => navigate("/auth")}
                    >
                      {t("home-page-login-button-title")}
                    </Button>
                  )}
                  <Button
                    startIcon={
                      theme.palette.mode === "dark" ? (
                        <LightModeIcon />
                      ) : (
                        <DarkModeIcon />
                      )
                    }
                    color="inherit"
                    onClick={() => toggleTheme()}
                  >
                    {theme.palette.mode === "dark"
                      ? t("home-page-light-mode-button-title")
                      : t("home-page-dark-mode-button-title")}
                  </Button>
                  <Button
                    startIcon={<ErrorIcon />}
                    color="inherit"
                    onClick={() => navigate("/not-found")}
                  >
                    {t("home-page-not-found-button-title")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        );
      }}
    </UserPrefContext.Consumer>
  );
};

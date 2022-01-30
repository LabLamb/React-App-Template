import { LoadingButton } from "@mui/lab";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";

export const AuthenticationPage = () => {
  const { t } = useTranslation();
  const { setUserData } = useContext(UserAuthContext);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    setUserData({
      id: "",
      email: "",
      name: "",
    }); // Here is where you update the session cookie (and other details) of the logged in user.
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      spacing={2}
    >
      <Box width={{ xs: 300 }}>
        <Paper>
          <Box padding={2}>
            <Typography variant="h5" textAlign="center">
              {t("login-card-welcome-message")}
            </Typography>
          </Box>

          <Divider textAlign="left">
            <LoginIcon />
          </Divider>

          <Box padding={2}>
            <LoadingButton
              variant="outlined"
              color="inherit"
              fullWidth
              size="small"
              onClick={handleSubmit}
            >
              {t("login-card-submit-button-title")}
            </LoadingButton>
          </Box>
        </Paper>
      </Box>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="body2">
          {t("login-card-back-home-button-title").toUpperCase()}
        </Typography>
      </Link>
    </Stack>
  );
};

import { Grid, Typography, Stack, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";

export const PrivatePage = () => {
  const { t } = useTranslation();
  const { logout } = useContext(UserAuthContext);

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
          <Grid item xs={12}>
            <Typography variant="h3">{t("private-page-heading")}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button startIcon={<LogoutIcon />} color="inherit" onClick={logout}>
              {t("private-page-logout-button-title")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

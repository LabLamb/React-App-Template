import { Button, Stack, Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        <Grid container spacing={1}>
          <Grid container item spacing={1} xs={12} sm>
            <Grid item xs={12}>
              <Typography variant="h5">404</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3">
                {t(`page-not-found-message`)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="inherit"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => navigate(-1)}
              >
                {t(`return-last-page-button-title`)}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

import { CssBaseline } from "@mui/material";
import "./App.css";
import {
  UserAuthContext,
  UserAuthContextProvider,
} from "./contexts/UserAuthContext";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  UserPrefContext,
  UserPrefContextProvider,
} from "./contexts/UserPrefContext";
import { NotFoundPage } from "./pages/not-found/NotFoundPage";
import { HomePage } from "./pages/home/HomePage";
import { AuthenticationPage } from "./pages/authentication/AuthenticationPage";
import { PrivatePage } from "./pages/private/PrivatePage";

const App = () => {
  return (
    <UserAuthContextProvider>
      <UserAuthContext.Consumer>
        {({ isUserLoggedIn }) => {
          return (
            <UserPrefContextProvider>
              <UserPrefContext.Consumer>
                {({ theme }) => {
                  return (
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route
                            path="/auth"
                            element={
                              isUserLoggedIn ? (
                                <HomePage />
                              ) : (
                                <AuthenticationPage />
                              )
                            }
                          />
                          <Route
                            path="/private"
                            element={
                              isUserLoggedIn ? (
                                <PrivatePage />
                              ) : (
                                <Navigate to="/auth" />
                              )
                            }
                          />
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </BrowserRouter>
                    </ThemeProvider>
                  );
                }}
              </UserPrefContext.Consumer>
            </UserPrefContextProvider>
          );
        }}
      </UserAuthContext.Consumer>
    </UserAuthContextProvider>
  );
};

export default App;

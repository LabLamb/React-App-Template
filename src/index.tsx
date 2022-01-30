import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en.json";
import zhHK from "./i18n/zh-HK.json";
import { Constants } from "./Constants";

const resources = {
  en: en,
  "zh-HK": zhHK,
};

i18n.use(initReactI18next).init({
  resources,
  lng: (() => {
    try {
      return JSON.parse(
        localStorage.getItem(Constants.localStorageKeys.language) ?? ""
      );
    } catch {
      return "en";
    }
  })(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

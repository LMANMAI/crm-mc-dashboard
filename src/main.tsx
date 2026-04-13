import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </ChakraProvider>
  </StrictMode>
);

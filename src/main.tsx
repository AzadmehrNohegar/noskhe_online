import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./shared/scrollToTop/index.tsx";

import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <Skeleton
          containerClassName="block w-screen h-screen overflow-hidden"
          className="w-full h-full relative -top-1"
        />
      }
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ScrollToTop />
        </QueryClientProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

import "@/styles/globals.css";
import clsx from "clsx";
import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { createStore, Provider } from "jotai";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  const store = createStore();

  return (
    <main className={clsx("bg-slate-950 min-h-screen text-white transition-all", notoSansKR.className)}>
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster toastOptions={{ success: {style: { fontSize: "16px" }}, error: {style: { fontSize: "16px" }} }} />
      </Provider>
    </main>
  );
}

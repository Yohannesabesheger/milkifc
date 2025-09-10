import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps, router }: AppProps) {
  // Login page should NOT use Layout
  const noLayout = ["/login"];

  if (noLayout.includes(router.pathname)) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

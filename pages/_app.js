import Head from "next/head";
import { Fragment } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>OBER - One Page Resume React NextJS Template</title>
        {/* <!-- Fonts --> */}
       
      </Head>
      <Component {...pageProps} />{" "}
    </Fragment>
  );
}

export default MyApp;

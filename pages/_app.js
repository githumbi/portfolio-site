import Head from "next/head";
import { Fragment } from "react";
import "../styles/globals.css";
import {DefaultSeo} from 'next-seo'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <DefaultSeo
        title="Thumbi"
        description="UX Designer helping companies craft customer-centric products through research-driven design."
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://githumbi.com/",
          siteName: "Thumbi",
          images: [
            {
              url: "/assets/images/go-image2.jpg", // Add your default OG image here
              width: 1200,
              height: 630,
              alt: "Thumbi - UX Designer",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@githumbi_jk",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;

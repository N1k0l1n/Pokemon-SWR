import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Kreon } from "next/font/google";
import { Container } from "react-bootstrap";
import Head from 'next/head'


const anton = Kreon({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
          <Head>
        <title>Pokemon</title>
        <meta name="description" content="NextJS PokeDex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={anton.className}>
      <main>
        <Container className="py-4">
          <Component {...pageProps} />
        </Container>
      </main>
    </div>
    </>
  
  );
}

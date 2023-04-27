import Head from "next/head";

import { Navbar, Footer } from "../components";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

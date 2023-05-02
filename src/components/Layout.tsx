import Head from "next/head";

import { Navbar, Footer } from "../components";
import { AuthUserContext } from "next-firebase-auth";

type Props = {
  title: string;
  description: string;
  AuthUser: AuthUserContext;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
  title,
  description,
  AuthUser,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar AuthUser={AuthUser} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

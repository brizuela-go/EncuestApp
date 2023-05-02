// ./initAuth.js
import { init } from "next-firebase-auth";

let privateKey;

try {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (firebasePrivateKey) {
    privateKey = JSON.parse(firebasePrivateKey);
  }
} catch (error) {
  console.error("Error parsing Firebase private key:", error);
}

const { private_key } = privateKey || {};

const initAuth = () => {
  init({
    authPageURL: "/",
    appPageURL: "/dashboard",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL || "",
        // The private key must not be accessible on the client side.
        privateKey: private_key,
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
    },
    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    },
    cookies: {
      name: process.env.COOKIE_NAME, // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  });
};

export default initAuth;

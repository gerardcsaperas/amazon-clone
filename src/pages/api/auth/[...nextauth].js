import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // adapter: FirestoreAdapter({
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   appId: process.env.FIREBASE_APP_ID,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.FIREBASE_DATABASE_URL,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   // Optional emulator config (see below for options)
  //   emulator: {},
  // }),
})
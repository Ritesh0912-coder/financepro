
import { NextAuthOptions, Session } from "next-auth"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
// import EmailProvider from "next-auth/providers/email" // TODO: Temporarily disabled due to server configuration error (likely nodemailer dependency issue)
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import dbConnect from "@/lib/db"
import { User } from "@/models/User"
import { sendVerificationRequest } from "@/lib/auth-send-request"

export const authOptions: NextAuthOptions = {
    // adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        /*
        // TEMPORARILY DISABLED: Causes server configuration error (likely nodemailer dependency issue)
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            // sendVerificationRequest,
        }),
        */
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                await dbConnect();

                const user = await User.findOne({ email: credentials.email }).select("+password");

                if (!user) {
                    throw new Error("Invalid credentials");
                }

                const isMatch = await user.comparePassword(credentials.password);

                if (!isMatch) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    themeColor: user.themeColor,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }: { token: any, user?: any, trigger?: string, session?: any }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.themeColor = (user as any).themeColor;
            }

            if (trigger === "update" && session?.themeColor) {
                token.themeColor = session.themeColor;
            }

            // Enforce Admin Role for specific email
            if (token.email === 'coder9184@gmail.com') {
                token.role = 'admin';
            }

            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
                (session.user as any).themeColor = token.themeColor;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
    },
    events: {
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
}

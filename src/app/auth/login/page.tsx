'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Attempt to sign in with credentials (email & password)
        await signIn("credentials", { email, password, callbackUrl: "/user/profile" });
        setLoading(false);
    };

    const handleEmailLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        await signIn("email", { email, callbackUrl: "/user/profile" });
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        await signIn("google", { callbackUrl: "/user/profile" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060010] p-4">
            <Card className="w-full max-w-md bg-[#1a1f2e] border-slate-700/50 text-white">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                    <div className="text-sm text-slate-400">Sign in to your account</div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Button
                        variant="outline"
                        className="w-full h-12 bg-white text-black hover:bg-slate-200 border-0 font-semibold text-lg flex items-center justify-center gap-3"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        {/* Simple Google G logo */}
                        <svg className="h-6 w-6" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#1a1f2e] px-2 text-slate-500">Or continue with Magic Link</span>
                        </div>
                    </div>

                    <form onSubmit={handleCredentialsLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-[#0f1523] border-slate-700 focus:border-indigo-500 text-white h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-[#0f1523] border-slate-700 focus:border-indigo-500 text-white h-12"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg"
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full text-slate-400 hover:text-white"
                            onClick={handleEmailLogin}
                            disabled={loading || !email}
                        >
                            Or send a Magic Link to your email
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/" className="text-slate-500 hover:text-white text-sm">
                        Back to Home
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

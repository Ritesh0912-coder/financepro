import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions) as Session | null;
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { themeColor } = await req.json();

        if (!themeColor || typeof themeColor !== 'string') {
            return NextResponse.json({ error: "Invalid theme color" }, { status: 400 });
        }

        await dbConnect();
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { themeColor },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            themeColor: updatedUser.themeColor
        });

    } catch (error) {
        console.error('Update Theme Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

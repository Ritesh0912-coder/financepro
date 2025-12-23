'use server';

import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { News } from "@/models/News";

export async function getAdminStats() {
    try {
        await dbConnect();

        const userCount = await User.countDocuments();
        const newsCount = await News.countDocuments();

        // For now, we'll mock system health and active users/articles growth
        // In a real app, you'd calculate these based on 'createdAt' timestamps
        const stats = {
            totalUsers: userCount,
            totalArticles: newsCount,
            systemHealth: 98.9, // Mocked
        };

        return { success: true, data: stats };
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        return { success: false, error: "Failed to fetch stats" };
    }
}

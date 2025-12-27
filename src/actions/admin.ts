'use server';

import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { News } from "@/models/News";
import { Contact } from "@/models/Contact";
import { Category } from "@/models/Category"; // Import Category
import { GlobalIndicator } from "@/models/GlobalIndicator"; // Import GlobalIndicator

export async function getAdminStats() {
    try {
        await dbConnect();

        const userCount = await User.countDocuments();
        const totalArticles = await News.countDocuments();
        const activeArticles = await News.countDocuments({ status: 'published' });

        // For now, we'll mock system health and active users/articles growth
        // In a real app, you'd calculate these based on 'createdAt' timestamps
        const stats = {
            totalUsers: userCount,
            totalArticles: activeArticles, // Show active in dashboard widget
            totalArticlesDb: totalArticles,
            systemHealth: 98.9, // Mocked
        };

        return { success: true, data: stats };
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        return { success: false, error: "Failed to fetch stats" };
    }
}

export async function getContactMessages() {
    try {
        await dbConnect();
        const messages = await Contact.find().sort({ createdAt: -1 });
        // Serialize for client comp
        const serialized = messages.map(msg => ({
            id: msg._id.toString(),
            name: `${msg.firstName} ${msg.lastName}`,
            email: msg.email,
            subject: msg.subject,
            message: msg.message,
            date: msg.createdAt.toISOString(),
            read: msg.read || false
        }));

        return { success: true, data: serialized };
    } catch (error) {
        console.error("Error fetching messages:", error);
        return { success: false, error: "Failed to fetch messages" };
    }
}

export async function getAllNews() {
    try {
        await dbConnect();
        const news = await News.find().sort({ publishedAt: -1 });

        const serialized = news.map(item => ({
            id: item._id.toString(),
            title: item.title,
            category: item.category,
            source: item.source,
            publishedAt: item.publishedAt ? new Date(item.publishedAt).toLocaleString() : 'N/A',
            views: item.views || 0,
            hasSummary: !!item.summary,
            isBreaking: item.isBreaking,
            isFeatured: item.isFeatured,
            status: item.status || 'published'
        }));

        return { success: true, data: serialized };
    } catch (error) {
        console.error("Error fetching news:", error);
        return { success: false, error: "Failed to fetch news" };
    }
}

import { fetchFinanceNews } from '@/lib/news-api';

// Manual News Creation
export async function createNews(formData: any) {
    try {
        await dbConnect();

        // Basic validation
        if (!formData.title || !formData.content) {
            return { success: false, error: "Title and Content are required" };
        }

        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        const newNews = await News.create({
            title: formData.title,
            slug: slug,
            content: formData.content,
            summary: formData.summary,
            source: formData.source || 'Global Finance',
            category: formData.category || 'General',
            imageUrl: formData.imageUrl,
            status: 'published',
            author: 'Admin',
            publishedAt: new Date(),
            isFeatured: formData.isFeatured || false,
            isBreaking: formData.isBreaking || false,
        });

        return { success: true, data: newNews };
    } catch (error) {
        console.error("Error creating news:", error);
        return { success: false, error: "Failed to create news article" };
    }
}

export async function syncNews() {
    try {
        console.log("Starting manual news sync...");
        await fetchFinanceNews(1, 20);
        return { success: true, message: "News sync triggered successfully" };
    } catch (error) {
        console.error("Sync error:", error);
        return { success: false, error: "Failed to sync news" };
    }
}

// --- Categories Actions ---

export async function getCategories() {
    try {
        await dbConnect();
        const categories = await Category.find().sort({ order: 1 });
        const serialized = categories.map(cat => ({
            id: cat._id.toString(),
            name: cat.name,
            slug: cat.slug,
            isActive: cat.isActive,
            count: 0 // Placeholder count
        }));
        return { success: true, data: serialized };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, error: "Failed to fetch categories" };
    }
}

export async function createCategory(name: string) {
    try {
        await dbConnect();
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const newCat = await Category.create({ name, slug });
        return { success: true, data: { id: newCat._id.toString(), name: newCat.name } };
    } catch (error) {
        return { success: false, error: "Failed to create category" };
    }
}

export async function deleteCategory(id: string) {
    try {
        await dbConnect();
        await Category.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete category" };
    }
}

// --- Global Indicator Actions ---

export async function getGlobalIndicators() {
    try {
        await dbConnect();
        const indicators = await GlobalIndicator.find().sort({ country: 1 });
        const serialized = indicators.map(ind => ({
            id: ind._id.toString(),
            country: ind.country,
            indicatorType: ind.indicatorType, // Fixed property name
            value: ind.value,
            unit: ind.unit,
            period: ind.period,
            lastUpdated: ind.lastUpdated.toISOString()
        }));
        return { success: true, data: serialized };
    } catch (error) {
        return { success: false, error: "Failed to fetch indicators" };
    }
}

export async function createGlobalIndicator(data: any) {
    try {
        await dbConnect();
        const newInd = await GlobalIndicator.create(data);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to create indicator" };
    }
}

export async function deleteGlobalIndicator(id: string) {
    try {
        await dbConnect();
        await GlobalIndicator.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete indicator" };
    }
}

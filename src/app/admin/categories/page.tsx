'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Newspaper,
    Globe,
    Tags,
    Plus,
    Trash2,
    Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCategories, createCategory, deleteCategory } from '@/actions/admin';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [creating, setCreating] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        const res = await getCategories();
        if (res.success && res.data) {
            setCategories(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        setCreating(true);
        const res = await createCategory(newCategoryName);
        if (res.success) {
            setNewCategoryName('');
            fetchCategories();
        } else {
            alert('Failed to create category');
        }
        setCreating(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        const res = await deleteCategory(id);
        if (res.success) {
            fetchCategories();
        } else {
            alert('Failed to delete category');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header - Reused from other admin pages */}
            <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
                <div className="flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <LayoutDashboard className="h-6 w-6 text-cyan-400" />
                            <span className="text-lg font-bold text-white">Admin Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="outline" size="sm">View Site</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-slate-800 bg-slate-900/50 p-4">
                    <nav className="space-y-2">
                        <Link href="/admin/dashboard">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                <LayoutDashboard className="h-5 w-5" />
                                Dashboard
                            </div>
                        </Link>
                        <Link href="/admin/news">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                <Newspaper className="h-5 w-5" />
                                News Management
                            </div>
                        </Link>
                        <Link href="/admin/categories">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-purple-500/20 text-purple-400 font-medium">
                                <Tags className="h-5 w-5" />
                                Categories
                            </div>
                        </Link>
                        <Link href="/admin/global-tracker">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                <Globe className="h-5 w-5" />
                                Global Tracker
                            </div>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Categories</h1>
                            <p className="text-slate-400">Manage news categories</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* List */}
                        <Card>
                            <CardContent className="p-0">
                                <div className="p-4 border-b border-slate-800 font-medium text-slate-400">
                                    Existing Categories
                                </div>
                                {loading ? (
                                    <div className="p-8 text-center text-slate-500">Loading...</div>
                                ) : categories.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500">No categories found.</div>
                                ) : (
                                    <div className="divide-y divide-slate-800">
                                        {categories.map((cat) => (
                                            <div key={cat.id} className="flex items-center justify-between p-4 hover:bg-slate-900/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                                        <Tags className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{cat.name}</p>
                                                        <p className="text-xs text-slate-500"> Slug: {cat.slug}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                    onClick={() => handleDelete(cat.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Create Form */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-medium text-white mb-4">Add New Category</h3>
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Category Name</label>
                                        <Input
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            placeholder="e.g. Technology"
                                            className="bg-slate-900 border-slate-700 text-white"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={creating || !newCategoryName.trim()}>
                                        {creating ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                                        Create Category
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}

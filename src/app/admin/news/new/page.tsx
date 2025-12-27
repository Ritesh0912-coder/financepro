'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { createNews } from '@/actions/admin';
import Link from 'next/link';

export default function NewNewsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        summary: '',
        category: 'Economy',
        source: 'Global Finance',
        imageUrl: '',
        isBreaking: false,
        isFeatured: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await createNews(formData);

        if (res.success) {
            router.push('/admin/news');
        } else {
            alert("Failed to create news: " + res.error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/news">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Add News Article</h1>
                </div>

                <div className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-300">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-[#0f1218] border-slate-700 text-white"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-slate-300">Category</Label>
                                <Select
                                    id="category" // Pass id for label accessibility
                                    options={[
                                        { value: 'Economy', label: 'Economy' },
                                        { value: 'Stocks', label: 'Stocks' },
                                        { value: 'Crypto', label: 'Crypto' },
                                        { value: 'Forex', label: 'Forex' },
                                        { value: 'Commodities', label: 'Commodities' }
                                    ]}
                                    value={formData.category}
                                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    placeholder="Select Category"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="source" className="text-slate-300">Source</Label>
                                <Input
                                    id="source"
                                    value={formData.source}
                                    onChange={handleChange}
                                    className="bg-[#0f1218] border-slate-700 text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="imageUrl" className="text-slate-300">Image URL (Optional)</Label>
                            <Input
                                id="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="bg-[#0f1218] border-slate-700 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="summary" className="text-slate-300">Summary (Short Description)</Label>
                            <Textarea
                                id="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                className="bg-[#0f1218] border-slate-700 text-white h-20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-slate-300">Full Content</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="bg-[#0f1218] border-slate-700 text-white h-48"
                                required
                            />
                        </div>

                        <div className="flex gap-8">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isBreaking"
                                    checked={formData.isBreaking}
                                    onCheckedChange={(c) => setFormData(prev => ({ ...prev, isBreaking: c as boolean }))}
                                />
                                <Label htmlFor="isBreaking" className="text-white">Breaking News</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isFeatured"
                                    checked={formData.isFeatured}
                                    onCheckedChange={(c) => setFormData(prev => ({ ...prev, isFeatured: c as boolean }))}
                                />
                                <Label htmlFor="isFeatured" className="text-white">Featured Article</Label>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
                            Publish Article
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

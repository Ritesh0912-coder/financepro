import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

async function getUsers() {
    await dbConnect();
    // Fetch all users, sorted by latest
    const users = await User.find({}).sort({ createdAt: -1 }).limit(50).lean();
    return JSON.parse(JSON.stringify(users));
}

export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Manage Users</h1>
                    <p className="text-slate-400">View and manage registered users.</p>
                </div>

                <Card className="bg-[#1a1f2e] border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-white">All Users ({users.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {users.map((user: any) => (
                                <div key={user._id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={user.image} />
                                            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-white font-medium">{user.name}</p>
                                            <p className="text-sm text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant="outline" className={user.role === 'admin' ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-slate-700 text-slate-300"}>
                                            {user.role}
                                        </Badge>
                                        <span className="text-xs text-slate-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

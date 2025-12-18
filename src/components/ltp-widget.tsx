import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, LineChart, TrendingUp } from 'lucide-react';

export default function LtpWidget() {
    return (
        <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1218] border-orange-900/30 overflow-hidden sticky top-24">
            <div className="absolute top-0 right-0 p-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                        <LineChart className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                        <CardTitle className="text-xl text-white">LTP Calculator</CardTitle>
                        <CardDescription className="text-orange-200/60">Community Tool</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <p className="text-sm text-slate-400">
                        Join the massive <strong>Investing Daddy</strong> community and access the powerful LTP Calculator for precision trading.
                    </p>
                    <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside marker:text-orange-500">
                        <li>Reversal Predictions</li>
                        <li>Imaginary Line Concepts</li>
                        <li>Live Market Analysis</li>
                    </ul>
                </div>

                <Link href="https://ltpcalculator.com/" target="_blank" className="block">
                    <Button className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold shadow-lg shadow-orange-900/20 h-12">
                        Open LTP Calculator <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </Link>

                <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs text-center text-slate-500">
                        For option chain analysis & accurate support/resistance levels.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

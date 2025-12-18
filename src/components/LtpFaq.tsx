'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';

const FAQ_ITEMS = [
    {
        question: "What is the LTP Calculator?",
        answer: "The LTP Calculator is a tool for investors and traders to make informed decisions by understanding the intricacies of the stock market. Developed by Dr. Vinay Prakash Tiwari, the calculator is based on a comprehensive set of theories and calculations from his 15 years of experience in market analysis."
    },
    {
        question: "Who is Dr. Vinay Prakash Tiwari?",
        answer: "Dr. Vinay Prakash Tiwari is a finance expert with over 15 years of experience in market analysis. He is the founder of www.ltpcalculator.com and www.investingdaddy.com. Dr. Tiwari developed the LTP Calculator to assist traders and investors navigate the complexities of the stock market."
    },
    {
        question: "What features does the LTP Calculator offer?",
        answer: "The LTP Calculator introduces six types of reversals, the concept of the imaginary line, and provides illustrations of possible market movements based on open interest and volume with the Chart of Accuracy (COA). It also offers daily handpicked stocks and strategies for arbitrage trading."
    },
    {
        question: "What are the six types of reversals identified by the LTP Calculator?",
        answer: "The six types of reversals identified by the LTP Calculator are: Resistance, Support, Extension of Resistance, Extension of Support, Diversion, and End of Diversion. These reversals provide insights into future stock and index movements within the future and options segment."
    },
    {
        question: "What is the concept of the imaginary line in the LTP Calculator?",
        answer: "The imaginary line concept introduced by Dr. Tiwari helps in understanding the underlying dynamics of the stock market. This concept is instrumental in interpreting the various patterns and trends in market behavior."
    },
    {
        question: "What is the Chart of Accuracy (COA) in the LTP Calculator?",
        answer: "The COA in the LTP Calculator is a comprehensive illustration of possible market movements based on open interest and volume. COA 1.0 and COA 2.0 provide definitive references for market analysis and prediction."
    },
    {
        question: "What are ‘idaddy picks’ in the LTP Calculator?",
        answer: "‘idaddy picks’ are handpicked stocks that are selected based on the principles outlined in the LTP Calculator. These stocks offer excellent trading opportunities on a daily basis."
    },
    {
        question: "What is the role of Open Interest in the LTP Calculator?",
        answer: "Open Interest plays a crucial role in the LTP Calculator. It forms the basis of the Chart of Accuracy and is used to guide market direction during periods of divergence, thus aiding investors and traders in their decision-making process."
    },
    {
        question: "What is arbitrage trading as mentioned in the LTP Calculator?",
        answer: "Arbitrage trading is a strategy that involves the simultaneous purchase and sale of an asset to profit from a difference in the price. It is considered a risk-free profit strategy and is one of the features offered by the LTP Calculator."
    },
    {
        question: "Can the LTP Calculator help beginners in trading?",
        answer: "Absolutely, the LTP Calculator is designed to aid not just seasoned traders but also beginners. It provides comprehensive tools and knowledge for anyone willing to learn and understand the workings of the stock market."
    },
    {
        question: "What kind of results can I expect from using the LTP Calculator?",
        answer: "The LTP Calculator empowers you with knowledge and strategies to navigate the stock market confidently. While the results may vary based on individual usage and market conditions, the tool aims to enhance your understanding and decision-making abilities in trading."
    },
    {
        question: "Where can I contact for more information about the LTP Calculator?",
        answer: "For more information, you can reach out to us on our toll-free number 1800309066, or email us at info@ltpcalculator.com. You can also follow us on our Twitter handle @daddyinvesting or visit our YouTube channel www.youtube.com/ltpcalculator for more insights."
    }
];

export function LtpFaq() {
    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
                        <HelpCircle className="mr-1 h-3 w-3" />
                        Common Queries
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Have a question? Check out the FAQ
                    </h2>
                    <p className="text-slate-400">
                        Everything you need to know about the LTP Calculator and its theories.
                    </p>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {FAQ_ITEMS.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <Accordion type="single" collapsible className="w-full bg-[#1a1f2e]/40 border border-slate-800 rounded-xl hover:border-orange-500/30 transition-colors">
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="border-none px-4"
                                >
                                    <AccordionTrigger className="text-white hover:text-orange-400 text-left font-medium py-4">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-400 leading-relaxed pb-4">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

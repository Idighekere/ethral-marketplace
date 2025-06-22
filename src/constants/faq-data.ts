export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export type FAQData = FAQItem[];

export const sampleFAQs: FAQData = [
    {
        id: "faq-1",
        question: "What is Ethral Marketplace?",
        answer: "Ethral Marketplace is a platform that connects brands with influencers for authentic and effective marketing campaigns. We provide a seamless experience for both brands and creators to collaborate and grow together."
    },
    {
        id: "faq-2",
        question: "How do I get started as a brand?",
        answer: "Getting started as a brand is simple. Just create your account, complete your brand profile, and start exploring our network of influencers. You can post campaigns, review applications, and manage your collaborations all in one place."
    },
    {
        id: "faq-3",
        question: "How do I join as an influencer?",
        answer: "To join as an influencer, sign up for an account, complete your profile with your social media statistics and content examples, and start applying to campaigns that match your niche and interests."
    },
    {
        id: "faq-4",
        question: "What are the fees?",
        answer: "Our fee structure is transparent and competitive. We take a small percentage of successful collaborations to maintain and improve our platform. Exact fees depend on your membership tier and campaign volume."
    },
    {
        id: "faq-5",
        question: "How do you ensure quality collaborations?",
        answer: "We maintain high standards through our vetting process for both brands and influencers, performance metrics tracking, and a review system that helps maintain accountability and transparency in all collaborations."
    }
];

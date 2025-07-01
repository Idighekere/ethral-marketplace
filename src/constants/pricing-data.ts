  export interface IPricingPlans {
id:string;
name:"Free"|"Pro"|"Premium"|'Pro+';
monthlyPrice:{
  quaterly:string;
  yearly:string;}
  totalPrice:{
  quaterly:string;
  yearly:string;
};
period:string
description:string;
badge:string;
features:string[];
buttonText:string;
popular:boolean
  }


export const PRICING_PLANS:IPricingPlans[] = [
  // {
  //   "id":"free",
  //   "name": "Free",
  //   "price": {
  //     monthly: 0,
  //     yearly: 0,
  //   },
  //   "period": "",
  //   "description": "Discount on annual billing",
  //   "badge": "Free for this month",
  //   "features": ["2 KOL Contracts/month", "Chart & Negotiate with KOLs"],
  //   "buttonText": "Get Started",
  //   "popular": false,
  // },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: {
      quaterly:'550',
      yearly:'440'
    },
    totalPrice:{
      quaterly:'1,650',
      yearly:'5,280'
    },
    period: "/month",
    description: "For early-stage teams launching their first campaigns",
    badge: "Free for this month",
    features: [
      "Contact up to 15 KOLs per month",
      "Post up to 2 campaigns per month",
      "Advanced filters: blockchain and niche targeting",
      "Access to creator chat and negotiation",'Escrow-based payments with dispute support','Access to Verified KOL marketplace','Priority suppport within 24 hours'
    ],
    buttonText: "Choose Pro",
    popular: true,
  },
  {
    id: "pro-plus",
    name: "Pro+",
    monthlyPrice: {
      quaterly:'850',
      yearly:'680'
    },
    totalPrice:{
      quaterly:'2,550',
      yearly:'8,160'
    },
    period: "/month",
    description: "For growing projects that want expert-level execution",
    badge: "Free for this month",
    features: [
      "Everything in Pro, plus:",
      "AI-genersted campaign brief assistant",
      "Done-for-yu KOL shortlist matched by niche,chain and past performance",
      "Boosted campaign placement on homepage",'Custom bried reviews before campaigns go live','Access to closed campaigns','Contact up to 20 KOLs/Month'
    ],
    buttonText: "Choose Pro+",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: {
      quaterly:'1,200',
      yearly:'960'
    },
    totalPrice:{
      quaterly:'3,600',
      yearly:'11,500'
    },
    period: "/month",
    description: "For chains, DAOs, and Web3 brands scaling KOL startegy across multiple verticals",
    badge: "Free for this month",
    features: [
      "Everything in Pro+ plus:",
      "White-glove onboarding for campaign strategy ",
      "Verified Brand badge for visibility and trust",
      "Early access to premium creator network",
      "Dedicated account manager",
      "Web3 marketing advisory",
    ],
    buttonText: "Choose Premium",
    popular: false,
  },
]

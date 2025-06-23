  export interface IPricingPlans {
id:string;
name:"Free"|"Pro"|"Premium";
price:{
  monthly:number;
  yearly:number;
};
period:string
description:string;
badge:string;
features:string[];
buttonText:string;
popular:boolean
  }


export const PRICING_PLANS:IPricingPlans[] = [
  {
    "id":"free",
    "name": "Free",
    "price": {
      monthly: 0,
      yearly: 0,
    },
    "period": "",
    "description": "Discount on annual billing",
    "badge": "Free for this month",
    "features": ["2 KOL Contracts/month", "Chart & Negotiate with KOLs"],
    "buttonText": "Get Started",
    "popular": false,
  },
  {
    id: "pro",
    name: "Pro",
    price: {
      monthly:199,
      yearly:179
    },
    period: "/month",
    description: "$1.910 billed yearly",
    badge: "Free for this month",
    features: [
      "20 KOL Access/month",
      "2 Campaign Listings/month",
      "Filter: Blockchain & Niche",
      "Pre-contract Chart & Negotiation",
    ],
    buttonText: "Get Started",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: {
      monthly: 266,
      yearly: 239,
    },
    period: "/month",
    description: "$2.55 billed yearly",
    badge: "Free for this month",
    features: [
      "50 KOL Contract/month",
      "Unlimited Campaigns",
      "Advanced Filter: Nationality, Age, Blockchain, Niche",
      "Reduced KOL Fee (2%)",
      "Priority Support",
      "Hire Ambassadors",
    ],
    buttonText: "Get Started",
    popular: false,
  },
]

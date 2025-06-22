  export interface IPricingPlans {
id:number;
name:"Free"|"Pro"|"Premium";
price:string;
period:string
description:string;
badge:string;
features:string[];
buttonText:string;
popular:boolean
  }


export const PRICING_PLANS:IPricingPlans[] = [
  {
    "id": 1,
    "name": "Free",
    "price": "0",
    "period": "",
    "description": "Discount on annual billing",
    "badge": "Free for this month",
    "features": ["2 KOL Contracts/month", "Chart & Negotiate with KOLs"],
    "buttonText": "Get Started",
    "popular": false,
  },
  {
    id: 2,
    name: "Pro",
    price: "199",
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
    id: 3,
    name: "Premium",
    price: "266",
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

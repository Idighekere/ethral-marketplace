import type { Feature } from "@/types"

export const FEATURES_DATA:Feature[] = [
  {
    id: "star",
    title: "Find and Hire Influencers in Seconds on the Marketplace",
    description:
      "Search thousands of verified influencers, filter by niche and audience demographics, and connect instantly.",
    points: [
      {
        title: "Search Influencers",
        description:
          "Search thousands of vetted Instagram, TikTok, and YouTube influencers.",
      },
      {
        title: "Purchase & Chat Securely",
        description:
          "Safely purchase and communicate through Ethral. We hold your payment until the work is completed.",
      },
      {
        title: "Receive Quality Content",
        description:
          "Receive your high-quality content from influencers directly through the platform.",
      },
    ],
    image: "/stars-section-image.png",
    imageAlt: "Ethral Star search interface",
  },
  {
    id: "campaigns",
    title: "Post Campaigns and Have 200,000+ Influencers Come to You",
    description: "Create campaign briefs and let our network of 200,000+ influencers apply to work with your brand.",
    points: [
      {
        title: "Set Targeting",
        description:
          "Specify demographics including niche, location and following size of the influencers you want to target.",
      },
      {
        title: "Post Campaign",
        description:
          "Centralize your images, requirements, and more in a campaign brief sent to 200,000 influencers.",
      },
      {
        title: "Influencers Apply",
        description:
          "Targeted influencers submit their pricing, and you choose who to collaborate with.",
      },
    ],
    image: "/campaigns-section-image.png",
    imageAlt: "Campaign creation and management interface",
  },
  {
    id: "analytics",
    title: "Track Post Analytics and Performance in Real Time",
    description:
      "Monitor campaign performance with detailed analytics and insights to optimize your influencer marketing ROI.",
    points: [
      {
        title: "One-Click Tracking",
        description:
          "Track Instagram, TikTok, and YouTube content in real time from a single dashboard. Say goodbye to manual tracking and messy spreadsheets.",
      },
      {
        title: "Advanced Analytics Reporting",
        description:
          "Analyze content performance over time, including impressions, engagement and more. Organize performance by campaign and effortlessly build reports.",
      },
      {
        title: "Fully Automated",
        description:
          "Metrics are updated every 24 hours, ensuring performance data is always up-to-date.",
      },
    ],
    image: "/analytics-section-image.png",
    imageAlt: "Real-time analytics dashboard",
  },
]

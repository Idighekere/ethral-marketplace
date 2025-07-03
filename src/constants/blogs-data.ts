
export interface IBlog {
    id:        string;
    slug:      string;
    title:     string;
    thumbnail: string;
    category:  string;
    type:      string;
    excerpt:   string;
}


export const SAMPLE_BLOG:IBlog[]=[
    {
    "id":"1",
    "slug":"blog-1",
    "title":"The Future of DeFi",
    "thumbnail":"/blog-1.png",
    "category":"Research",
    "type":".Doc",
    "excerpt":"How DeFi protocols are revolutionizing financial services with new lending and yield opportunities."
},
{
    "id":"2",
    "slug":"blog-2",
    "title":"NFT Marketing Strategies",
    "thumbnail":"/blog-2.png",
    "category":"Marketing",
    "type":".Guide",
    "excerpt":"Proven strategies for launching successful NFT projects and building lasting communities."
},
{
    "id":"3",
    "slug":"blog-3",
    "title":"Layer 2 Solutions Explained",
    "thumbnail":"/blog-3.png",
    "category":"Technical",
    "type":".Analysis",
    "excerpt":"Understanding Ethereum scaling solutions like Polygon, Arbitrum, and their impact on gas fees."
},
{
    "id":"4",
    "slug":"blog-4",
    "title":"Web3 Influencer Marketing Guide",
    "thumbnail":"/blog-4.png",
    "category":"Strategy",
    "type":".Guide",
    "excerpt":"Essential strategies for finding and collaborating with crypto-native creators."
},
]

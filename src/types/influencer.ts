export interface InfluencerDetailsType {
    id:                string;
    name:              string;
    title:             string;
    location:          Location;
    followers:         number;
    price:             number;
    bio:               string;
    avatar:            string;
    photos:            string[];
    packages:          Package[];
    pows:               string[];
    reviews:           Review[];
    faqs:               FAQ[];
    relatedCategories: string[];
}

export interface FAQ {
    id:       string;
    question: string;
    answer:   string;
}

export interface Location {
    city:    string;
    country: string;
}

export interface Package {
    id:          string;
    title:       string;
    price:       number;
    description: string;
}

export interface Review {
    id:string;
    name:   string;
    avatar: string;
    title:  string;
    review: string;
    rating: number;
}

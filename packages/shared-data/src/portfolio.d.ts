export declare const profile: {
    name: string;
    shortName: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    phoneLink: string;
    linkedin: string;
    github: string;
    summary: string;
    objective: string;
    cvAvailable: boolean;
};
export declare const experiences: {
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    type: string;
    highlights: string[];
    tech: string[];
}[];
export declare const education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    grade: string;
    field: string;
}[];
export declare const skillCategories: {
    category: string;
    skills: {
        name: string;
        level: number;
    }[];
}[];
export declare const projects: ({
    id: string;
    title: string;
    category: string;
    featured: boolean;
    description: string;
    tech: string[];
    github: null;
    highlights: string[];
} | {
    id: string;
    title: string;
    category: string;
    featured: boolean;
    description: string;
    tech: string[];
    github: string;
    highlights: string[];
})[];
export declare const responsibilities: string[];

export type Project = {
    id: string;
    name: string;
    description: string;
    tags: string[];
    repoUrl?: string;
    liveUrl?: string;
    image?: string;
    video?: string;
    gallery?: string[];
    featured: boolean;
    order: number;
    enabled: boolean;
};

export type Skill = {
    id: string;
    name: string;
    order: number;
};

export type SkillGroup = {
    id: string;
    name: string;
    order: number;
    skills: Skill[];
};

export type AboutStat = {
    value: string;
    suffix: string;
    label: string;
};

export type AboutDetail = {
    label: string;
    value: string;
};

export type About = {
    bio: string[];
    stats: AboutStat[];
    details: AboutDetail[];
};

export type ContactItemType = 'email' | 'github' | 'linkedin' | 'x' | 'link';

export type ContactItem = {
    label: string;
    value: string;
    href: string;
    type: ContactItemType;
};

export type Contact = {
    items: ContactItem[];
};

export type Settings = {
    cvUrl: string;
};

export type PortfolioContent = {
    projects: Project[];
    skillGroups: SkillGroup[];
    about: About;
    contact: Contact;
    settings: Settings;
};
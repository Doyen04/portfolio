import type { PortfolioContent } from '@/types/content';

export const defaultContent: PortfolioContent = {
    projects: [
        {
            id: 'unplug',
            name: 'Unplug',
            description:
                'Subscription waste detection SaaS — AI-powered classification, virtual card issuance per subscription, one-click cancellation',
            tags: ['Next.js', 'Gemini AI', 'Prisma', 'Neon'],
            repoUrl: 'https://github.com/Doyen04/Unplug',
            liveUrl: undefined,
            featured: true,
            order: 1,
            enabled: true,
        },
        {
            id: 'echelon',
            name: 'Echelon',
            description:
                'University admin dashboard with Senate approval workflows and multi-channel parent alerts (WhatsApp → Email → SMS)',
            tags: ['Next.js', 'Termii', 'QStash', 'Prisma'],
            repoUrl: 'https://github.com/Doyen04/ECHELON',
            liveUrl: undefined,
            featured: true,
            order: 2,
            enabled: true,
        },
        {
            id: 'catalyst-reactor',
            name: 'Catalyst Reactor',
            description:
                'Figma-inspired collaborative browser design tool with CanvasKit canvas engine and real-time state',
            tags: ['React', 'CanvasKit', 'Zustand', 'TypeScript'],
            repoUrl: 'https://github.com/Doyen04/CatalystReactor',
            liveUrl: undefined,
            featured: true,
            order: 3,
            enabled: true,
        },
        {
            id: 'carrom-pool',
            name: 'Carrom Pool',
            description:
                'Physics-based Carrom Pool game in the browser with accurate rigid-body simulation',
            tags: ['JavaScript', 'Matter.js', 'Canvas'],
            repoUrl: 'https://github.com/Doyen04/CARROM_POOL',
            liveUrl: undefined,
            featured: true,
            order: 4,
            enabled: true,
        },
    ],
    skillGroups: [
        {
            id: 'g1',
            name: 'Languages',
            order: 1,
            skills: [
                { id: 's1', name: 'TypeScript', order: 1 },
                { id: 's2', name: 'JavaScript', order: 2 },
                { id: 's3', name: 'HTML5', order: 3 },
                { id: 's4', name: 'CSS3', order: 4 },
                { id: 's5', name: 'SQL', order: 5 },
            ],
        },
        {
            id: 'g2',
            name: 'Frameworks',
            order: 2,
            skills: [
                { id: 's6', name: 'Next.js 15', order: 1 },
                { id: 's7', name: 'React 18', order: 2 },
                { id: 's8', name: 'Tailwind CSS', order: 3 },
                { id: 's9', name: 'Konva.js', order: 4 },
            ],
        },
        {
            id: 'g3',
            name: 'Backend & DB',
            order: 3,
            skills: [
                { id: 's10', name: 'Node.js', order: 1 },
                { id: 's11', name: 'Prisma ORM', order: 2 },
                { id: 's12', name: 'Drizzle ORM', order: 3 },
                { id: 's13', name: 'PostgreSQL (Neon)', order: 4 },
            ],
        },
        {
            id: 'g4',
            name: 'AI & APIs',
            order: 4,
            skills: [
                { id: 's14', name: 'Google Gemini', order: 1 },
                { id: 's15', name: 'Anthropic Claude', order: 2 },
                { id: 's16', name: 'Termii', order: 3 },
                { id: 's17', name: 'Resend', order: 4 },
            ],
        },
        {
            id: 'g5',
            name: 'Infrastructure',
            order: 5,
            skills: [
                { id: 's18', name: 'Vercel', order: 1 },
                { id: 's19', name: 'Cloudflare R2', order: 2 },
                { id: 's20', name: 'Upstash QStash', order: 3 },
                { id: 's21', name: 'NextAuth v5', order: 4 },
            ],
        },
        {
            id: 'g6',
            name: 'Tooling',
            order: 6,
            skills: [
                { id: 's22', name: 'Git & GitHub', order: 1 },
                { id: 's23', name: 'GitHub Copilot', order: 2 },
                { id: 's24', name: 'VS Code', order: 3 },
            ],
        },
    ],
    about: {
        bio: [
            'I\u2019m a final-year Software Engineering student at Mountain Top University, Lagos, building real things before graduation. My focus is full-stack web development \u2014 I care as much about the experience a product creates as the code underneath it.',
            'I\u2019ve worked as a software intern at NSIA Insurance, led a team at a university hackathon, and spent most of my spare time shipping personal projects. My current obsession is Unplug \u2014 a subscription management SaaS I\u2019m building as my final year project.',
            'I\u2019m looking for a developer role where I can contribute quickly, learn from experienced engineers, and keep building.',
        ],
        stats: [
            { value: '4', suffix: '+', label: 'Projects Shipped' },
            { value: '1', suffix: '+', label: 'Years Building' },
            { value: '∞', suffix: '', label: 'Curiosity' },
            { value: '1', suffix: '', label: 'Internship' },
        ],
        details: [
            { label: 'Education', value: 'Mountain Top University, 2026' },
            { label: 'Experience', value: 'Ex-intern @ NSIA Insurance' },
            { label: 'Location', value: 'Lagos, Nigeria' },
            { label: 'Availability', value: 'Open to remote & relocation' },
        ],
    },
    contact: {
        items: [
            {
                label: 'Email',
                value: 'oluwasolaopeyemi93@gmail.com',
                href: 'mailto:oluwasolaopeyemi93@gmail.com',
                type: 'email',
            },
            {
                label: 'GitHub',
                value: 'github.com/Doyen04',
                href: 'https://github.com/Doyen04',
                type: 'github',
            },
            {
                label: 'LinkedIn',
                value: 'linkedin.com/in/sola-opeyemi-ademola',
                href: 'https://www.linkedin.com/in/sola-opeyemi-ademola',
                type: 'linkedin',
            },
        ],
    },
    settings: {
        cvUrl: '/ademola%20oluwasola%20resume.pdf',
    },
};
export interface Athlete {
    id: string;
    name: string;
    title: string;
    achievements: string[];
    image: string; // Path to image in public folder
}

export const athletes: Athlete[] = [
    {
        id: 'george-digweed',
        name: 'George Digweed',
        title: '26x Campeón Mundial',
        achievements: ['Leyenda del Sporting Clay', 'MBE Award'],
        image: '/athletes/george-digweed.jpg'
    },
    {
        id: 'vincent-hancock',
        name: 'Vincent Hancock',
        title: '3x Medalla de Oro Olímpica',
        achievements: ['Record Mundial Skeet', 'USA Shooting Team'],
        image: '/athletes/vincent-hancock-v2.jpg'
    },
    {
        id: 'anthony-matarese',
        name: 'Anthony Matarese Jr.',
        title: 'Campeón Mundial',
        achievements: ['NSCA Hall of Fame', 'Instructor de Élite'],
        image: '/athletes/anthony-matarese-v2.jpg'
    },
    {
        id: 'amber-english',
        name: 'Amber English',
        title: 'Medalla de Oro Olímpica',
        achievements: ['Record Olímpico Skeet', 'US Army Marksmanship Unit'],
        image: '/athletes/amber-english.jpg'
    },
    {
        id: 'cory-kruse',
        name: 'Cory Kruse',
        title: 'Campeón Nacional US Open',
        achievements: ['Top Pro Shooter', 'Master Class'],
        image: '/athletes/cory-kruse.jpg'
    },
    {
        id: 'derrick-mein',
        name: 'Derrick Mein',
        title: 'Olímpico & Campeón Mundial',
        achievements: ['Experto en Múltiples Disciplinas', 'Team USA'],
        image: '/athletes/derrick-mein.jpg'
    }
];

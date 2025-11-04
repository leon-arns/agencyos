export interface Blueprint {
  id: number;
  name: string;
  description: string;
  category: "Web Development" | "Brand Design" | "Marketing" | "Consulting" | "SaaS" | "E-Commerce";
  type: "Template" | "Boilerplate" | "Design System" | "Component Library";
  projectType: "Einmalprojekt" | "Retainerprojekt";
  tags: string[];
  createdDate: string;
  lastUpdated: string;
  ticketCount: number;
  estimatedDuration: string; // e.g., "6-8 Wochen"
  teamSize: string; // e.g., "3-4 Personen"
  complexity: "Einfach" | "Mittel" | "Komplex";
  techStack: string[];
  previewImages: string[];
  demoUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  documentation?: string;
  author: {
    name: string;
    avatar?: string;
  };
  features: string[];
  components: string[];
  estimatedTimeToSetup: string; // e.g., "2-4 hours"
  license: "MIT" | "GPL" | "Commercial" | "Custom";
}

export const mockBlueprints: Blueprint[] = [
  {
    id: 1,
    name: "Website Komplett-Paket",
    description: "Vollständiges Website-Projekt mit Design, Entwicklung und Launch für Unternehmen.",
    category: "Web Development",
    type: "Template",
    projectType: "Einmalprojekt",
    tags: ["Website", "Design", "Entwicklung", "Launch"],
    createdDate: "2024-01-15",
    lastUpdated: "2024-10-20",
    ticketCount: 24,
    estimatedDuration: "6-8 Wochen", 
    teamSize: "3-4 Personen",
    complexity: "Mittel",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "CMS"],
    previewImages: ["/blueprints/website-komplett-1.jpg", "/blueprints/website-komplett-2.jpg"],
    demoUrl: "https://demo.website-komplett.com",
    githubUrl: "https://github.com/agency/website-template",
    figmaUrl: "https://figma.com/website-design",
    author: {
      name: "Max Mustermann",
      avatar: "/avatars/max.jpg"
    },
    features: [
      "Komplettes Design System",
      "Responsive Entwicklung",
      "CMS Integration",
      "SEO Optimierung",
      "Performance Optimierung",
      "Launch Support"
    ],
    components: [
      "Header & Navigation",
      "Hero Section",
      "Content Sections",
      "Contact Forms",
      "Footer"
    ],
    estimatedTimeToSetup: "6-8 Wochen",
    license: "Commercial"
  },
  {
    id: 2,
    name: "Monatlicher Marketing Support",
    description: "Kontinuierliche Marketing-Betreuung mit Content-Erstellung, Social Media und Kampagnen-Management.",
    category: "Marketing",
    type: "Template",
    projectType: "Retainerprojekt",
    tags: ["Marketing", "Content", "Social Media", "Kampagnen"],
    createdDate: "2024-02-10",
    lastUpdated: "2024-11-01",
    ticketCount: 12,
    estimatedDuration: "Laufend",
    teamSize: "2-3 Personen", 
    complexity: "Einfach",
    techStack: ["Social Media Tools", "Analytics", "Content Management", "Design Tools"],
    previewImages: ["/blueprints/marketing-retainer-1.jpg", "/blueprints/marketing-retainer-2.jpg"],
    documentation: "https://docs.marketing-retainer.com",
    author: {
      name: "Anna Schmidt",
      avatar: "/avatars/anna.jpg"
    },
    features: [
      "Monatliche Content-Planung",
      "Social Media Management",
      "Kampagnen-Entwicklung",
      "Analytics & Reporting",
      "Laufende Optimierung",
      "Strategische Beratung"
    ],
    components: [
      "Content Calendar",
      "Social Media Posts",
      "Campaign Materials",
      "Monthly Reports",
      "Strategy Sessions"
    ],
    estimatedTimeToSetup: "1-2 Wochen Onboarding",
    license: "Commercial"
  }
];
export interface Project {
  id: number;
  name: string;
  description: string;
  status: "Planning" | "In Progress" | "Review" | "Completed" | "On Hold";
  priority: "Low" | "Medium" | "High" | "Critical";
  client: string;
  clientLogo?: string;
  clientContact: {
    name: string;
    email: string;
    phone?: string;
    position: string;
  };
  projectManager: {
    name: string;
    email: string;
    phone?: string;
    role: string;
  };
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  team: string[];
  progress: number;
  category: "Web Development" | "Brand Design" | "Marketing" | "Consulting";
  isRetainer?: boolean;
}

export interface ExternalLink {
  title: string;
  url: string;
  platform: "figma" | "github" | "notion" | "slack" | "drive" | "custom";
  logoUrl?: string;
}

export interface Ticket {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: "Neu" | "Zu erledigen" | "In Abnahme" | "Erledigt";
  priority: "Low" | "Medium" | "High" | "Critical";
  assignee: string;
  reporter: string;
  createdAt: string;
  dueDate: string;
  tags: string[];
  estimatedHours: number;
  actualHours: number;
  screenshots?: string[];
  externalLinks?: ExternalLink[];
}

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "Website Relaunch Acme Corp",
    description: "Komplette Überarbeitung der Unternehmenswebsite mit modernem Design und verbesserter UX",
    status: "In Progress",
    priority: "High",
    client: "Acme Corp",
    clientLogo: "AC",
    clientContact: {
      name: "Michael Johnson",
      email: "m.johnson@acme-corp.com",
      phone: "+49 123 456-789",
      position: "Marketing Director"
    },
    projectManager: {
      name: "Max Mustermann",
      email: "max@agencyos.com",
      phone: "+49 555 100-001",
      role: "Senior Project Manager"
    },
    startDate: "2024-10-01",
    endDate: "2024-12-15",
    budget: 25000,
    spent: 12500,
    team: ["Max Mustermann", "Lisa Schmidt", "Tom Weber"],
    progress: 65,
    category: "Web Development"
  },
  {
    id: 2,
    name: "Brand Identity Startup XYZ",
    description: "Entwicklung einer vollständigen Markenidentität für Tech-Startup",
    status: "Review",
    priority: "Medium",
    client: "Startup XYZ",
    clientLogo: "XYZ",
    clientContact: {
      name: "Sarah Chen",
      email: "sarah@startup-xyz.com",
      phone: "+49 987 654-321",
      position: "CEO & Founder"
    },
    projectManager: {
      name: "Anna Müller",
      email: "anna@agencyos.com",
      phone: "+49 555 100-002",
      role: "Creative Director"
    },
    startDate: "2024-09-15",
    endDate: "2024-11-30",
    budget: 15000,
    spent: 13200,
    team: ["Anna Müller", "Peter Klein"],
    progress: 90,
    category: "Brand Design"
  },
  {
    id: 3,
    name: "E-Commerce Platform Migration",
    description: "Migration von Legacy-System zu moderner E-Commerce-Lösung",
    status: "Planning",
    priority: "Critical",
    client: "RetailMax GmbH",
    clientLogo: "RM",
    clientContact: {
      name: "Thomas Müller",
      email: "t.mueller@retailmax.de",
      phone: "+49 555 123-456",
      position: "IT Director"
    },
    projectManager: {
      name: "Sarah Johnson",
      email: "sarah@agencyos.com",
      phone: "+49 555 100-003",
      role: "Technical Lead"
    },
    startDate: "2024-11-15",
    endDate: "2025-03-01",
    budget: 45000,
    spent: 2000,
    team: ["Max Mustermann", "Sarah Johnson", "Mike Davis"],
    progress: 10,
    category: "Web Development"
  },
  {
    id: 4,
    name: "Marketing Campaign Q4",
    description: "Digitale Marketingkampagne für Weihnachtsgeschäft",
    status: "Completed",
    priority: "Medium",
    client: "Fashion Store",
    clientLogo: "FS",
    clientContact: {
      name: "Emma Rodriguez",
      email: "emma@fashion-store.com",
      position: "Marketing Manager"
    },
    projectManager: {
      name: "Lisa Schmidt",
      email: "lisa@agencyos.com",
      phone: "+49 555 100-004",
      role: "Marketing Specialist"
    },
    startDate: "2024-08-01",
    endDate: "2024-10-31",
    budget: 8000,
    spent: 7500,
    team: ["Lisa Schmidt", "Tom Weber"],
    progress: 100,
    category: "Marketing"
  },
  {
    id: 5,
    name: "Wartungsretainer Kunde B",
    description: "Monatlicher Wartungsretainer für Website-Pflege, Updates und kleinere Anpassungen",
    status: "In Progress",
    priority: "Medium",
    client: "Kunde B GmbH",
    clientLogo: "KB",
    clientContact: {
      name: "Marcus Weber",
      email: "m.weber@kunde-b.de",
      phone: "+49 444 555-666",
      position: "IT-Leiter"
    },
    projectManager: {
      name: "Tom Weber",
      email: "tom@agencyos.com",
      phone: "+49 555 100-005",
      role: "Technical Support Manager"
    },
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    budget: 12000,
    spent: 8200,
    team: ["Tom Weber", "Max Mustermann"],
    progress: 68,
    category: "Web Development",
    isRetainer: true
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 1,
    projectId: 1,
    title: "Homepage Design fertigstellen",
    description: "Responsive Design für Homepage mit Hero-Section und Feature-Übersicht. Das Design soll modern und ansprechend wirken, mit klarer Navigation und optimaler Darstellung auf allen Geräten. Besondere Aufmerksamkeit soll auf die Benutzerführung und Conversion-Optimierung gelegt werden.",
    status: "Zu erledigen",
    priority: "High",
    assignee: "Lisa Schmidt",
    reporter: "Max Mustermann",
    createdAt: "2024-10-15",
    dueDate: "2024-11-05",
    tags: ["Design", "Frontend", "Responsive"],
    estimatedHours: 16,
    actualHours: 12,
    screenshots: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400"
    ],
    externalLinks: [
      {
        title: "Figma",
        url: "#",
        platform: "figma"
      },
      {
        title: "Style Guide",
        url: "#",
        platform: "notion"
      }
    ]
  },
  {
    id: 2,
    projectId: 1,
    title: "Kontaktformular implementieren",
    description: "Backend-Integration für Kontaktformular mit Validierung",
    status: "Neu",
    priority: "Medium",
    assignee: "Tom Weber",
    reporter: "Max Mustermann",
    createdAt: "2024-10-20",
    dueDate: "2024-11-10",
    tags: ["Backend", "Form", "Validation"],
    estimatedHours: 8,
    actualHours: 0,
    externalLinks: [
      {
        title: "GitHub",
        url: "#",
        platform: "github"
      },
      {
        title: "API Docs",
        url: "#",
        platform: "notion"
      }
    ]
  },
  {
    id: 3,
    projectId: 2,
    title: "Logo-Varianten präsentieren",
    description: "3 verschiedene Logo-Konzepte für Kundenpräsentation vorbereiten",
    status: "In Abnahme",
    priority: "High",
    assignee: "Anna Müller",
    reporter: "Peter Klein",
    createdAt: "2024-09-20",
    dueDate: "2024-10-01",
    tags: ["Design", "Logo", "Branding"],
    estimatedHours: 12,
    actualHours: 14,
    screenshots: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400"
    ],
    externalLinks: [
      {
        title: "Figma",
        url: "#",
        platform: "figma"
      },
      {
        title: "Brand Assets",
        url: "#",
        platform: "drive"
      }
    ]
  },
  {
    id: 4,
    projectId: 3,
    title: "Anforderungsanalyse",
    description: "Detaillierte Analyse der bestehenden E-Commerce-Infrastruktur",
    status: "Neu",
    priority: "Critical",
    assignee: "Sarah Johnson",
    reporter: "Max Mustermann",
    createdAt: "2024-11-01",
    dueDate: "2024-11-20",
    tags: ["Analysis", "E-Commerce", "Migration"],
    estimatedHours: 24,
    actualHours: 4
  },
  {
    id: 5,
    projectId: 1,
    title: "SEO Optimierung",
    description: "Meta-Tags und strukturierte Daten implementieren",
    status: "Erledigt",
    priority: "Low",
    assignee: "Max Mustermann",
    reporter: "Lisa Schmidt",
    createdAt: "2024-10-10",
    dueDate: "2024-10-25",
    tags: ["SEO", "Meta-Tags", "Frontend"],
    estimatedHours: 6,
    actualHours: 5
  },
  {
    id: 6,
    projectId: 1,
    title: "Performance Testing",
    description: "Ladezeiten optimieren und Performance testen",
    status: "In Abnahme",
    priority: "Medium",
    assignee: "Tom Weber",
    reporter: "Max Mustermann",
    createdAt: "2024-10-25",
    dueDate: "2024-11-15",
    tags: ["Performance", "Testing", "Optimization"],
    estimatedHours: 10,
    actualHours: 8
  },
  {
    id: 7,
    projectId: 5,
    title: "WordPress Core Update",
    description: "Update auf WordPress 6.4 mit Plugin-Kompatibilitätsprüfung",
    status: "Erledigt",
    priority: "High",
    assignee: "Tom Weber",
    reporter: "Marcus Weber",
    createdAt: "2024-10-01",
    dueDate: "2024-10-05",
    tags: ["WordPress", "Update", "Security"],
    estimatedHours: 3,
    actualHours: 2
  },
  {
    id: 8,
    projectId: 5,
    title: "Backup-System prüfen",
    description: "Monatliche Überprüfung der automatischen Backups",
    status: "Zu erledigen",
    priority: "Medium",
    assignee: "Max Mustermann",
    reporter: "Tom Weber",
    createdAt: "2024-11-01",
    dueDate: "2024-11-10",
    tags: ["Backup", "Maintenance", "Monitoring"],
    estimatedHours: 2,
    actualHours: 0
  },
  {
    id: 9,
    projectId: 5,
    title: "Content-Updates November",
    description: "Aktualisierung der Produktpreise und neuer Blogbeitrag",
    status: "In Abnahme",
    priority: "Low",
    assignee: "Tom Weber",
    reporter: "Marcus Weber",
    createdAt: "2024-10-28",
    dueDate: "2024-11-15",
    tags: ["Content", "Updates", "Blog"],
    estimatedHours: 4,
    actualHours: 3
  }
];
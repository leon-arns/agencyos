"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { mockProjects, mockTickets, type Project, type Ticket, type ExternalLink } from "@/data/projects";
import { 
  ArrowLeft, 
  Calendar, 
  Wallet, 
  Users, 
  Clock,
  Edit,
  Archive,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  MessageSquare,
  FileText,
  TrendingUp,
  Activity,
  Building,
  Mail,
  Phone,
  ExternalLink as ExternalLinkIcon,
  Globe,
  MessageCircle,
  FolderOpen,
  Link,
  ChevronDown,
  Download,
  FileImage,
  FileVideo,
  Upload,
  HardDrive,
  User,
  Trash2,
  Hourglass

} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock activity data
const mockActivities = [
  {
    id: 1,
    type: "status_change",
    description: "Status geändert von 'Planung' zu 'In Bearbeitung'",
    user: "Max Mustermann",
    timestamp: "2024-11-01T14:30:00Z",
    icon: Play
  },
  {
    id: 2,
    type: "comment",
    description: "Kommentar hinzugefügt: 'Design-Review abgeschlossen'",
    user: "Lisa Schmidt",
    timestamp: "2024-10-30T16:45:00Z",
    icon: MessageSquare
  },
  {
    id: 3,
    type: "milestone",
    description: "Meilenstein erreicht: Homepage Design",
    user: "Tom Weber",
    timestamp: "2024-10-28T11:20:00Z",
    icon: CheckCircle
  },
  {
    id: 4,
    type: "file_upload",
    description: "Datei hochgeladen: wireframes_v2.pdf",
    user: "Anna Müller",
    timestamp: "2024-10-25T09:15:00Z",
    icon: FileText
  }
];

// Mock time tracking data
const mockTimeEntries = [
  {
    date: "2024-11-01",
    user: "Max Mustermann",
    role: "Frontend Developer",
    hours: 8
  },
  {
    date: "2024-11-01",
    user: "Lisa Schmidt",
    role: "UI Designer",
    hours: 6
  },
  {
    date: "2024-10-31",
    user: "Tom Weber",
    role: "Backend Developer",
    hours: 7
  },
  {
    date: "2024-10-31",
    user: "Max Mustermann",
    role: "Frontend Developer",
    hours: 2
  }
];

// Detailed time tracking entries for modal
const mockDetailedTimeEntries = [
  {
    id: 1,
    user: "Max Mustermann",
    role: "Frontend Developer",
    ticketId: 1,
    ticketTitle: "Homepage Design fertigstellen",
    hours: 4,
    startTime: "2024-11-01T09:00:00Z",
    endTime: "2024-11-01T13:00:00Z",
    description: "React Komponenten für Hero-Section entwickelt"
  },
  {
    id: 2,
    user: "Max Mustermann", 
    role: "Frontend Developer",
    ticketId: 1,
    ticketTitle: "Homepage Design fertigstellen",
    hours: 3,
    startTime: "2024-11-01T14:00:00Z",
    endTime: "2024-11-01T17:00:00Z",
    description: "Responsive Design implementiert"
  },
  {
    id: 3,
    user: "Max Mustermann",
    role: "Frontend Developer", 
    ticketId: 5,
    ticketTitle: "SEO Optimierung",
    hours: 1,
    startTime: "2024-11-01T17:00:00Z",
    endTime: "2024-11-01T18:00:00Z",
    description: "Meta-Tags überprüft und optimiert"
  },
  {
    id: 4,
    user: "Lisa Schmidt",
    role: "UI Designer",
    ticketId: 1,
    ticketTitle: "Homepage Design fertigstellen",
    hours: 5,
    startTime: "2024-11-01T09:30:00Z",
    endTime: "2024-11-01T14:30:00Z",
    description: "Design-System und Komponenten finalisiert"
  },
  {
    id: 5,
    user: "Lisa Schmidt",
    role: "UI Designer",
    ticketId: 1,
    ticketTitle: "Homepage Design fertigstellen", 
    hours: 1,
    startTime: "2024-11-01T15:30:00Z",
    endTime: "2024-11-01T16:30:00Z",
    description: "Feedback vom Client eingearbeitet"
  },
  {
    id: 6,
    user: "Tom Weber",
    role: "Backend Developer",
    ticketId: 2,
    ticketTitle: "Kontaktformular implementieren",
    hours: 7,
    startTime: "2024-10-31T09:00:00Z",
    endTime: "2024-10-31T16:00:00Z",
    description: "API Endpunkte und Validierung entwickelt"
  },
  {
    id: 7,
    user: "Max Mustermann",
    role: "Frontend Developer",
    ticketId: 6,
    ticketTitle: "Performance Testing",
    hours: 2,
    startTime: "2024-10-31T14:00:00Z", 
    endTime: "2024-10-31T16:00:00Z",
    description: "Lighthouse Tests durchgeführt und Performance optimiert"
  }
];

// Mock project files data
const mockProjectFiles = [
  {
    id: 1,
    projectId: 1,
    name: "Homepage_Wireframes.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Lisa Schmidt",
    uploadedAt: "2024-11-01T10:30:00Z",
    description: "Wireframes und Layout-Konzepte für die neue Homepage"
  },
  {
    id: 2,
    projectId: 1,
    name: "Logo_Final_Version.png",
    type: "image",
    size: "856 KB",
    uploadedBy: "Anna Müller",
    uploadedAt: "2024-10-30T15:45:00Z",
    description: "Finales Logo Design in hoher Auflösung"
  },
  {
    id: 3,
    projectId: 1,
    name: "Animation_Hero_Section.mp4",
    type: "video",
    size: "12.7 MB",
    uploadedBy: "Max Mustermann",
    uploadedAt: "2024-10-29T09:15:00Z",
    description: "Animierte Vorschau der Hero-Section für Homepage"
  }
];

// Helper function to format date in German format (dd.mm.yy)
const formatGermanDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}.${month}.${year}`;
};

// Helper function to format time in German format (HH:MM)
const formatGermanTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Helper function to format currency consistently for server and client
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('de-DE');
};

// Helper function to get file icon based on type
const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-500" />;
    case 'image':
      return <FileImage className="h-5 w-5 text-blue-500" />;
    case 'video':
      return <FileVideo className="h-5 w-5 text-purple-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

// Helper function to get file preview
const getFilePreview = (file: any) => {
  switch (file.type) {
    case 'pdf':
      return (
        <div className="flex items-center justify-center bg-red-50 dark:bg-red-950/20 rounded-lg p-8">
          <FileText className="h-16 w-16 text-red-500" />
        </div>
      );
    case 'image':
      return (
        <div className="flex items-center justify-center bg-blue-50 dark:bg-blue-950/20 rounded-lg p-8">
          <FileImage className="h-16 w-16 text-blue-500" />
        </div>
      );
    case 'video':
      return (
        <div className="flex items-center justify-center bg-purple-50 dark:bg-purple-950/20 rounded-lg p-8">
          <FileVideo className="h-16 w-16 text-purple-500" />
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-950/20 rounded-lg p-8">
          <FileText className="h-16 w-16 text-gray-500" />
        </div>
      );
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = parseInt(params.id as string);
  
  const [project, setProject] = useState<Project | null>(null);
  const [projectTickets, setProjectTickets] = useState<Ticket[]>([]);
  const [ticketView, setTicketView] = useState<"list" | "kanban">("list");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isTicketDrawerOpen, setIsTicketDrawerOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number | null>(null);
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
  const [isTimeTrackingModalOpen, setIsTimeTrackingModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to fetch project details
    const foundProject = mockProjects.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      setProjectTickets(mockTickets.filter(t => t.projectId === projectId));
    }
  }, [projectId]);

  // Filter files for current project
  const projectFiles = mockProjectFiles.filter(file => file.projectId === projectId);

  if (!project) {
    return (
      <div className="flex-1 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Projekt nicht gefunden</h1>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Planning": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Review": return "bg-purple-100 text-purple-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "On Hold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "Low": return "bg-gray-100 text-gray-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTicketStatusIcon = (status: Ticket["status"]) => {
    switch (status) {
      case "Neu": return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "Zu erledigen": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "In Abnahme": return <Activity className="h-4 w-4 text-purple-500" />;
      case "Erledigt": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTicketStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "Neu": return "bg-blue-100 text-blue-800";
      case "Zu erledigen": return "bg-yellow-100 text-yellow-800";
      case "In Abnahme": return "bg-purple-100 text-purple-800";
      case "Erledigt": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformStyles = (platform: ExternalLink["platform"]) => {
    switch (platform) {
      case "figma": 
        return { 
          logo: (
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.354-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117v-6.039H8.148zm4.587 1.471v4.49c0 2.476-2.014 4.49-4.49 4.49s-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49h4.49zm-4.49 7.51c1.665 0 3.019-1.354 3.019-3.019v-3.02H8.148c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019zm8.98-9.981c0 2.476-2.014 4.49-4.49 4.49s-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49zm-7.51 0c0 1.665 1.354 3.019 3.02 3.019s3.019-1.354 3.019-3.019-1.354-3.02-3.019-3.02-3.02 1.355-3.02 3.02z"/>
            </svg>
          )
        };
      case "github": 
        return { 
          logo: <Globe className="h-3 w-3" />
        };
      case "notion": 
        return { 
          logo: <FileText className="h-3 w-3" />
        };
      case "slack": 
        return { 
          logo: <MessageCircle className="h-3 w-3" />
        };
      case "drive": 
        return { 
          logo: <FolderOpen className="h-3 w-3" />
        };
      default: 
        return { 
          logo: <Link className="h-3 w-3" />
        };
    }
  };

  const kanbanColumns = [
    { id: "Neu", title: "Neu", color: "border-blue-200" },
    { id: "Zu erledigen", title: "Zu erledigen", color: "border-yellow-200" },
    { id: "In Abnahme", title: "In Abnahme", color: "border-purple-200" },
    { id: "Erledigt", title: "Erledigt", color: "border-green-200" }
  ];

  const totalBudgetUsed = (project.spent / project.budget) * 100;
  const totalTimeLogged = mockTimeEntries.reduce((sum, entry) => sum + entry.hours, 0);

  // Health Score Berechnung
  const calculateHealthScore = () => {
    let score = 100;
    
    // Budget-Faktor (30% Gewichtung)
    if (totalBudgetUsed > 90) score -= 30;
    else if (totalBudgetUsed > 80) score -= 20;
    else if (totalBudgetUsed > 70) score -= 10;
    
    // Zeitplan-Faktor (30% Gewichtung)
    const daysRemaining = Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const timeProgress = ((totalDays - daysRemaining) / totalDays) * 100;
    
    if (timeProgress > project.progress + 20) score -= 30; // Sehr hinter Zeitplan
    else if (timeProgress > project.progress + 10) score -= 15; // Etwas hinter Zeitplan
    
    // Ticket-Fortschritt (25% Gewichtung)
    const completedTickets = projectTickets.filter(t => t.status === "Erledigt").length;
    const totalTickets = projectTickets.length;
    const ticketProgress = totalTickets > 0 ? (completedTickets / totalTickets) * 100 : 0;
    
    if (ticketProgress < 20 && project.progress > 50) score -= 25;
    else if (ticketProgress < 40 && project.progress > 70) score -= 15;
    
    // Überfällige Tickets (15% Gewichtung)
    const overdueTickets = projectTickets.filter(t => 
      new Date(t.dueDate) < new Date() && t.status !== "Erledigt"
    ).length;
    
    if (overdueTickets > 2) score -= 15;
    else if (overdueTickets > 0) score -= 10;
    
    return Math.max(0, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();
  
  const getHealthColor = (score: number) => {
    if (score >= 80) return { color: "text-green-600", bg: "bg-green-100", label: "Ausgezeichnet" };
    if (score >= 60) return { color: "text-yellow-600", bg: "bg-yellow-100", label: "Gut" };
    if (score >= 40) return { color: "text-orange-600", bg: "bg-orange-100", label: "Aufmerksamkeit" };
    return { color: "text-red-600", bg: "bg-red-100", label: "Kritisch" };
  };

  const healthStatus = getHealthColor(healthScore);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsTicketDrawerOpen(true);
  };

  const handleScreenshotClick = (screenshot: string, index?: number) => {
    setSelectedScreenshot(screenshot);
    setSelectedScreenshotIndex(index ?? null);
    setIsScreenshotModalOpen(true);
  };

  const handleTimeTrackingClick = (user: string) => {
    setSelectedUser(user);
    setIsTimeTrackingModalOpen(true);
  };

  const handleFileClick = (file: any) => {
    setSelectedFile(file);
    setIsFileModalOpen(true);
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="space-y-4 sm:space-y-0">
        {/* Mobile: Buttons on top */}
        <div className="flex items-center justify-between sm:hidden">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Bearbeiten
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Archive className="h-4 w-4" />
                  Archivieren
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400">
                  <XCircle className="h-4 w-4" />
                  Projekt löschen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Mobile: Title full width */}
        <div className="sm:hidden">
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">{project.client} • {project.category}</p>
        </div>
        
        {/* Desktop: Original layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              <p className="text-muted-foreground">{project.client} • {project.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Bearbeiten
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Archive className="h-4 w-4" />
                  Archivieren
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400">
                  <XCircle className="h-4 w-4" />
                  Projekt löschen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Status and Progress Cards */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kunde</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium">{project.client}</div>
                {project.clientAddress && (
                  <div className="mt-1 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {project.clientAddress.street}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.clientAddress.postalCode} {project.clientAddress.city}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.clientAddress.country}
                    </p>
                  </div>
                )}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {project.clientLogo || project.client.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fortschritt</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{project.progress}%</div>
              <Badge className={getStatusColor(project.status)} variant="secondary">
                {project.status}
              </Badge>
            </div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(project.spent)} €</div>
            <p className="text-xs text-muted-foreground">
              von {formatCurrency(project.budget)} € ({totalBudgetUsed.toFixed(1)}%) 
            </p>
            <Progress value={totalBudgetUsed} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.team.length}</div>
            <p className="text-xs text-muted-foreground">Teammitglieder</p>
            <div className="flex space-x-1 mt-2">
              {project.team.slice(0, 3).map((member, index) => (
                <Avatar key={index} className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {member.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.team.length > 3 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                  +{project.team.length - 3}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="overflow-x-hidden sm:overflow-x-visible">
        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto sm:overflow-x-visible -mx-6 px-6 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <TabsList className="w-max sm:w-auto">
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="tickets">Tickets ({projectTickets.length})</TabsTrigger>
              <TabsTrigger value="time">Zeiterfassung</TabsTrigger>
              <TabsTrigger value="files">Dateien</TabsTrigger>
              <TabsTrigger value="activity">Aktivität</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Card>
              <CardHeader>
                <CardTitle>Projektdetails</CardTitle>
                <CardDescription>Grundlegende Informationen zum Projekt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Beschreibung</h4>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center justify-between">
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Startdatum
                      </span>
                      <span className="text-sm font-normal">
                        {formatGermanDate(project.startDate)}
                      </span>
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center justify-between">
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Enddatum
                      </span>
                      <span className="text-sm font-normal">
                        {formatGermanDate(project.endDate)}
                      </span>
                    </h4>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Ansprechpartner</h4>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {project.clientContact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{project.clientContact.name}</p>
                        <p className="text-xs text-muted-foreground">{project.clientContact.position}</p>
                        <div className="mt-1 space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {project.clientContact.email}
                          </p>
                          {project.clientContact.phone && (
                            <p className="text-xs text-muted-foreground flex items-center">
                              <Phone className="mr-1 h-3 w-3" />
                              {project.clientContact.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Projektmanager</h4>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                          {project.projectManager.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{project.projectManager.name}</p>
                        <p className="text-xs text-muted-foreground">{project.projectManager.role}</p>
                        <div className="mt-1 space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {project.projectManager.email}
                          </p>
                          {project.projectManager.phone && (
                            <p className="text-xs text-muted-foreground flex items-center">
                              <Phone className="mr-1 h-3 w-3" />
                              {project.projectManager.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                {project.externalLinks && project.externalLinks.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-3">Links</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.externalLinks.map((link, index) => {
                          const styles = getPlatformStyles(link.platform);
                          return (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-3 py-2"
                            >
                              {typeof styles.logo === 'string' ? (
                                <span>{styles.logo}</span>
                              ) : (
                                styles.logo
                              )}
                              <span>{link.title}</span>
                              <ExternalLinkIcon className="h-3 w-3" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projektstatistiken</CardTitle>
                <CardDescription>Wichtige Kennzahlen auf einen Blick</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Erledigte Tickets
                      </span>
                      <span className="text-sm">
                        {projectTickets.filter(t => t.status === "Erledigt").length}
                      </span>
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center justify-between">
                      <span className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Zu erledigen
                      </span>
                      <span className="text-sm">
                        {projectTickets.filter(t => t.status === "Zu erledigen").length}
                      </span>
                    </h4>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Geschätzte Zeit
                    </span>
                    <span>{projectTickets.reduce((sum, t) => sum + t.estimatedHours, 0)}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Activity className="mr-2 h-4 w-4" />
                      Erfasste Zeit
                    </span>
                    <span>{totalTimeLogged}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Hourglass className="mr-2 h-4 w-4" />
                      Restliche Stunden
                    </span>
                    <span>{40 - totalTimeLogged}h</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      Stundensatz
                    </span>
                    <span>150 €</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="flex items-center">
                      <Hourglass className="mr-2 h-4 w-4" />
                      Budget übrig
                    </span>
                    <span>2.700 €</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Projekt Health Score</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full ${healthStatus.bg} flex items-center justify-center`}>
                        <span className={`text-md font-bold ${healthStatus.color}`}>
                          {healthScore}
                        </span>
                      </div>
                      <div>
                        <div className={`font-medium text-sm ${healthStatus.color}`}>
                          {healthStatus.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Basierend auf Budget, Zeitplan & Tickets
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Score</div>
                      <div className={`text-sm font-bold ${healthStatus.color}`}>
                        {healthScore}/100
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        healthScore >= 80 ? 'bg-green-500' :
                        healthScore >= 60 ? 'bg-yellow-500' :
                        healthScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${healthScore}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <div className="grid gap-4 grid-cols-1">
            <Card>
            <CardHeader>
              <div className="space-y-2 sm:space-y-0">
                {/* Mobile: Title and description full width */}
                <div className="sm:hidden space-y-2">
                  <CardTitle>Projekt Tickets</CardTitle>
                  <CardDescription>Alle Aufgaben und Tickets für dieses Projekt</CardDescription>
                </div>
                
                {/* Mobile: TabsList below description */}
                <div className="sm:hidden">
                  <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                    <button
                      onClick={() => setTicketView("list")}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        ticketView === "list" 
                          ? "bg-background text-foreground shadow-sm" 
                          : "hover:bg-background/50"
                      }`}
                    >
                      Liste
                    </button>
                    <button
                      onClick={() => setTicketView("kanban")}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        ticketView === "kanban" 
                          ? "bg-background text-foreground shadow-sm" 
                          : "hover:bg-background/50"
                      }`}
                    >
                      Kanban
                    </button>
                  </div>
                </div>
                
                {/* Desktop: Original layout with TabsList-styled buttons */}
                <div className="hidden sm:flex flex-row items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle>Projekt Tickets</CardTitle>
                    <CardDescription>Alle Aufgaben und Tickets für dieses Projekt</CardDescription>
                  </div>
                  <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground gap-1">
                    <button
                      onClick={() => setTicketView("list")}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        ticketView === "list" 
                          ? "bg-background text-foreground shadow-sm" 
                          : "hover:bg-background/50"
                      }`}
                    >
                      Liste
                    </button>
                    <button
                      onClick={() => setTicketView("kanban")}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        ticketView === "kanban" 
                          ? "bg-background text-foreground shadow-sm" 
                          : "hover:bg-background/50"
                      }`}
                    >
                      Kanban
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {ticketView === "list" ? (
                <div className="space-y-4">
                  <Accordion type="multiple" defaultValue={["Zu erledigen", "In Abnahme"]} className="w-full space-y-4">
                    {["Neu", "Zu erledigen", "In Abnahme", "Erledigt"].map((status) => {
                      const statusTickets = projectTickets.filter(ticket => ticket.status === status);
                      if (statusTickets.length === 0) return null;
                      
                      return (
                        <AccordionItem key={status} value={status} className="border border-border rounded-lg">
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors">
                            <div className="flex items-center space-x-2">
                              {getTicketStatusIcon(status as any)}
                              <h3 className="font-semibold text-lg">{status}</h3>
                              <Badge variant="secondary" className="ml-2">
                                {statusTickets.length}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-0 pb-0">
                            <div className="space-y-3 px-4 pb-4">
                              {statusTickets.map((ticket) => (
                                <div 
                                  key={ticket.id} 
                                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                                  onClick={() => handleTicketClick(ticket)}
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-medium">{ticket.title}</h4>
                                    </div>
                                    <div className="flex sm:hidden mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {ticket.priority}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1 mb-4 sm:mb-0">
                                      {ticket.description}
                                    </p>
                                    <div className="flex items-center justify-between sm:justify-start sm:space-x-4 mt-2 mb-2 sm:mb-0">
                                      <span className="text-xs text-muted-foreground">
                                        Assignee: {ticket.assignee}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        Due: {formatGermanDate(ticket.dueDate)}
                                      </span>
                                      <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                                        {ticket.priority}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="text-right sm:text-right mt-3 sm:mt-0">
                                    <div className="text-sm font-medium">{ticket.actualHours}h / {ticket.estimatedHours}h</div>
                                    <Progress 
                                      value={(ticket.actualHours / ticket.estimatedHours) * 100} 
                                      className="w-full sm:w-20 mt-1" 
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {kanbanColumns.map((column) => {
                    const columnTickets = projectTickets.filter(ticket => ticket.status === column.id);
                    return (
                      <div key={column.id} className={`rounded-lg border-2 ${column.color} bg-muted/20 p-4`}>
                        <div className="mb-4">
                          <h3 className="font-semibold text-sm flex items-center justify-between">
                            {column.title}
                            <Badge variant="secondary" className="ml-2">
                              {columnTickets.length}
                            </Badge>
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {columnTickets.map((ticket) => (
                            <div 
                              key={ticket.id} 
                              className="rounded-lg border bg-background p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                              onClick={() => handleTicketClick(ticket)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm line-clamp-2">{ticket.title}</h4>
                                <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                                  {ticket.priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                {ticket.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                      {ticket.assignee.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="text-xs text-muted-foreground flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatGermanDate(ticket.dueDate)}</span>
                                  </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {ticket.actualHours}h / {ticket.estimatedHours}h
                                </div>
                              </div>
                              <div className="mt-2">
                                <Progress 
                                  value={(ticket.actualHours / ticket.estimatedHours) * 100} 
                                  className="h-1"
                                />
                              </div>
                            </div>
                          ))}
                          {columnTickets.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground text-sm">
                              Keine Tickets
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zeiterfassung</CardTitle>
              <CardDescription>Erfasste Arbeitszeiten für dieses Projekt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTimeEntries.map((entry, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleTimeTrackingClick(entry.user)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {entry.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{entry.user}</h4>
                        <p className="text-sm text-muted-foreground">{entry.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{entry.hours} Std</div>
                      <div className="text-sm text-muted-foreground">Zuletzt aktualisiert: {formatGermanDate(entry.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <div className="grid gap-4 grid-cols-1">
            <Card>
              <CardHeader>
                <div className="space-y-2 sm:space-y-0">
                  {/* Mobile: Title and description full width */}
                  <div className="sm:hidden space-y-2">
                    <CardTitle>Projektdateien</CardTitle>
                    <CardDescription>Alle Dateien und Dokumente zu diesem Projekt</CardDescription>
                  </div>
                  
                  {/* Mobile: Upload button below description */}
                  <div className="sm:hidden">
                    <Button variant="outline">
                      Dateien hochladen
                    </Button>
                  </div>
                  
                  {/* Desktop: Original layout */}
                  <div className="hidden sm:flex flex-row items-center justify-between">
                    <div className="space-y-2">
                      <CardTitle>Projektdateien</CardTitle>
                      <CardDescription>Alle Dateien und Dokumente zu diesem Projekt</CardDescription>
                    </div>
                    <Button variant="outline">
                      Dateien hochladen
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {projectFiles.length > 0 ? (
                  <div className="space-y-4">
                    {projectFiles.map((file) => (
                      <div 
                        key={file.id} 
                        className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            {getFileIcon(file.type)}
                            <h4 className="font-medium truncate">{file.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{file.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{file.uploadedBy}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatGermanDate(file.uploadedAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <HardDrive className="h-3 w-3" />
                              <span>{file.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Keine Dateien vorhanden
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projektaktivität</CardTitle>
              <CardDescription>Chronologie aller Aktivitäten in diesem Projekt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map((activity) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <ActivityIcon className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.user}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString('de-DE')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ticket Detail Drawer */}
      <Sheet open={isTicketDrawerOpen} onOpenChange={setIsTicketDrawerOpen}>
        <SheetContent side="right" className="p-0 flex flex-col overflow-hidden" style={{width: '45vw', maxWidth: '45vw'}}>
          <SheetHeader className="p-6 pb-4 border-b">
            <SheetTitle className="flex items-center space-x-2">
              {selectedTicket && getTicketStatusIcon(selectedTicket.status)}
              <span>{selectedTicket?.title}</span>
            </SheetTitle>
            <SheetDescription>
              Ticket #{selectedTicket?.id} • {project?.name}
            </SheetDescription>
          </SheetHeader>
          
          {selectedTicket && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status und Priorität */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className={getTicketStatusColor(selectedTicket.status)}>
                    {selectedTicket.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Priorität:</span>
                  <Badge className={getPriorityColor(selectedTicket.priority)} variant="outline">
                    {selectedTicket.priority}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Personen */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Zugewiesen an</h4>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {selectedTicket.assignee.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{selectedTicket.assignee}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Erstellt von</h4>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-muted">
                        {selectedTicket.reporter.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{selectedTicket.reporter}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Termine und Zeit */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Erstellt am
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatGermanDate(selectedTicket.createdAt)}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Fällig am
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatGermanDate(selectedTicket.dueDate)}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Beschreibung */}
              <div>
                <h4 className="text-sm font-medium mb-2">Beschreibung</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Externe Links */}
              {selectedTicket.externalLinks && selectedTicket.externalLinks.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-3">Externe Links</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.externalLinks.map((link, index) => {
                        const styles = getPlatformStyles(link.platform);
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-3 py-2"
                          >
                            {typeof styles.logo === 'string' ? (
                              <span>{styles.logo}</span>
                            ) : (
                              styles.logo
                            )}
                            <span>{link.title}</span>
                            <ExternalLinkIcon className="h-3 w-3" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Screenshots */}
              {selectedTicket.screenshots && selectedTicket.screenshots.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-3">Screenshots & Mockups</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {selectedTicket.screenshots.map((screenshot, index) => (
                        <div key={index} className="rounded-lg border overflow-hidden">
                          <img 
                            src={screenshot} 
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => handleScreenshotClick(screenshot, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Kommentare */}
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-3">Kommentare</h4>
                <div className="space-y-4">
                  {selectedTicket.comments && selectedTicket.comments.length > 0 ? (
                    selectedTicket.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {comment.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleString('de-DE', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: '2-digit', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          {comment.screenshotIndex !== undefined && (
                            <button
                              onClick={() => selectedTicket?.screenshots && handleScreenshotClick(selectedTicket.screenshots[comment.screenshotIndex!], comment.screenshotIndex)}
                              className="text-xs text-neutral-300 underline hover:no-underline mb-1 block cursor-pointer"
                            >
                              zu Screenshot {comment.screenshotIndex + 1}
                            </button>
                          )}
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      Keine Kommentare vorhanden
                    </div>
                  )}
                  
                  {/* Kommentar schreiben */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          MM
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="Kommentar schreiben..."
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Zeiterfassung */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Zeiterfassung</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Play className="h-4 w-4" />
                    <span>0:00</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Geschätzte Zeit</span>
                    <span>{selectedTicket.estimatedHours}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Erfasste Zeit</span>
                    <span>{selectedTicket.actualHours}h</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Fortschritt</span>
                    <span>{Math.round((selectedTicket.actualHours / selectedTicket.estimatedHours) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(selectedTicket.actualHours / selectedTicket.estimatedHours) * 100} 
                    className="h-2"
                  />
                </div>
              </div>


            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Screenshot Modal */}
      <Dialog open={isScreenshotModalOpen} onOpenChange={setIsScreenshotModalOpen}>
        <DialogContent className="!max-w-[85vw] !w-[85vw] !max-h-[85vh] p-0 bg-background [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar]:h-0.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:h-5 hover:[&::-webkit-scrollbar-thumb]:bg-white/80 [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:transition-colors [&>button]:p-1" style={{maxWidth: '85vw', width: '85vw', maxHeight: '85vh'}}>
          <DialogTitle className="sr-only">Screenshot Viewer</DialogTitle>
          <div className="flex flex-col sm:flex-row sm:h-[85vh]">
            {/* Top/Left Side - Image */}
            <div className="flex items-center justify-center bg-black/5 dark:bg-black/20 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none sm:rounded-tl-lg overflow-hidden sm:flex-1">
              {selectedScreenshot && (
                <img 
                  src={selectedScreenshot} 
                  alt="Screenshot"
                  className="w-full h-auto md:h-full object-contain md:object-cover"
                />
              )}
            </div>
            
            {/* Bottom/Right Side - Comments */}
            <div className="w-full sm:w-80 border-t sm:border-l sm:border-t-0 bg-background flex flex-col rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none">
              {/* Header */}
              <div className="p-4 border-b">
                <h3 className="font-semibold">Kommentare</h3>
                <p className="text-sm text-muted-foreground">Screenshot {selectedScreenshotIndex !== null ? selectedScreenshotIndex + 1 : '?'}</p>
              </div>
              
              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/80">
                {selectedTicket?.comments && selectedTicket.comments
                  .filter(comment => comment.screenshotIndex === selectedScreenshotIndex)
                  .map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.timestamp).toLocaleString('de-DE', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: '2-digit', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
                
                {(!selectedTicket?.comments || 
                  selectedTicket.comments.filter(comment => comment.screenshotIndex === selectedScreenshotIndex).length === 0) && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    Noch keine Kommentare zu diesem Screenshot
                  </div>
                )}
              </div>
              
              {/* Comment Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      MM
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Kommentar schreiben..."
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Time Tracking Detail Modal */}
      <Dialog open={isTimeTrackingModalOpen} onOpenChange={setIsTimeTrackingModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogTitle>Zeiterfassung Details - {selectedUser}</DialogTitle>
          <div className="space-y-4">
            {selectedUser && mockDetailedTimeEntries
              .filter(entry => entry.user === selectedUser)
              .map((entry) => (
                <div key={entry.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Ticket #{entry.ticketId}
                      </Badge>
                      <h4 className="font-medium">{entry.ticketTitle}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>📅 {formatGermanDate(entry.startTime)}</span>
                      <span>🕒 {formatGermanTime(entry.startTime)} - {formatGermanTime(entry.endTime)}</span>
                      <span>⏱️ {entry.hours} Std</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{entry.hours} Std</div>
                  </div>
                </div>
              ))}
            
            {selectedUser && mockDetailedTimeEntries.filter(entry => entry.user === selectedUser).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="mx-auto h-12 w-12 mb-2" />
                <p>Keine Zeiterfassung-Einträge gefunden für {selectedUser}</p>
              </div>
            )}
            
            {/* Summary */}
            {selectedUser && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Gesamt erfasste Zeit:</span>
                  <span className="font-bold text-lg">
                    {mockDetailedTimeEntries
                      .filter(entry => entry.user === selectedUser)
                      .reduce((sum, entry) => sum + entry.hours, 0)} Std
                  </span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* File Detail Modal */}
      <Dialog open={isFileModalOpen} onOpenChange={setIsFileModalOpen}>
        <DialogContent className="max-w-2xl bg-background max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar]:h-0.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:h-5 hover:[&::-webkit-scrollbar-thumb]:bg-white/80">
          <DialogTitle>{selectedFile?.name}</DialogTitle>
          <div className="space-y-6">
            
            {/* Preview Section */}
            <div>
              <h4 className="text-sm font-medium mb-3">Vorschau</h4>
              {selectedFile && getFilePreview(selectedFile)}
            </div>

            <Separator />

            {/* File Information */}
            <div>
              <h4 className="text-sm font-medium mb-3">Datei-Informationen</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Dateiname</span>
                  <span className="font-medium">{selectedFile?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Beschreibung</span>
                  <span className="text-muted-foreground text-right">{selectedFile?.description}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dateigröße</span>
                  <span>{selectedFile?.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dateityp</span>
                  <span className="uppercase">{selectedFile?.type}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Upload Information */}
            <div>
              <h4 className="text-sm font-medium mb-3">Upload-Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Hochgeladen von</span>
                  <span>{selectedFile?.uploadedBy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Upload-Datum</span>
                  <span>{selectedFile && formatGermanDate(selectedFile.uploadedAt)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Upload-Zeit</span>
                  <span>{selectedFile && formatGermanTime(selectedFile.uploadedAt)}</span>
                </div>
              </div>
            </div>

          </div>
          
          <Separator />
          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="destructive">
              <Trash2 className="mr-1 h-4 w-4" />
              Löschen
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsFileModalOpen(false)}>
                Schließen
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
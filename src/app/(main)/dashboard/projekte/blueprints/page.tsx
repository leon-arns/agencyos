"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockBlueprints, type Blueprint } from "@/data/blueprints";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink,
  Clock,
  Users,
  Code,
  Palette,
  MoreHorizontal,
  Archive,
  Edit,
  Trash2,
  CheckSquare,
  Calendar,
  Settings,
  ClipboardList
} from "lucide-react";
import Link from "next/link";

export default function BlueprintsPage() {
  const [blueprints] = useState<Blueprint[]>(mockBlueprints);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredBlueprints = blueprints.filter((blueprint) => {
    const matchesSearch = blueprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blueprint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blueprint.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || blueprint.category === categoryFilter;
    const matchesType = typeFilter === "all" || blueprint.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getCategoryColor = (category: Blueprint["category"]) => {
    switch (category) {
      case "Web Development": return "bg-blue-100 text-blue-800";
      case "Brand Design": return "bg-purple-100 text-purple-800";
      case "Marketing": return "bg-green-100 text-green-800";
      case "Consulting": return "bg-orange-100 text-orange-800";
      case "SaaS": return "bg-cyan-100 text-cyan-800";
      case "E-Commerce": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: Blueprint["type"]) => {
    switch (type) {
      case "Template": return "bg-emerald-100 text-emerald-800";
      case "Boilerplate": return "bg-amber-100 text-amber-800";
      case "Design System": return "bg-violet-100 text-violet-800";
      case "Component Library": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getComplexityColor = (complexity: Blueprint["complexity"]) => {
    switch (complexity) {
      case "Einfach": return "bg-green-100 text-green-800";
      case "Mittel": return "bg-yellow-100 text-yellow-800";
      case "Komplex": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProjectTypeColor = (projectType: Blueprint["projectType"]) => {
    switch (projectType) {
      case "Retainerprojekt": return "bg-purple-50 text-purple-700 border-purple-200";
      case "Einmalprojekt": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: Blueprint["category"]) => {
    switch (category) {
      case "Web Development": return Code;
      case "Brand Design": return Palette;
      case "Marketing": return ExternalLink;
      case "Consulting": return Users;
      case "SaaS": return Code;
      case "E-Commerce": return ExternalLink;
      default: return FileText;
    }
  };

  // Helper function to format date in German format (dd.mm.yy)
  const formatGermanDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blueprints Archiv</h1>
          <p className="text-muted-foreground">
            Wiederverwendbare Templates, Komponenten und Design-Systeme für Ihre Projekte
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neues Blueprint
        </Button>
      </div>

      {/* Filter und Suche */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Blueprints durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Kategorie filtern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Kategorien</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Brand Design">Brand Design</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Consulting">Consulting</SelectItem>
            <SelectItem value="SaaS">SaaS</SelectItem>
            <SelectItem value="E-Commerce">E-Commerce</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Typ filtern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Typen</SelectItem>
            <SelectItem value="Template">Template</SelectItem>
            <SelectItem value="Boilerplate">Boilerplate</SelectItem>
            <SelectItem value="Design System">Design System</SelectItem>
            <SelectItem value="Component Library">Component Library</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Blueprint-Übersicht */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid-Ansicht</TabsTrigger>
          <TabsTrigger value="list">Listen-Ansicht</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-between">
            {filteredBlueprints.map((blueprint) => {
              const CategoryIcon = getCategoryIcon(blueprint.category);
              return (
                <Card key={blueprint.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{blueprint.name}</CardTitle>
                      <CategoryIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {blueprint.author.name}
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={getProjectTypeColor(blueprint.projectType)}>
                          {blueprint.projectType}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {blueprint.description}
                    </p>
                    
                    
                    <div className="mt-auto space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="h-4 w-4 text-muted-foreground" />
                          <span>{blueprint.ticketCount} Tickets</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClipboardList className="h-4 w-4 text-muted-foreground" />
                          <span>{blueprint.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{blueprint.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatGermanDate(blueprint.createdDate)}</span>
                        </div>
                      </div>


                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Blueprint bearbeiten
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
                              <Edit className="h-4 w-4 mr-2" />
                              Bearbeiten
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Herunterladen
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archivieren
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Löschen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-3">Blueprint</div>
              <div className="col-span-2">Projekttyp</div>
              <div className="col-span-2">Kategorie</div>
              <div className="col-span-2">Typ</div>
              <div className="col-span-2">Tickets</div>
              <div className="col-span-1">Erstellt</div>
            </div>
            {filteredBlueprints.map((blueprint) => (
              <div key={blueprint.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-muted/50">
                <div className="col-span-3">
                  <div className="font-medium">{blueprint.name}</div>
                  <div className="text-sm text-muted-foreground">{blueprint.author.name}</div>
                </div>
                <div className="col-span-2">
                  <Badge variant="outline" className={getProjectTypeColor(blueprint.projectType)}>
                    {blueprint.projectType}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <Badge className={getCategoryColor(blueprint.category)}>
                    {blueprint.category}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-muted-foreground">{blueprint.type}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm">{blueprint.ticketCount} Tickets</span>
                </div>
                <div className="col-span-1">
                  <span className="text-sm text-muted-foreground">{formatGermanDate(blueprint.createdDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
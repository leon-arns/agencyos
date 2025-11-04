"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Euro, Clock, Target } from "lucide-react";

// Mock-Daten für Analytics
const trafficData = [
  { month: "Jan", visitors: 1200, conversions: 45, revenue: 3400 },
  { month: "Feb", visitors: 980, conversions: 39, revenue: 2800 },
  { month: "Mar", visitors: 1400, conversions: 52, revenue: 4200 },
  { month: "Apr", visitors: 1600, conversions: 68, revenue: 5100 },
  { month: "Mai", visitors: 1350, conversions: 55, revenue: 4500 },
  { month: "Jun", visitors: 1800, conversions: 72, revenue: 6200 },
  { month: "Jul", visitors: 2100, conversions: 89, revenue: 7800 },
  { month: "Aug", visitors: 1950, conversions: 78, revenue: 6900 },
  { month: "Sep", visitors: 2200, conversions: 95, revenue: 8100 },
  { month: "Okt", visitors: 2050, conversions: 82, revenue: 7200 },
  { month: "Nov", visitors: 2300, conversions: 98, revenue: 8500 },
  { month: "Dez", visitors: 2150, conversions: 91, revenue: 7800 },
];

const projectStatusData = [
  { name: "Abgeschlossen", value: 45, color: "#22c55e" },
  { name: "In Bearbeitung", value: 30, color: "#eab308" },
  { name: "Planung", value: 15, color: "#3b82f6" },
  { name: "Pausiert", value: 10, color: "#6b7280" },
];

const clientSatisfactionData = [
  { month: "Jan", satisfaction: 4.2, projects: 8 },
  { month: "Feb", satisfaction: 4.5, projects: 6 },
  { month: "Mar", satisfaction: 4.3, projects: 10 },
  { month: "Apr", satisfaction: 4.7, projects: 12 },
  { month: "Mai", satisfaction: 4.4, projects: 9 },
  { month: "Jun", satisfaction: 4.8, projects: 14 },
];

const teamProductivityData = [
  { name: "Max Mustermann", hoursLogged: 160, efficiency: 92 },
  { name: "Lisa Schmidt", hoursLogged: 152, efficiency: 88 },
  { name: "Tom Weber", hoursLogged: 145, efficiency: 85 },
  { name: "Anna Müller", hoursLogged: 158, efficiency: 90 },
  { name: "Peter Klein", hoursLogged: 140, efficiency: 87 },
];

export default function AnalyticsPage() {
  const totalRevenue = trafficData.reduce((sum, data) => sum + data.revenue, 0);
  const totalConversions = trafficData.reduce((sum, data) => sum + data.conversions, 0);
  const avgConversionRate = (totalConversions / trafficData.reduce((sum, data) => sum + data.visitors, 0) * 100);

  // Helper function to format currency consistently for server and client
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('de-DE');
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Übersicht über Performance, Projekte und Team-Metriken
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)} €</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>{" "}
              seit letztem Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1%
              </span>{" "}
              seit letztem Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Projekte</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2
              </span>{" "}
              seit letzter Woche
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ø Projektdauer</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5 Wochen</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                -0.5 Wochen
              </span>{" "}
              Verbesserung
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Umsatz & Traffic</TabsTrigger>
          <TabsTrigger value="projects">Projekt-Status</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="clients">Kundenzufriedenheit</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monatlicher Umsatz</CardTitle>
                <CardDescription>Umsatzentwicklung über die letzten 12 Monate</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Umsatz",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Website Traffic & Conversions</CardTitle>
                <CardDescription>Besucher und Conversion-Entwicklung</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    visitors: {
                      label: "Besucher",
                      color: "hsl(var(--chart-2))",
                    },
                    conversions: {
                      label: "Conversions",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="conversions"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Projekt-Status Verteilung</CardTitle>
                <CardDescription>Aktuelle Verteilung aller Projekte</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Projekte",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projekt-Metriken</CardTitle>
                <CardDescription>Wichtige Kennzahlen auf einen Blick</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pünktliche Lieferung</span>
                    <span className="text-sm text-muted-foreground">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Budget-Einhaltung</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Kundenzufriedenheit</span>
                    <span className="text-sm text-muted-foreground">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">Projekte gesamt</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2.3M €</div>
                    <div className="text-sm text-muted-foreground">Gesamtumsatz</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Produktivität</CardTitle>
              <CardDescription>Arbeitszeit und Effizienz der Teammitglieder</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamProductivityData.map((member) => (
                  <div key={member.name} className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{member.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{member.hoursLogged}h</Badge>
                          <Badge className={member.efficiency >= 90 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                            {member.efficiency}%
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Progress value={member.efficiency} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kundenzufriedenheit</CardTitle>
              <CardDescription>Bewertungen und Projektzahlen nach Monaten</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  satisfaction: {
                    label: "Zufriedenheit",
                    color: "hsl(var(--chart-1))",
                  },
                  projects: {
                    label: "Projekte",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clientSatisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="satisfaction" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
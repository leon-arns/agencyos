"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ChevronRight, 
  Building, 
  Target, 
  Palette, 
  CheckCircle,
  Upload,
  Globe,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

interface OnboardingData {
  // Schritt 1: Unternehmensdaten
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  
  // Schritt 2: Projektanforderungen
  projectType: string[];
  budget: string;
  timeline: string;
  goals: string;
  targetAudience: string;
  competitors: string;
  features: string[];
  
  // Schritt 3: Branding & Uploads
  hasExistingBrand: boolean;
  brandDescription: string;
  colorPreferences: string;
  stylePreferences: string;
  inspirations: string;
  files: File[];
}

const steps = [
  {
    id: 1,
    title: "Unternehmensdaten",
    description: "Grundlegende Informationen über Ihr Unternehmen",
    icon: Building,
  },
  {
    id: 2,
    title: "Projektanforderungen",
    description: "Details zu Ihrem gewünschten Projekt",
    icon: Target,
  },
  {
    id: 3,
    title: "Branding & Design",
    description: "Visuelle Vorstellungen und Dateien",
    icon: Palette,
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    projectType: [],
    budget: "",
    timeline: "",
    goals: "",
    targetAudience: "",
    competitors: "",
    features: [],
    hasExistingBrand: false,
    brandDescription: "",
    colorPreferences: "",
    stylePreferences: "",
    inspirations: "",
    files: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof OnboardingData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFormData(field, newArray);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Onboarding-Daten:", formData);
    setIsSubmitted(true);
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  if (isSubmitted) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="mx-auto max-w-2xl text-center">
          <Card>
            <CardContent className="pt-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="mt-4 text-2xl font-bold">Onboarding erfolgreich abgeschlossen!</h1>
              <p className="mt-2 text-muted-foreground">
                Vielen Dank für Ihre Angaben. Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden.
              </p>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold">Unternehmen</h3>
                    <p className="text-sm text-muted-foreground">{formData.companyName}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Branche</h3>
                    <p className="text-sm text-muted-foreground">{formData.industry}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Projekttyp</h3>
                    <p className="text-sm text-muted-foreground">{formData.projectType.join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Budget</h3>
                    <p className="text-sm text-muted-foreground">{formData.budget}</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => setIsSubmitted(false)} className="mt-6">
                Neues Onboarding starten
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kunden-Onboarding</h1>
        <p className="text-muted-foreground">
          Führen Sie neue Kunden durch den Onboarding-Prozess
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Schritt {currentStep} von {steps.length}</span>
          <span>{Math.round(progressPercentage)}% abgeschlossen</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Steps Navigation */}
      <div className="flex justify-center">
        <div className="flex space-x-8">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center space-x-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isActive ? "bg-primary text-primary-foreground" :
                  isCompleted ? "bg-green-500 text-white" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {isCompleted ? <CheckCircle className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                </div>
                <div className="hidden md:block">
                  <p className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {(() => {
              const StepIcon = steps[currentStep - 1].icon;
              return <StepIcon className="h-5 w-5" />;
            })()}
            <span>{steps[currentStep - 1].title}</span>
          </CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Schritt 1: Unternehmensdaten */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Firmenname *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    placeholder="Ihre Firma GmbH"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Branche *</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Branche auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technologie</SelectItem>
                      <SelectItem value="healthcare">Gesundheitswesen</SelectItem>
                      <SelectItem value="finance">Finanzwesen</SelectItem>
                      <SelectItem value="retail">Einzelhandel</SelectItem>
                      <SelectItem value="education">Bildung</SelectItem>
                      <SelectItem value="manufacturing">Fertigung</SelectItem>
                      <SelectItem value="consulting">Beratung</SelectItem>
                      <SelectItem value="other">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companySize">Unternehmensgröße</Label>
                  <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Größe auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 Mitarbeiter</SelectItem>
                      <SelectItem value="11-50">11-50 Mitarbeiter</SelectItem>
                      <SelectItem value="51-200">51-200 Mitarbeiter</SelectItem>
                      <SelectItem value="201-1000">201-1000 Mitarbeiter</SelectItem>
                      <SelectItem value="1000+">1000+ Mitarbeiter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => updateFormData("website", e.target.value)}
                      placeholder="https://ihre-website.de"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="kontakt@ihre-firma.de"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+49 123 456789"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    placeholder="Straße, PLZ Stadt, Land"
                    className="pl-9"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Kurze Unternehmensbeschreibung</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  placeholder="Beschreiben Sie kurz Ihr Unternehmen und Ihre Tätigkeit..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Schritt 2: Projektanforderungen */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Projekttyp (Mehrfachauswahl möglich)</Label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[
                    "Website Entwicklung",
                    "E-Commerce",
                    "Mobile App",
                    "Brand Design",
                    "Marketing Kampagne",
                    "SEO Optimierung",
                    "Social Media",
                    "Consulting",
                    "Sonstiges"
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.projectType.includes(type)}
                        onCheckedChange={() => handleArrayToggle("projectType", type)}
                      />
                      <Label htmlFor={type} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Budget-Range auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5000-10000">€5.000 - €10.000</SelectItem>
                      <SelectItem value="10000-25000">€10.000 - €25.000</SelectItem>
                      <SelectItem value="25000-50000">€25.000 - €50.000</SelectItem>
                      <SelectItem value="50000-100000">€50.000 - €100.000</SelectItem>
                      <SelectItem value="100000+">€100.000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Zeitplan</Label>
                  <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Zeitrahmen auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">So schnell wie möglich</SelectItem>
                      <SelectItem value="1-3months">1-3 Monate</SelectItem>
                      <SelectItem value="3-6months">3-6 Monate</SelectItem>
                      <SelectItem value="6-12months">6-12 Monate</SelectItem>
                      <SelectItem value="flexible">Flexibel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Projektziele</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => updateFormData("goals", e.target.value)}
                  placeholder="Was möchten Sie mit diesem Projekt erreichen?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Zielgruppe</Label>
                <Textarea
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => updateFormData("targetAudience", e.target.value)}
                  placeholder="Wer ist Ihre Zielgruppe?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="competitors">Konkurrenz/Inspiration</Label>
                <Textarea
                  id="competitors"
                  value={formData.competitors}
                  onChange={(e) => updateFormData("competitors", e.target.value)}
                  placeholder="Nennen Sie Websites oder Unternehmen, die Ihnen gefallen..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Schritt 3: Branding & Design */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasExistingBrand"
                    checked={formData.hasExistingBrand}
                    onCheckedChange={(checked) => updateFormData("hasExistingBrand", checked)}
                  />
                  <Label htmlFor="hasExistingBrand">Wir haben bereits eine Markenidentität</Label>
                </div>

                {formData.hasExistingBrand && (
                  <div className="space-y-2">
                    <Label htmlFor="brandDescription">Beschreibung der aktuellen Marke</Label>
                    <Textarea
                      id="brandDescription"
                      value={formData.brandDescription}
                      onChange={(e) => updateFormData("brandDescription", e.target.value)}
                      placeholder="Beschreiben Sie Ihre aktuelle Markenidentität..."
                      rows={3}
                    />
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="colorPreferences">Farbvorstellungen</Label>
                  <Input
                    id="colorPreferences"
                    value={formData.colorPreferences}
                    onChange={(e) => updateFormData("colorPreferences", e.target.value)}
                    placeholder="z.B. Blau, modern, professionell..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stylePreferences">Design-Stil</Label>
                  <Select value={formData.stylePreferences} onValueChange={(value) => updateFormData("stylePreferences", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Stil auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern & Clean</SelectItem>
                      <SelectItem value="creative">Kreativ & Verspielt</SelectItem>
                      <SelectItem value="corporate">Professionell & Corporate</SelectItem>
                      <SelectItem value="minimalist">Minimalistisch</SelectItem>
                      <SelectItem value="vintage">Vintage & Retro</SelectItem>
                      <SelectItem value="bold">Mutig & Auffällig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inspirations">Inspirationen & Referenzen</Label>
                  <Textarea
                    id="inspirations"
                    value={formData.inspirations}
                    onChange={(e) => updateFormData("inspirations", e.target.value)}
                    placeholder="Links zu Websites, Bildern oder Beschreibungen, die Ihnen gefallen..."
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Dateien hochladen</Label>
                <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ziehen Sie Dateien hierher oder klicken Sie zum Auswählen
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Logos, Bilder, Dokumente (max. 10MB pro Datei)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={nextStep}>
                Weiter
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Onboarding abschließen
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
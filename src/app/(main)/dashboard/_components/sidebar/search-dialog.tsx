"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { LayoutDashboard, ChartBar, Gauge, ShoppingBag, GraduationCap, Forklift, Search, FolderOpen, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const searchItems = [
  { group: "Dashboards", icon: LayoutDashboard, label: "Default", href: "/dashboard/default" },
  { group: "Dashboards", icon: ChartBar, label: "CRM", href: "/dashboard/crm", disabled: true },
  { group: "Dashboards", icon: Gauge, label: "Analytics", href: "/dashboard/analytics", disabled: true },
  { group: "Dashboards", icon: ShoppingBag, label: "E-Commerce", href: "/dashboard/coming-soon", disabled: true },
  { group: "Dashboards", icon: GraduationCap, label: "Academy", href: "/dashboard/coming-soon", disabled: true },
  { group: "Dashboards", icon: Forklift, label: "Logistics", href: "/dashboard/coming-soon", disabled: true },
  { group: "Projekte", icon: FolderOpen, label: "Alle Projekte", href: "/dashboard/projekte" },
  { group: "Projekte", icon: Plus, label: "Neues Projekt", href: "/dashboard/projekte?action=new" },
  { group: "Projekte", icon: LayoutDashboard, label: "Website Relaunch Acme Corp", href: "/dashboard/projekte/1" },
  { group: "Projekte", icon: LayoutDashboard, label: "Brand Identity Startup XYZ", href: "/dashboard/projekte/2" },
  { group: "Projekte", icon: LayoutDashboard, label: "E-Commerce Platform Migration", href: "/dashboard/projekte/3" },
  { group: "Authentication", label: "Login v1", href: "/auth/v1/login" },
  { group: "Authentication", label: "Login v2", href: "/auth/v2/login" },
  { group: "Authentication", label: "Register v1", href: "/auth/v1/register" },
  { group: "Authentication", label: "Register v2", href: "/auth/v2/register" },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: typeof searchItems[0]) => {
    setOpen(false);
    if (item.href && !item.disabled) {
      router.push(item.href as any);
    }
  };

  return (
    <>
      <Button
        variant="link"
        className="text-muted-foreground !px-0 font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Search
        <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search dashboards, users, and more…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group} key={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem 
                      className="!py-1.5" 
                      key={item.label} 
                      onSelect={() => handleSelect(item)}
                      disabled={item.disabled}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

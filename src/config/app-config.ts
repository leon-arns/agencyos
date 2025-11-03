import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "agencyOS",
  version: packageJson.version,
  copyright: `© ${currentYear}, agencyOS.`,
  meta: {
    title: "agencyOS - Modern Agency Management Dashboard",
    description:
      "agencyOS is a modern agency management dashboard built with Next.js 16, Tailwind CSS v4, and shadcn/ui. Perfect for digital agencies, project management, and client collaboration—fully customizable and production-ready.",
  },
};

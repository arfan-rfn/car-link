export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "CarLink",
  description:
    "Manage your CarLink account, view your vehicle history, and more.",
  mainNav: [
    {
      title: "Admin Portal",
      href: "/admin",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  src: string;
  slug: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Aether Lens",
    category: "Art Direction",
    year: "2024",
    // Soyut / Dark Sanat
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    slug: "aether-lens",
    description: "Redefining visual storytelling through lens-based art.",
  },
  {
    id: 2,
    title: "Orbit Studio",
    category: "Web Design",
    year: "2023",
    // Geometrik / Modern
    src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
    slug: "orbit-studio",
    description: "A digital playground for creative coding experiments.",
  },
  {
    id: 3,
    title: "Nura Essence",
    category: "Branding",
    year: "2024",
    // Minimal / Lüks
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2668&auto=format&fit=crop",
    slug: "nura-essence",
    description: "Sustainable luxury branding for modern skincare.",
  },
  {
    id: 4,
    title: "Vantage Capital",
    category: "Development",
    year: "2023",
    // Mimari / Teknoloji
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    slug: "vantage-capital",
    description: "High-performance fintech platform architecture.",
  },
];

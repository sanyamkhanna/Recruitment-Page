import {
  Code2, Megaphone, Handshake, Palette, Camera, Globe2,
  Smartphone, Gamepad2, BarChart3, Cloud, Network, Trophy
} from "lucide-react";

export const curYear = new Date().getFullYear();
export const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
export const LINKS = { instagram: "#", discord: "#", gmail: "#", linkedin: "#", x: "#" };

export const reviews = [
  { id: "engineering", icon: Code2, tone: "#8b5cf6", name: "Engineering", description: "Build scalable products, web experiences and the technical systems behind our community." },
  { id: "marketing", icon: Megaphone, tone: "#fb7185", name: "Marketing & PR", description: "Shape campaigns, tell our story and help the community reach the right audience." },
  { id: "outreach", icon: Handshake, tone: "#f59e0b", name: "Outreach & Partnerships", description: "Build meaningful relationships with speakers, communities and partner organizations." },
  { id: "design", icon: Palette, tone: "#ec4899", name: "Design", description: "Create memorable visual identities, social assets and polished digital experiences." },
  { id: "content", icon: Camera, tone: "#22d3ee", name: "Content & Media", description: "Capture stories through photography, video, copywriting and creative storytelling." },
  { id: "web", icon: Globe2, tone: "#60a5fa", name: "Web Development", description: "Design and ship fast, accessible and beautiful experiences for the community." },
  { id: "mobile", icon: Smartphone, tone: "#34d399", name: "App Development", description: "Turn ideas into useful mobile experiences and learn modern application development." },
  { id: "gaming", icon: Gamepad2, tone: "#f97316", name: "Gaming & Esports", description: "Organize gaming experiences, tournaments and engaging competitive communities." },
  { id: "analytics", icon: BarChart3, tone: "#38bdf8", name: "Data & Analytics", description: "Use data, dashboards and insights to improve decisions and measure impact." },
  { id: "cloud", icon: Cloud, tone: "#a78bfa", name: "Cloud & DevOps", description: "Explore cloud platforms, automation, deployment and reliable engineering practices." },
  { id: "community", icon: Network, tone: "#14b8a6", name: "Community & Events", description: "Create welcoming experiences and help plan events that bring people together." },
  { id: "operations", icon: Trophy, tone: "#eab308", name: "Operations", description: "Coordinate people, timelines and execution so every initiative runs smoothly." },
];

const q = (name, type = "long-text", placeholder = "Share your answer...") => ({ name, type, placeholder });

export const QuestionnaireData = reviews.map((department) => ({
  department: department.name,
  questions: [
    q(`What interests you most about ${department.name}?`, "long-text", "Tell us what genuinely excites you about this team..."),
    q(`Describe one project, experience or idea that shows your interest in ${department.name}.`, "long-text", "You can mention a personal, academic or community project..."),
    q(`How would you contribute to the ${department.name} team during the next recruitment cycle?`, "long-text", "Share your skills, mindset and the value you would bring...")
  ]
}));

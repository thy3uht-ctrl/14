export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  images?: string[];
  tags: string[];
  link?: string;
  githubUrl?: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags?: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  description?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// types/interior.ts

export interface ProjectDetails {
  area: string;
  location: string;
  year?: string;
  style?: string;
}

export interface InteriorProject {
  id: string;
  title: string;
  subtitle: string;
  details: ProjectDetails;
  images: {
    main: string;
    alt: string;
  };
  brand?: string;
}

export interface InteriorShowcaseProps {
  project?: InteriorProject;
  className?: string;
  variant?: 'default' | 'dark' | 'light';
}

// Default project data
export const defaultProject: InteriorProject = {
  id: 'minimalist-living-001',
  title: 'Minimalist Living',
  subtitle: 'Contemporary Design',
  details: {
    area: '85.2m² / 917ft²',
    location: 'Stockholm, Sweden',
    year: '2024',
    style: 'Scandinavian Minimalism'
  },
  images: {
    main: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Modern minimalist living room with wooden credenza and neutral tones'
  },
  brand: 'WOR'
};
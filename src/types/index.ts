export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'community_user' | 'project_developer' | 'government_agency' | 'administrator' | 'researcher';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  location: ProjectLocation;
  budget: number;
  timeline_start: string;
  timeline_end: string;
  status: ProjectStatus;
  progress_percentage: number;
  developer_id: string;
  developer: User;
  images: string[];
  created_at: string;
  updated_at: string;
}

export type ProjectType = 
  | 'road' 
  | 'hospital' 
  | 'school' 
  | 'tourism_site' 
  | 'bridge' 
  | 'airport' 
  | 'water_supply' 
  | 'power_plant' 
  | 'housing';

export type ProjectStatus = 
  | 'proposed' 
  | 'approved' 
  | 'in_progress' 
  | 'completed' 
  | 'on_hold' 
  | 'cancelled';

export interface ProjectLocation {
  latitude: number;
  longitude: number;
  address: string;
  state: string;
  lga: string;
}

export interface Comment {
  id: string;
  project_id: string;
  user_id: string;
  user: User;
  content: string;
  upvotes: number;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description: string;
  target_date: string;
  completed: boolean;
  completion_date?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: string;
}

export type NotificationType = 
  | 'project_update' 
  | 'comment_reply' 
  | 'milestone_completed' 
  | 'project_approved' 
  | 'system_announcement';
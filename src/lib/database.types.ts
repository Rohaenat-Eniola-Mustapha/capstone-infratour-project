export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: string;
          location: any;
          budget: number;
          timeline_start: string;
          timeline_end: string;
          status: string;
          progress_percentage: number;
          developer_id: string;
          images: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: string;
          location: any;
          budget: number;
          timeline_start: string;
          timeline_end: string;
          status: string;
          progress_percentage: number;
          developer_id: string;
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: string;
          location?: any;
          budget?: number;
          timeline_start?: string;
          timeline_end?: string;
          status?: string;
          progress_percentage?: number;
          developer_id?: string;
          images?: string[];
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          content: string;
          upvotes: number;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          content: string;
          upvotes?: number;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          user_id?: string;
          content?: string;
          upvotes?: number;
          parent_id?: string | null;
          updated_at?: string;
        };
      };
      milestones: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string;
          target_date: string;
          completed: boolean;
          completion_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description: string;
          target_date: string;
          completed?: boolean;
          completion_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          description?: string;
          target_date?: string;
          completed?: boolean;
          completion_date?: string | null;
        };
      };
    };
  };
}
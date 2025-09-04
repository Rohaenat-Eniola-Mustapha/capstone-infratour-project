/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, project title)
      - `description` (text, project description)
      - `type` (text, project type)
      - `location` (jsonb, location details)
      - `budget` (bigint, project budget in naira)
      - `timeline_start` (date, project start date)
      - `timeline_end` (date, project end date)
      - `status` (text, project status)
      - `progress_percentage` (integer, completion percentage)
      - `developer_id` (uuid, references profiles)
      - `images` (text array, image URLs)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for CRUD operations based on user roles
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL DEFAULT 'road',
  location jsonb NOT NULL DEFAULT '{}',
  budget bigint NOT NULL DEFAULT 0,
  timeline_start date NOT NULL,
  timeline_end date NOT NULL,
  status text NOT NULL DEFAULT 'proposed',
  progress_percentage integer NOT NULL DEFAULT 0,
  developer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  images text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Everyone can read projects
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Project developers and government agencies can create projects
CREATE POLICY "Developers and agencies can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('project_developer', 'government_agency', 'administrator')
    )
  );

-- Project developers can update their own projects
CREATE POLICY "Developers can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    developer_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('government_agency', 'administrator')
    )
  )
  WITH CHECK (
    developer_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('government_agency', 'administrator')
    )
  );

-- Only admins can delete projects
CREATE POLICY "Only admins can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'administrator'
    )
  );

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamp on project updates
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
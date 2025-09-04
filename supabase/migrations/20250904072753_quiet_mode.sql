/*
  # Create milestones table

  1. New Tables
    - `milestones`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references projects)
      - `title` (text, milestone title)
      - `description` (text, milestone description)
      - `target_date` (date, expected completion)
      - `completed` (boolean, completion status)
      - `completion_date` (date, actual completion date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `milestones` table
    - Add policies for CRUD operations based on user roles
*/

CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  target_date date NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  completion_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Anyone can read milestones
CREATE POLICY "Anyone can read milestones"
  ON milestones
  FOR SELECT
  TO authenticated
  USING (true);

-- Project developers and agencies can create milestones
CREATE POLICY "Developers and agencies can create milestones"
  ON milestones
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('project_developer', 'government_agency', 'administrator')
    ) AND
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = project_id 
      AND (developer_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM profiles 
             WHERE id = auth.uid() 
             AND role IN ('government_agency', 'administrator')
           ))
    )
  );

-- Project developers can update milestones for their projects
CREATE POLICY "Developers can update milestones"
  ON milestones
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = project_id 
      AND (developer_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM profiles 
             WHERE id = auth.uid() 
             AND role IN ('government_agency', 'administrator')
           ))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = project_id 
      AND (developer_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM profiles 
             WHERE id = auth.uid() 
             AND role IN ('government_agency', 'administrator')
           ))
    )
  );

-- Only admins and project owners can delete milestones
CREATE POLICY "Limited delete access for milestones"
  ON milestones
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE id = project_id 
      AND (developer_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM profiles 
             WHERE id = auth.uid() 
             AND role = 'administrator'
           ))
    )
  );
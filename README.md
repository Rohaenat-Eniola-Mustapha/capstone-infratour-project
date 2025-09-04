# InfraTour - Nigeria Infrastructure & Tourism Platform

A comprehensive digital platform that increases community engagement in Nigeria's infrastructure development and sustainable tourism projects.

## Features

### Core Functionality
- **Multi-role Authentication**: Secure login system with role-based access for Community Users, Project Developers, Government Agencies, Administrators, and Researchers
- **Project Management**: Complete project lifecycle management with creation, tracking, and monitoring capabilities
- **Community Engagement**: Interactive forum with commenting, upvoting, and threaded discussions
- **Interactive Mapping**: Visual representation of project locations across Nigeria
- **Analytics Dashboard**: Comprehensive insights into project progress and community engagement
- **Real-time Notifications**: Updates for project milestones and community interactions

### User Roles
- **Community Users**: Propose projects, provide feedback, upvote contributions, and track local developments
- **Project Developers**: Create and manage infrastructure projects, respond to community feedback
- **Government Agencies**: Review and approve projects, monitor compliance and progress
- **Administrators**: Manage platform users, system operations, and security
- **Researchers/Analysts**: Extract insights and generate reports on community engagement and project impact

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js 18 or higher
- A Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
4. Add your Supabase credentials to `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Run the database migrations in your Supabase project

6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Role-specific dashboards
│   ├── projects/       # Project management components
│   ├── community/      # Community forum components
│   ├── map/           # Mapping and visualization
│   ├── analytics/     # Analytics and reporting
│   └── layout/        # Layout components
├── contexts/          # React contexts for state management
├── lib/              # Utility functions and configurations
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```

## Features in Detail

### Authentication & Authorization
- Email-based registration with role selection
- Secure password authentication
- Role-based access control throughout the application

### Project Management
- Create detailed project proposals with location, budget, and timeline
- Track project progress with milestone management
- Visual progress indicators and status updates
- Community feedback integration

### Community Engagement
- Forum-style discussions with categorization
- Upvoting system for valuable contributions
- Threaded comments on projects
- User reputation and engagement tracking

### Mapping & Visualization
- Interactive map showing project locations across Nigeria
- Filter projects by state, type, and status
- Visual markers with project information
- Route planning capabilities (ready for Google Maps API integration)

### Analytics & Reporting
- Comprehensive dashboard with key performance indicators
- State-wise participation tracking
- Project type distribution analysis
- Monthly trend analysis
- Community impact metrics

## Design Principles

- **Nigerian Identity**: Color scheme inspired by Nigeria's flag (green and gold)
- **Accessibility**: High contrast ratios and keyboard navigation support
- **Responsive Design**: Optimized for mobile, tablet, and desktop experiences
- **Modern Aesthetics**: Clean, professional interface with subtle animations
- **User-Centric**: Intuitive navigation and clear visual hierarchy

## Contributing

InfraTour is designed to serve Nigeria's development goals. Contributions should align with:
- Community engagement best practices
- Accessibility standards
- Security and privacy requirements
- Nigerian cultural and linguistic considerations

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.

---

**Building Nigeria's Future, Together** 🇳🇬
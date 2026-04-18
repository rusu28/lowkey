# Lowkey AI Contests (LAI Contest)

A comprehensive platform for AI and machine learning competitions with LaTeX and Markdown support.

## Features

### 🏆 Competition Management
- **Multiple Problems**: Competitions can have one or more problems
- **Advanced Scheduling**: Set start/end dates with automatic status management
- **Rich Content**: Full Markdown and LaTeX support for problem statements
- **Subtasks**: Break problems into scored subtasks
- **Custom Rules**: Predefined rule templates with customization
- **Metrics**: Define evaluation metrics with mathematical formulas
- **Announcements**: Keep participants updated with important information
- **Editorials**: Share winning solutions and approaches

### 👤 User Features
- **Authentication**: Sign up/Sign in with role-based access (Participant/Organizer)
- **Competition Discovery**: Browse, filter, and search competitions
- **Status Tracking**: See upcoming, ongoing, and ended competitions
- **Protected Content**: Problem details hidden until competition starts
- **Editorial Access**: View solutions after signing in

### 🎨 Organizer Tools
- **Add Competition**: Comprehensive form to create new competitions
- **Multiple Problems**: Add as many problems as needed per competition
- **Custom Rules**: Choose from predefined rules or create your own
- **Content Sections**: Organize problems, rules, metrics, and announcements
- **Preview Mode**: See how your competition will look before publishing
- **Background Images**: Add custom backgrounds and logos

### 📝 Content Support
- **Markdown**: Full markdown support for rich text formatting
- **LaTeX Math**: Render mathematical formulas using KaTeX
  - Inline formulas: `$E = mc^2$`
  - Block formulas: `$$\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$`
- **Code Blocks**: Syntax highlighting for code examples
- **Tables**: Support for data tables
- **Lists**: Ordered and unordered lists

### 🌓 Dark Mode
- Full dark mode support with theme toggle
- Automatic persistence of theme preference
- Optimized for both light and dark viewing

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Navigation
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible components
- **react-markdown** - Markdown rendering
- **KaTeX** - Mathematical formula rendering
- **Lucide React** - Icons

## Getting Started

### Authentication

#### Regular User
Sign up with any email to participate in competitions.

#### Organizer Access
To get organizer permissions and create competitions:
- Sign up/Sign in with an email containing "organizer"
- Example: `organizer@example.com`

### Creating a Competition

1. Sign in as an organizer
2. Go to Competitions page
3. Click "Add Competition" button
4. Fill in the form with:
   - **Basic Info**: Title, descriptions, difficulty, dates, prize
   - **Problems**: Add one or more problems with LaTeX/Markdown content
   - **Rules**: Customize predefined rules or add your own
   - **Metrics**: Define evaluation criteria
   - **Content**: Add announcements and editorials
5. Preview your competition
6. Click "Create Competition"

### LaTeX Formula Examples

#### Inline Math
\`\`\`markdown
The equation $E = mc^2$ shows energy-mass equivalence.
\`\`\`

#### Block Math
\`\`\`markdown
The quadratic formula is:

$$
x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}
$$
\`\`\`

#### Complex Formulas
\`\`\`markdown
Root Mean Squared Error:

$$
RMSE = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2}
$$
\`\`\`

## Competition Structure

### Competition Types

1. **Single Problem**: Traditional format with one main problem
2. **Multi-Problem**: Advanced competitions with multiple problems (e.g., AI Marathon)

### Competition Status

- **Upcoming**: Competition hasn't started yet
  - Shows only description and rules
  - Problems are hidden
- **Ongoing**: Competition is active
  - All problems visible to authenticated users
  - Participants can join and submit
- **Ended**: Competition has finished
  - Editorial becomes available
  - Final rankings visible

### Problem Sections

Each problem can include:
- Problem statement with LaTeX formulas
- Dataset description
- Submission format
- Subtasks with individual scoring
- Example solutions

## Navigation

- **Home** - Landing page with platform overview and latest competitions
- **Competitions** - Full list of all competitions with filters
- **Roadmap** - AI learning roadmap (Coming Soon)
- **Contact** - Get in touch with the team

## Custom Fonts

- **Lowkey** - Permanent Marker (handwritten style)
- **Coming** - Caveat (casual handwritten)
- **SOON** - Righteous (bold display font)

## Future Features

- Submission system
- Leaderboard integration
- Team management
- Discussion forums
- Notebook viewer
- API integration for automated evaluation
- Email notifications
- Competition analytics

## Notes for Organizers

### Writing Problem Statements

When creating problem content, you can:
1. Upload text files (planned feature)
2. Write directly in Markdown/LaTeX format
3. Structure content with sections:
   - Problem description
   - Input/Output format
   - Constraints
   - Examples
   - Evaluation criteria

### Best Practices

- Use clear, concise language
- Provide examples with explanations
- Include LaTeX formulas for mathematical content
- Break complex problems into subtasks
- Define metrics precisely
- Update announcements regularly
- Publish editorial after competition ends

## License

All rights reserved © 2026 Lowkey AI Contests

# Danish Language Learning App

A comprehensive Danish language learning application that helps users improve their Danish speaking skills through AI-powered conversations.

## Features

- User Authentication & Profile Management
- AI-Powered Conversational Practice
- Real-time Feedback and Progress Tracking
- Adaptive Difficulty System
- Comprehensive Dashboard
- Voice & Text Input Support

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- VS Code (recommended)
- Auth0 Account
- OpenAI API Key

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd danish-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   AUTH0_SECRET='your-auth0-secret'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='your-auth0-domain'
   AUTH0_CLIENT_ID='your-auth0-client-id'
   AUTH0_CLIENT_SECRET='your-auth0-client-secret'
   OPENAI_API_KEY='your-openai-api-key'
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
danish-app/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and configurations
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and CSS modules
├── public/                 # Static assets
└── prisma/                # Database schema and migrations
```

## Development Guidelines

1. Follow the Git flow branching strategy
2. Write tests for new features
3. Use TypeScript for type safety
4. Follow the established code style guide
5. Document new components and functions

## Testing

Run the test suite:
```bash
npm test
```

## Deployment

The application is configured for deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
4. Wait for review and approval

## License

MIT License

# AISkillGaugr

<div align="center">
  <table>
    <tr>
      <td align="center" style="background-color: #1e293b; padding: 20px; border-radius: 8px;">
        <img src="./src/assets/guagrLogo.png" alt="AIGuagr Logo" width="400">
      </td>
    </tr>
  </table>
</div>

Live site: https://aiskillgaugr.vercel.app/

AISkillGaugr is an AI-powered tool for assessing and improving programming skills through interactive quizzes and personalized recommendations.

## Features

- 🧠 AI-powered skill assessment
- 📊 Dynamic quiz generation for different programming languages
- 🎯 Multiple difficulty levels (Beginner, Intermediate, Advanced)
- 💾 Local progress saving
- 📱 Responsive design
- 🚀 Performance optimization with caching
- 🔒 Privacy-focused analytics

## Tech Stack

- React with TypeScript
- Vike for routing and SSR
- TailwindCSS & DaisyUI for styling
- Vitest for testing
- Google Analytics for usage tracking
- HuggingFace API for AI recommendations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/d-beloved/aiskillgaugr.git
cd aiskillgaugr
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a .env file:

```env
PUBLIC_ENV__GOOGLE_ANALYTICS=your_ga_id
HUGGING_FACE_API_KEY=your_api_key
```

4. Start the development server:

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Lint code

## Project Structure

```
aiskillgaugr/
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── layouts/        # Layout components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── server/            # Backend server code
├── public/            # Static assets
└── test/             # Test files
```

## Features in Detail

### Quiz System

- Dynamic question generation based on skill level
- Progress saving
- Real-time feedback
- Score tracking

### AI Recommendations

- Personalized learning paths
- Strength/weakness analysis
- Resource recommendations
- Practice suggestions

### Performance

- Question caching
- Optimized bundle size
- Progressive enhancement
- Responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Bati](https://batijs.dev)
- Powered by [Vike](https://vike.dev)
- Styled with [TailwindCSS](https://tailwindcss.com) and [DaisyUI](https://daisyui.com)

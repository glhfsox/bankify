# Bankify - Modern Banking Website

Bankify is a modern, responsive banking website built with Next.js, TailwindCSS, and shadcn/ui. It features dark mode, animations, and a working authentication system.

![Bankify Screenshot](https://ext.same-assets.com/3326104566/344829349.png)

## Features

- 🎨 Modern UI with dark/light mode
- 🔄 Smooth animations and transitions with Framer Motion
- 🔐 Authentication with NextAuth.js (login/signup)
- 📱 Fully responsive design
- 🖥️ Interactive dashboard
- 📊 Feature-rich components
- 🔍 SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Lucide Icons](https://lucide.dev/) - SVG icons
- [Bun](https://bun.sh/) - JavaScript runtime and package manager

## Deployment Instructions

### Deploy to Vercel

1. Fork or clone this repository
2. Connect your GitHub repository to Vercel
3. Set the following environment variables in Vercel:
   - `NEXTAUTH_SECRET` - A secure random string
   - OAuth credentials if you're using social logins

### Manual Deployment

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/bankify.git
   cd bankify
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Build the project
   ```bash
   bun run build
   ```

4. Start the production server
   ```bash
   bun start
   ```

## Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/bankify.git
   cd bankify
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Create a `.env.local` file with the necessary environment variables:
   ```
   NEXTAUTH_SECRET=yoursecretkey
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Start the development server
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app` - All pages and API routes
- `src/components` - Reusable components
  - `ui` - UI components
  - `layout` - Layout components
  - `sections` - Page sections
  - `providers` - Context providers
- `public` - Static assets

## License

This project is licensed under the MIT License.

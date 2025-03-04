# GymPanda - Premium Gym Shop Project ( https://gym-panda.vercel.app/ )

## Overview
GymPanda is an e-commerce platform offering high-quality gym wear designed for performance, comfort, and style. This project is built using **Next.js**, **React**, and **Tailwind CSS**, ensuring a modern and scalable web application.

## Features
- 🔥 **Modern UI**: Responsive and sleek design built with Tailwind CSS.
- 🛒 **E-Commerce Functionality**: Browse products, add to cart, and checkout.
- 🍪 **Cookie Consent Management**: Users can manage their cookie preferences.
- 🌍 **SEO Friendly**: Optimized metadata and structured content.
- 🚀 **Fast Performance**: Built with Next.js for optimal speed and efficiency.

## Tech versions to use
- node V.18
- npm V.9.8.1
- redis

## Tech Stack
- **Frontend**: React.js, Next.js, Tailwind CSS
- **State Management**: React Hooks, useState, useEffect
- **Icons & UI Enhancements**: React Icons, shadcn/ui, Heroicons

## Getting Started
### Prerequisites
Ensure you have **Node.js** and **npm/yarn** installed.
Ensure you have **Docker** installed as well, for database.

### Installation and run project locally
1. Clone the repository:
   ```bash
   git clone https://github.com/FlorinMariusDrilea/e-commerce-website-reactjs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-website-reactjs
   ```
3. Use node v18:
   ```bash
   nvm use 18
   ```
4. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
5. Create / Spin up a redis db locally to be used:

6. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Redis
- Install redis and use it
```bash
brew tap redis-stack/redis-stack
brew install --cask redis-stack

redis-stack-server
```

Or use Makefile to create a docker instance of redis
- make start_redis

- Download and install Redis Insight to get a view of your redis db / structures
- Connect to the db (locally): 127.0.0.1:6379

```bash
REDIS_URL=redis://default@127.0.0.1:6379
```

## NEXT_AUTH environment variables locally
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=QCS2g7ZGlHIBNGa5Qw94on1NqKa2W2gSOoWOKQvwAf4=
```

The project should be accessible at **http://localhost:3000**.

## Project Structure
```
📦 gympanda-nextjs
├── 📂 app                  # Next.js application files
│   ├── 📂 about            # About page
│   ├── 📂 account          # Edit account page
│   ├── 📂 add-product      # Edit product page (add/remove)
│   ├── 📂 api              # API routes
│   ├── 📂 auth             # Authentication routes
│   │   ├── 📂 register     # Registration page
│   │   └── 📂 signin       # Sign-in page
│   ├── 📂 contact          # Contact page
│   ├── 📂 components       # Reusable UI components
│   ├── 📂 dashboard        # Dashboard page
│   ├── 📂 product          # Product page
│   │   ├── 📂 [id]         # Dynamic product page by id
│   │   ├── 📄 page.js      # Product page component
│   ├── 📂 shipping-returns # Shipping and returns page
│   ├── 📂 policies         # Policy pages
│   │   ├── 📄 cookie-policy.js       # Cookie policy
│   │   ├── 📄 privacy-policy.js      # Privacy policy
│   │   └── 📄 terms-and-conditions.js # Terms and conditions
│   └── 📄 layout.js        # Main layout
├── 📂 db                   # Database configuration
│   └── 📄 db.js            # Database setup
├── 📂 public               # Static assets (images, favicon, etc.)
├── 📂 styles               # Global styles and Tailwind setup
├── 📂 middleware           # Middleware stuff for protection and cache
│   └── 📄 globals.css      # Global CSS file
├── 📄 .gitignore           # Git ignore file
├── 📄 jsconfig.json        # JavaScript configuration
├── 📄 jsonflg.json         # JSON configuration file
├── 📄 Makefile             # Makefile for project tasks
├── 📄 next.config.mjs      # Next.js configuration
├── 📄 package-lock.json    # Lock file for dependencies
├── 📄 package.json         # Project dependencies and scripts
├── 📄 postcss.config.mjs   # PostCSS configuration
├── 📄 README.md            # Project documentation
└── 📄 tailwind.config.mjs  # Tailwind CSS configuration
```

## Deployment
This project can be deployed on **Vercel**, **Netlify**, or any platform supporting Next.js.

Create build for production:
```bash
npm run build
```

Deploy to Vercel (Already deployed):
```bash
vercel
```

## Contributing
We welcome contributions! Feel free to submit issues, feature requests, or pull requests.

## Contact
For any inquiries, reach out to [marius.drilea2016@gmail.com](mailto:marius.drilea2016@gmail.com).
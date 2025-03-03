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
- couchbase V.7.1.4

## Tech Stack
- **Frontend**: React.js, Next.js, Tailwind CSS
- **State Management**: React Hooks, useState, useEffect
- **Icons & UI Enhancements**: React Icons, shadcn/ui, Heroicons

## Getting Started
### Prerequisites
Ensure you have **Node.js** and **npm/yarn** installed.
Ensure you have **Docker** installed as well, for couchbase.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/FlorinMariusDrilea/e-commerce-website-reactjs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-website-reactjs
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Project (locally)
Start the couchbase instance:
```bash
make start_couchbase
```

Start the development server:
```bash
npm run dev
# or
yarn dev
```
The project should be accessible at **http://localhost:3000**.
The couchbase instance should be available at **http://localhost:8091**.

## Project Structure
```
📦 gympanda-nextjs
├── 📂 app                  # Next.js application files
│   ├── 📂 about            # About page
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
│   └── 📄 globals.css      # Global CSS file
├── 📄 .env.local           # Local environment variables
├── 📄 .env.prod            # Production environment variables
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

Deploy to Vercel:
```bash
vercel
```

## Contributing
We welcome contributions! Feel free to submit issues, feature requests, or pull requests.

## Contact
For any inquiries, reach out to [marius.drilea2016@gmail.com](mailto:marius.drilea2016@gmail.com).

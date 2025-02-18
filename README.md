# GymPanda - Premium Gym Shop Project

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

### Running the Project
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
├────── 📂 api              # API routes
├────── 📂 auth             # Authentication route
├────── 📂 components       # Reusable UI components
├────── 📂 contact          # Contact page
├────── 📂 libs/utils       # Utility functions
├────── 📂 products         # Products page
├────── 📂 shipping-returns # Shipping page
├── 📂 db                   # Database configuration
├── 📂 public               # Static assets (images, favicon, etc.)
├── 📂 styles               # Global styles and Tailwind setup
├── jsconfig.json           # JavaScript configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
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
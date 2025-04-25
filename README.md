# Amazon Product Scraper

A full-stack application that allows to scrape and display Amazon product information.

## 🚀 Getting Started

This project consists of two main parts: a backend API and a frontend application. Follow the instructions below to set up and run both components.

### 📋 Prerequisites

- Node.js (v22.14.0 or higher)
- Bun (for the API)
- npm (for the frontend)

### 🔧 Installation & Setup

#### Backend API

1. Navigate to the API directory:

```bash
cd API
```

2. Install Bun (if not already installed):

   - Using npm: `npm install -g bun`
   - Or follow the official instructions at [bun.sh](https://bun.sh)

3. Install dependencies:

```bash
bun install
```

4. Start the API server:

```bash
bun run src/index.ts
```

The API will be running on `http://localhost:8080`

#### Frontend Application

1. Navigate to the Frontend directory:

```bash
cd FrontEnd
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend application will be running on `http://localhost:3000`

## 🛠️ Available Scripts

### Backend (API)

- `bun run src/index.ts` - Starts the API server

### Frontend

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build locally

## 🌐 API Endpoints

- `GET api/scrape?keyword={search_term}&page={page_number}` - Scrapes Amazon products based on the provided keyword and page number

## 🏗️ Project Structure

```
.
├── API
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── FrontEnd
│   ├── src
│   │   ├── components
│   │   ├── utils
│   │   ├── main.js
│   │   └── style.css
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

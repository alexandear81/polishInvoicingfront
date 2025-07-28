# Polish Invoicing PWA

![Logo](src/assets/logo.png)

A modern Progressive Web App (PWA) designed to simplify the process of creating, managing, and sending Polish invoices directly to the KSeF (National e-Invoicing System). This application provides a seamless and automated experience for handling invoicing needs.

## ✨ Key Features

- **Secure Authentication**: User login and registration powered by Firebase Authentication.
- **Invoice Creation**: An intuitive, component-based form to create detailed invoices, including buyer/seller information, dates, and line items.
- **Dynamic Calculations**: Automatic calculation of VAT and total amounts for each line item and for the overall invoice.
- **Dashboard**: A central hub for users to quickly access key actions like creating a new invoice, editing drafts, and more.
- **Responsive Design**: A clean and modern UI built with Tailwind CSS that works beautifully on both desktop and mobile devices.
- **PWA Ready**: Can be installed on mobile or desktop for an app-like experience.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Hosting**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (or your preferred package manager)
- A [Firebase](https://firebase.google.com/) project with Authentication and Hosting enabled.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/alexandear81/polishInvoicingfront.git
    cd polishInvoicingfront
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Firebase environment variables:**
    Create a `.env.local` file in the root of the project and add your Firebase project's configuration:
    ```env
    VITE_FIREBASE_API_KEY="your_api_key"
    VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
    VITE_FIREBASE_PROJECT_ID="your_project_id"
    VITE_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
    VITE_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
    VITE_FIREBASE_APP_ID="your_app_id"
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📦 Deployment

This project is configured for easy deployment with Firebase Hosting.

1.  **Build the project for production:**
    ```sh
    npm run build
    ```
    This command creates a `dist` folder with the optimized production build.

2.  **Deploy to Firebase:**
    Make sure you have the Firebase CLI installed (`npm install -g firebase-tools`) and are logged in (`firebase login`).
    ```sh
    firebase deploy
    ```
    This will deploy the contents of the `dist` folder to your Firebase project. The `firebase.json` file is already configured for a Single-Page Application (SPA).


# 🏎️ AERO | Next-Gen Racing Landing Page

An ultra-premium, AAA-quality 3D gaming landing page built with React, Three.js, and GSAP. Designed with a dark cyberpunk aesthetic, featuring a procedural drifting car, glassmorphism UI, and buttery smooth animations.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Three.js](https://img.shields.io/badge/Three.js-R3F-black) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## 🚀 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **3D Engine:** Three.js (React Three Fiber + Drei)
- **Animations:** GSAP (ScrollTrigger) + Framer Motion
- **Styling:** Tailwind CSS
- **Smooth Scroll:** Lenis

## ✨ Features

- **Procedural 3D Car:** A cinematic, continuously drifting cyberpunk car built entirely with Three.js primitives (no external GLTF needed).
- **GPU-Optimized VFX:** Instanced mesh smoke trails and dynamic neon lighting.
- **Glassmorphism UI:** Premium, blurred glass effects for navigation and cards.
- **Magnetic Buttons:** Interactive buttons that respond to mouse/touch movement.
- **Mobile Optimized:** Specifically optimized for low-end Android devices (6GB RAM) by dynamically disabling heavy post-processing and shadows.

## 📱 Mobile Optimization (6GB RAM Devices)

This project includes an "Extreme Low-End Optimization" mode for mobile devices:
- Disables heavy Post-Processing (Bloom/Vignette).
- Turns off real-time Shadows and Contact Shadows.
- Replaces expensive `meshPhysicalMaterial` (transmission) with optimized standard materials.
- Reduces particle count for the smoke trail.
- Uses native scrolling instead of Lenis to prevent jank.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/YOUR_USERNAME/aero-racing-landing.git
   cd aero-racing-landing
```

2. Install dependencies:
```bash
   npm install
```

3. Run the development server:
```bash
   npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

```text
├── public/
├── src/
│   ├── components/
│   │   ├── ui/           # React UI Components (Navbar, Hero, Sections)
│   │   ├── Scene.tsx     # Main Three.js Canvas setup
│   │   └── CyberCar.tsx  # Procedural 3D Car & Particle System
│   ├── App.tsx           # Main App component & Lenis setup
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles & Tailwind directives
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📜 License

This project is open-source and available under the MIT License.

---
*Built with ❤️ by the Quen Studio Game Development Council.*

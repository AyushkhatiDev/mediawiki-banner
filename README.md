# MediaWiki Banner Generator

This project is a microtask submission for Outreachy (Task T388234), showcasing a frontend web application built with React, TypeScript, and Vite. It features a full-width banner with content describing something I enjoy—**"I Enjoy Exploring New Technologies"**—and a dynamic form to customize the banner in real-time without page reloads.

## Overview

This task demonstrates my frontend development skills by setting up a modern web application infrastructure with unit testing support. The project includes a customizable banner and a control form, enhanced with additional features like animations, themes, and export functionality. The goal was to create a functional UI while ensuring a clean codebase, proper documentation, and a reproducible setup.

### **Tech Stack**
- **Frontend Framework:** React with TypeScript  
- **Build Tool:** Vite  
- **Testing:** Jest with React Testing Library  
- **Styling:** Bootstrap and custom CSS  
- **Version Control:** Git with GitHub hosting  

## Features

✅ **Full-Width Banner**: Displays "I Enjoy Exploring New Technologies" by default, customizable via the form.  
✅ **Dynamic Form**: Controls to modify:
   - Banner text
   - Background color or gradient
   - Background image (URL or upload)
   - Text color, font size, font weight, and more  
✅ **Real-Time Updates**: Changes reflect instantly without page reloads using React state.  
✅ **Animations**: Options like fade, slide, bounce, pulse, rotate, flip, shake, and swing.  
✅ **Themes**: Predefined light, dark, and custom gradient themes.  
✅ **Background Pattern**: Toggleable pattern overlay.  
✅ **Export**: Download the banner as a PNG using html2canvas.  
✅ **Unit Tests**: Tests for the Banner component using Jest and React Testing Library.  

---

## Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher recommended)
- **Git**

## Setup

### **Clone the Repository**
```bash
git clone https://github.com/AyushkhatiDev/mediawiki-banner.git
cd mediawiki-banner
```

### **Install Dependencies**
```bash
npm install
```

### **Run the Development Server**
```bash
npm run dev
```
Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

### **Run Tests**
```bash
npm test
```
Executes unit tests for the Banner component.

### **Build for Production**
```bash
npm run build
npm run preview
```

---

## Project Structure
```
mediawiki-banner/
├── src/
│   ├── components/
│   │   ├── tests/
│   │   │   └── Banner.test.tsx  # Unit tests for Banner
│   │   ├── Banner.tsx           # Banner component
│   │   ├── Banner.css           # Banner styles and animations
│   │   ├── BannerPreview.tsx    # Preview with export functionality
│   │   ├── ControlForm.tsx      # Form for banner customization
│   │   └── ThemeSelector.tsx    # Theme selection component
│   ├── utils/
│   │   └── AnimationUtils.ts    # Animation utilities
│   ├── App.tsx                  # Main app component
│   └── main.tsx                  # Entry point
├── jest.setup.ts                 # Jest setup file
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── README.md                      # Project documentation
```

---

## Usage

### **Launch the App**
1. Start the server:  
   ```bash
   npm run dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) in your browser.

### **Customize the Banner**
- Use the **"Basic Settings"** tab to change text, background, image, and text color.
- Adjust typography (font size, weight, family) in the **"Typography"** tab.
- Modify layout and effects (height, overlay, animations) in the **"Layout & Effects"** tab.
- Apply presets from the **"Presets"** tab or save your own.

### **Export the Banner**
Click **"Export as PNG"** below the banner to download your design.

---

## Git Workflow

This project follows a structured commit history:
- **Initial Commit:** `feat: initialize project with vite, react, and typescript`
- **UI Implementation:** `feat: add banner and control form UI`
- **Testing:** `test: implement unit tests for Banner component`
- **Enhancements:** `feat: add animations, themes, and export functionality`

---

## Dependencies

### **Runtime**
- `react`, `react-dom`: Core React libraries
- `bootstrap`, `react-bootstrap`: UI framework
- `html2canvas`: PNG export functionality

### **Development**
- `vite`, `@vitejs/plugin-react`: Build tool and React plugin
- `jest`, `ts-jest`, `jest-environment-jsdom`: Testing framework
- `@testing-library/react`, `@testing-library/jest-dom`: Testing utilities
- `typescript`, `@types/*`: TypeScript and type definitions
- `eslint`, `eslint-plugin-*`: Linting

See `package.json` for full details.

---

## Testing

Unit tests are located in `src/components/tests/`.
Run them with:
```bash
npm test
```

### **Current Tests Cover:**
✅ Banner renders the provided text.  
✅ Placeholder text appears when no text is provided.  

---

## Future Improvements
🔹 Add support for multiple text layers.  
🔹 Implement drag-and-drop image positioning.  
🔹 Enhance test coverage for all components.  
🔹 Improve accessibility (a11y) features.  

---

## Feedback and Contribution
This project is part of my Outreachy application. If you'd like to provide feedback:
- **Contact mentors with the public repository link:**  
  **[https://github.com/AyushkhatiDev/mediawiki-banner](https://github.com/AyushkhatiDev/mediawiki-banner)**
- Contributions are tracked via Git commits.
- Feel free to fork and explore!

---

## Notes for Completion
🔹 **Push to GitHub:**
If not done yet, follow these steps:
```bash
git init
git add .
git commit -m "feat: initialize project with vite, react, and typescript"
git remote add origin https://github.com/AyushkhatiDev/mediawiki-banner.git
git push -u origin main
```
Then add subsequent commits as described in the **Git Workflow** section.

🔹 **Submit:**
Include the final repository link in your Outreachy application as a recorded contribution.

---

🚀 **Happy Coding!** 🎨


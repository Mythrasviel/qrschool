
  # Attendance Management System

A modern React-based attendance management system with QR code functionality, built with TypeScript, Vite, and Tailwind CSS.

## Features

- **QR Code Generation & Scanning**: Generate and scan QR codes for attendance tracking
- **Multi-Role Support**: Separate dashboards for Students, Teachers, and Administrators
- **Real-time Attendance Tracking**: Monitor attendance in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Radix UI components and Tailwind CSS

## 🚀 Live Demo

[View Live Demo](https://mythrasviel.github.io/schoolschoolqr)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS
- **QR Code**: React QR Scanner
- **Styling**: Tailwind CSS with custom components
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mythrasviel/schoolschoolqr.git
   cd schoolschoolqr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages. To deploy:

1. **Push to GitHub**: Push your code to the `main` or `master` branch
2. **Enable GitHub Pages**: Go to your repository settings → Pages
3. **Select Source**: Choose "GitHub Actions" as the source
4. **Automatic Deployment**: The GitHub Action will automatically build and deploy your app

### Manual Deployment

If you prefer manual deployment:

1. Build the project: `npm run build`
2. The built files will be in the `dist/` directory
3. Upload the contents of `dist/` to your web server

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── AdminDashboard.tsx
│   ├── StudentDashboard.tsx
│   ├── TeacherDashboard.tsx
│   └── ...
├── styles/             # Global styles
├── main.tsx           # App entry point
└── App.tsx            # Main App component
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Original design from [Figma](https://www.figma.com/design/ECnEGQksNHTReHswI1mE1h/Attendance-Management-System)
  
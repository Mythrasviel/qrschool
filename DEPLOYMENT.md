# Deployment Guide for GitHub Pages

This guide will help you deploy your Attendance Management System to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js and npm installed

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository `schoolschoolqr`
4. Make it public (required for free GitHub Pages)
5. Don't initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Push Your Code to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit: Attendance Management System"

# Add the remote repository
git remote add origin https://github.com/mythrasviel/schoolschoolqr.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The GitHub Action will automatically deploy your site

### 4. Configure GitHub Pages Settings

1. In the same Pages section, you can customize:
   - **Custom domain** (optional): Add your own domain
   - **Enforce HTTPS**: Recommended to keep enabled

### 5. Update README.md

Update the live demo link in your README.md:

```markdown
## 🚀 Live Demo

[View Live Demo](https://mythrasviel.github.io/schoolschoolqr)
```

Your repository is already configured for deployment at: `https://mythrasviel.github.io/schoolschoolqr`

## Automatic Deployment

Once set up, every time you push changes to the `main` branch, GitHub Actions will:

1. Build your React application
2. Deploy it to GitHub Pages
3. Make it available at `https://your-username.github.io/your-repo-name`

## Troubleshooting

### Build Failures

If the GitHub Action fails:

1. Check the "Actions" tab in your repository
2. Look at the build logs for error messages
3. Common issues:
   - Missing dependencies in package.json
   - TypeScript compilation errors
   - Build script issues

### 404 Errors

If you get 404 errors when navigating to different routes:

1. Make sure the `public/404.html` file exists
2. Verify the SPA routing scripts are in your `index.html`
3. Check that your React Router is configured correctly

### Page Not Loading

If the page doesn't load at all:

1. Check if GitHub Pages is enabled in repository settings
2. Verify the deployment completed successfully in the Actions tab
3. Wait a few minutes for changes to propagate

## Custom Domain (Optional)

To use a custom domain:

1. Add your domain to the "Custom domain" field in Pages settings
2. Create a CNAME file in your repository root with your domain
3. Configure DNS settings with your domain provider
4. Wait for DNS propagation (can take up to 24 hours)

## Local Testing

Before deploying, test your build locally:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test the build locally
npx serve dist
```

This will help you catch any build issues before pushing to GitHub.

## Security Considerations

- Never commit sensitive information like API keys
- Use environment variables for configuration
- Keep dependencies updated
- Review GitHub Actions logs for any security issues

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Review the troubleshooting section above
3. Search for similar issues on GitHub
4. Create an issue in your repository with detailed error information

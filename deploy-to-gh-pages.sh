#!/bin/bash

echo "🚀 Deploying to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Create gh-pages branch
echo "🌿 Creating gh-pages branch..."
git checkout -b gh-pages

# Remove all files except dist
echo "🧹 Cleaning branch..."
git rm -rf .

# Copy built files
echo "📁 Copying built files..."
cp -r dist/* .

# Add all files
echo "➕ Adding files to git..."
git add -A

# Commit
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
echo "📤 Pushing to gh-pages branch..."
git push origin gh-pages --force

# Go back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://mythrasviel.github.io/qrschool"

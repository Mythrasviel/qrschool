#!/bin/bash

# Simple deployment script for GitHub Pages
echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files created in ./dist"
    echo ""
    echo "🔗 Your site will be available at:"
    echo "   https://mythrasviel.github.io/qrschool"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Go to your repository settings"
    echo "   2. Navigate to Pages section"
    echo "   3. Set source to 'Deploy from a branch'"
    echo "   4. Select 'gh-pages' branch and '/ (root)' folder"
    echo "   5. Click Save"
else
    echo "❌ Build failed!"
    exit 1
fi

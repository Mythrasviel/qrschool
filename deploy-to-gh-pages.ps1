Write-Host "🚀 Deploying to GitHub Pages..." -ForegroundColor Green

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

# Create gh-pages branch
Write-Host "🌿 Creating gh-pages branch..." -ForegroundColor Yellow
git checkout -b gh-pages

# Remove all files except dist
Write-Host "🧹 Cleaning branch..." -ForegroundColor Yellow
git rm -rf .

# Copy built files
Write-Host "📁 Copying built files..." -ForegroundColor Yellow
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force

# Add all files
Write-Host "➕ Adding files to git..." -ForegroundColor Yellow
git add -A

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
Write-Host "📤 Pushing to gh-pages branch..." -ForegroundColor Yellow
git push origin gh-pages --force

# Go back to main branch
Write-Host "🔄 Switching back to main branch..." -ForegroundColor Yellow
git checkout main

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your site should be available at: https://mythrasviel.github.io/qrschool" -ForegroundColor Cyan

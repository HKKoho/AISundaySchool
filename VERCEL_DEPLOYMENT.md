# Vercel Deployment Guide

This guide will help you deploy your AI Sunday School application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub repository with your code
3. API keys for your AI providers

## Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

## Step 2: Prepare Your Repository

Your repository is already configured with:
- ✅ `vercel.json` - Vercel configuration
- ✅ `api/` directory - Serverless functions
  - `api/chat.ts` - Chat endpoint
  - `api/youtube-transcript.ts` - YouTube transcript fetching
  - `api/analyze-youtube.ts` - YouTube content analysis

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"

2. **Import Your GitHub Repository**
   - Select "Import Git Repository"
   - Choose your GitHub repository: `HKKoho/AISundaySchool`
   - Click "Import"

3. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

   These should be auto-detected from your `vercel.json` file.

4. **Add Environment Variables**
   Click "Environment Variables" and add the following:

   **Required:**
   - `GEMINI_API_KEY` = Your Gemini API key
   - `OLLAMA_API_KEY` = Your Ollama Cloud API key

   **Optional:**
   - `OPENAI_API_KEY` = Your OpenAI API key (if you have one)
   - `OLLAMA_API_URL` = `https://api.ollama.cloud` (default)

   ⚠️ **Important:** Make sure to add these to both **Production** and **Preview** environments!

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your app will be deployed to `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? ai-sunday-school
# - In which directory is your code located? ./
# - Want to override the settings? No
```

## Step 4: Configure Environment Variables (CLI Method)

If using CLI, add environment variables:

```bash
# Add Gemini API key
vercel env add GEMINI_API_KEY

# Add Ollama API key
vercel env add OLLAMA_API_KEY

# (Optional) Add OpenAI API key
vercel env add OPENAI_API_KEY
```

For each command, select:
- Which environments: **Production, Preview, Development**
- Enter the value: [paste your API key]

## Step 5: Redeploy with Environment Variables

After adding environment variables, trigger a new deployment:

```bash
vercel --prod
```

Or in the Vercel Dashboard:
- Go to your project
- Click "Deployments"
- Click "..." menu on the latest deployment
- Click "Redeploy"

## Step 6: Verify Deployment

1. **Check the Frontend**
   - Visit your deployment URL
   - Try navigating through the app
   - Check if all features load

2. **Test API Endpoints**
   - Try the YouTube Learning feature
   - Paste a YouTube URL with transcripts
   - Verify that analysis works

3. **Check Logs**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on a function to see logs
   - Verify no errors appear

## Troubleshooting

### Build Fails

**Error: Module not found**
- Run `npm install` locally to ensure all dependencies are in `package.json`
- Commit and push `package-lock.json`

**Error: Build timeout**
- Your build might be too large. Check the Vercel logs for details.

### API Endpoints Return 404

**Solution:**
- Verify `vercel.json` is in the root directory
- Check that API files are in the `api/` directory
- Redeploy after making changes

### Environment Variables Not Working

**Solution:**
- Go to Project Settings → Environment Variables
- Ensure variables are added to all environments (Production, Preview, Development)
- Redeploy after adding variables

### AI Analysis Fails

**Check:**
1. Environment variables are set correctly
2. API keys are valid and have quota
3. Check function logs in Vercel Dashboard → Functions → [function name]

**Multi-Provider Failover:**
- If Gemini fails (quota): Falls back to Ollama Cloud
- If Ollama fails: Falls back to OpenAI
- Ensure at least one provider has a valid API key

## Continuous Deployment

Once set up, Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Performance Optimization

### Enable Analytics
- Go to Project Settings → Analytics
- Enable analytics to monitor performance

### Function Regions
- Go to Project Settings → Functions
- Set function region closest to your users

### Caching
- Vercel automatically caches static assets
- API responses are not cached by default

## Monitoring

### View Logs
```bash
vercel logs [deployment-url]
```

Or in Dashboard:
- Go to your project → Functions
- Click on any function to see real-time logs

### Monitor Usage
- Dashboard → Project → Analytics
- Check function invocations, bandwidth, and errors

## Cost Management

Vercel Free Tier includes:
- 100GB bandwidth/month
- 100 GB-hrs serverless function execution
- Unlimited deployments

If you exceed limits:
- Upgrade to Pro plan ($20/month)
- Or optimize function usage

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- AI Sunday School Issues: https://github.com/HKKoho/AISundaySchool/issues

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View logs
vercel logs

# List deployments
vercel ls

# Remove project
vercel remove [project-name]

# Link local project to Vercel
vercel link
```

---

**Happy Deploying! 🚀**

If you encounter any issues, check the Vercel deployment logs or open an issue on GitHub.

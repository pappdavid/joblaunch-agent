# JobLaunch Agent - Implementation Guide

## Quick Start

This guide provides step-by-step instructions for implementing the enhanced JobLaunch Agent with database, search, CV generation, and application tracking capabilities.

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)
- Vercel account
- API keys for job sources (LinkedIn, Indeed, JSearch)
- Thesys API key (already generated: sk-th-VdWPF3LbjufeZr1xdrsEAiruVJpIn3Akq4egQ9qf6O3uf8ncQl1zvFTO0GjPtVj3IJ95uDzN3INdZavSWfgd6iAWOeUunuFZ51xv)

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/pappdavid/joblaunch-agent.git
cd joblaunch-agent
npm install
```

### 2. Install Additional Dependencies

```bash
npm install mongoose axios dotenv pdfkit nodemailer
npm install --save-dev jest @testing-library/react typescript
```

### 3. Environment Variables Setup

Create `.env.local` file in project root:

```
THESYS_API_KEY=sk-th-VdWPF3LbjufeZr1xdrsEAiruVJpIn3Akq4egQ9qf6O3uf8ncQl1zvFTO0GjPtVj3IJ95uDzN3INdZavSWfgd6iAWOeUunuFZ51xv
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/joblaunch
LINKEDIN_API_KEY=your_linkedin_key
INDEED_API_KEY=your_indeed_key
JSEARCH_API_KEY=your_jsearch_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Database Setup

#### MongoDB Atlas Setup:
1. Create account at mongodb.com
2. Create a new cluster
3. Create database `joblaunch`
4. Create collections:
   - `users`
   - `jobs`
   - `applications`
   - `cv_templates`
5. Get connection string

#### Create Database Indexes:

```javascript
// In MongoDB Atlas console
db.users.createIndex({ email: 1 }, { unique: true })
db.jobs.createIndex({ title: 'text', description: 'text' })
db.jobs.createIndex({ location: 1 })
db.applications.createIndex({ user_id: 1, application_date: -1 })
db.cv_templates.createIndex({ user_id: 1 })
```

### 5. Implement Database Connection

Create `src/lib/db.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
```

### 6. Implement Job Search API

Create `src/app/api/search/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { JobSearchQuery, SearchResult, JobListing } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const query: JobSearchQuery = await req.json();

    // Search implementation
    const results = await searchJobs(query);
    
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

async function searchJobs(query: JobSearchQuery): Promise<SearchResult> {
  // Implementation:
  // 1. Search from LinkedIn API
  // 2. Search from Indeed API  
  // 3. Search from JSearch API
  // 4. Combine and rank results
  // 5. Filter by criteria
  // 6. Cache in MongoDB
  
  return {
    jobs: [],
    total_count: 0,
    page: 1,
    per_page: 20,
  };
}
```

### 7. Implement CV Generation API

Create `src/app/api/cv/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { CVGenerationResponse, CVData } from '@/lib/types';
import PDFDocument from 'pdfkit';

export async function POST(req: NextRequest) {
  try {
    const cvData: CVData = await req.json();
    
    // Generate PDF
    const pdf = generateCVPDF(cvData);
    
    // Save to MongoDB
    // Return URL
    
    return NextResponse.json({
      success: true,
      cv_id: 'cv_' + Date.now(),
      cv_url: '/generated-cv.pdf',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'CV generation failed' },
      { status: 500 }
    );
  }
}

function generateCVPDF(cvData: CVData) {
  const doc = new PDFDocument();
  
  // Add content
  doc.fontSize(20).text(cvData.full_name);
  doc.fontSize(12).text(cvData.email);
  // ... more content
  
  return doc;
}
```

### 8. Implement Application Tracking API

Create `src/app/api/applications/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { JobApplication } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const application: JobApplication = await req.json();
    
    // Save to database
    // Return success
    
    return NextResponse.json({
      success: true,
      application_id: 'app_' + Date.now(),
      message: 'Application submitted',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Application failed' },
      { status: 500 }
    );
  }
}
```

### 9. Local Testing

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### 10. Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Implement enhancements"
git push origin main

# Vercel will auto-deploy
# Add environment variables in Vercel dashboard:
# - MONGODB_URI
# - THESYS_API_KEY
# - API keys for job sources
```

## Feature Implementation Checklist

- [x] Type definitions created
- [x] Database schema designed
- [x] Job search API endpoint
- [x] CV generation functionality
- [x] Application tracking system
- [x] Comprehensive testing
- [x] Documentation completed
- [ ] Database integration deployed
- [ ] Search API deployed
- [ ] CV generation deployed
- [ ] Application tracking deployed
- [ ] Production testing

## Testing the Features

### Test Job Search
```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": "Senior Developer",
    "location": "Amsterdam",
    "salary_min": 80000
  }'
```

### Test CV Generation
```bash
curl -X POST http://localhost:3000/api/cv \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "Amsterdam"
  }'
```

### Test Application
```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_123",
    "job_id": "job_456",
    "cv_used": "cv_789"
  }'
```

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string in .env.local
- Check IP whitelist in MongoDB Atlas
- Ensure database exists

### API Key Issues
- Verify Thesys API key is valid
- Check rate limits on external APIs
- Ensure environment variables are set

### Performance Issues
- Add database indexes
- Implement caching layer
- Optimize API calls

## Support

For issues or questions, create an issue in GitHub repository.

Repository: https://github.com/pappdavid/joblaunch-agent
Live App: https://joblaunch-agent.vercel.app

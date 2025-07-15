# Render.com Deployment Guide

## Environment Variables to Set in Render.com

Set these environment variables in your Render.com dashboard:

```
NODE_ENV=production
DATABASE_CLIENT=sqlite
DATABASE_URL=./sqlite
```

**Note:** Don't set `PORT` - Render.com will set this automatically.

## Build Settings

**Build Command:**

```bash
npm install && npm run build && npm run migrate
```

**Start Command:**

```bash
npm start
```

## Database Options

### Option 1: SQLite (Current - Good for testing)

- Uses local file storage
- Data persists between deployments
- Good for development/testing

### Option 2: PostgreSQL (Recommended for production)

To use PostgreSQL:

1. Add a PostgreSQL service in Render.com
2. Update environment variables:
   ```
   DATABASE_CLIENT=pg
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

## Troubleshooting

### Common Issues:

1. **Port binding errors**: Make sure you don't set PORT in environment variables
2. **Database connection**: Check DATABASE_URL format
3. **Build failures**: Ensure all dependencies are in package.json

### Health Check

After deployment, test: `https://your-app.onrender.com/health`

### API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /transactions` - List transactions (requires session)
- `POST /transactions` - Create transaction
- `GET /transactions/:id` - Get specific transaction
- `GET /transactions/summary` - Get summary

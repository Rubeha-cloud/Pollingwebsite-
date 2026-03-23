# Polling Website

A mobile-responsive polling application built with Node.js/Express and MongoDB Atlas.

## Features

✅ **Mobile-Optimized UI** - Responsive design for all devices
✅ **MongoDB Integration** - Cloud storage with MongoDB Atlas (free tier)
✅ **Password-Protected Results** - Admin-only access to view all votes
✅ **Real-time Data** - Votes stored with timestamps
✅ **User Validation** - Name required before voting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Rubeha-cloud/polling-website.git
cd polling-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create a database user in **Database Access**
4. Whitelist your IP in **Network Access** (use 0.0.0.0/0 for development)
5. Get your connection string from **Connect** → **Connect your application**

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/polling-db?retryWrites=true&w=majority
ADMIN_PASSWORD=your_secure_password_here
PORT=3000
```

Replace with your actual MongoDB credentials and choose a strong admin password.

### 5. Start the Server

```bash
npm start
```

The application will be running at `http://localhost:3000`

## Usage

- **Vote Page**: http://localhost:3000
  - Enter your name
  - Select an option
  - Click Submit
  - See the "Thank You" message

- **Results Page**: http://localhost:3000/results
  - Enter the admin password
  - View all votes in a table with timestamps

## Project Structure

```
polling-website/
├── backend/
│   └── server.js
├── public/
│   ├── index.html
│   ├── results.html
│   └── style.css
│   └── script.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `ADMIN_PASSWORD` | Password for accessing results page |
| `PORT` | Server port (default: 3000) |

## Security Notes

⚠️ Never commit `.env` to version control
⚠️ Use a strong admin password in production
⚠️ Restrict MongoDB IP whitelist to your server in production
⚠️ Consider adding rate limiting for production use

## License

MIT
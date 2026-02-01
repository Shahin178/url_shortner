# URL Shortener Project

A simple URL shortener built with **Node.js**, **Express**, **MongoDB**, and **EJS**, with a **Discord bot integration** for generating short URLs via Discord messages.

---

## Features

- User authentication: **Sign up / Login / Logout**  
- URL management:
  - Create short URLs  
  - View all URLs (per user)  
  - Admin view for all URLs  
  - Track number of clicks (analytics)  
- Discord bot integration:
  - Generate short URLs from Discord using a secure API key  
- Clean, minimal UI using **EJS**  
- Environment-variable based configuration for local & production  

---

## Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas)  
- **Templating:** EJS  
- **Authentication:** JWT + cookies  
- **Discord Bot:** Discord.js  
- **Short ID generator:** Nanoid  
- **Deployment:** Render  

---

## Project Structure

```
src/
├─ controllers/
│  ├─ url.js          # Web user controllers
│  └─ botUrl.js       # Discord bot controllers
├─ middleware/
│  ├─ auth.js         # Auth middleware
│  └─ verifyBot.js    # Bot authentication middleware
├─ models/
│  └─ Url.js          # URL model
├─ routes/
│  ├─ user.js
│  ├─ url.js
│  ├─ staticRouter.js
│  └─ bot.js          # Bot route
├─ connect.js         # MongoDB connection
├─ config/
│  └─ env.js          # dotenv config
└─ index.js           # Main server file
```

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
# MongoDB Atlas URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urlshortener

# JWT secret
JWT_SECRET=your_jwt_secret

# Base URL (local)
BASE_URL=http://localhost:3000

# Discord bot secret key
BOT_SECRET=your_discord_bot_secret
```

---

## Usage (Local Development)

```bash
npm start
```

- Open browser: `http://localhost:3000`  
- Sign up / Login  
- Create short URLs  
- Access `/` for your URLs, `/admin/urls` for admin view  

---

## Discord Bot Integration

1. Bot sends POST request to:

```
POST /bot/create
Headers:
  Content-Type: application/json
  x-bot-token: <BOT_SECRET>
Body:
  { "url": "https://example.com" }
```

2. Response:

```json
{
  "shortUrl": "http://localhost:3000/abc12345",
  "shortId": "abc12345"
}
```

3. Bot can reply in Discord with the generated short URL.

---

## Deployment on Render

1. Push your code to **GitHub**.  
2. Create a **Web Service** on Render.  
3. Configure **Environment Variables** in Render:

```env
MONGO_URI=<your production MongoDB URI>
JWT_SECRET=<your production JWT secret>
BASE_URL=https://your-render-url.onrender.com
BOT_SECRET=<your bot secret>
```

4. Set **Build Command:** `npm install`  
5. Set **Start Command:** `npm start`  
6. Deploy → Render will provide your live URL.  

> Your Discord bot should now use the **live BASE_URL**.

---

## Notes

- **Local vs Production:** Use `.env` for local development, Render environment variables for production.  
- **Bot Security:** Never expose `BOT_SECRET`. Always use `x-bot-token` header for bot requests.  
- **Analytics:** Clicks are stored in `visitHistory` in MongoDB.  

---

## Future Improvements

- Rate limiting for bot requests  
- Custom short URL aliases  
- Redis caching for analytics  
- Slack/WhatsApp bot integration  
- HTTPS on local development  

---

## License

MIT License  
© 2026 Your Name


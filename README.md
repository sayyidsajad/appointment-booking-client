# Appointment Booking Plugin (Frontend)

This is the frontend part of a simple appointment booking system. It allows users to view available time slots and book appointments through an embedded plugin-style UI.

## Project Structure

```
frontend/
├── config.js          # Contains configurable values like API base URL
├── index.html         # Demo HTML file to test the plugin
├── plugin.js          # Main JavaScript logic for booking plugin
└── styles.css         # Basic styles for the plugin UI
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sayyidsajad/appointment-booking-client
cd appointment-booking-client
```

### 2. Configure API Endpoint

Edit the `config.js` file to point to your backend API:

```js
const CONFIG = {
  API_BASE_URL: "http://127.0.0.1:5000/api",
};
```

You can change this to your deployed backend URL if needed.

### 3. Open in Browser

You can open `index.html` directly in your browser or serve it using a simple HTTP server.

## How It Works

- Loads available time slots from the backend using `/api/available-slots?date=YYYY-MM-DD`
- Displays a simple UI for selecting time and submitting name and phone number
- Sends POST request to `/api/book` on form submission

## Technologies Used

- HTML5, CSS3
- Vanilla JavaScript


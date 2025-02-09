# To-Do Progressive Web App (PWA)

## Overview
This project is a **To-Do application** built as a **Progressive Web App (PWA)**. The app allows users to add, view, and delete tasks while also supporting **offline functionality** using **service workers** and **localStorage**.

## Features
- **PWA Compatibility**: Includes a **manifest.json** file and a **service worker** for offline support.
- **Task Management**: Users can **add, view, and remove** tasks.
- **Offline Support**: Tasks persist in **localStorage** so they are available even when offline.
- **Automatic Install Prompt**: The app prompts users to install **after interaction** (click or adding a task).

## Installation & Setup
### 1. Clone the Repository
```sh
cd "C:\Users\Vishnu Teja\Downloads\MCDA5550-PWAAssignment"
git clone <your-repository-url>
cd MCDA5550-PWAAssignment
```

### 2. Run a Local Server
For PWA functionality, serve the app using a local server:
```sh
python -m http.server 8000
```
**OR** (if using Node.js)
```sh
npx http-server -p 8000
```

### 3. Open in Browser
Go to **http://localhost:8000** in Chrome and test the app.

## File Structure
```
MCDA5550-PWAAssignment/
│── index.html         # Main HTML file
│── app.js            # JavaScript logic for tasks & PWA install prompt
│── manifest.json     # Web app manifest for PWA support
│── service-worker.js # Handles offline caching
│── styles.css        # Styling
```

## Code Explanation
### 📌 **`app.js` - Task Management & Install Prompt**
- Loads tasks from **localStorage**.
- Adds & removes tasks.
- **Triggers install prompt** after user interaction to bypass automatic block.

### 📌 **`manifest.json` - PWA Metadata**
- Defines app name, icons, start URL, and colors.

### 📌 **`service-worker.js` - Caching for Offline Mode**
- Caches app files to enable offline usage.

## Offline Functionality
- The **service worker** caches key assets (`index.html`, `app.js`, etc.).
- Tasks are stored in **localStorage**, ensuring persistence even without internet.

## Automatic Install Prompt Fix
**Issue:** `event.prompt()` must be triggered by a **user action** (button click, task addition, etc.).
**Solution:**
- Store `beforeinstallprompt` event.
- Show prompt **on first user interaction** (click or task addition).

## Deployment
To make the PWA publicly accessible, host it on GitHub Pages, Netlify, or Vercel.

## Debugging
1. Open **Chrome DevTools** (`F12` → "Application" tab).
2. Check "Service Workers" for correct registration.
3. Clear storage if issues occur (`Application` → `Storage` → `Clear site data`).

## License
This project is open-source and free to use.

---
Feel free to modify and enhance the app! 🚀


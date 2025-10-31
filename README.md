# Google Sheets Dashboard - Apps Script

This repository contains the code for a simple web app built with Google Apps Script. The script creates a dashboard to display data from a specified Google Sheet.

## Files

*   `Code.gs`: This is the server-side Apps Script code. It handles serving the web app and fetching the data from your Google Sheet.
*   `Index.html`: This file contains all the client-side code, including the HTML structure, CSS for styling, and JavaScript to request data from the server and build the dashboard table.

---

## Setup and Deployment Guide

Follow these steps to get your dashboard up and running.

### 1. Create a Google Apps Script Project

*   Navigate to [script.google.com](https://script.google.com/home/my).
*   Click on **New project** to open the Apps Script editor.

### 2. Copy the Code from this Repository

You'll need to transfer the code from this repository into your new Apps Script project.

*   **Add `Code.gs` content:**
    1.  Open the `Code.gs` file in your Apps Script project.
    2.  Delete any existing code in that file.
    3.  Copy the entire content of the `Code.gs` file from this repository and paste it into the editor.

*   **Add `Index.html` content:**
    1.  In the Apps Script editor, click the **+** icon next to "Files" and select **HTML**.
    2.  Name the new file `Index.html` and press Enter.
    3.  Delete any existing code in the new file.
    4.  Copy the entire content of the `Index.html` file from this repository and paste it into the `Index.html` editor.

### 3. Set Project Permissions (Important!)

This step is crucial to fix the permission error. You need to explicitly tell Google that the script needs to access spreadsheets.

*   In the Apps Script editor, click the **Project Settings** icon (a gear ⚙️) on the left-hand side.
*   Check the box that says **"Show 'appsscript.json' manifest file in editor"**.
*   Return to the editor view (click the `<>` icon). You will now see a file named `appsscript.json`. Click on it.
*   Replace the entire content of the `appsscript.json` file with the following code. This adds the necessary permission scope.

    ```json
    {
      "timeZone": "America/New_York",
      "dependencies": {
      },
      "exceptionLogging": "STACKDRIVER",
      "runtimeVersion": "V8",
      "oauthScopes": [
        "https://www.googleapis.com/auth/spreadsheets.readonly"
      ]
    }
    ```
    *Note: You can change the `"timeZone"` to your own if you wish.*

### 4. Configure the Script for Your Spreadsheet

*   Open the `Code.gs` file in the editor.
*   Locate the `--- CONFIGURATION ---` section at the top of the `getSheetData` function.
*   **Set the Spreadsheet ID:** Replace `'YOUR_SPREADSHEET_ID_HERE'` with the actual ID of your Google Sheet. You can find the ID in your sheet's URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.
*   **Set the Sheet Name:** Replace `'Sheet1'` with the exact name of the sheet (the tab at the bottom) that contains your data.

### 5. Deploy the Web App

*   **Important:** If you have an existing deployment, you must create a **New deployment** for the permission changes to take effect. Updating an existing deployment will not work.
*   At the top-right of the editor, click the **Deploy** button and select **New deployment**.
*   Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
*   Fill in the deployment details:
    *   **Description:** You can add a note here, like "Fixing permissions".
    *   **Execute as:** Select `Me`.
    *   **Who has access:** Choose who can view your dashboard. For a public dashboard, select `Anyone`.
*   Click **Deploy**.

### 6. Authorize Permissions

The script will ask for permission again with the correct scope.

*   A window will pop up asking for authorization. Click **Authorize access**.
*   Choose your Google account.
*   You might see a warning screen saying "Google hasn't verified this app." This is normal for personal scripts. Click **Advanced**, then click **Go to [Your Project Name] (unsafe)**.
*   Review the permissions. It should now ask for permission to "See your Google Spreadsheets". Click **Allow**.

### 7. Access Your Dashboard

After a successful deployment, you will be given a **new Web app URL**. Use this new URL to access your dashboard. The old URL will not work with the new permissions.

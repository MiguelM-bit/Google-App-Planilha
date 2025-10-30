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

### 3. Configure the Script for Your Spreadsheet

Now, you need to tell the script which spreadsheet to use.

*   Open the `Code.gs` file in the editor.
*   Locate the `--- CONFIGURATION ---` section at the top of the `getSheetData` function.
*   **Set the Spreadsheet ID:** Replace `'YOUR_SPREADSHEET_ID_HERE'` with the actual ID of your Google Sheet. You can find the ID in your sheet's URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.
*   **Set the Sheet Name:** Replace `'Sheet1'` with the exact name of the sheet (the tab at the bottom) that contains your data.

### 4. Deploy the Web App

*   At the top-right of the editor, click the **Deploy** button and select **New deployment**.
*   Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
*   Fill in the deployment details:
    *   **Description:** You can add a note here, like "Initial version".
    *   **Execute as:** Select `Me`.
    *   **Who has access:** Choose who can view your dashboard. For a public dashboard, select `Anyone`.
*   Click **Deploy**.

### 5. Authorize Permissions

The first time you deploy, Google needs your permission to run the script.

*   A window will pop up asking for authorization. Click **Authorize access**.
*   Choose your Google account.
*   You might see a warning screen saying "Google hasn't verified this app." This is normal for personal scripts. Click **Advanced**, then click **Go to [Your Project Name] (unsafe)**.
*   Review the permissions the script needs (it will ask to view your spreadsheets) and click **Allow**.

### 6. Access Your Dashboard

After a successful deployment, you will be given a **Web app URL**. This is the public link to your new dashboard. You can copy this URL and share it.

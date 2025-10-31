/**
 * Serves the HTML for the web app.
 * @param {Object} e The event parameter for a web app doGet request.
 * @return {HtmlOutput} The HTML output to be served.
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index.html')
      .setTitle('Spreadsheet Data Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * A server-side function to fetch data from the Google Sheet.
 * This function is called by the client-side JavaScript.
 *
 * @return {Object[][]} A 2D array of data from the spreadsheet.
 */
function getSheetData() {
  try {
    // --- CONFIGURATION ---
    // Replace 'YOUR_SPREADSHEET_ID_HERE' with the actual ID of your Google Sheet.
    // You can find the ID in the URL of your sheet: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
    
    // Replace 'Sheet1' with the name of the sheet you want to get data from.
    const SHEET_NAME = 'Sheet1';
    // --- END CONFIGURATION ---

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" not found. Please check the configuration.`);
    }
    
    // Fetches all data from the sheet.
    const data = sheet.getDataRange().getValues();
    
    // Return the data to the client.
    return data;
  } catch (error) {
    Logger.log(error.message);
    // Return an error message to be displayed on the dashboard.
    return [['Error fetching data', error.message]];
  }
}

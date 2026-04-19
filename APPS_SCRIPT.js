/* global SpreadsheetApp, ContentService */
// ============================================================
// Al Qassimi Cardiology Club — Google Apps Script
//
// HOW TO DEPLOY (do this every time you update the script):
//   1. Extensions → Apps Script → paste this code → Save (Ctrl+S)
//   2. Click "Deploy" → "Manage deployments"
//   3. Click the pencil ✏️ on your existing deployment
//   4. Version → select "New version" → click "Deploy"
//   (Re-deploying with a new version is required for changes to take effect)
// ============================================================

const SHEET_ID   = '1OZlJ9KQBIrc1gI_Jf6Cs-fEoI-7ut_SbvaWJSHwQSIM';
const SHEET_NAME = 'Registrations';

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      'Timestamp',
      'Full Name',
      'Email Address',
      'Phone Number',
      'Medical Specialty',
      'Hospital / Institution',
      'Registration Type',
    ];
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#A8885C');
    headerRange.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, headers.length, 190);
  }

  // Always force phone column (D) to plain text so +971... never parses as formula
  sheet.getRange('D:D').setNumberFormat('@');

  return sheet;
}

function saveRow(p) {
  const sheet = getOrCreateSheet();
  const row = [
    new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' }),
    p.fullName  || '',
    p.email     || '',
    p.phone     || '',   // written to D column which is forced @text
    p.specialty || '',
    p.hospital  || '',
    'Online Webinar',
  ];
  sheet.appendRow(row);
  // Re-write phone cell explicitly as text to prevent formula parse error
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 4).setNumberFormat('@').setValue(p.phone || '');
}

// ── POST handler (form-encoded body from browser) ────────────
function doPost(e) {
  try {
    // Receives application/x-www-form-urlencoded → e.parameter
    saveRow(e.parameter);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET handler (test + fallback) ────────────────────────────
function doGet(e) {
  try {
    // If URL params present, treat as a registration (fallback)
    if (e.parameter && e.parameter.email) {
      saveRow(e.parameter);
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Plain health-check
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'Al Qassimi CC endpoint is live.' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Knihobot – waitlist aplikace
 * Google Apps Script: zapíše odpovědi z formuláře do Google Sheetu.
 *
 * NASAZENÍ:
 * 1. Cílový Google Sheet → menu Rozšíření → Apps Script.
 * 2. Smaž ukázkový kód a vlož tenhle soubor.
 * 3. Nasadit (Deploy) → Nové nasazení → typ „Webová aplikace".
 *    - Spustit jako: Já (tvůj účet)
 *    - Kdo má přístup: Kdokoli (Anyone)
 * 4. Zkopíruj „URL webové aplikace" (končí na /exec) a pošli ji –
 *    doplní se do index.html jako ENDPOINT_URL.
 */

var SHEET_NAME = 'Waitlist';   // název listu, kam se zapisuje

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Hlavička při prvním zápisu
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Čas', 'E-mail', 'Telefon', 'Co ho láká', 'Jiné', 'User agent']);
    }

    sheet.appendRow([
      new Date(),
      data.email || '',
      data.phone || '',
      data.features || '',
      data.other || '',
      data.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Knihobot waitlist endpoint běží.');
}

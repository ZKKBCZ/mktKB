/**
 * Knihobot – waitlist aplikace
 * Google Apps Script: každé odeslání = jeden řádek, každá otázka = jeden sloupec.
 *
 * NASAZENÍ:
 * 1. Cílový Google Sheet → menu Rozšíření → Apps Script.
 * 2. Smaž ukázkový kód a vlož tenhle soubor. Ulož (ikona diskety).
 * 3. Nasadit (Deploy) → Nové nasazení → typ „Webová aplikace".
 *    - Spustit jako: Já (tvůj účet)
 *    - Kdo má přístup: Kdokoli (Anyone)
 * 4. Autorizuj (u „Google toto neověřil" → Rozšířené → Přejít na projekt).
 * 5. Zkopíruj „URL webové aplikace" (končí na /exec) a pošli ji –
 *    doplní se do index.html jako ENDPOINT_URL.
 */

var SHEET_NAME = 'Waitlist';

// Pořadí a názvy sloupců = pořadí otázek ve formuláři.
var HEADERS = ['Čas', 'Co by tě na aplikaci lákalo nejvíc', 'E-mail', 'Telefon'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Hlavička při prvním zápisu
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    // Jeden řádek na jedno vyplnění; každá otázka jedna buňka.
    sheet.appendRow([
      new Date(),            // Čas
      data.features || '',   // Q1 – všechny zaškrtnuté možnosti (vč. "jiné: …")
      data.email || '',      // Q2 – e-mail
      data.phone || ''       // Q3 – telefon
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

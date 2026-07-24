# Knihobot – waitlist (registrace na doplňkovou appku)

Statická landing page + krokový dotazník. Sbírá registrace zájemců o testování nové Knihobot aplikace.

**Živá ukázka:** https://zkkbcz.github.io/mktKB/waitlist/

## Obsah složky
- `index.html` – celá stránka (HTML + CSS + JS v jednom souboru, žádný build)
- `bookbots-green.svg`, `logo-cs.svg` – logo Knihobotu (odkazované relativně z `index.html`)
- `apps-script.gs` – kód Google Apps Scriptu, který přijímá odeslání a zapisuje do Google Sheetu (běží na straně Googlu, není součást webu – jen reference)
- `README.md` – tento soubor

## Jak to nasadit
Je to **čistě statická stránka bez závislostí a bez build kroku.** Stačí naservírovat obsah složky.

- Nahraj `index.html` + oba `.svg` do stejného adresáře (SVG jsou linkované relativně – musí ležet vedle `index.html`, jinak se logo nezobrazí).
- Fonty se tahají z Google Fonts CDN (`fonts.googleapis.com`) – funguje bez konfigurace, případně lze selfhostovat.
- Doporučená cílová cesta na webu: např. `/appka-waitlist/` nebo dle vaší konvence. Kdyby stránka běžela z podadresáře, relativní cesty k SVG fungují beze změny.

## Kam chodí data
Formulář posílá `POST` (JSON, `Content-Type: text/plain`, `mode: no-cors`) na Google Apps Script endpoint definovaný v `index.html` v konstantě **`ENDPOINT_URL`**. Script zapíše jeden řádek do Google Sheetu:

| Čas | Co by tě na aplikaci lákalo nejvíc | E-mail | Telefon |
|-----|-----------------------------------|--------|---------|

- Jedno vyplnění = jeden řádek; v prvním sloupci jsou všechny zaškrtnuté možnosti v jedné buňce (oddělené `|`, včetně `jiné: <text>`).
- Endpoint i cílový Sheet vlastní marketing (Žaneta). Když má data téct jinam (např. do vaší DB / CRM), stačí přepsat `ENDPOINT_URL` na váš vlastní endpoint, který přijme stejný JSON payload:

```json
{
  "email": "...",
  "phone": "iOS (iPhone) | Android | BlackBerry",
  "features": "možnost 1 | možnost 2 | jiné: vlastní text",
  "other": "vlastní text z pole jiné",
  "submittedAt": "ISO datum",
  "userAgent": "..."
}
```

## Poznámky
- Texty, otázky i možnosti se editují přímo v `index.html` (pole `FEATURES` a příslušné sekce).
- Barvy/fonty odpovídají design systému Knihobotu (proměnné v `:root` v `<style>`).
- Stránka je responzivní, bez cookies a bez externích trackerů.

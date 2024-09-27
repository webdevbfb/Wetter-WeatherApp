# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# Wetter-App 🌤️

Dies ist eine einfache Wetter-App, die die aktuellen Wetterbedingungen für eine ausgewählte Stadt anzeigt. Die App zeigt zusätzlich zur Temperatur und Wetterbeschreibung auch ein passendes Video basierend auf den Wetterbedingungen an.

## Funktionen ✨

- Zeigt die aktuellen Wetterbedingungen für eine Stadt an
- Dynamische Anzeige eines Hintergrundvideos, das sich je nach Wetterlage ändert (z.B. Regen, Schnee, Sonne, etc.)
- Zeigt die lokale Uhrzeit der Stadt an
- Fehlerbehandlung, falls die Stadt nicht gefunden wird
- Footer mit Informationen über den Entwickler und einem Link zu GitHub

## Technologien 💻

- **React**: Für das Erstellen der UI-Komponenten
- **OpenWeather API**: Zum Abrufen der Wetterdaten
- **CSS**: Zum Gestalten der Benutzeroberfläche
- **JavaScript (ES6)**: Für die Logik und API-Integration

## Installation 🚀

1. Klone dieses Repository:
   ```bash
   cd weather-app

2. Wechsle in das Verzeichnis:
   ```bash
   git clone https://github.com/dein-github-username/weather-app.git

3. Installiere die Abhängigkeiten:
   ```bash
   npm install

4. Starte die App:
   ```bash
   npm start
## API-Schlüssel 🔑

Diese App verwendet die OpenWeather API. Um die App nutzen zu können, benötigst du einen API-Schlüssel von [OpenWeather](https://openweathermap.org/). Sobald du einen API-Schlüssel hast, füge ihn in der Datei `WeatherDisplay.jsx` in die folgende Zeile ein:

```javascript
const apiKey = 'dein-api-key-hier';
```
## Verwendung 🎯

- Gib den Namen einer Stadt ein, um die aktuellen Wetterbedingungen für diese Stadt zu sehen.
- Die App zeigt ein passendes Hintergrundvideo an, das auf den Wetterbedingungen basiert (z.B. Regen, Schnee, Nebel, etc.).
- Die lokale Uhrzeit der gewählten Stadt wird ebenfalls angezeigt.
- Falls eine Stadt nicht gefunden wird, erscheint eine Fehlermeldung.

## Footer 👣

Die App enthält einen Footer, der den Entwickler (Bilal) nennt und einen Link zu den GitHub-Repositories enthält.
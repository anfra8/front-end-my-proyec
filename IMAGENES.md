# Guía para Obtener Imágenes de los Juegos

## Imágenes Actuales
Actualmente estoy usando imágenes genéricas de Unsplash. Para obtener las imágenes reales de cada juego, aquí están las opciones:

## 🎮 Fuentes Oficiales de Imágenes

### 1. **Steam Store (Recomendado)**
Cada juego tiene banners oficiales en Steam:

- **ULTRAKILL**: https://cdn.akamai.steamstatic.com/steam/apps/1229490/header.jpg
- **Undertale**: https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg
- **Hollow Knight**: https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg
- **Alice: Madness Returns**: https://cdn.akamai.steamstatic.com/steam/apps/19680/header.jpg
- **Sifu**: https://cdn.akamai.steamstatic.com/steam/apps/2138710/header.jpg
- **Hotline Miami**: https://cdn.akamai.steamstatic.com/steam/apps/219150/header.jpg
- **Cuphead**: https://cdn.akamai.steamstatic.com/steam/apps/268910/header.jpg
- **The Binding of Isaac**: https://cdn.akamai.steamstatic.com/steam/apps/250900/header.jpg

### 2. **SteamDB**
https://steamdb.info/ - Proporciona acceso a todas las imágenes de Steam

### 3. **SteamGridDB** (Mejor opción para diversidad)
https://www.steamgriddb.com/
- Imágenes en alta calidad
- Múltiples estilos y tamaños
- Comunidad activa subiendo arte

## 📥 Cómo Descargar y Usar las Imágenes

### Opción A: URLs Directas de Steam
```javascript
// Reemplaza en server/data.js
{
  id: 1,
  name: "ULTRAKILL",
  banner: "https://cdn.akamai.steamstatic.com/steam/apps/1229490/header.jpg",
  // ... resto del código
}
```

### Opción B: Descargar e Hospedar Localmente

1. **Crear carpeta para imágenes:**
```bash
mkdir public/images/games
```

2. **Descargar imágenes manualmente:**
   - Visita cada página de Steam
   - Click derecho en el banner → "Guardar imagen como..."
   - Guarda en `public/images/games/`

3. **Actualizar rutas en data.js:**
```javascript
{
  id: 1,
  name: "ULTRAKILL",
  banner: "/images/games/ultrakill.jpg",
}
```

### Opción C: API de SteamSpy
SteamSpy proporciona datos de juegos incluyendo URLs de imágenes:
```
https://steamspy.com/api.php?request=appdetails&appid=1229490
```

## 🚀 Script Automático para Descargar Imágenes

Puedes crear un script para descargar todas las imágenes:

```javascript
// download-images.js
import https from 'https';
import fs from 'fs';
import path from 'path';

const games = [
  { id: 1229490, name: 'ultrakill' },
  { id: 391540, name: 'undertale' },
  { id: 367520, name: 'hollow-knight' },
  { id: 19680, name: 'alice-madness-returns' },
  { id: 2138710, name: 'sifu' },
  { id: 219150, name: 'hotline-miami' },
  { id: 268910, name: 'cuphead' },
  { id: 250900, name: 'binding-of-isaac' }
];

const downloadImage = (appId, filename) => {
  const url = `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;
  const filepath = path.join('public', 'images', 'games', `${filename}.jpg`);
  
  https.get(url, (res) => {
    const fileStream = fs.createWriteStream(filepath);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✓ Downloaded: ${filename}.jpg`);
    });
  });
};

// Crear directorio si no existe
fs.mkdirSync('public/images/games', { recursive: true });

// Descargar todas las imágenes
games.forEach(game => downloadImage(game.id, game.name));
```

## 🎨 URLs Recomendadas (Steam CDN)

Usa estas URLs directamente en tu código - son rápidas y confiables:

```javascript
const gameBanners = {
  ultrakill: "https://cdn.akamai.steamstatic.com/steam/apps/1229490/header.jpg",
  undertale: "https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg",
  hollowKnight: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg",
  aliceMadness: "https://cdn.akamai.steamstatic.com/steam/apps/19680/header.jpg",
  sifu: "https://cdn.akamai.steamstatic.com/steam/apps/2138710/header.jpg",
  hotlineMiami: "https://cdn.akamai.steamstatic.com/steam/apps/219150/header.jpg",
  cuphead: "https://cdn.akamai.steamstatic.com/steam/apps/268910/header.jpg",
  bindingOfIsaac: "https://cdn.akamai.steamstatic.com/steam/apps/250900/header.jpg"
};
```

## 📌 Nota Legal
Las imágenes de Steam son propiedad de sus respectivos desarrolladores. Úsalas solo para:
- Proyectos educativos
- Portfolios personales
- Demos sin fines comerciales

## 🔄 Actualización Rápida

Para actualizar todas las imágenes ahora mismo, simplemente reemplaza las URLs en `server/data.js` con las URLs de Steam CDN proporcionadas arriba.

# 🚀 Quick Start - Steam Library

## Inicio Rápido (5 minutos)

### 1. Instalar y Ejecutar

```bash
# Instalar dependencias
npm install

# Iniciar todo (backend + frontend)
npm start
```

Abre http://localhost:5173 en tu navegador.

### 2. Probar la Aplicación

**Modo Demo (Sin configurar nada)**:

1. Click en "Sign In" en el header
2. Usa cualquier email: `test@gmail.com` y password: `123456`
3. O click en "Continue as Guest"
4. ¡Listo! Ya puedes explorar, comprar juegos y agregar favoritos

**Usuarios de prueba**:
- `nikitin@steam.com` - Usuario con 3 juegos
- Cualquier otro email - Usuario nuevo

## 🔧 Configuración Opcional de Supabase

### ¿Por qué usar Supabase?

- ✅ Autenticación real con emails
- ✅ Base de datos persistente
- ✅ Los datos no se pierden al recargar
- ✅ Múltiples usuarios reales

### Configuración (10 minutos)

1. **Crear cuenta en Supabase**:
   - Ve a https://supabase.com
   - Crea proyecto gratuito

2. **Copiar credenciales**:
   - Settings → API
   - Copia Project URL y anon key

3. **Configurar `.env`**:
   ```bash
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

4. **Crear tablas** (SQL Editor en Supabase):
   ```sql
   -- Ver archivo SUPABASE_SETUP.md para el SQL completo
   ```

5. **Reiniciar app**:
   ```bash
   npm start
   ```

Para más detalles, lee [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 📱 Funcionalidades Disponibles

### Sin Login
- ✅ Ver todos los juegos
- ✅ Ver detalles de juegos
- ✅ Buscar juegos
- ❌ Comprar juegos
- ❌ Agregar favoritos
- ❌ Ver librería

### Con Login/Guest
- ✅ Todo lo anterior +
- ✅ Comprar juegos
- ✅ Agregar favoritos
- ✅ Ver tu librería
- ✅ Tracking de horas jugadas
- ✅ Perfil personalizado

## 🎮 Navegación

| Página | URL | Descripción |
|--------|-----|-------------|
| Home | `/` | Vista principal con destacados |
| Store | `/store` | Todos los juegos disponibles |
| Library | `/library` | Tus juegos (requiere login) |
| Favorites | `/favorites` | Tus favoritos (requiere login) |
| Game | `/game/:id` | Detalles del juego |

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev          # Solo frontend
npm run server       # Solo backend
npm start           # Frontend + Backend

# Producción
npm run build       # Compilar para producción
npm run preview     # Preview de build

# Mantenimiento
npm audit fix       # Corregir vulnerabilidades
npm update          # Actualizar dependencias
```

## 📦 Estructura del Proyecto

```
steam-library/
├── src/
│   ├── components/     # Componentes React
│   │   ├── Login.jsx   # Modal de login
│   │   ├── Header.jsx  # Header con botón login
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.jsx  # Manejo de autenticación
│   ├── lib/
│   │   └── supabase.js     # Cliente Supabase
│   └── pages/          # Páginas de la app
├── server/
│   ├── index.js        # API Express
│   └── data.js         # Datos mock de juegos
├── .env               # Variables de entorno (no subir a git)
└── .env.example       # Ejemplo de variables
```

## 🐛 Solución de Problemas

### Puerto 3001 ya en uso
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### No aparece el botón de login
- Verifica que Header.jsx esté importado
- Revisa la consola del navegador por errores

### Modal de login no se cierra
- Click en la X o presiona ESC
- Verifica que `setShowLogin(false)` se ejecute

### Supabase no conecta
- Verifica las variables en `.env`
- Reinicia el servidor con `npm start`
- Revisa que el proyecto Supabase esté activo

## 📚 Recursos

- [README.md](./README.md) - Documentación completa
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Guía detallada de Supabase
- [IMAGENES.md](./IMAGENES.md) - Cómo obtener imágenes de juegos

## 🎯 Próximos Pasos

1. ✅ **Básico**: Usa la app en modo demo
2. 🔧 **Intermedio**: Configura Supabase para persistencia
3. 🚀 **Avanzado**: Deploy en Vercel/Netlify
4. 🎨 **Personaliza**: Modifica colores y juegos

---

**¿Problemas?** Abre un issue o contacta al desarrollador.

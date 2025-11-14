# Guía de Configuración de Supabase

## 🚀 Configuración Inicial

### 1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa los datos:
   - **Name**: Steam Library
   - **Database Password**: (guarda esto en un lugar seguro)
   - **Region**: Elige la más cercana a ti
   - **Pricing Plan**: Free (suficiente para este proyecto)

### 2. Obtener las Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL**: `https://[tu-proyecto].supabase.co`
   - **anon/public key**: La clave anon key

### 3. Configurar Variables de Entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza los valores:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

## 📊 Configuración de la Base de Datos

### Crear Tabla de Usuarios

Ve a **SQL Editor** en Supabase y ejecuta:

```sql
-- Crear tabla de usuarios extendida
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear tabla de juegos poseídos
CREATE TABLE public.user_games (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  game_id INTEGER NOT NULL,
  purchase_date DATE DEFAULT CURRENT_DATE,
  playtime DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, game_id)
);

-- Crear tabla de favoritos
CREATE TABLE public.user_favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  game_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, game_id)
);

-- Habilitar Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
CREATE POLICY "Users can view all profiles" 
  ON public.user_profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Políticas para user_games
CREATE POLICY "Users can view own games" 
  ON public.user_games FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own games" 
  ON public.user_games FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own games" 
  ON public.user_games FOR UPDATE 
  USING (auth.uid() = user_id);

-- Políticas para user_favorites
CREATE POLICY "Users can view own favorites" 
  ON public.user_favorites FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" 
  ON public.user_favorites FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" 
  ON public.user_favorites FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON public.user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Configurar Autenticación por Email

1. Ve a **Authentication** → **Providers**
2. Habilita **Email**
3. Configura:
   - ✅ Enable Email provider
   - ✅ Confirm email (opcional, desactívalo para testing)
   - ✅ Enable Email OTP (opcional)

### Opcional: Configurar Templates de Email

1. Ve a **Authentication** → **Email Templates**
2. Personaliza los templates:
   - **Confirm signup**
   - **Reset password**
   - **Magic link**

## 🔧 Integración con el Backend

Actualmente la app usa un backend Express mock. Para integración completa con Supabase:

### Opción A: Solo Supabase (Sin Backend Express)

Modifica `AuthContext.jsx` para usar directamente las tablas de Supabase:

```javascript
const fetchOrCreateUser = async (authUser) => {
  // Buscar perfil
  let { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', authUser.id)
    .single();

  if (!profile) {
    // Crear perfil
    const { data: newProfile } = await supabase
      .from('user_profiles')
      .insert({
        id: authUser.id,
        username: authUser.user_metadata?.username || authUser.email.split('@')[0],
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      })
      .select()
      .single();
    
    profile = newProfile;
  }

  // Cargar juegos y favoritos
  const { data: games } = await supabase
    .from('user_games')
    .select('*')
    .eq('user_id', authUser.id);

  const { data: favorites } = await supabase
    .from('user_favorites')
    .select('game_id')
    .eq('user_id', authUser.id);

  setCurrentUser({
    ...profile,
    ownedGames: games || [],
    favorites: (favorites || []).map(f => f.game_id)
  });
};
```

### Opción B: Backend Express + Supabase

Mantén el backend Express para los datos de juegos y usa Supabase solo para autenticación.

## 🧪 Modo de Prueba (Sin Supabase)

La aplicación funciona sin configurar Supabase:
- Usa autenticación mock
- Emails de prueba:
  - `nikitin@steam.com` → Usuario NIKITIN
  - `guest@steam.com` → Usuario Guest
  - Cualquier otro email → Crea usuario nuevo mock

## 📝 Usuarios de Prueba

Para probar con Supabase, crea usuarios:

1. **Usuario con juegos**:
   - Email: `gamer@test.com`
   - Password: `password123`

2. **Usuario nuevo**:
   - Email: `newuser@test.com`
   - Password: `password123`

## 🔐 Seguridad

### Variables de Entorno en Producción

Nunca subas el archivo `.env` a Git. Para producción:

1. **Vercel/Netlify**: Agrega las variables en el dashboard
2. **Variables necesarias**:
   ```
   VITE_SUPABASE_URL=tu-url
   VITE_SUPABASE_ANON_KEY=tu-key
   ```

### Best Practices

- ✅ Usa Row Level Security (RLS)
- ✅ Nunca expongas el service_role key en el frontend
- ✅ Valida datos en el backend
- ✅ Implementa rate limiting
- ✅ Usa políticas estrictas de RLS

## 🚀 Deploy

### 1. Verificar Variables

```bash
# Verificar que las variables están configuradas
npm run build
```

### 2. Deploy Frontend

```bash
# Vercel
vercel --prod

# O Netlify
netlify deploy --prod
```

### 3. Configurar CORS en Supabase

En Supabase → Settings → API → CORS:
- Agrega tu dominio de producción
- Ejemplo: `https://tu-app.vercel.app`

## 📚 Recursos Adicionales

- [Supabase Docs](https://supabase.com/docs)
- [Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)

## ❓ Troubleshooting

### Error: "Invalid API key"
- Verifica que copiaste correctamente la anon key
- Asegúrate de que el archivo `.env` esté en la raíz

### Error: "Failed to fetch"
- Verifica que el proyecto de Supabase esté activo
- Revisa la URL del proyecto

### No recibo emails de confirmación
- Revisa la configuración de Email en Authentication
- Para desarrollo, desactiva "Confirm email"
- Verifica spam/correo no deseado

### RLS Policies no funcionan
- Verifica que RLS esté habilitado: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- Revisa las políticas con: `SELECT * FROM pg_policies`

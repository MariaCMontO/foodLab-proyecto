# 🚀 Proyecto FoodLab con React + Vite

Este es el proyecto del grupo para la aplicación del restaurante.  
Consta de cuatro partes principales:

- **Landing Page** → Página de bienvenida pública.
- **Login y registro** → Loggeo y registro.
- **App de Cliente (Pedidos)** → Donde los clientes podrán realizar pedidos.
- **App de Administrador (gestion de pedidos)** → Panel para que el administrador gestione pedidos y productos.

## 🖥️ ¿Qué es JSX y por qué lo usamos?
JSX (JavaScript XML) es una extensión de JavaScript que nos permite escribir HTML dentro de React de forma muy parecida a las etiquetas tradicionales.

- En lugar de separar lógica y vista en archivos distintos, JSX nos permite combinar JavaScript + HTML en un mismo archivo.

✅ **Ventajas de JSX:**

- Sintaxis más clara y familiar → Escribir componentes se parece a escribir HTML.

- Mejor integración con JavaScript → Podemos usar variables, funciones y expresiones dentro del HTML con {}.

- Código más legible y mantenible → Todo el código de un componente está en un solo lugar.

- Menos errores → JSX valida la sintaxis, por ejemplo: etiquetas cerradas, uso de className en lugar de class.

- Mayor productividad → Permite construir interfaces más rápido y con menos confusión.
---

## ⚙️ Configuración inicial

### 1. Instalar dependencias
Este proyecto utiliza **npm** como gestor de paquetes.

👉 **¿Qué es npm?**  
- `npm` (Node Package Manager) es el administrador de paquetes que viene incluido con **Node.js**.  
- Nos permite instalar librerías y dependencias para nuestro proyecto.  
- Ejemplo: instalar React Router, Tailwind, Axios, etc.

👉 **Instalación de Node.js y npm:**  
- Descarga **Node.js** desde: [https://nodejs.org/](https://nodejs.org/)  
- Al instalar Node.js, `npm` se instala automáticamente.  
- Para verificar la instalación:  
  ```bash
  node -v
  npm -v
  
👉 **Ejecutar el proyecto:** 
 ```bash
- npm install   # Instala todas las dependencias del proyecto
- npm run dev   # Levanta el servidor de desarrollo
```

Después de correr npm run dev, Vite mostrará una URL en la terminal (por defecto:
http://localhost:5173) donde podrás abrir el proyecto en el navegador.

### 2. 📦 Tecnologías a usar

🔹 **Vite**

Vite es el bundler que usaremos en lugar de Create React App.

- Es mucho más rápido, moderno y ligero.

- Permite hot reload casi instantáneo en desarrollo.

🔹 **React Router DOM**

Usaremos React Router DOM para manejar la navegación entre páginas.

- Nos permite separar la app en diferentes rutas sin recargar la página.

Ejemplo de rutas:

/ → Landing page

/app → App de pedidos (cliente)

/admin → Panel de administrador

🔹 **CSS Modules**

Usaremos CSS Modules en lugar de CSS global.

Ventajas:

- Los estilos están aislados por componente (evitamos conflictos de nombres de clases).

- La app será más ordenada y escalable.

Ejemplo:

``` css
/* Button.module.css */
.btn {
  background-color: tomato;
  color: white;
  border-radius: 6px;
}
```

```jsx
import styles from "./Button.module.css";

function Button() {
  return <button className={styles.btn}>Click</button>;
}

```

### 3. 📂 Estructura de carpetas

```ruby
src/
│── components/        # Componentes reutilizables (Navbar, Button, Loader, etc.)
│
│── pages/             # Páginas principales divididas por "apps"
│   │── landing/       # Landing Page (pública)
│   │   ├── Landing.jsx
│   │   └── Landing.module.css
│   │
│   │── client/     # App de pedidos (cliente)
│   │   ├── OrdersApp.jsx
│   │   └── OrdersApp.module.css
│   │
│   │── admin/      # Panel administrador
│   │   ├── AdminApp.jsx
│   │   └── AdminApp.module.css
│
│── routes/            # Definición de rutas principales
│   └── AppRoutes.jsx
│
│── App.jsx            # Punto de entrada a rutas
│── main.jsx           # Render principal con ReactDOM
```

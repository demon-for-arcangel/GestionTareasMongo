# API de Gestión de Tareas

Bienvenido a la documentación de la API de Gestión de Tareas. A continuación, encontrarás información sobre cómo utilizar los diferentes endpoints de la API.

## Inicio Rápido

### Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo .env en el directorio raíz y configura las siguientes variables:
```node
PORT=3000
DB_URL=tu-url-de-mongodb
DB_PORT=27017
DB_DATABASE=tu-nombre-de-base-de-datos
JWT_SECRET=tu-clave-secreta-para-generar-tokens
```

4. Ejecutar el servidor
```node
nodemon
```
El servidor se ejecutará en http://localhost:9090.

## Manual de la API
### Registrarse
```http
  POST /api/user/registro
```

| Parametro | Tipo     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**. Nombre de usuario |
| `email` | `string` | **Required**. Email del usuario|
| `contrasena` | `string` | **Required**. Contraseña del usuario |
| `rol` | `string` | **Required**. Rol del usuario. Administrador o Programador |

### Inicio de Sesión
```http
  POST /api/user/login
```
| Parametro | Tipo    | Descripcion                    |
| :-------- | :------ | :----------------------------- |
| `email` | `string` | **Required**.Email del usuario |
| `contrasena` | `string` | **Required**. Contraseña del usuario |

### Información del usuario


| Parametro | Tipo    | Descripcion                    |
| :-------- | :------ | :----------------------------- |
| | |
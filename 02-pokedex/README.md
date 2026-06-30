<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <strong>Pokedex API</strong> &mdash; A REST API built with <a href="https://nestjs.com" target="_blank">NestJS 11</a>,
  <a href="https://typeorm.io" target="_blank">TypeORM</a>, and <a href="https://www.postgresql.org" target="_blank">PostgreSQL</a>,
  featuring the original 151 Pok&eacute;mon.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/NestJS-11-ea2845?logo=nestjs" alt="NestJS 11" /></a>
  <a href="https://typeorm.io" target="_blank"><img src="https://img.shields.io/badge/TypeORM-1.0-fe6f41?logo=typeorm" alt="TypeORM" /></a>
  <a href="https://www.postgresql.org" target="_blank"><img src="https://img.shields.io/badge/PostgreSQL-17-336791?logo=postgresql" alt="PostgreSQL" /></a>
  <a href="https://pnpm.io" target="_blank"><img src="https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm" alt="pnpm" /></a>
  <br />
  <a href="https://github.com/anomalyco/opencode" target="_blank"><img src="https://img.shields.io/badge/built%20with-opencode-00ff41" alt="OpenCode" /></a>
</p>

---

## Descripci&oacute;n

API REST para una Pok&eacute;dex que expone un CRUD completo de los primeros 150 Pok&eacute;mon de la regi&oacute;n de Kanto, m&aacute;s Mewtwo. Incluye paginaci&oacute;n, validaciones con `class-validator`, y un seeder para poblar la base de datos r&aacute;pidamente.

---

## Stack

| Herramienta | Versi&oacute;n |
|---|---|
| [NestJS](https://nestjs.com) | ^11.0 |
| [TypeORM](https://typeorm.io) | 1.0 |
| [PostgreSQL](https://postgresql.org) | 17 |
| [class-validator](https://github.com/typestack/class-validator) | 0.15 |
| [class-transformer](https://github.com/typestack/class-transformer) | 0.5 |
| [pnpm](https://pnpm.io) | 10 |
| [Bruno](https://usebruno.com) | &mdash; |

---

## Requisitos

- Node.js &ge; 18
- pnpm
- PostgreSQL corriendo

---

## Setup

### 1. Clonar e instalar

```bash
pnpm install
```

### 2. Variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de PostgreSQL:

```env
DB_TYPE="postgres"
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="nestjs-pokedex"
```

### 3. Iniciar la aplicaci&oacute;n

```bash
# desarrollo con watch
pnpm dev

# la API corre en http://localhost:3000/api/v1
```

### 4. Seed de datos

Una vez corriendo, hacer un POST al endpoint de seed para poblar la base con los 150 Pok&eacute;mon:

```bash
curl -X POST http://localhost:3000/api/v1/seeder/pokemons
```

O desde la colecci&oacute;n de Bruno en `bruno/pokemons/seed.yml`.

---

## Endpoints

| M&eacute;todo | Ruta | Descripci&oacute;n |
|---|---|---|
| `GET` | `/api/v1/pokemons` | Lista paginada (&quest;take=10&amp;skip=0) |
| `GET` | `/api/v1/pokemons/:id` | Obtener por UUID |
| `POST` | `/api/v1/pokemons` | Crear un Pok&eacute;mon |
| `PATCH` | `/api/v1/pokemons/:id` | Actualizar por UUID |
| `DELETE` | `/api/v1/pokemons/:id` | Eliminar por UUID |
| `POST` | `/api/v1/seeder/pokemons` | Seed de 150 Pok&eacute;mon |

### Par&aacute;metros de paginaci&oacute;n

| Par&aacute;metro | Tipo | Default | Descripci&oacute;n |
|---|---|---|---|
| `take` | `number` | `10` | L&iacute;mite por p&aacute;gina |
| `skip` | `number` | `0` | Registros a saltar |

### Cuerpo para crear / actualizar

```json
{
  "no": 1,
  "name": "bulbasaur"
}
```

- `no`: entero entre 1 y 10000 (obligatorio, &uacute;nico)
- `name`: string de 1 a 100 caracteres (obligatorio, &uacute;nico)

---

## Colecci&oacute;n Bruno

El directorio `bruno/` contiene una colecci&oacute;n completa para [Bruno](https://usebruno.com) con todos los endpoints de la API.

| Archivo | Descripci&oacute;n |
|---|---|
| `createPokemon.yml` | POST crear |
| `findAllPokemons.yml` | GET listar |
| `findAllPokemonsPaginated.yml` | GET paginado |
| `findOnePokemon.yml` | GET por ID |
| `updatePokemon.yml` | PATCH actualizar |
| `removePokemon.yml` | DELETE eliminar |
| `seed.yml` | POST seed |

---

## Scripts

```bash
pnpm dev          # desarrollo con watch
pnpm build        # compilar a dist/
pnpm start:prod   # producci&oacute;n
pnpm lint         # ESLint + Prettier
pnpm test         # tests unitarios
pnpm test:e2e     # tests e2e
```

---

## Licencia

MIT &mdash; Proyecto educativo del curso de NestJS de DevTalles.

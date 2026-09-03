# MarsAI

Plateforme de festival de films full-stack.

## Prerequis

- [Docker](https://www.docker.com/) et Docker Compose
- [Node.js](https://nodejs.org/) v18+
- npm

## Demarrage en developpement

### 1. Base de donnees (Docker)

```bash
docker-compose up -d
```

Cela demarre :
- MariaDB sur le port `3306`
- phpMyAdmin sur `http://localhost:8080` (user: `festivalAi`, password: `festivalAi`)

### 2. Variables d'environnement

Cree un fichier `backend/.env` en te basant sur l'exemple suivant :

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=marsAi
DB_USER=festivalAi
DB_PASSWORD=festivalAi

FRONTEND_URL=http://localhost:3000

JWT_SECRET=change_me
JWT_EXPIRES_IN=1d

YOUTUBE_API_KEY=
YOUTUBE_CHANNEL_ID=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=

BREVO_API_KEY=
BREVO_LIST_ID=
BREVO_SENDER_EMAIL=
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=

SCALEWAY_ACCESS_KEY=
SCALEWAY_SECRET_KEY=
SCALEWAY_ENDPOINT=https://s3.fr-par.scw.cloud
SCALEWAY_BUCKET_NAME=
SCALEWAY_REGION=fr-par
SCALEWAY_FOLDER=

CONTACT_RECIPIENT_EMAIL=
CONTACT_EMAIL=
```

Cree un fichier `frontend/.env` :

```env
REACT_APP_API_URL=http://localhost:5000
```

### 3. Backend

```bash
cd backend
npm install
npm run dev
```

Le serveur demarre sur `http://localhost:5000`.

### 4. Frontend

```bash
cd frontend
npm install
npm start
```

L'application demarre sur `http://localhost:3000`.

### 5. Sanity CMS (optionnel)

Le dossier `cms-sanity/` contient toujours le Studio Sanity utilise pendant le developpement, mais l'application deployee ne depend plus du CMS a l'execution : le contenu qui etait recupere depuis Sanity a ete fige en donnees statiques dans `frontend/src/content/`. Le Studio reste disponible localement si besoin :

```bash
cd cms-sanity
npm install
npm run dev
```

## Schema de base de donnees

Le fichier `database/marsAi.sql` contient le dump complet du schema. Importe-le via phpMyAdmin ou avec la commande suivante :

```bash
docker exec -i mariadb mariadb -ufestivalAi -pfestivalAi marsAi < database/marsAi.sql
```

## Stack technique

- **Frontend** : React 19, Tailwind CSS
- **Backend** : Node.js, Express.js
- **Base de donnees** : MariaDB 11 (via Docker)
- **Stockage** : Scaleway S3
- **Email** : Brevo (SMTP)
- **Video** : YouTube API

# Capture The Flag — Full Stack CTF Platform

A full-stack Capture The Flag (CTF) platform with:

- **Frontend:** React (Vite)  
- **Backend:** Node.js + Express  
- **Database:** MySQL (containerized)  
- **Admin UI:** phpMyAdmin  
- **Orchestration:** Docker & Docker Compose

---

## Quick Setup

1. Place your exported SQL file inside:

```
mysql-init/capture_the_flag.sql
```

2. From the project root (where `docker-compose.yml` is located), run:

```bash
docker compose down -v
docker compose up --build
```

3. Access services:

- Frontend: http://localhost:5173  
- Backend API: http://localhost:4000  
- phpMyAdmin: http://localhost:8080  
  - Host: `mysql`
  - User: `root`
  - Password: *(empty)*

---

## Project Structure

```
capture_the_flag/
├── client/               # React + Vite
├── server/               # Node.js + Express API
├── docker-compose.yml
├── mysql-init/           # SQL import folder
│   └── capture_the_flag.sql
└── README.md
```

---

## Docker Compose File

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: ctf-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ""
      MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
      MYSQL_DATABASE: capture_the_flag
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql-init:/docker-entrypoint-initdb.d

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: ctf-phpmyadmin
    restart: always
    environment:
      PMA_HOST: mysql
    ports:
      - "8080:80"

  backend:
    build: ./server
    container_name: ctf-backend
    restart: always
    environment:
      - DB_HOST=mysql
      - DB_USER=root
      - DB_PASS=
      - DB_NAME=capture_the_flag
      - JWT_SECRET=supersecretkey12345
      - JWT_EXPIRE=7d
      - COOKIE_SECRET=anothersecret123
    ports:
      - "4000:4000"
    depends_on:
      - mysql

  frontend:
    build: ./client
    container_name: ctf-frontend
    restart: always
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  mysql_data:
```

---

## SQL Import Behavior

- MySQL automatically runs any `*.sql` files inside `mysql-init/` **on first database creation**.
- If you want MySQL to re-import the SQL file:

```bash
docker compose down -v
docker compose up --build
```

---

## Running Without Docker

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

You must run your own local MySQL server when not using Docker.

---

## phpMyAdmin

- URL: http://localhost:8080  
- Host: `mysql`  
- User: `root`  
- Password: *(empty)*  

---

## Troubleshooting

- **Port 3306 already in use:** stop XAMPP or local MySQL.
- **SQL not importing:** ensure SQL file is in `mysql-init` folder, then delete volumes.
- **phpMyAdmin architecture warning on M1/M2 Macs:** add  
  `platform: linux/amd64` to phpMyAdmin service.

---

## Reset Everything

```bash
docker compose down
docker compose down -v
```

---

## Notes on Database Sharing

Anyone who clones your repo and runs the project will receive the **same database you exported**.  
Do not include sensitive info in the SQL export.

---

## License

MIT

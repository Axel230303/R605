Voici le fichier complet **`README.md`** en format Markdown, incluant toutes les informations demandées :

# Mon Projet - API de Films

Bienvenue dans ce projet d'API de gestion de films avec notifications par email et gestion des favoris. Ce README explique comment installer et configurer le projet, ainsi que comment démarrer le serveur.

---

## 🚀 Prérequis

Avant de commencer, assure-toi d'avoir installé ces outils :

- **Node.js** (version 14 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **MySQL** ou **MariaDB** (si tu utilises une base de données SQL) : [Télécharger MySQL](https://dev.mysql.com/downloads/installer/)
- **Git** : [Télécharger Git](https://git-scm.com/)

---

## ⚙️ Installation

### 1. **Cloner le dépôt**

Clone ce projet sur ton machine locale en utilisant la commande suivante :

```bash
git clone https://github.com/Axel230303/R605.git
```

### 2. **Naviguer dans le dossier du projet**

Accède au dossier du projet cloné :

```bash
cd R605
```

### 3. **Installer les dépendances**

Dans le dossier du projet, installe les dépendances avec **npm** ou **yarn** :

```bash
npm install
```
ou
```bash
yarn install
```

Cela installera toutes les bibliothèques et outils nécessaires pour faire fonctionner l'API.

---

## 🌱 Configuration du fichier `.env`

Le projet nécessite certaines variables d'environnement pour fonctionner correctement. Crée un fichier `.env` à la racine de ton projet, puis ajoute les valeurs suivantes :

```
# Port pour le serveur (par défaut 3000)
PORT=3000

# Configuration de la base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=user

# Configuration du serveur de mails (exemple avec Ethereal)
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=your_ethereal_email@example.com
MAIL_PASS=your_ethereal_password

# Clé JWT pour l'authentification
JWT_SECRET=your_jwt_secret_key

# Autres variables selon ton besoin
```

- **DB_HOST** : L'adresse de ton serveur MySQL.
- **DB_USER** : Le nom d'utilisateur de la base de données.
- **DB_PASSWORD** : Le mot de passe de la base de données.
- **DB_NAME** : Le nom de la base de données.
- **MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS** : Les informations nécessaires pour envoyer des emails via **Ethereal** ou un autre service d'email.
- **JWT_SECRET** : Une clé secrète pour l'authentification avec JWT (utilise un string aléatoire pour la sécurité).

---

## 🏃‍♂️ Lancer le serveur

Une fois les dépendances installées et le fichier `.env` configuré, tu peux lancer le serveur avec la commande suivante :

```bash
npm start
```
ou
```bash
yarn start
```

Cela démarrera le serveur sur le port **3000** (ou un autre port si tu as configuré le `.env`).

---

## 📧 Notifications par email

Ce projet envoie des notifications par email lors de l'ajout ou de la modification de films :

- Lorsqu'un **nouveau film est ajouté**, tous les utilisateurs seront notifiés par email.
- Lorsqu'un **film est modifié**, tous les utilisateurs ayant ce film en favoris recevront une notification.

---

## 🧑‍💻 Routes disponibles

### 📌 **POST /films**
- **Description** : Permet d'ajouter un nouveau film à la base de données.
- **Données attendues** :
  - `titre`: Le titre du film.
  - `description`: La description du film.
  - `dateSortie`: La date de sortie du film.
  - `realisateur`: Le réalisateur du film.

### 📌 **PATCH /films/{id}**
- **Description** : Permet de modifier un film existant.
- **Paramètres** :
  - `id`: L'ID du film à modifier.
- **Données attendues** :
  - `titre`, `description`, `dateSortie`, `realisateur` : Ces champs sont optionnels et permettent de modifier les informations du film.

### 📌 **POST /favoris**
- **Description** : Ajoute un film aux favoris pour un utilisateur spécifique.
- **Données attendues** :
  - `userId`: L'ID de l'utilisateur pour lequel ajouter le favori.
  - `filmId`: L'ID du film à ajouter aux favoris.

### 📌 **DELETE /favoris/{filmId}**
- **Description** : Retire un film des favoris pour un utilisateur spécifique.
- **Paramètres** :
  - `filmId`: L'ID du film à retirer des favoris.
- **Données attendues** :
  - `userId`: L'ID de l'utilisateur pour lequel retirer le favori.

---

## 🛠️ Technologies utilisées

- **Node.js** pour le backend.
- **Express** pour la gestion des routes.
- **Knex.js** pour l'ORM (gestion des bases de données).
- **MySQL** pour la base de données.
- **Nodemailer** pour l'envoi de mails.
- **JWT** pour l'authentification.

---

## 📝 Explication du projet

Ce projet a été conçu pour fournir une API permettant aux utilisateurs de gérer une bibliothèque de films. L'API permet aux utilisateurs d'ajouter des films, de modifier des films existants, et de les ajouter ou les retirer de leurs favoris. De plus, les utilisateurs sont notifiés par email chaque fois qu'un film est ajouté ou modifié.

L'authentification est réalisée avec **JWT** pour sécuriser l'accès aux routes privées. L'envoi de notifications par email est réalisé avec **Nodemailer** et configuré pour envoyer des emails via un service comme **Ethereal** pour les tests. La base de données est gérée par **Knex.js**, qui permet une abstraction avec MySQL.

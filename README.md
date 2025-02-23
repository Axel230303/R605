# Mon Projet - API de Films

Bienvenue dans ce projet d'API de gestion de films avec notifications par email et gestion des favoris. Ce README explique comment installer et configurer le projet, ainsi que comment démarrer le serveur.

---

## 🚀 Prérequis

Avant de commencer, assure-toi d'avoir installé ces outils :

- **Node.js** (version 14 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **MySQL** ou **MariaDB** [Télécharger MySQL](https://dev.mysql.com/downloads/installer/)
- **Git** : [Télécharger Git](https://git-scm.com/)

---

## ⚙️ Installation

### 1. **Cloner le dépôt**

Clone ce projet sur ta machine locale en utilisant la commande suivante :

```bash
git clone https://github.com/Axel230303/R605.git
```

### 2. **Naviguer dans le dossier du projet**

Accède au dossier du projet cloné :

```bash
cd R605
```

### 3. **Installer les dépendances**

Installe les dépendances avec **npm** ou **yarn** :

```bash
npm install
```
ou
```bash
yarn install
```

Cela installera toutes les bibliothèques et outils nécessaires pour faire fonctionner l'API.

---
Pour lancer les conteneurs **MySQL** et **RabbitMQ** avec Docker, ajoute les commandes suivantes dans ton README sous une nouvelle section **Déploiement avec Docker**.

---

## 🐳 Déploiement avec Docker

Si tu veux utiliser Docker pour simplifier la gestion des services nécessaires à l’API, tu peux lancer les conteneurs suivants :

### 1️⃣ Lancer un conteneur MySQL

```bash
docker run --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -p 3307:3306 -d mysql:8.0
```

- **`--name hapi-mysql`** : Nom du conteneur MySQL
- **`-e MYSQL_ROOT_PASSWORD=hapi`** : Mot de passe root
- **`-e MYSQL_DATABASE=user`** : Création automatique de la base `user`
- **`-p 3307:3306`** : Expose MySQL sur le port **3307** en local (car le port **3306** peut être occupé)
- **`-d mysql:8.0`** : Utilisation de l’image **MySQL 8.0** en mode détaché

---

### 2️⃣ Lancer un conteneur RabbitMQ

```bash
docker run --name rabbitmq -p 15672:15672 -p 5672:5672 -d rabbitmq:management
```

- **`--name rabbitmq`** : Nom du conteneur RabbitMQ
- **`-p 15672:15672`** : Expose l’interface d’administration sur **localhost:15672**
- **`-p 5672:5672`** : Expose le port par défaut pour la communication entre services
- **`-d rabbitmq:management`** : Utilisation de l’image **RabbitMQ avec l’interface de gestion** en mode détaché

---

## 🌱 Configuration du fichier `.env`

Le projet nécessite certaines variables d'environnement pour fonctionner correctement. Crée un fichier `.env` à la racine de ton projet, puis ajoute les valeurs suivantes :

```
# Port pour le serveur (par défaut 3000)
PORT=3000

# Configuration de la base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hapi
DB_NAME=user

# Configuration du serveur de mails (exemple avec Ethereal)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=(créer un utilisateur ethereal)
EMAIL_PASS=(récupérer le mot de passe du compte ethereal crée)
```

- **DB_HOST** : L'adresse de ton serveur MySQL.
- **DB_USER** : Le nom d'utilisateur de la base de données.
- **DB_PASSWORD** : Le mot de passe de la base de données.
- **DB_NAME** : Le nom de la base de données.
- **EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS** : Les informations nécessaires pour envoyer des emails via **Ethereal** ou un autre service d'email.

---

## 🏃‍♂️ Lancer le serveur

Une fois les dépendances installées et le fichier `.env` configuré, lance le serveur avec la commande suivante :

```bash
npm start
```
ou
```bash
yarn start
```

Le serveur démarre sur le port **3000** (ou le port défini dans le `.env`).

---

## 📧 Notifications par email

Ce projet envoie des notifications par email lors de l'ajout ou de la modification de films :
- Lorsqu'un **nouveau film est ajouté**, tous les utilisateurs sont notifiés par email.
- Lorsqu'un **film est modifié**, les utilisateurs ayant ce film en favoris reçoivent une notification.

---

## 🧑‍💻 Routes disponibles

### 📌 **POST /films**
- **Description** : Ajoute un nouveau film à la base de données.
- **Données attendues** :
  - `titre` : Le titre du film.
  - `description` : La description du film.
  - `dateSortie` : La date de sortie du film.
  - `realisateur` : Le réalisateur du film.

### 📌 **PATCH /films/{id}**
- **Description** : Modifie un film existant.
- **Paramètres** :
  - `id` : L'ID du film à modifier.
- **Données attendues** :
  - `titre`, `description`, `dateSortie`, `realisateur` : Champs optionnels pour la mise à jour.

### 📌 **POST /favoris**
- **Description** : Ajoute un film aux favoris pour un utilisateur spécifique.
- **Données attendues** :
  - `userId` : L'ID de l'utilisateur.
  - `filmId` : L'ID du film à ajouter aux favoris.

### 📌 **DELETE /favoris/{filmId}**
- **Description** : Retire un film des favoris pour un utilisateur spécifique.
- **Paramètres** :
  - `filmId` : L'ID du film à retirer.
- **Données attendues** :
  - `userId` : L'ID de l'utilisateur.

### 📌 **POST /films/export**
- **Description** : Permet à un administrateur de demander un export CSV de l'ensemble des films présents dans la base de données.
- **Fonctionnement** :
  - Accessible uniquement aux utilisateurs ayant le rôle **admin**.
  - La requête **n'envoie pas** directement le fichier CSV dans la réponse HTTP.
  - Le fichier CSV est ensuite envoyé par email, en pièce jointe, à l'administrateur ayant effectué la demande.
  - Ajout de cette fonctionnalité d'export CSV.
  - Intégration d'un message broker pour l'envoi asynchrone du fichier CSV.
  - Renforcement de la sécurité en restreignant l'accès à cette route aux seuls administrateurs.

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

Ce projet a été conçu pour fournir une API permettant aux utilisateurs de gérer une bibliothèque de films. L'API permet d'ajouter, modifier et supprimer des films, ainsi que de gérer une liste de favoris pour chaque utilisateur. Les notifications par email interviennent lors de l'ajout ou de la modification d'un film, assurant une communication efficace avec les utilisateurs.

### Nouveautés récentes
- **Export CSV** : Un nouvel endpoint `/films/export` a été ajouté pour permettre aux administrateurs d'exporter la liste complète des films au format CSV. Ce fichier n'est pas retourné directement via la réponse HTTP, mais est généré par un message broker et envoyé par email en pièce jointe à l'administrateur ayant initié la demande.
- **Message Broker** : Cette intégration permet de gérer de manière asynchrone l'envoi des exports, améliorant ainsi la scalabilité et la sécurité du système.
# CityGuide

![Logo de l'application CityGuide](./frontend/src/assets/logo.png)

[![CI Status](https://github.com/WildCodeSchool/2024-09-wns-jaune-cityguide/actions/workflows/ci.yaml/badge.svg?branch=dev)](https://github.com/WildCodeSchool/2024-09-wns-jaune-cityguide/actions/workflows/ci.yaml)

**CityGuide** est une application web fullstack composée de :  

- **Frontend** : React + Vite + Apollo Client  
- **Backend** : Node.js + GraphQL  
- **Base de données** : PostgreSQL  
- **Reverse Proxy / API Gateway** : Nginx  
- **Admin & DB visualization** : Adminer  

L’application est containerisée avec **Docker** et peut être déployée dans différents environnements (`dev` et `prod`) via des fichiers `.env` dédiés.

---

## Table des matières

- [Présentation](#présentation)
- [Prérequis](#prérequis-techniques)
- [Installation et lancement](#installation-et-lancement-de-lapplication)
- [Configurer les variables d'environnement](#configurer-les-variables-denvironnement)
- [Architecture Docker](#architecture-docker)
- [Scripts utiles](#scripts-utiles)
- [CI/CD](#cicd)
- [Déploiement](#déploiement-de-lapplication)
- [Troubleshooting](#troubleshooting-des-erreurs-courantes)

---

## Présentation

CityGuide permet de :  

- consulter des informations sur les villes et leurs points d'intérêts,
- gérer les utilisateurs et les rôles,
- ajouter de nouvelles villes et de nouveaux points d'intérêt.

---

## Prérequis techniques

- Docker et Docker Compose  
- Git  
- (Optionnel) Node.js + `npm` si vous voulez lancer certains scripts localement  

> ⚠️ Pour le déploiement, Node.js n’est **pas nécessaire** car tout fonctionne via Docker.

---

## Installation et lancement de l'application

### Cloner le projet

Cloner le repo distant à l'aide de la commande :

```bash

git clone git@github.com:WildCodeSchool 2024-09-wns-jaune-cityguide.git

```

### Configurer les variables d'environnement

Copier le fichier d’exemple `.env.sample`, le renommer `.env.dev` et le remplir avec les variables adéquates.

### Démarrer l'application en mode "dev"

À la racine du projet, exécuter la commande suivante pour lancer le projet en mode "développement" : `npm run build:dev`.

Pour vérifier le bon démarrage de l'application, essayer d'accéder aux url suivantes :

- pour le frontend : ``http://localhost:${PORT}``: la page d'accueil de l'application doit s'afficher,

- pour le backend GraphQL : ``http://localhost:${PORT}/api`` : ApolloSandbox doit s'afficher.

---

## Architecture Docker

L’application CityGuide repose sur une architecture multi-conteneurs orchestrée avec Docker Compose.
Chaque service est isolé dans son propre conteneur et communique via un réseau interne Docker.

### Liste des services

- `frontend` : React + Vite
- `backend` : Node.js + GraphQL
- `database` : PostgreSQL (volume persistant)
- `gateway` : Nginx (API Gateway + Reverse Proxy)
- `vizualizer` : Adminer pour visualiser la base de données

### Dépendances et ordre de démarrage des containers

L’ordre de démarrage est géré automatiquement grâce aux _healthchecks_ et à `depends_on` :

1. `database` démarre et doit être `healthy` (`pg_isready`).
2. `backend` attend que database soit prêt avant de se lancer.
3. `frontend` attend que backend soit `healthy` avant de se lancer.
4. `gateway` démarre seulement après que frontend soit disponible.

Cette configuration permet à l'application de démarrer de façon séquentielle et stable, en évitant les erreurs de connexion prématurées entre services.

---

## Scripts utiles

L'application compte plusieurs scripts.

### Scripts racine (Docker)

Ces scripts permettent de lancer tous les services via Docker Compose selon l’environnement :

- `npm run build:dev` : build et démarre tous les conteneurs en mode développement avec `.env.dev` et active `NODE_ENV=development`.
- `npm run build:prod` : build et démarre tous les conteneurs en mode production avec `.env.prod` et active `NODE_ENV=development`.

### Scripts frontend

Ces scripts sont à utiliser dans le dossier `frontend/`.

- `npm run dev` : lance le serveur de développement Vite local avec hot-reload.
- `npm run codegen` : génère les types et hooks Apollo GraphQL via graphql-codegen.
- `npm run test:unit` : exécute les tests unitaires avec Vitest.
- `npm run test:e2e` : exécute les tests end-to-end avec Playwright.

### Scripts backend

Ces scripts sont à utiliser dans le dossier `backend/`.

- `npm run start` : démarre le serveur Node.js avec hot-reload (ts-node-dev).
- `npm run data:create` : crée une nouvelle migration TypeORM.
- `npm run data:generate` : génère une migration TypeORM à partir des changements dans la DB.
- `npm run data:up` : applique les migrations à la base de données.
- `npm run data:down` : annule la dernière migration appliquée.
- `npm run test`: lance les tests backend avec Jest et génère le coverage.

---

## CI/CD

CityGuide intègre un pipeline CI (Continuous Integration) basée sur GitHub Actions, permettant de vérifier automatiquement la qualité et la stabilité du code à chaque contribution.

Le workflow CI s’exécute automatiquement lors d’une `pull request` vers la branche `dev` (avant `merge`),

La CI est composée de deux jobs indépendants, exécutés en parallèle :

- CI Backend

  - Vérification des types (`tsc --noEmit`)
  - Exécution des tests Jest
  - Compilation du projet (`tsc`)

- CI Frontend

  - Vérification de la compilation (`vite build --dry-run`)
  - Analyse du code avec ESLint
  - Exécution des tests unitaires (Vitest)

>💡 Remarque :
>
> Le pipeline sera enrichi ultérieurement avec un déploiement automatisé (CD) vers le VPS via SSH, dès qu’une version stable sera validée sur `main`.

---

## Déploiement de l'application

L’application est déployée sur un serveur VPS configuré avec Caddy, un serveur web moderne et léger qui gère automatiquement les certificats SSL (via Let’s Encrypt) et le reverse proxy. Il assure la mise à disposition sécurisée de l’application sur Internet, en redirigeant le trafic HTTP/HTTPS vers les services correspondants.

Le VPS héberge à la fois le frontend et le backend, chacun exécuté dans des conteneurs Docker orchestrés à l’aide de Docker Compose.

Actuellement, le déploiement de CityGuide est effectué manuellement à l'aide d'une connexion SSH.

Pour se connecter au serveur, exécuter la commande :

```bash
ssh ***********@************** -p ****
```

Saisir le mot de passe lorsque l'invite de commande le demande.

Une fois la connexion établie, se déplacer dans le `production/` et faire récupérer les modifications du repo distant à l'aide de `git pull`.

Si besoin, en cas de modifications critiques, redémarrer les containers.

Le site est accessible à l'adresse suivante : [https://092024-jaune-3.wns.wilders.dev/](https://092024-jaune-3.wns.wilders.dev/)

## Troubleshooting des erreurs courantes

### Production

#### 🚫 Erreur `502 Bad Gateway`

**⛔️ Cause probable :**
Le conteneur `gateway` (reverse proxy interne) est arrêté, planté ou ne répond plus.

**✅ Étapes de vérification :**

1. **Lister les conteneurs en cours d’exécution :**

   ```bash
   docker ps
   ```

   → Vérifier si le conteneur nommé `gateway` apparaît dans la liste.

2. **Afficher tous les conteneurs (même ceux arrêtés) :**

   ```bash
   docker ps -a
   ```

   → Si `gateway` est présent mais arrêté, c’est probablement la cause de l’erreur.

3. **Consulter les logs du conteneur `gateway` :**

   ```bash
   docker logs gateway --tail 50
   ```

   → Permet d’identifier une erreur de démarrage ou de configuration.

4. **Relancer le conteneur `gateway` :**

   ```bash
   docker restart gateway
   ```

5. **Si le problème persiste, reconstruire le service à l'aide de la commande :**

   ```bash
   docker compose -f environments/prod/docker-compose.yml up -d --build gateway
   ```

6. **Vérifier à nouveau que le conteneur est actif :**

   ```bash
   docker ps | grep gateway
   ```

---

#### Site totalement inaccessible (“This site can’t be reached”)

**⛔️ Cause probable :**
Le serveur **Caddy** (reverse proxy HTTPS) est arrêté ou ne tourne plus.

**✅ Étapes de vérification :**

1. **Vérifier le statut de Caddy :**

   ```bash
   service caddy status
   ```

2. **Si Caddy ne fonctionne pas (`Failed to start Caddy.`) :**

   ```bash
   service caddy start
   ```

   → Démarrer Caddy.

Sélectionner l'utilisateur et entrer le mot de passe correspondant.

En cas de succès, on doit obtenir : `Active: active (running)`.
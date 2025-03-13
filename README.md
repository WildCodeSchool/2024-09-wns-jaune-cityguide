# CityGuide

Cityguide est une application permettant de découvrir des points d'intérêts des différentes villes de France. Ce projet est construit avec **Node.js**, **React** et **PostgresSQL** et fonctionne avec **Docker** pour simplifier le déploiement.

## Prérequis

- **Docker & Docker Compose** installés ([instructions](https://docs.docker.com/get-docker/))
- **Node.js** et **npm** (si besoin de lancer des commandes en local sans Docker)
- **Git**

### Installation et configuration

1. Cloner le projet

```sh
git clone https://github.com/WildCodeSchool/2024-09-wns-jaune-cityguide.git
cd 2024-09-wns-jaune-cityguide
```

2. Lancer l'appli avec docker

```sh
docker-compose up --build
```

3. Arrêter les services

```sh
docker-compose down
```

4. Créer une branche (en partant de la branche dev)

```sh
git checkout -b nom-de-la-branche
```

5. Faire un commit des changements

```sh
git commit -m "nom du commit"
```

6. Pousser sa branche sur le repo (push)

```sh
git push origin nom-de-la-branche
```

7. Faire valider sa pull request

Se rendre sur https://github.com/WildCodeSchool/2024-09-wns-jaune-cityguide et cliquer sur le bouton pull request

Ensuite il faudra attendre la validation du code d'au moins deux personnes exterieures à la features avant de merger.

8. Acceptation de la pull request

Une fois la validation passée sous reserve de changements, vous pourrez cliquer sur le bouton merge pull request

9. pull origin dev

Au retour d'une branche lors du passage sur la branche dev, il faut penser à :

```sh
git pull origin dev
```

#### Contact

En cas de soucis n'hésitez pas à nous contacter à l'adresse email suivante
cityguide.admin@gmail.com

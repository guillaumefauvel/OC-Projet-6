# Readme - OC-Projet-6 - JustStreamIt

Le site JustStreamIt récupère et met en forme plusieurs listes de films grâce à l'API [OCMovies](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR).

### Lancement du serveur  :

Afin de que le site puisse fonctionner il est nécessaire d'activer le serveur. 

Dans votre terminal : 
1.  Rendez-vous à l'intérieur de l'API  : `cd ocmovies-api-en`
2.  Installez les dépendances du projet :  `pipenv install`
3.  Créer la base de données : `pipenv run python manage.py create_db`
4.  Lancez   : `pipenv run python manage.py runserver`

Une fois le serveur initialisé, il ne vous resteras plus qu'à répéter l'étape 4 pour relancer le serveur la prochaine fois.

##

### Modifier l'une des catégories

Pour modifier l'une des catégories de films rendez-vous sur http://localhost:8000/api/v1/titles/, appliquez vos filtres et récupérez le lien. Collez le sur l'une des constantes présentes en tête de page du fichier javascript _**data_gathering.js**_. 

##

### Sass

La phase de développement a utilisé le préprocesseur SASS. Si vous souhaitez apporter des modifications aux documents de style vérifiez que vous l'avez bien téléchargé et initialisé. Si ce n'est pas le cas, consultez le [site officiel](https://sass-lang.com/install) afin de l'installer.

##
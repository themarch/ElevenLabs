# Test technique ElevenLabs

L'object initial est de construire une `API REST` permettant de : 
- Récupérer une liste d'astronautes
- Ajouter un astronaute
- Modifier un astronaute

Je suis partit une Stack MERN ( `MongoDb, Express, React, Node` ) que j'ai dockerisé.

Il faut ajouter un `.env` dans le dossier `back-end` avec ce format :

```bash
PORT=9000
URLDB=mongodb+srv://username:password@dbUrl?tls=true&authSource=admin&replicaSet=dbName
NODE_ENV=dev
```

Et ensuite, vous pouvez lancer le projet (à la racine) en faisant : 
```bash
docker-compose up --build
```

Galactiquement, bonne entretien.

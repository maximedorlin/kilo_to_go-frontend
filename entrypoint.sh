#!/bin/sh

echo "Contenu du répertoire actuel (avant cd) :"
ls -l

echo "Tentative de cd vers /app"
cd /app || { echo "Échec du cd vers /app"; exit 1; }

echo "Contenu de /app après cd :"
ls -l

echo "Lancement du build..."
npm run build

echo "Démarrage de l'application avec PM2..."
pm2-runtime npm -- start


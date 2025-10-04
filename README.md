This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.













Donne-moi un fichier HTML unique (index.html) contenant tout le code nécessaire (HTML + CSS + JavaScript) — prêt à ouvrir dans un navigateur — pour une application de suivi de projets complète.
Le code doit être complet, propre, commenté, et fonctionnel hors-ligne (sauf la bibliothèque d’export si besoin via CDN).

Fonctionnalités obligatoires :

Gestion des projets

Créer / modifier / supprimer des projets.

Chaque projet a : id, nom, client (optionnel), date de début, date de fin prévue, statut (ex. : En cours, Planifié, Terminé, En pause), priorité (basse/moyenne/haute), description.

Gestion des tâches

Créer / modifier / supprimer des tâches.

Chaque tâche a : id, titre, description, projet (liaison par id), ressources assignées (liste d’ids), date de début, date d’échéance, durée estimée (heures), temps passé (heures), statut (A faire / En cours / Terminé), priorité.

Gestion des ressources

Créer / modifier / supprimer des ressources (collaborateurs).

Chaque ressource a : id, nom, rôle, email (optionnel), charge disponible (heures/jour ou %).

Affectations

Permettre d’assigner une ou plusieurs ressources à un projet et à chaque tâche.

Afficher clairement « qui travaille sur quoi » (par projet et par tâche).

Vue et filtres

Liste filtrable / triable des projets, tâches et ressources (par statut, priorité, date, ressource).

Vue « tableau de bord » avec : nombre de projets (par statut), tâches (par statut), ressources actives, heures totales estimées vs réelles, tâches critiques/retard.

Persistance

Sauvegarde locale via localStorage afin de conserver les données entre sessions.

Export Excel professionnel

Bouton « Exporter Excel » qui génère un fichier .xlsx contenant au minimum 5 onglets :

Tableau de bord (résumé et statistiques clés)

Projets (toutes les colonnes de projets)

Tâches (toutes les colonnes de tâches, avec lien vers projet)

Ressources (liste des ressources + affectations)

Guide (instructions et légende)

Excel doit comporter en-têtes, largeurs de colonnes optimisées, formats de date, et colonnes calculées (ex. somme des heures estimées / réelles par projet).

Tu peux utiliser SheetJS (xlsx) via CDN pour l’export (si utilisé, indiquer le CDN exact).

UX / UI

Interface claire et responsive (desktop + mobile).

Formulaires modaux ou panels pour ajouter / éditer.

Indicateurs visuels (badges couleur selon statut/priorité).

Boutons pour importer/exporter JSON (sauvegarde complète) et réinitialiser les données.

Fonctionnalités avancées (souhaitées si possible)

Calcul automatique des charges (heures assignées par ressource vs disponibilité).

Indication des tâches en retard (dates d’échéance dépassées).

Export Excel avec sous-totaux par projet (heures).

Contraintes techniques :

Fournir un seul fichier index.html (HTML + CSS + JS intégrés) — prêt à ouvrir.

Utiliser vanilla JavaScript (ES6+). Si une bibliothèque externe est nécessaire seulement pour l’export Excel, autoriser 1 CDN (ex. https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js) et l’indiquer dans le fichier.

Le code doit être lisible, bien commenté et prévoir des fonctions réutilisables.

Les opérations CRUD doivent être rapides et sécurisées côté client (validation des champs).

Gérer les erreurs et afficher des retours utilisateurs (notifications simples).

Livrable attendu :

Un seul bloc de code (fichier index.html) contenant tout.

Instructions courtes (en tête du fichier ou dans un onglet Guide du Excel) expliquant comment utiliser l’app et comment télécharger l’Excel.

Si l’export Excel utilise SheetJS, indiquer le CDN dans un commentaire et comment l’utiliser (rien d’autre à installer).

Merci — génère le fichier complet maintenant.

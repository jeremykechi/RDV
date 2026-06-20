# KALENDI — résumé pour reprise (à coller en début de nouvelle conversation)

> Colle ce fichier (ou son contenu) au début d'une nouvelle conversation pour repartir vite, sans recharger tout l'historique.

## Le projet
- **KALENDI** : PWA d'agenda d'événements (France), grand public.
- **Front-end** : un seul fichier `index.html` (~4000 lignes) dans le repo `rendez-vous`, hébergé sur **Vercel**.
- **Back-end** : **Supabase** (projet `lvgtjitlqxgqmzsgvfkl`) — table principale `events` + tables sportives (`cdm_2026`, `nba_playoffs_2026`, `f1_2026`, `motogp_2026`, `cyclisme_2026`), tables communauté (`community_events`, `event_reports`, `category_suggestions`), `data_jobs_log` (journal + contenu de l'e-mail quotidien).
- **Automatisations** : Make.com + une tâche planifiée Cowork `kalendi-maj-base-quotidienne` (cron 06:06, tourne quand le PC est allumé).

## Accès / IDs utiles
- Supabase project id : `lvgtjitlqxgqmzsgvfkl`
- Make scénario e-mail : **id 6168603** (« KALENDI — compte-rendu quotidien par email ») — connexions : Supabase `7834424`, Gmail restreint `8189927` (GMAIL LYSERA / jeremy@lysera.fr). Envoi vers **hello@kalendi.fr**.
- Make team `1824348`, org `7857020`.

## Contraintes à toujours respecter
- **Charte données** : 100 % des données (sauf météo) composées par Claude à partir de sources publiques/officielles ; jamais d'extraction d'une part substantielle d'une base tierce ; descriptions rédigées par Claude ; icônes = emojis uniquement ; citer les sources ; **être conservateur** (signaler plutôt qu'inventer ou supprimer à tort).
- **Coût ~0** souhaité.
- Claude **ne peut pas** : pousser sur GitHub (Jérémy pousse via GitHub Desktop), cliquer dans une UI, s'authentifier sur Vercel/OVH.
- **Ne PAS éditer le blueprint du scénario Make existant via l'API** (ça délie les connexions et casse l'e-mail).
- Changements **front-end** = effectifs seulement après **push de `index.html`**. Changements **Supabase** = live immédiatement.
- Préférence : réponses **concises et directes**.

## Ce qui est en place et fonctionne
- Catégories sur **3 niveaux** (pills L1 / sous L2 / sous-sous L3), en préférences ET sur la vue principale.
- **Personnalisation** : afficher/masquer + réordonner par glisser-déposer (3 niveaux), persistée (localStorage + profil).
- **Social phase 1** : notes ★ + commentaires sur les événements.
- **Social phase 2** : événements créés par les utilisateurs (privé / public / lien privé), catégorie **Communauté**, **Mes événements** (avec bascule « afficher dans Tout »), modération IA via la maintenance + signalement, **pseudo** à l'inscription + modifiable, suggestions de catégories.
- Données enrichies : auto-moto, mode, shopping, salons, scolaire, étudiants, running/trails, basket (NBA/EuroLigue/Betclic), cyclisme (Giro/Tour/Vuelta + classiques), foot grandes équipes, etc.
- Maintenance quotidienne autonome (vérifs, corrections, ajouts, résultats de la veille, modération) + compte-rendu par e-mail.

## Dernières actions (session du 20/06/2026)
- **Top 14** : ajouté **ven. 19/06 Toulouse–Racing 92** (résultat : Toulouse 71-17) ; **sam. 20/06 = Montpellier–Stade Français** (21h05, Vélodrome) ; finale 27/06. ✅ en base.
- **Bug d'affichage mobile** (fausse barre d'état dupliquée en haut du détail) : corrigé dans `index.html` (`.sb` masquée, espace anti-encoche reporté sur `.ah`/`.dh`). ⚠️ **à pousser**.

## ⚠️ Point en suspens : l'e-mail quotidien part en double
- **Cause identifiée** : le **déclenchement du scénario Make via l'API** (ce que fait la maintenance) envoie **2 e-mails** — confirmé même avec **une seule ligne** dans `data_jobs_log` et même sur un scénario **neuf**. Ce n'est donc PAS un problème de données. Un déclenchement « normal » (horloge Make / Run once dans l'éditeur) n'envoie qu'1 mail ; seul l'appel API double.
- **État actuel** : on est revenu au montage d'origine (scénario 6168603 réactivé, maintenance le déclenche via l'API) → **doublon accepté pour l'instant**.
- **Options propres pour passer à 1 seul mail (plus tard)** :
  1. **Heure fixe** : laisser Make envoyer seul via sa planification quotidienne (clic horloge = 1 mail). Limite : si la maintenance tourne après l'heure choisie, le compte-rendu du jour part le lendemain.
  2. **Webhook** : scénario instantané déclenché par un simple appel web unique de la maintenance (1 ping = 1 mail, juste après la maintenance). Montage déjà testé et fonctionnel côté création ; le seul blocage rencontré était **l'armement initial** (Make exige d'ouvrir le scénario et faire « Run once » une fois pendant qu'on envoie un ping — à faire soi-même dans le navigateur pour éviter tout souci de synchro).

## À faire côté Jérémy
- **Pousser `index.html`** via GitHub Desktop pour appliquer le correctif d'affichage mobile.

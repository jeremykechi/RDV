# KALENDI — Suivi de projet

> Calendrier d'événements intelligent. Marque **KALENDI** (déposée INPI ~mai 2026), domaine `kalendi.fr`.
> App actuelle : PWA déployée sur **Vercel** (anciennement Netlify) — `index.html` (~3 040 lignes), qui appelle directement Supabase.
> ⚠️ Résidus Netlify à nettoyer : `netlify.toml` et `functions/api.js` (proxy au format Netlify, **non appelé** par l'app) sont du legacy.
> Données : Supabase (projet « KALENDI », région eu-west-3, Postgres 17). Table `events` = 287 lignes + 10 tables thématiques.
> Automatisations : Make.com.

## Principe directeur transverse
**Coûts de run à 0 ou minimaux.** Toute décision technique (hébergement, base, automatisations, stores) est arbitrée d'abord sous l'angle du coût récurrent. Privilégier les offres gratuites (Vercel, Supabase free, Make free) tant qu'elles tiennent, et documenter les seuils de bascule.

## Charte « données & contenus » (pour rester clean juridiquement)
Règles permanentes à respecter à chaque ajout de données :
1. **Aucune API externe sauf la météo (Open-Meteo).** 100 % des autres données sont composées par Claude à partir d'infos publiques (faits non protégés), pas aspirées d'une autre base.
2. **Descriptions : 100 % rédigées par Claude.** Ne pas recopier ni s'inspirer de trop près de textes existants (communiqués, sites, Wikipédia).
3. **Images / affiches / logos / visuels : générés par Claude.** Pas d'affiche, de pochette ou de logo tiers. (Les emojis Unicode standard sont OK ; tout visuel custom = généré.)
4. **Données officielles : citer la source** (ex. jours fériés / vacances scolaires → mention gouv.fr).
5. **Météo : point de vigilance** — Open-Meteo gratuit = usage non commercial uniquement + attribution « Weather data by Open-Meteo.com ». À revoir au moment de la monétisation (sujet 7).

## Légende des statuts
Sections : 🔴 Pas commencé · 🟡 En cours · 🟢 Fait · 💡 Idée à creuser
Tâches : ✅ Fait · [ ] À faire

---

## 1 — PROPRIÉTÉ INTELLECTUELLE  🟡

**Objectif :** sécuriser le concept au-delà de la marque, sachant qu'il est techniquement simple et facilement copiable.

**Acquis :**
- Marque KALENDI déposée à l'INPI (~2 semaines avant le 11/06/2026).
- Nom de domaine `kalendi.fr`.

> ⚖️ _Note : informations factuelles, pas un avis juridique. Pour les enjeux importants, valider avec un conseil en PI._

### Analyse (étude du 2026-06-11)

**Ce qui n'est PAS protégeable :** l'idée / le concept en lui-même. Personne ne peut s'approprier « un calendrier d'événements ». Le brevet est exclu (pas d'invention technique).

**Ce qui EST protégeable :**

1. **La base de données — l'actif le plus défendable.** Le *droit sui generis des producteurs de bases de données* (art. L341-1 CPI, Directive 96/9/CE) protège le **contenu** d'une base dès lors qu'on prouve un **investissement substantiel** (financier, matériel ou humain) dans sa **constitution, sa vérification ou sa présentation**. Il interdit l'extraction/réutilisation d'une partie substantielle de la base par un tiers. Protection **automatique** (pas de dépôt), **15 ans**, **renouvelable** à chaque nouvel investissement substantiel. → C'est exactement ce que produisent l'enrichissement continu (sujet 2) et l'automatisation Make : il faut **garder les preuves de cet investissement** (heures, coûts, sources, logs de vérification, historique git, ce `PROJECT.md`).
2. **Le code et le design** : protégés par le droit d'auteur, automatiquement (l'historique git date la création).
3. **La marque + le nom de domaine** : déjà sécurisés.
4. **e-Soleau (INPI)** : dépôt en ligne pour **dater** un document (concept, specs, maquettes) et prouver l'antériorité. Ce n'est PAS un titre de propriété, juste une preuve de date. Coût modique (~15 €, à confirmer page tarifs INPI), conservation 5 ans renouvelable jusqu'à 20 ans. Aligné avec la contrainte coût.

**La vraie protection est stratégique, pas juridique (le « moat ») :** un concept copiable se défend par l'exécution, pas par le droit. Leviers :
- **Effet de réseau** : la catégorie « Communauté / Team Kalendi » (sujet 3) — plus il y a d'utilisateurs et d'événements créés, plus c'est dur à rattraper.
- **Exhaustivité + fraîcheur des données** : une base mieux tenue et plus à jour que celle d'un copieur (sujets 2 et 8).
- **Marque + avance + vitesse d'exécution** : être le premier référent.

**À faire :**
- [ ] Mettre en place une trace systématique de l'investissement dans la base (pour activer le droit sui generis le jour où c'est nécessaire).
- ✅ e-Soleau **déposée** (2026-06-11) — PDF « Description de création » (concept + app + roadmap + monétisation + marque) déposé sur le portail Soleau INPI. Récépissé horodaté + code confidentiel de restitution à conserver.
- [ ] Prioriser les leviers de moat (réseau d'abord) dans la roadmap produit.
- [ ] (Si levée de fonds / enjeu fort) consulter un conseil en PI.

---

## 2 — BASE DE DONNÉES  🟡

**Objectif :** enrichir, fiabiliser et automatiser la liste d'événements.

**Trois chantiers :**
1. **Compléter** la liste d'événements intéressants.
2. **Vérifier** à intervalles réguliers (ex. : concert décalé, date modifiée).
3. **Automatiser** l'actualisation (via Make + APIs / scraping léger).

**Nouvelles catégories souhaitées (pas encore dans l'app) :**
- [ ] **Mode** : Fashion Weeks Paris / Milan / Londres / NYC + salons.
- [ ] **Shopping** : dates des soldes, Black Friday, dates de lancement (ex. collab Audemars Piguet × Swatch).
- [ ] **Salons** : Salon de l'auto, Salon de l'agriculture, etc.
- [ ] **Scolaire** : épreuves du Bac / examens + dates clés Parcoursup.
- [ ] **Étudiants** : (à préciser).
- [ ] **Enfants** : activités et sorties pour enfants.

**Point technique en attente :** bug de cohérence date repéré — `album-vendredi-ultra` daté 2026-01-17 (un samedi) alors que le libellé dit « Vendredi » (le vendredi = 16/01).

**À faire :**
- [ ] Définir le schéma / catégories pour les nouveaux types d'événements.
- [ ] Identifier des sources fiables par catégorie (officielles de préférence).
- [ ] Afficher l'attribution des données officielles dans l'app (ex. « Jours fériés : data.gouv.fr »).
- ✅ **Automatisation quotidienne** (2026-06-12) : tâche planifiée Cowork « kalendi-maj-base-quotidienne » (~6h/jour) qui, en autonomie, vérifie dates/annulations (60 j à venir), corrige les incohérences, nettoie les doublons, ajoute de nouveaux événements (≤10/j), écrit dans Supabase (service_role) et journalise dans `public.data_jobs_log` + compte-rendu quotidien. Respecte la charte données.
- [ ] Corriger le bug de date album-vendredi-ultra → sera traité automatiquement au 1er run de la tâche (ou via « Run now »).
- ✅ **Compte-rendu par e-mail** (2026-06-13) : scénario Make « KALENDI — compte-rendu quotidien par email » (quotidien 7h) → lit la dernière ligne `data_jobs_log` (via service_role) et l'envoie à jeremy.kechichian@gmail.com (connexion Gmail Workspace jeremy@lysera.fr).
- ✅ **Résultats des événements passés** (2026-06-12) : champ `resultat` ajouté à la table + affiché dans le détail (bloc « 🏆 Résultat »). La tâche quotidienne renseigne désormais le résultat des événements passés (score/vainqueur, guests, issue d'IPO, etc.).

---

## 3 — FONCTIONNALITÉS  🔴 / 💡

**Objectif :** faire évoluer l'app au-delà du calendrier en lecture seule.

**Idées listées :**
- 💡 Catégorie **« Communauté » / « Team Kalendi »** : événements créés par les utilisateurs.
- 💡 Événements utilisateurs **privés** (visibles par soi seul), **publics** (visibles de tous), **semi-publics** (visibles sur autorisation).
- 💡 **Liens** vers sites de diffusion / billetterie / vente.
- 💡 **Notifications**.
- 💡 **Personnalisation** des résultats par géolocalisation et caractéristiques de l'utilisateur.
- 💡 **Onboarding** au premier lancement pour un ciblage fin et des suggestions pertinentes.
- 💡 **Expansion géographique** : autres pays d'Europe, puis au-delà.

**À faire :**
- [ ] Prioriser les fonctionnalités (impact vs effort vs coût de run).
- [ ] Spécifier le modèle d'événements utilisateurs (privé/public/semi-public) — impacte directement le schéma DB et le RLS.
- [ ] Maquetter l'onboarding.

---

## 4 — DESIGN  🔴

**Objectif :** optimiser le rendu graphique et l'UX (objectif initial du « redesign »).

**Point connu :** l'app est bien adaptée au **mobile**, mais la **version desktop n'est pas responsive** (mise en page cassée / non optimisée sur grand écran). À corriger — d'autant que la PWA reste la porte d'entrée web/desktop.

**À faire :**
- ✅ **Desktop responsive** (2026-06-12) : layout large écran — catégories horizontales en haut, vue Mois en 2 colonnes (calendrier + panneau d'événements scrollable), onglet « Jour » masqué sur desktop (conservé sur mobile). Mobile inchangé (bloc `@media ≥1024px`).
- [ ] Audit UX/UI de l'app actuelle.
- [ ] Définir une direction artistique cohérente avec la marque KALENDI.
- [ ] Itérer sur les écrans clés (accueil/calendrier, détail événement, filtres, onboarding).

---

## 5 — VRAIES APPLICATIONS (stores)  🟡

**Objectif :** passer de la PWA à de vraies apps **App Store** et **Play Store**. Frais incompressibles **acceptés** par Jérémy.

### Analyse (étude du 2026-06-11)

**Coûts incompressibles :**
- Apple Developer Program : **99 $/an** (récurrent).
- Google Play : **25 $ une fois** (pas de récurrent).
- Commissions stores sur achats in-app : 15–30 % (15 % via le Small Business Program < 1 M$/an) — concerne le sujet 7 (monétisation), pas le lancement gratuit.

**Approche recommandée (compatible coût-run ~0) : wrapper la PWA avec Capacitor.**
- Capacitor est **open-source / gratuit**, garde le workflow web actuel (`index.html`) et donne accès aux **API natives** (push, géoloc) — précisément ce dont on a besoin pour le sujet 3 ET pour passer la revue Apple.
- PWABuilder est plus simple pour Android (TWA) mais son **rendu iOS risque le rejet**.

**Android : facile.** TWA (PWABuilder ou Capacitor). Moins cher (25 $ une fois), revue plus souple. → à faire en premier.

**iOS : le vrai obstacle.**
- Nécessite un **Mac + Xcode** (Capacitor 8 exige Xcode 26) pour builder. Sans Mac : services de build cloud (Ionic Appflow, Capgo…) mais souvent payants → un Mac reste l'option la moins chère si disponible.
- **Règle Apple 4.2 (« minimum functionality ») :** un simple wrapper d'un site web **est rejeté**. Il faut une vraie expérience « app » : **notifications push** (Safari iOS ≠ web push), navigation native, gestion hors-ligne propre, géolocalisation.
- 👍 Bonne nouvelle : ces fonctions natives sont **déjà sur la roadmap (sujet 3)** — les construire sert à la fois le produit et l'acceptation App Store.

**Séquencement proposé :** (1) développer les fonctions « natives » (notifications, géoloc, onboarding — sujet 3) → (2) wrapper Capacitor → (3) **Android d'abord** → (4) **iOS** une fois le risque 4.2 levé.

**Décision Mac (2026-06-11) :** Mac **empruntable ponctuellement** → Android se fait sans Mac dès maintenant ; les builds iOS seront calés sur les créneaux d'emprunt du Mac, une fois les fonctions natives prêtes.

### Architecture & convertibilité (garde-fous)

Avec Capacitor, **pas de réécriture** : l'app web actuelle devient telle quelle l'app iOS/Android. Tout ce qui est construit aujourd'hui dans la PWA sert directement aux stores. Pour que l'emballage reste sans friction, respecter à chaque évolution :
- **Mobile-first / responsive** (déjà le cas) — l'app tourne dans une webview au format téléphone.
- **Hors-ligne propre** (service worker / cache) — utile à la PWA + exigé par la règle Apple 4.2.
- **Préférer des fonctions ayant un équivalent natif** — certaines API web diffèrent en app (ex. push iOS) ; elles seront remplacées par un plugin Capacitor au wrap (additif, pas une réécriture).
- **Auth Supabase compatible app** — prévoir les redirections de connexion vers le schéma de l'app (pas seulement une URL web).
- **Pas de dépendance à un domaine web en dur** (cookies, liens absolus) qui casserait une fois empaqueté.

**Modèle de mise à jour à deux niveaux :**
- **Mises à jour « web »** (contenu, design, features HTML/CSS/JS) → diffusables **sans revue des stores** via OTA (déploiement Vercel / bundle OTA type Capgo, gratuit/open-source). Reste presque aussi simple qu'aujourd'hui. Autorisé par Apple (3.3.2 / 2.5.2) tant que ça ne change pas la nature de l'app.
- **Mises à jour « natives »** (nouveau plugin/permission, montée Capacitor/SDK) → **rebuild + soumission stores** (revue ~1-2 j Apple, souvent < 1 j Google ; Mac requis pour iOS). Plus rares.

### Plan d'action séquencé

**Phase 0 — Préparation (sans Mac, sans coût)**
- [ ] Choisir l'identifiant d'app (bundle id), ex. `fr.kalendi.app`, cohérent Android + iOS.
- [ ] Installer l'environnement : Node.js, Android Studio (gratuit), JDK.
- [ ] Vérifier que l'app fonctionne en assets statiques bundlés (index.html) + Supabase distant (déjà le cas : aucune dépendance à la fonction serverless).

**Phase 1 — Wrapper Capacitor (sans Mac)**
- [ ] Initialiser Capacitor dans le projet (`@capacitor/core`, `@capacitor/cli`, `npx cap init`).
- [ ] `webDir` = dossier des assets statiques ; `npx cap add android` ; `npx cap sync`.
- [ ] Icônes / splash à partir de `icon.png`, nom « Kalendi ».

**Phase 2 — Publier sur le Play Store (sans Mac, ~25 $ une fois)**
- [ ] Créer le compte Google Play Console (25 $).
- [ ] Générer un AAB signé, remplir la fiche (visuels, description, classification).
- [ ] Fournir la **politique de confidentialité** + écrans de **compte/consentements** → dépend du sujet 6 (Légal).
- [ ] Soumettre.

**Phase 3 — Fonctions natives pour passer la règle Apple 4.2 (lien sujet 3)**
- [ ] Notifications push (`@capacitor/push-notifications`).
- [ ] Géolocalisation (`@capacitor/geolocation`).
- [ ] Navigation native / barre de statut / gestion hors-ligne propre.

**Phase 4 — Publier sur l'App Store (Mac emprunté requis, 99 $/an)**
- [ ] Sur Mac : Xcode 26, `npx cap add ios`, `npx cap sync`, build.
- [ ] Compte Apple Developer Program (99 $/an).
- [ ] Fiche App Store Connect + étiquettes de confidentialité, soumission.

**Dépendances clés :** Phase 2 et 4 nécessitent les pages légales du **sujet 6** ; Phase 3 recoupe le **sujet 3** (fonctionnalités).

---

## 6 — LÉGAL  🔴

**Objectif :** produire toutes les pages/dispositifs indispensables au passage en store.

**À faire :**
- 🟡 Création de compte : flux Supabase Auth (e-mail + mot de passe) construit dans l'app — inscription/connexion/déconnexion, session persistante, synchro favoris+réglages dans `profiles.preferences` (2026-06-13). ⚠️ Confirmation e-mail désactivée pour les tests → à réactiver avant prod (+ politique de confidentialité/CGU). Parcours UX/branding à finaliser.
- 🟡 Mentions légales : brouillon (`MENTIONS-LEGALES.md`, 2026-06-13) — éditeur particulier, directeur de publication, hébergeurs (Vercel + Supabase UE), PI. À compléter (adresse ?) + relecture juridique + intégrer dans l'app.
- 🟡 CGU : brouillon (`CGU.md`, 2026-06-13) — objet, compte, exactitude des infos, contenus utilisateurs (futur), PI, responsabilité, droit français/médiation. Relecture juridique + intégrer dans l'app.
- ✅ **Pages légales intégrées dans l'app** (2026-06-13) : fenêtre de lecture (Politique de confidentialité, Mentions légales, CGU) accessible depuis Réglages → « Informations légales » ET liens dans l'inscription. **Consentement obligatoire** (case « J'accepte les CGU et la Politique de confidentialité ») requis pour créer un compte.
- [ ] CGV (conditions de vente) — à faire avec la monétisation (sujet 7).
- [ ] Consentements natifs (notifications, agenda, accès apps) — à faire avec le build natif/stores (sujet 5).
- 🟡 Politique de confidentialité (RGPD) : brouillon rédigé (`POLITIQUE-CONFIDENTIALITE.md`, 2026-06-13) — éditeur particulier, données/finalités/durées/droits/sous-traitants (Supabase UE, Vercel). À compléter (adresse postale ?) + relecture juridique + intégrer comme page dans l'app.
- [ ] Consentement à l'accès aux infos d'autres apps du téléphone.
- [ ] Consentement aux notifications.
- [ ] Consentement à la synchronisation avec l'agenda du téléphone.
- ✅ **Sécurité base de données** : RLS activé sur les 11 tables + politiques de lecture publique / écriture protégée (2026-06-11). Lecture anon OK, écriture anon bloquée. ⚠️ À vérifier : que les scénarios **Make** qui écrivent dans la base utilisent bien la clé `service_role` (qui contourne le RLS) et non la clé `anon` — sinon leurs écritures seront désormais refusées.

---

## 7 — MONÉTISATION  💡

**Objectif :** modèle économique sans dégrader la gratuité de départ.

**Principe :** app **100 % gratuite au lancement**. Monétisation envisagée à grande échelle :
- **Idée 1 :** les créateurs d'événements **publics** paient pour être diffusés auprès des inscrits correspondant à leurs critères (ciblage).
- **Idée 2 :** annonceurs / producteurs paient pour un **lien sponsorisé** vers leur événement.

**À faire :**
- [ ] Modéliser les deux pistes (qui paie, pour quoi, à quel prix).
- [ ] Vérifier l'articulation avec les règles des stores (paiements, pub) et les CGV.
- [ ] Définir le seuil d'utilisateurs à partir duquel la monétisation devient pertinente.

---

## 8 — SCALABILITÉ  🔴

**Objectif :** savoir jusqu'où la structure actuelle (100 % gratuite) peut nous porter avant de devoir payer, et identifier les paliers de bascule.

**Stack actuelle à cadrer :**
- **Supabase free** : DB 500 Mo (lecture seule au-delà), 1 Go disque, ~5 Go egress/mois, pause après ~1 sem. d'inactivité, 50 000 utilisateurs actifs/mois (MAU) sur l'auth.
- **Make.com free** : ~1 000 opérations/mois, intervalle mini 15 min — à valider selon le volume de scénarios d'actualisation (sujet 2).
- **Claude Max 5×** : ~5× l'usage de Pro par session (fenêtre 5 h + plafonds hebdo).
- **GitHub free** : dépôts illimités, limites CI/Actions à surveiller si on en ajoute.
- **Vercel free (Hobby)** : hébergement du front statique. Quotas à documenter (bande passante ~100 Go/mois, invocations serverless). Usage commercial : vérifier les conditions du plan Hobby.

**À faire :**
- [ ] Établir un tableau « quota gratuit → seuil de bascule → coût au-delà » pour chaque service.
- [ ] Estimer la consommation réelle (taille DB, egress, opérations Make) aux paliers 1 k / 10 k / 100 k utilisateurs.
- [ ] Nettoyer le legacy Netlify (`netlify.toml`, `functions/api.js`) une fois confirmé inutile.
- [ ] Identifier le 1er goulot d'étranglement probable et son coût de levée.

---

## 9 — COMMUNICATION  🔴

**Objectif :** faire connaître KALENDI et acquérir des utilisateurs, en cohérence avec la marque et la contrainte de coûts minimaux.

**Pistes à structurer (à détailler avec Jérémy) :**
- Identité de marque / ton éditorial (lien sujet 4 — Design).
- Présence réseaux sociaux (quelles plateformes, ligne éditoriale, cadence).
- Site vitrine / landing page de présentation et de collecte d'e-mails avant lancement.
- ASO (App Store Optimization) pour le passage en stores (lien sujet 5).
- Acquisition : bouche-à-oreille, presse/médias, partenariats, communautés.
- Cohérence avec la monétisation (sujet 7) : les créateurs d'événements sont aussi une cible de communication.

**À faire :**
- [ ] Définir le positionnement et le message clé de KALENDI.
- [ ] Choisir les canaux prioritaires (sous contrainte coût ~0).
- [ ] Planifier les actions de pré-lancement et de lancement.

---

## 10 — RELATION CLIENTS  🔴

**Objectif :** construire et entretenir le lien avec les utilisateurs de KALENDI (support, écoute, fidélisation).

**Pistes à structurer (à détailler avec Jérémy) :**
- Canal de support / contact (e-mail, formulaire in-app, chat).
- Collecte et traitement des retours utilisateurs (bugs, idées, demandes).
- Gestion des avis sur les stores (réponses, notes) — lien sujet 5.
- FAQ / centre d'aide / onboarding d'accompagnement.
- Communication directe (e-mails de bienvenue, nouveautés) — lien sujet 9.
- Lien avec les créateurs d'événements (cible pro / monétisation) — lien sujet 7.

**Fait :**
- ✅ **Tableau de bord d'audience** (2026-06-13) : table `analytics_events` (privée, service_role) ; app instrumentée (inscriptions, connexions, durée de session) ; **suppression de compte** via Edge Function sécurisée `delete-account` + bouton dans le profil (loggue la désinscription) ; tableau de bord **Cowork live** « kalendi-dashboard-audience » (KPIs + graphes, données Supabase en direct). Se remplit avec l'usage. ⚠️ Tracking usage + suppression compte → cadrer la politique de confidentialité/consentement (RGPD, sujet 6).

- ✅ **Trafic site (Vercel Web Analytics)** (2026-06-13) : script ajouté dans `index.html` → suit TOUS les visiteurs de kalendi.fr (même sans compte) : visiteurs uniques, pages vues, sources, pays. Gratuit (Hobby), cookieless/RGPD-friendly. Stats dans le dashboard Vercel (à activer : projet → onglet Analytics → Enable). Complémentaire du dashboard Cowork (comptes).

**À faire :**
- [ ] Choisir le(s) canal(aux) de contact et support.
- [ ] Mettre en place une boucle de feedback (collecte → tri → suivi).
- [ ] Définir le ton et les modèles de réponse.

---

## Journal des décisions
_(à compléter au fil des sessions)_

- **2026-06-13** : ⚽ favoris « par compétition » + matchs de clubs — favoris foot réorganisés par compétition (Ligue 1 complète, nations Mondial) ; drapeau nation (sport uniquement) et pastille couleurs+initiales club affichés dans le calendrier ; un favori apparaît dans « Tout » même si sa compétition n'a pas le ✦. Compte utilisateur (Supabase Auth) + synchro prefs. Tâche quotidienne étendue : maintien des matchs à venir d'une liste de ~22 grands clubs dans `events`. Couverture « toutes compétitions » exhaustive = nécessiterait une source de données sportives (coût + à arbitrer vs charte) — décision reportée.

- **2026-06-11** : structuration du projet en 8 sujets. Connecteurs Supabase et Make connectés. Contrainte transverse actée : coûts de run minimaux.
- **2026-06-11** : 🛡️ e-Soleau déposée à l'INPI (preuve d'antériorité du concept KALENDI + roadmap). Récépissé + code de restitution conservés par Jérémy.
- **2026-06-11** : 🧹 nettoyage code — suppression de toutes les API externes sauf la météo dans `functions/api.js` (retirées : jours fériés gouv.fr, OpenF1, TMDB, football-data + clés associées). Confirmé : aucune référence résiduelle. Charte « données & contenus » ajoutée en tête de doc.
- **2026-06-11** : étude des sujets 1 (PI) et 5 (stores). Conclusions clés — PI : l'idée n'est pas protégeable, l'actif défendable est la base (droit sui generis) + le moat (réseau, données, exécution) ; e-Soleau à faible coût pour dater. Stores : approche Capacitor, Android d'abord, iOS bloqué par la règle Apple 4.2 (nécessite des fonctions natives déjà prévues au sujet 3) + un Mac pour builder.
- **2026-06-12** : 🖥️ refonte desktop responsive (sujet 4) — catégories horizontales, vue Mois en 2 colonnes, panneau d'événements scrollable, vue « Jour » supprimée. Sauvegarde `outputs/index.html.bak`.
- **2026-06-13** : 📧 compte-rendu quotidien envoyé par e-mail via Make (scénario lit `data_jobs_log` en service_role → Gmail). Note : `data_jobs_log` accessible en lecture au service_role uniquement (resté privé pour anon).
- **2026-06-13** : 🏆 résultats des tables sportives dédiées soldés aussi — champ `resultat` ajouté à `cdm_2026`, `f1_2026`, `motogp_2026`, `cyclisme_2026`, `nba_playoffs_2026` ; 31 épreuves passées remplies (F1 6, MotoGP 9, Giro 9, NBA Finals 4, CDM 3). Affichage câblé dans les 5 mappers de `index.html` (champ `res`). Tâche quotidienne étendue à ces tables. ⚠️ Anomalie : `mgp-2026-04` daté avril alors que le GP du Qatar se court en novembre (à corriger).
- **2026-06-13** : 🏆 historique des résultats SOLDÉ — les 155 événements passés sans résultat ont été remplis en une session. Résultats réels et sourcés pour le sport (tennis Masters/GC, foot L1/PL/Liga/SerieA/Bundesliga + LdC, 6 Nations, golf, rugby), la culture à enjeu (Cannes « Fjord », festivals, box-office ciné, audiences ST5) et le business (IPO Klarna/Cerebras/SpaceX, résultats Nvidia/Apple). Notes factuelles honnêtes pour les événements sans « résultat » (ouvertures d'expos/théâtre, sorties albums/jeux/livres, concerts) et quelques résultats d'entreprises laissés « à compléter ». ⚠️ Anomalie signalée : lignes « Monte-Carlo dames » (tournoi exclusivement masculin) à supprimer. Désormais le run quotidien ne traite plus que la veille.
- **2026-06-13** : ✉️ e-mail enrichi — colonne `email_html` ajoutée ; la tâche compose un corps HTML structuré (Corrigés / Ajoutés / Résultats ajoutés / À vérifier), envoyé tel quel par Make (repli sur `details` si vide).
- **2026-06-12** : 🤖 mise en place de l'automatisation quotidienne de la base (sujet 2) — tâche planifiée Cowork ~6h, écriture auto Supabase + compte-rendu, table de log `data_jobs_log` créée (RLS, privée).
- **2026-06-11** : 🔒 RLS activé sur les 11 tables (migration `enable_rls_public_read_content_tables`). Politiques : lecture publique (anon+authenticated) sur les tables de contenu, écriture réservée au service_role ; `favorites`/`profiles` restent en accès « chacun ses données ». Vérifié : lecture anon OK, écriture anon refusée.
- **2026-06-12** : ajout du sujet 9 — Communication (le projet compte désormais 9 sujets).

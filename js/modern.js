/**
 * ==========================================================================
 * WASSIM LOMRI - PORTFOLIO INTERACTION ENGINE (MODERN JS)
 * Zero dependencies • Vanilla ES6+ • Blazing Fast
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('wl_portfolio_theme');

  // Initialize theme
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateThemeIcon(storedTheme);
  } else if (!prefersDark) {
    // If system explicitly prefers light, we can set light or keep dark default
    // We default to dark mode for developer aesthetic unless user stored light
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('wl_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(newTheme === 'dark' ? 'Mode sombre activé' : 'Mode clair activé');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      themeToggleBtn.setAttribute('title', 'Passer au mode sombre');
      themeToggleBtn.setAttribute('aria-label', 'Passer au mode sombre');
    } else {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      themeToggleBtn.setAttribute('title', 'Passer au mode clair');
      themeToggleBtn.setAttribute('aria-label', 'Passer au mode clair');
    }
  }

  // 2. Sticky Header & Scroll Effects
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 4. Scrollspy Active Nav Link Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => scrollSpyObserver.observe(section));

  // 5. Projects Filter Engine
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. Interactive Modal System
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-dynamic-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Project data registry with rich content
  const projectsData = {
    'hardis_wms': {
      title: 'Outil Web de Visualisation des Journaux — Hardis WMS',
      badge: 'Entreprise • Hardis Supply Chain',
      mediaType: 'image',
      mediaUrl: 'images/portfolio/hardis_wms.svg',
      definition: 'Outil web interne conçu et développé au sein du Pôle Run Services de Hardis Supply Chain pour superviser, interroger et diagnostiquer les fichiers journaux du progiciel HSC WMS en temps réel.',
      context: "Lors d'incidents critiques en production, les équipes support et MCO devaient analyser manuellement des volumes massifs de journaux d'exécution sur AS400 / IBM i avec des temps d'accès élevés.",
      objectives: [
        'Conception et développement complet de l’outil web en Adélia (L4G) et HTML5 / JavaScript',
        'Optimisation algorithmique poussée des requêtes SQL (DB2) pour éliminer les latences lors de l’ouverture et du filtrage des journaux',
        'Déploiement réussi en production avec réduction drastique du temps moyen de diagnostic lors des incidents critiques',
        'Rédaction intégrale du cahier des charges fonctionnel et technique et d’un Guide de Paramétrage (GP) pour les équipes d’exploitation'
      ],
      techs: ['Adélia (L4G)', 'AS400 (IBM i)', 'DB2 for i', 'HTML5 / JS', 'Hardis WMS', 'MCO', 'SQL Avancé'],
      actions: []
    },
    'angular': {
      title: 'Angular — Duel de Trolls (Éditeur Bizzard)',
      badge: 'Frontend Web • Framework Google',
      mediaType: 'youtube',
      mediaUrl: 'https://www.youtube.com/embed/YIyGMKhTGbI?si=0X64TE2hUPuJqrFg',
      definition: 'Angular est le framework TypeScript open-source conçu par Google pour bâtir des applications web robustes, scalables et modulaires.',
      context: "Projet universitaire commandité pour le compte de l'éditeur fictif « Bizzard » visant la réalisation d'un éditeur client riche et interactif pour configurer les trolls dans le jeu en ligne « Duel de Trolls ».",
      objectives: [
        'Conception d’une architecture complète basée sur les Components, Services et Routing Angular',
        'Maîtrise du Two-Way Data Binding pour synchroniser automatiquement modèle et vue en temps réel',
        'Consommation de services et injection de dépendances rigoureuse',
        'Gestion avancée des formulaires réactifs et validation en continu'
      ],
      techs: ['Angular', 'TypeScript', 'RxJS', 'HTML5 / SCSS', 'YouTube API'],
      actions: [
        { label: 'Voir la vidéo démo', url: 'https://www.youtube.com/watch?v=YIyGMKhTGbI', icon: 'video', external: true }
      ]
    },
    'nodejs': {
      title: 'Node.js — API REST Football & OpenAPI',
      badge: 'Backend • Architecture REST',
      mediaType: 'image',
      mediaUrl: 'images/portfolio/diagramme de classe football API.png',
      definition: "Node.js est l'environnement d'exécution JavaScript côté serveur haute performance permettant de créer des services réseau et des APIs REST asynchrones et scalables.",
      context: "Conception et implémentation intégrale d'un serveur RESTful modélisant le domaine du football, avec spécification stricte selon le standard OpenAPI (Swagger) et tests complets des endpoints.",
      objectives: [
        'Élaboration d’un diagramme de classes métier UML complet et cohérent',
        'Développement du serveur RESTful sous Node.js / Express avec gestion des codes de statut HTTP standardisés',
        'Documentation exhaustive des routes, paramètres et schémas avec la spécification OpenAPI',
        'Mise en place de tests d’intégration pour fiabiliser la couche de persistance et de requêtage'
      ],
      techs: ['Node.js', 'Express', 'OpenAPI / Swagger', 'UML', 'REST APIs', 'JSON'],
      actions: [
        { label: 'Télécharger le compte rendu (PDF)', url: 'compte_rendu_node.pdf', icon: 'pdf', external: true }
      ]
    },
    'flutter': {
      title: 'Flutter — Application Mobile Démineur',
      badge: 'Mobile Natif • Cross-platform',
      mediaType: 'image',
      mediaUrl: 'images/portfolio/flutter.jpg',
      definition: 'Flutter est le framework open-source de Google permettant de compiler nativement des applications pour iOS, Android et Web à partir d’un code source unique en Dart.',
      context: "Création d'une application mobile moderne du célèbre jeu de démineur, en exploitant les paradigmes de programmation déclarative de Flutter, la gestion des StatefulWidgets et la navigation fluide.",
      objectives: [
        'Conception algorithmique de la grille dynamique et calcul des mines adjacentes',
        'Gestion optimisée des états de l’application avec cycle de vie StatefulWidget',
        'Système de navigation avancé avec le Navigator et gestion de piles d’écrans (accueil, jeu, records)',
        'Interface tactile fluide et soignée avec gestion des gestes (tap, long press)'
      ],
      techs: ['Flutter', 'Dart', 'Mobile UX', 'Algorithmique', 'State Management'],
      actions: [
        { label: 'Télécharger le compte rendu (PDF)', url: 'compte_rendu_flutter.pdf', icon: 'pdf', external: true }
      ]
    },
    'elasticsearch': {
      title: 'Elasticsearch & Kibana — Big Data Aérien & Visualisation',
      badge: 'Data • Analytics & Conteneurisation',
      mediaType: 'image',
      mediaUrl: 'images/portfolio/mongo.svg',
      definition: 'Elasticsearch est un moteur de recherche et d’indexation distribué NoSQL en temps réel, couplé à Kibana pour la visualisation et l’exploration visuelle des données analytiques.',
      context: "Mise en place d'une stack conteneurisée complète sous Docker-Compose pour ingérer, indexer et analyser un volumineux jeu de données de vols d'avions commerciaux sur 2 mois, avec restitution via deux dashboards Kibana sur-mesure.",
      objectives: [
        'Déploiement sous Docker-Compose d’un cluster Elasticsearch couplé au serveur Kibana',
        'Création d’un index avec stratégie de shards adaptée pour une distribution équilibrée',
        'Définition précise du mapping des données (types géolocalisation, dates, scalaires)',
        'Exécution de requêtes complexes : recherches textuelles brutes et agrégations statistiques',
        'Configuration d’un Data View et construction de 2 dashboards interactifs avec cartes, graphiques et métriques'
      ],
      techs: ['Elasticsearch', 'Kibana', 'Docker', 'Docker-Compose', 'NoSQL', 'Agrégations Data'],
      actions: [
        { label: 'Télécharger le rapport technique (PDF)', url: 'TP11-12_A2_lomriw.pdf', icon: 'pdf', external: true }
      ]
    },
    'webgl': {
      title: 'WebGL — Moteur 3D Temps Réel & Shaders',
      badge: 'Graphismes 3D • Programmation GPU',
      mediaType: 'image',
      mediaUrl: 'images/portfolio/projet_webgl.png',
      definition: 'WebGL (Web Graphics Library) est une API JavaScript de bas niveau exécutant des shaders directement sur le processeur graphique (GPU) pour afficher des scènes 3D interactives dans le navigateur sans plugin.',
      context: "Développement d'une scène 3D animée interactive exploitant le pipeline programmable OpenGL ES 2.0 / GLSL, les calculs matriciels et l'interpolation chromatique.",
      objectives: [
        'Écriture de Vertex Shaders et Fragment Shaders personnalisés en langage GLSL',
        'Création d’une pyramide centrale ceinte de carrés en orbite avec dégradés dynamiques et d’un cylindre en rotation continue',
        'Gestion des transformations spatiales : matrices de projection, vue et modèle',
        'Contrôles interactifs pour l’utilisateur : orbite à la souris, zoom/dézoom fluide et rotation'
      ],
      techs: ['WebGL', 'GLSL Shaders', 'JavaScript', 'Maths 3D & Matrices', 'HTML5 Canvas'],
      actions: []
    },
    'gamejam': {
      title: 'Game Jam — Jeu Vidéo 2D en Python',
      badge: 'Game Dev • Travail en Équipe',
      mediaType: 'image',
      mediaUrl: 'images/portfolio/gamejam.png',
      definition: 'Projet de développement rapide en temps limité (Game Jam) mettant en jeu la coordination technique, l’esprit de synthèse et la créativité.',
      context: "Au sein d'une équipe de 4 développeurs, conception et programmation d'un jeu vidéo original en Python avec gestion de physique, détection de collisions et animations.",
      objectives: [
        'Travail collaboratif intensif sous contrainte de temps avec répartition agile des tâches',
        'Programmation de la boucle principale du jeu (game loop, delta time, événements)',
        'Gestion de la physique 2D, détection des collisions (AABB) et logique de score',
        'Intégration d’assets visuels et sonores pour une expérience immersive'
      ],
      techs: ['Python', 'Pygame / Arcade', 'Game Design', 'Git Collaboratif', 'Physique 2D'],
      actions: []
    },
    'minecraft': {
      title: 'Site de Vente & Enchères de Parcelles Minecraft',
      badge: 'Full Stack Web • Projet d’Équipe',
      mediaType: 'image',
      mediaUrl: 'images/portfolio/vente.webp',
      definition: 'Plateforme web full stack connectée à un serveur Minecraft multijoueur pour gérer un marché virtuel de parcelles foncières aux enchères.',
      context: "Projet universitaire mené en équipe de 6 développeurs pour concevoir un système transactionnel complet simulant une économie de parcelles Minecraft.",
      objectives: [
        'Architecture hybride combinant Java côté serveur, Node.js, JavaScript et SQL',
        'Conception du modèle relationnel pour les utilisateurs, enchères, lots et historiques de transactions',
        'Mise en place d’une interface web réactive et intuitive pour enchérir en direct',
        'Travail collaboratif sous Git avec revues de code et tests d’intégration'
      ],
      techs: ['Node.js', 'Java', 'SQL', 'JavaScript', 'HTML5 / CSS3', 'Git'],
      actions: []
    },
    'brocante': {
      title: 'Application Desktop — Gestion de Brocante',
      badge: 'Desktop App • Java & JavaFX',
      mediaType: 'image',
      mediaUrl: 'images/portfolio/brocante.svg',
      definition: 'Application de bureau ergonomique conçue pour l’administration complète d’un événement de brocante (exposants, emplacements, finances).',
      context: "Développement en équipe de 5 d'un progiciel de gestion complet pour les organisateurs de brocantes et foires, alliant interface graphique intuitive et persistance des données.",
      objectives: [
        'Modélisation métier complète et persistance avec base de données relationnelle SQL',
        'Conception d’interfaces graphiques riches et modulaires avec JavaFX et Scene Builder',
        'Implémentation du pattern architectural MVC (Modèle-Vue-Contrôleur)',
        'Génération d’états, rapports de gestion et suivi des réservations d’emplacements'
      ],
      techs: ['Java', 'JavaFX', 'SQL / JDBC', 'MVC', 'Scene Builder', 'UML'],
      actions: []
    }
  };

  // Open modal trigger
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-open-modal');
      const project = projectsData[projectId];

      if (project) {
        populateModal(project);
        openModal();
      }
    });
  });

  function populateModal(p) {
    let mediaHtml = '';
    if (p.mediaType === 'youtube') {
      mediaHtml = `
        <div class="modal-media-box">
          <iframe src="${p.mediaUrl}" title="${p.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>`;
    } else if (p.mediaUrl) {
      mediaHtml = `
        <div class="modal-media-box">
          <img src="${p.mediaUrl}" alt="${p.title}" loading="lazy">
        </div>`;
    }

    const objectivesHtml = p.objectives.map(obj => `<li>${obj}</li>`).join('');
    const techChipsHtml = p.techs.map(t => `<span class="project-tech-pill">${t}</span>`).join('');
    
    const actionsHtml = p.actions && p.actions.length > 0 
      ? p.actions.map(act => `
          <a href="${act.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            ${act.label}
          </a>
        `).join('')
      : '';

    modalContainer.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="project-badge-tag" style="position: static; margin-bottom: 6px; display: inline-block;">${p.badge}</span>
          <h2 class="modal-title">${p.title}</h2>
        </div>
        <button class="modal-close-btn" id="modal-close-btn-inner" aria-label="Fermer la modal">&times;</button>
      </div>
      <div class="modal-body">
        ${mediaHtml}

        <h4 class="modal-section-title">Présentation & Définition</h4>
        <p class="modal-text">${p.definition}</p>

        <h4 class="modal-section-title">Contexte du Projet</h4>
        <p class="modal-text">${p.context}</p>

        <h4 class="modal-section-title">Objectifs & Réalisations Clés</h4>
        <ul class="modal-list">
          ${objectivesHtml}
        </ul>

        <h4 class="modal-section-title">Technologies Utilisées</h4>
        <div class="project-techs" style="margin-bottom: 0;">
          ${techChipsHtml}
        </div>
      </div>
      <div class="modal-footer">
        <div>${actionsHtml}</div>
        <button class="btn btn-outline btn-sm" id="modal-footer-close">Fermer</button>
      </div>
    `;

    // Hook internal close buttons
    document.getElementById('modal-close-btn-inner')?.addEventListener('click', closeModal);
    document.getElementById('modal-footer-close')?.addEventListener('click', closeModal);
  }

  function openModal() {
    modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
    // Clear iframe to stop audio/video
    const iframe = modalContainer?.querySelector('iframe');
    if (iframe) iframe.src = '';
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });

  // 7. Clipboard Copy System with Toast Notification
  const toast = document.getElementById('toast-notice');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copié dans le presse-papier : ${textToCopy}`);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copié : ${textToCopy}`);
      }
    });
  });

  // 8. Contact Form Handling (Mailto Generator & Feedback)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const subject = document.getElementById('form-subject')?.value.trim() || 'Prise de contact via portfolio';
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      // Generate clean mailto link
      const recipient = 'wassim.lomri@gmail.com';
      const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
      const mailtoBody = encodeURIComponent(
        `Bonjour Wassim,\n\n${message}\n\n---\nExpéditeur : ${name} (${email})`
      );

      const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
      
      showToast('Ouverture de votre messagerie...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);
    });
  }

  // 9. Back To Top Button
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

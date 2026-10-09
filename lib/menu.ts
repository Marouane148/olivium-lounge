// ─────────────────────────────────────────────────────────────────────────────
// CARTE DE L'OLIVIUM LOUNGE — source unique pour /menu et pour la section
// "La Carte" de la page d'accueil. Modifier ce fichier suffit : aucun changement
// de design n'est nécessaire.
//
// • Modifier un plat ou un prix : changez `name`, `description` ou `price`.
// • Changer une photo : déposez le fichier dans public/menu/ (carré, 800 × 800 px,
//   .webp) puis mettez `image: '/menu/mon-fichier.webp'`. Ajoutez aussi la version
//   400 × 400 `mon-fichier-sm.webp` : elle sert aux vignettes des listes (sans elle,
//   la grande photo est utilisée). Sans `image`, une case élégante avec icône s'affiche.
// • Boissons chaudes : renseignez `price` et supprimez `hidden: true`. Tant que
//   `price` est vide ou que `hidden` est à true, l'article n'apparaît pas.
// • Un article avec `featured: 1, 2, 3…` apparaît dans "Les incontournables"
//   (dans cet ordre ; réservé aux articles qui ont une photo) ; les 4 premiers
//   sont repris sur la page d'accueil.
// • Quand un article n'est qu'un exemple, mettez `example: true` : un bandeau
//   "Carte d'exemple" s'affiche alors tout seul (aucun aujourd'hui).
//
// ⚠️ Quand toutes les photos seront les vraies photos du lounge, videz
// `photoDisclaimer` ci-dessous pour retirer "Photos non contractuelles".
// ─────────────────────────────────────────────────────────────────────────────

export type MenuBadge = 'Signature' | 'Nouveau' | 'Épicé' | 'Végétarien';

export type MenuItem = {
  name: string;
  /** Nom plus complet pour les incontournables / l'accueil (ex. "Burger Spécial") */
  fullName?: string;
  description?: string;
  /** Texte affiché, ex. "9 €". Vide = article masqué. */
  price?: string;
  /** Chemin dans public/, ex. "/menu/burger-special.webp" */
  image?: string;
  /** Version portrait (3:4) pour "Les incontournables" ; sinon `image` est recadrée. */
  imageLarge?: string;
  badge?: MenuBadge;
  /** 1, 2, 3… = apparaît dans "Les incontournables" dans cet ordre */
  featured?: number;
  /** true = article masqué (ex. prix à venir) */
  hidden?: boolean;
  /** true = article d'exemple à valider / remplacer */
  example?: boolean;
  /** Parfums / choix affichés en pastilles sous la carte */
  options?: string[];
};

/**
 * cards    : cartes avec photo à gauche (et pastilles dessous si `options`)
 * grid     : grille 2 colonnes, photo au-dessus
 * rows     : liste simple nom + prix
 * formules : grandes cartes avec photo 4:3 en haut
 */
export type GroupDisplay = 'cards' | 'grid' | 'rows' | 'formules';

export type MenuGroup = {
  /** Sous-titre de la famille (affiché si la rubrique a plusieurs familles visibles) */
  title?: string;
  display: GroupDisplay;
  items: MenuItem[];
};

export type MenuSection = {
  id: string;
  label: string;
  /** 'chichas' = bandeau photo + cartes + goûts */
  layout?: 'standard' | 'chichas';
  groups: MenuGroup[];
  flavors?: string[];
  /** Texte affiché sous les cartes de la rubrique */
  note?: string;
};

export const menuInfo = {
  title: 'La Carte',
  subtitle: 'Ouvert tous les jours · 11h – 2h',
  heroImage: '/menu/hero.webp', // photo réelle du lounge
  chichaBanner: '/menu/chicha-banner.webp', // photo réelle du lounge
  whatsappUrl: 'https://wa.me/33616461770',
  reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJsVR1IgVt5kcRcVxk6J9anIY',
  address: '7 avenue du Belvédère, 93310 Le Pré-Saint-Gervais',
  phone: '06 16 46 17 70',
  phoneHref: 'tel:+33616461770',
  /** À VIDER ('') quand toutes les photos de la carte seront les vraies photos du lounge. */
  photoDisclaimer: 'Photos non contractuelles',
};

// Prix uniques par famille
const ENTREE = '9 €';
const SALADE = '9 €';
const PATES = '12 €';
const PLAT = '12 €';
const BURGER = '10 €';
const SANDWICH = '10 €';
const PANINI = '6 €';
const COCKTAIL = '9 €';

export const menuSections: MenuSection[] = [
  {
    id: 'formules',
    label: 'Formules',
    note: 'Chicha classique incluse. Supplément de 5 € pour la Kaloud ou la Quasar. Au choix parmi les entrées, plats et desserts de la carte.',
    groups: [
      {
        display: 'formules',
        items: [
          { name: 'Entrée + Plat + Chicha', price: '30 €', image: '/menu/formule-entree-plat.webp' },
          { name: 'Plat + Dessert + Chicha', price: '30 €', image: '/menu/formule-plat-dessert.webp' },
          { name: 'Entrée + Plat + Dessert + Chicha', price: '35 €', image: '/menu/formule-complete.webp' },
        ],
      },
    ],
  },
  {
    id: 'entrees',
    label: 'Entrées',
    groups: [
      {
        title: 'Entrées',
        display: 'cards',
        items: [
          { name: 'Assiette asiatique', description: 'Tempura de crevette, nems au poulet', price: ENTREE, image: '/menu/assiette-asiatique.webp' },
          { name: 'Bricks', price: ENTREE, image: '/menu/bricks.webp' },
          { name: 'Burrata', price: ENTREE, image: '/menu/burrata.webp' },
        ],
      },
      {
        title: 'Salades',
        display: 'cards',
        items: [
          { name: 'Salade César', price: SALADE, image: '/menu/salade-cesar.webp' },
          { name: 'Salade variée', price: SALADE, image: '/menu/salade-variee.webp' },
        ],
      },
    ],
  },
  {
    id: 'plats',
    label: 'Plats',
    groups: [
      {
        title: 'Plats',
        display: 'cards',
        items: [
          {
            name: 'Ojja',
            description: 'Au choix : merguez, escalope, thon ou fruits de mer',
            price: PLAT,
            image: '/menu/ojja-merguez.webp',
            imageLarge: '/menu/ojja-merguez-lg.webp',
            featured: 1,
          },
          { name: 'Pavé de saumon', description: 'Frites ou pâtes', price: PLAT, image: '/menu/pave-saumon.webp' },
          { name: 'Escalope à la crème', description: 'Frites ou pâtes', price: PLAT, image: '/menu/escalope-creme.webp' },
        ],
      },
      {
        title: 'Pâtes',
        display: 'cards',
        items: [
          { name: 'Pâtes forestière', price: PATES, image: '/menu/pates-forestiere.webp' },
          {
            name: 'Pâtes au saumon',
            price: PATES,
            image: '/menu/pates-saumon.webp',
            imageLarge: '/menu/pates-saumon-lg.webp',
            featured: 3,
          },
          { name: 'Pâtes salsa', price: PATES, image: '/menu/pates-salsa.webp' },
        ],
      },
      {
        title: 'Burgers',
        display: 'cards',
        items: [
          { name: 'Cheese', description: 'Steak, œuf, cheddar', price: BURGER, image: '/menu/burger-cheese.webp' },
          {
            name: 'Spécial',
            fullName: 'Burger Spécial',
            description: 'Steak, œuf, cheddar, chèvre miel',
            price: BURGER,
            image: '/menu/burger-special.webp',
            imageLarge: '/menu/burger-special-lg.webp',
            featured: 2,
          },
          { name: 'Radical', description: 'Steak, œuf, cheddar, gorgonzola', price: BURGER, image: '/menu/burger-radical.webp' },
          { name: 'Chicken', description: 'Poulet pané', price: BURGER, image: '/menu/burger-chicken.webp' },
        ],
      },
      {
        title: 'Sandwichs',
        display: 'cards',
        items: [
          { name: 'Master', description: 'Steaks, œuf, bacon', price: SANDWICH, image: '/menu/sandwich-master.webp' },
          { name: 'Tandoori', description: 'Poulet paprika', price: SANDWICH, image: '/menu/sandwich-tandoori.webp' },
          { name: 'Curry', description: 'Poulet curry', price: SANDWICH, image: '/menu/sandwich-curry.webp' },
        ],
      },
      {
        title: 'Paninis',
        display: 'cards',
        items: [
          { name: 'Poulet', price: PANINI, image: '/menu/panini-poulet.webp' },
          { name: '4 fromages', price: PANINI, image: '/menu/panini-4-fromages.webp' },
          { name: 'Thon', price: PANINI, image: '/menu/panini-thon.webp' },
        ],
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    groups: [
      {
        display: 'grid',
        items: [
          { name: 'Fondant au chocolat', description: 'Boule de glace, crème anglaise', price: '5 €', image: '/menu/fondant-chocolat.webp' },
          { name: 'Tiramisu', description: 'Spéculoos, Kinder Bueno, brownie ou café', price: '5 €', image: '/menu/tiramisu.webp' },
          { name: 'Gaufre', description: 'Nutella, banane', price: '7 €', image: '/menu/gaufre.webp' },
          {
            name: 'Brioche perdue',
            description: 'Nutella, banane',
            price: '7 €',
            image: '/menu/brioche-perdue.webp',
            imageLarge: '/menu/brioche-perdue-lg.webp',
            featured: 4,
          },
          { name: 'Assiette de fruits de saison', price: '10 €', image: '/menu/assiette-fruits.webp' },
        ],
      },
    ],
  },
  {
    id: 'boissons',
    label: 'Boissons',
    groups: [
      {
        title: 'Cocktails',
        display: 'cards',
        items: [
          { name: 'Mojito', description: 'Fraise, passion, framboise ou violette', price: COCKTAIL, image: '/menu/mojito.webp' },
          { name: 'Festif', description: 'Gingembre, framboise, citron vert', price: COCKTAIL, image: '/menu/cocktail-festif.webp' },
          { name: 'Piña Colada', description: 'Ananas, coco', price: COCKTAIL, image: '/menu/pina-colada.webp' },
          {
            name: "L'Olivium",
            fullName: "Cocktail L'Olivium",
            description: 'Cranberry, ananas',
            price: COCKTAIL,
            image: '/menu/cocktail-olivium.webp',
            imageLarge: '/menu/cocktail-olivium-lg.webp',
            badge: 'Signature',
            featured: 5,
          },
        ],
      },
      {
        title: 'Boissons froides',
        display: 'cards',
        items: [
          { name: 'Milkshakes', price: '9 €', image: '/menu/milkshakes.webp', options: ['Oreo', 'Bueno', "M&M's", 'Spéculoos'] },
          { name: 'Smoothies', price: '7 €', image: '/menu/smoothies.webp', options: ['Fraise', 'Banane', 'Ananas', 'Mangue', 'Avocat', 'Fruits rouges'] },
          { name: 'Jus', price: '5 €', image: '/menu/jus.webp', options: ['Fraise', 'Ananas', 'Orange', 'Abricot'] },
          { name: "Jus d'orange pressé", price: '7 €', image: '/menu/jus-orange-presse.webp' },
          {
            name: 'Softs',
            price: '4 €',
            image: '/menu/softs.webp',
            options: [
              'Ice Tea',
              'Oasis',
              'Coca',
              'Coca Zéro',
              'Coca Cherry',
              'Perrier',
              'Eau',
              'Schweppes Agrumes',
              'Sprite',
              '7Up',
              'Fanta',
              'Hawaï',
              'Orangina',
            ],
          },
          { name: 'Red Bull', price: '7 €', image: '/menu/red-bull.webp' },
        ],
      },
      {
        title: 'Boissons chaudes',
        display: 'rows',
        items: [
          // Prix non communiqués : renseignez `price` et retirez `hidden` pour les afficher.
          { name: 'Expresso', price: '', hidden: true },
          { name: 'Cappuccino', price: '', hidden: true },
          { name: 'Thé à la menthe', price: '', hidden: true },
          { name: 'Café au lait', price: '', hidden: true },
        ],
      },
    ],
  },
  {
    id: 'chichas',
    label: 'Chichas',
    layout: 'chichas',
    groups: [
      {
        display: 'cards',
        items: [
          { name: 'Chicha classique', price: '15 €', image: '/menu/chicha-classique.webp' },
          { name: 'Chicha Kaloud', price: '20 €', image: '/menu/chicha-kaloud.webp' },
          { name: 'Chicha Quasar', price: '20 €', image: '/menu/chicha-quasar.webp' },
          { name: 'Tête supplémentaire', price: '10 €', image: '/menu/chicha-tete.webp' },
        ],
      },
    ],
    flavors: ['Mi Amor', 'Hawaï', 'Love', 'Menthe', 'Pomme', 'Menthe Pomme'],
  },
];

/** Cuisines proposées, pour les données structurées de l'établissement. */
export const servesCuisine = ['Burgers', 'Sandwichs', 'Pâtes', 'Paninis', 'Salades', 'Ojja', 'Desserts'];

// ── Helpers (ne pas modifier) ────────────────────────────────────────────────

/** Visible = non masqué et avec un prix. */
export const isVisible = (i: MenuItem): boolean => !i.hidden && Boolean(i.price && i.price.trim());

export const visibleItems = (g: MenuGroup): MenuItem[] => g.items.filter(isVisible);

const allItems = (): MenuItem[] =>
  menuSections.flatMap((s) => s.groups.flatMap((g) => visibleItems(g)));

/** Les formules (pour la page d'accueil) */
export const formules = (): MenuItem[] =>
  menuSections.find((s) => s.id === 'formules')?.groups.flatMap((g) => visibleItems(g)) ?? [];

/** Incontournables, triés par `featured`. */
export const featuredItems = (): MenuItem[] =>
  allItems()
    .filter((i) => i.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

/** Les 4 premiers incontournables pour la page d'accueil */
export const homeItems = (): MenuItem[] => featuredItems().slice(0, 4);

export const hasExampleItems = (): boolean => allItems().some((i) => i.example);

const priceNumber = (p: string) => p.replace(/[^\d,.]/g, '').replace(',', '.');

/** JSON-LD schema.org/Menu — uniquement les articles visibles et confirmés. */
export function menuJsonLd(baseUrl: string) {
  const toItem = (i: MenuItem) => {
    const description = i.description ?? (i.options?.length ? i.options.join(', ') : undefined);
    return {
      '@type': 'MenuItem',
      name: i.name,
      ...(description ? { description } : {}),
      offers: { '@type': 'Offer', price: priceNumber(i.price ?? ''), priceCurrency: 'EUR' },
    };
  };
  const sections = menuSections.flatMap((s) =>
    s.groups
      .map((g) => ({
        '@type': 'MenuSection',
        name: g.title ?? s.label,
        hasMenuItem: visibleItems(g).filter((i) => !i.example).map(toItem),
      }))
      .filter((g) => g.hasMenuItem.length > 0),
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: "La Carte de L'Olivium Lounge",
    url: `${baseUrl}/menu`,
    inLanguage: 'fr',
    hasMenuSection: sections,
  };
}

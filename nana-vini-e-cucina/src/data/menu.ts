/*
  Menù di Nanà Vini e Cucina.
  Fonte: menù ufficiale "Nana-Menu-3-Ante.pdf" pubblicato su nanaviniecucina.it (versione del 6 giugno 2026).
  Nomi e prezzi sono quelli del menù. Le descrizioni inglesi sono quelle stampate sul menù;
  le descrizioni italiane, dove presenti, sono la resa italiana di quelle descrizioni ufficiali.
  L'asterisco segnala un prodotto congelato, come sul menù cartaceo.
*/

export type Dish = {
  /** nome italiano, come sul menù */
  name: string;
  /** descrizione italiana (facoltativa) */
  it?: string;
  /** descrizione inglese dal menù */
  en?: string;
  /** prezzo in euro */
  price: number;
  /** unità di prezzo diversa dalla porzione */
  unit?: { it: string; en: string };
  /** contiene almeno un prodotto congelato (*) */
  frozen?: boolean;
};

export type DishGroup = {
  title?: { it: string; en: string };
  dishes: Dish[];
};

export type MenuCategory = {
  id: string;
  title: { it: string; en: string };
  /** sottotitolo come sul menù cartaceo (es. "Starters") */
  subtitle: { it: string; en: string };
  groups: DishGroup[];
  /** impaginazione delle sottosezioni affiancate su desktop */
  columns?: boolean;
};

export const MENU: MenuCategory[] = [
  {
    id: "antipasti",
    title: { it: "Antipasti", en: "Antipasti" },
    subtitle: { it: "Per cominciare", en: "Starters" },
    groups: [
      {
        dishes: [
          {
            name: "Polpette di baccalà* mantecato e hummus di ceci",
            it: "Polpette di baccalà mantecato con crema di ceci",
            en: "Cod* croquettes with chickpea hummus",
            price: 12,
            frozen: true,
          },
          { name: "Alici fritte", en: "Fried anchovies", price: 12 },
          { name: "Calamarelle* fritte", en: "Tiny fried squids*", price: 12, frozen: true },
          { name: "Polpo* e patate", en: "Octopus* and potatoes", price: 14, frozen: true },
          {
            name: "Burrata con gamberi* rossi crudi e zest di limone",
            en: "Burrata with raw red shrimps* and lemon zest",
            price: 16,
            frozen: true,
          },
          {
            name: "Carpaccio di salmone marinato e salsa kefir",
            en: "Marinated salmon carpaccio with kefir sauce",
            price: 16,
          },
        ],
      },
      {
        dishes: [
          {
            name: "Polpette di melanzane con salsa yogurt e menta",
            en: "Eggplant croquettes with yogurt and mint sauce",
            price: 12,
          },
          {
            name: "Parmigiana di melanzane di “Nonna Margò”",
            en: "Eggplant parmigiana “Nonna Margò” style",
            price: 13,
          },
          { name: "Prosciutto crudo e melone", en: "Raw ham and melon", price: 14 },
          { name: "Mozzarella di bufala a latte crudo", en: "Buffalo mozzarella", price: 15 },
          {
            name: "La caprese di Nanà",
            it: "Con i nostri pomodorini canditi",
            en: "Nanà’s caprese with special candied tomatoes",
            price: 15,
          },
          {
            name: "Carpaccio di manzo marinato e salsa tonnata",
            en: "Marinated beef carpaccio and tuna sauce",
            price: 16,
          },
        ],
      },
    ],
  },
  {
    id: "tradizioni",
    title: { it: "Le nostre tradizioni", en: "Our traditions" },
    subtitle: { it: "Le paste della tradizione", en: "Our traditional pastas" },
    columns: true,
    groups: [
      {
        title: { it: "La tradizione napoletana", en: "The Neapolitan tradition" },
        dishes: [
          {
            name: "Ragù napoletano",
            it: "Pasta al sugo di pomodoro con carne di manzo e di maiale",
            en: "Pasta with tomato sauce, beef and pork meat",
            price: 15,
          },
          {
            name: "Genovese",
            it: "Pasta con sugo di cipolla dorata e carne di manzo",
            en: "Pasta with golden onion sauce and beef meat",
            price: 15,
          },
          {
            name: "Mafaldina ragù e ricotta",
            it: "Mafaldine al ragù di carne con ricotta",
            en: "Mafaldina pasta with meat sauce and ricotta cheese",
            price: 15,
          },
          {
            name: "Scarpariello",
            it: "Pasta con pomodorini rossi, peperoncino e formaggio",
            en: "Pasta with red cherry tomatoes, chili pepper and cheese",
            price: 15,
          },
        ],
      },
      {
        title: { it: "La tradizione romana", en: "The Roman tradition" },
        dishes: [
          {
            name: "Carbonara",
            it: "Pasta con guanciale, uova, pecorino romano e pepe nero",
            en: "Pasta with pork cheek, eggs, pecorino romano cheese and black pepper",
            price: 15,
          },
          {
            name: "Amatriciana",
            it: "Pasta con sugo di pomodoro, guanciale e pecorino romano",
            en: "Pasta with tomato sauce, pork cheek and pecorino romano cheese",
            price: 15,
          },
          {
            name: "Cacio e pepe",
            it: "Pasta con pecorino romano e pepe nero",
            en: "Pasta with pecorino romano cheese and black pepper",
            price: 15,
          },
          {
            name: "Gricia",
            it: "Pasta con guanciale, pecorino romano e pepe nero",
            en: "Pasta with pork cheek, pecorino romano cheese and black pepper",
            price: 15,
          },
        ],
      },
    ],
  },
  {
    id: "pasta",
    title: { it: "La pasta", en: "La pasta" },
    subtitle: { it: "Primi piatti", en: "Pasta" },
    groups: [
      {
        dishes: [
          {
            name: "Spaghetti con colatura di alici e pane croccante",
            en: "Spaghetti with anchovy sauce and crunchy bread",
            price: 18,
          },
          { name: "Scialatielli allo scoglio", it: "Scialatielli ai frutti di mare", en: "Scialatielli with seafood", price: 20 },
          { name: "Spaghetti alle vongole", en: "Spaghetti with clams", price: 20 },
          {
            name: "Tagliolini con gamberi* e pomodorini datterini",
            en: "Tagliolini with shrimps* and datterini tomatoes",
            price: 20,
            frozen: true,
          },
        ],
      },
      {
        dishes: [
          {
            name: "I ravioli di Nanà",
            it: "Ravioli di ricotta di bufala e limone al pomodoro",
            en: "Ravioli with buffalo ricotta cheese, lemon and tomato sauce",
            price: 15,
          },
          {
            name: "Mezze maniche con crema di melanzane, burrata e pomodorini confit",
            en: "Mid-length pasta with eggplant cream, burrata and confit cherry tomatoes",
            price: 15,
          },
          {
            name: "Spaghetti alla Nerano",
            it: "Con zucchine fritte, basilico e formaggio",
            en: "Spaghetti with fried zucchini, basil and cheese",
            price: 15,
          },
          {
            name: "Spaghetti ai pomodorini di Corbara",
            it: "Con pomodorini di Corbara e basilico",
            en: "Spaghetti with Corbara cherry tomatoes and basil",
            price: 15,
          },
        ],
      },
    ],
  },
  {
    id: "pesce",
    title: { it: "Secondi di pesce", en: "Secondi di pesce" },
    subtitle: { it: "Dal mare", en: "Fish" },
    groups: [
      {
        dishes: [
          {
            name: "Calamari* con crema di pomodoro arrosto e maionese di olive",
            en: "Squids* with roasted tomato cream and olive mayonnaise",
            price: 20,
            frozen: true,
          },
          {
            name: "Frittura di calamari* e gamberi rosa",
            en: "Fried calamari* and pink shrimp",
            price: 20,
            frozen: true,
          },
          {
            name: "Baccalà* alla puttanesca",
            it: "Con pomodoro, olive e capperi",
            en: "Cod* with tomatoes, olives and capers",
            price: 22,
            frozen: true,
          },
          {
            name: "Polpo* rosticciato e scarola alla napoletana",
            en: "Roasted octopus* and endive Neapolitan style",
            price: 22,
            frozen: true,
          },
          {
            name: "Pescato del giorno al forno",
            en: "Baked fish of the day",
            price: 7,
            unit: { it: "all’etto", en: "per 100 g" },
          },
        ],
      },
    ],
  },
  {
    id: "carne",
    title: { it: "Secondi di carne", en: "Secondi di carne" },
    subtitle: { it: "Dalla terra", en: "Meat" },
    groups: [
      {
        dishes: [
          {
            name: "Polpette al sugo “Mamma Nunziatina”",
            en: "Meatballs with tomato sauce “Mamma Nunziatina” style",
            price: 15,
          },
          {
            name: "Hamburger di manzo, pane tostato e patatine fritte",
            en: "Beef burger, toasted bread and fries",
            price: 15,
          },
          { name: "Polletto alla diavola", en: "Roasted chicken “diavola” style", price: 20 },
          { name: "Entrecôte di manzo con patate al forno", en: "Beef entrecôte with baked potatoes", price: 25 },
          { name: "Costine di agnello con patate al forno", en: "Lamb ribs with baked potatoes", price: 25 },
        ],
      },
    ],
  },
  {
    id: "contorni",
    title: { it: "Contorni e insalate", en: "Contorni e insalate" },
    subtitle: { it: "Verdure e insalate", en: "Side dishes and salads" },
    columns: true,
    groups: [
      {
        title: { it: "Contorni", en: "Side dishes" },
        dishes: [
          { name: "Scarola alla napoletana", en: "Endive Neapolitan style", price: 7 },
          { name: "Zucchine alla scapece", en: "Zucchini scapece style", price: 7 },
          { name: "Patate al forno", en: "Baked potatoes", price: 7 },
          { name: "Verdura di stagione", en: "Seasonal vegetables", price: 7 },
        ],
      },
      {
        title: { it: "Insalate", en: "Salads" },
        dishes: [
          {
            name: "Insalata mediterranea",
            it: "Insalata mista, mozzarella di bufala, noci, olive",
            en: "Mixed salad, mozzarella, nuts, olives",
            price: 12,
          },
          {
            name: "Insalata Nanà",
            it: "Insalata mista, salmone, noci e salsa yogurt",
            en: "Mixed salad, salmon, nuts, yogurt sauce",
            price: 12,
          },
          {
            name: "Insalata tonnè",
            it: "Insalata mista, tonno, noci, salsa tonnata",
            en: "Mixed salad, tuna, nuts, olives, tuna sauce",
            price: 12,
          },
        ],
      },
    ],
  },
  {
    id: "dolci",
    title: { it: "Dolci", en: "Dolci" },
    subtitle: { it: "Fatti in casa", en: "Homemade desserts" },
    groups: [
      {
        dishes: [
          { name: "Babà con crema pasticcera", en: "Babà with cream", price: 8 },
          {
            name: "Torta caprese con gelato al fior di latte",
            en: "Caprese cake with milk ice cream",
            price: 8,
          },
          { name: "Cheesecake", price: 8 },
          { name: "Tiramisù", price: 8 },
        ],
      },
      {
        dishes: [
          { name: "Gelato", en: "Ice cream", price: 6 },
          { name: "Frutta di stagione", en: "Seasonal fruit", price: 6 },
          { name: "Sorbetto al limone", en: "Lemon sorbet", price: 6 },
        ],
      },
    ],
  },
  {
    id: "bevande",
    title: { it: "Bevande e caffetteria", en: "Drinks and coffee" },
    subtitle: { it: "Da bere", en: "Drinks" },
    columns: true,
    groups: [
      {
        title: { it: "Bevande", en: "Drinks" },
        dishes: [
          { name: "Acqua naturale", en: "Still water", price: 3 },
          { name: "Acqua frizzante", en: "Sparkling water", price: 3 },
          { name: "Birra in bottiglia", en: "Bottled beer", price: 5 },
          { name: "Coca Cola, Sprite, Fanta, Coca Zero", price: 4 },
          { name: "Tè freddo", en: "Cold tea", price: 4 },
          { name: "Succhi di frutta", en: "Fruit juices", price: 4 },
          { name: "Acqua tonica", en: "Tonic water", price: 4 },
        ],
      },
      {
        title: { it: "Caffetteria", en: "Coffee" },
        dishes: [
          { name: "Caffè espresso", price: 2 },
          { name: "Caffè americano", price: 3 },
          { name: "Doppio espresso", en: "Double espresso", price: 4 },
          { name: "Caffè decaffeinato", en: "Decaf coffee", price: 3 },
          { name: "Caffè d’orzo", en: "Barley coffee", price: 3 },
          { name: "Cappuccino", price: 4 },
          { name: "Thè caldo", en: "Hot tea", price: 4 },
        ],
      },
    ],
  },
];

export const COVER_CHARGE = 3;

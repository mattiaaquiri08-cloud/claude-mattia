/*
  Galleria: fotografie del ristorante pubblicate sul sito ufficiale nanaviniecucina.it
  (servizio fotografico professionale nella sala di Via della Panetteria 37).
  Le didascalie descrivono ciò che si vede; i nomi dei piatti compaiono solo dove sono certi.
*/

export type GalleryItem = {
  id: string;
  alt: { it: string; en: string };
};

export const GALLERY: GalleryItem[] = [
  {
    id: "galleria/sala-cucina-a-vista",
    alt: { it: "La sala con la cucina a vista e le boiserie verde petrolio", en: "The dining room with its open kitchen and petrol green woodwork" },
  },
  {
    id: "galleria/spaghetti-vongole",
    alt: { it: "Spaghetti alle vongole su un piatto in ceramica a righe", en: "Spaghetti alle vongole on a striped ceramic plate" },
  },
  {
    id: "galleria/frittura",
    alt: { it: "Frittura di calamari e gamberi con limone", en: "Fried calamari and shrimp with lemon" },
  },
  {
    id: "galleria/insegna",
    alt: { it: "La scritta Nanà sul vetro della cucina", en: "The Nanà lettering on the kitchen glass" },
  },
  {
    id: "galleria/pasta-frutti-di-mare",
    alt: { it: "Pasta fresca con cozze, vongole e pomodorini", en: "Fresh pasta with mussels, clams and cherry tomatoes" },
  },
  {
    id: "galleria/tavola",
    alt: { it: "Una tavola apparecchiata con le ceramiche dipinte a mano", en: "A table laid with hand-painted ceramics" },
  },
  {
    id: "galleria/polpo",
    alt: { it: "Polpo servito su un piatto a righe blu", en: "Octopus served on a blue striped plate" },
  },
  {
    id: "galleria/polpette",
    alt: { it: "Polpette dorate con salsa bianca, servite al tavolo", en: "Golden croquettes with a white sauce, served at the table" },
  },
  {
    id: "galleria/sala-arco",
    alt: { it: "La sala con il grande finestrone ad arco", en: "The dining room with its large arched window" },
  },
  {
    id: "galleria/alici-fritte",
    alt: { it: "Alici fritte con uno spicchio di limone", en: "Fried anchovies with a wedge of lemon" },
  },
  {
    id: "galleria/calice",
    alt: { it: "Un antipasto con pomodori e un calice di vino bianco", en: "A starter with tomatoes and a glass of white wine" },
  },
  {
    id: "galleria/tavolo-finestra",
    alt: { it: "Tavolo rotondo accanto alla vetrata della cucina", en: "A round table beside the kitchen window" },
  },
  {
    id: "galleria/carne",
    alt: { it: "Carne alla griglia con salsa e purè", en: "Grilled meat with sauce and mash" },
  },
  {
    id: "galleria/ceramiche",
    alt: { it: "I piatti in ceramica dipinti a mano della tavola di Nanà", en: "The hand-painted ceramic plates of Nanà’s table" },
  },
];

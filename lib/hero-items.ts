import { manchurian, specialIceCreams, milkshakes, milkAndLassi } from "./menu-data";

export interface HeroItem {
  id: number;
  title: string;
  category: string;
  price: number;
  tag: string;
  description: string;
  image: string | null;
  accentColor: string;
}

export const HERO_ITEMS: HeroItem[] = [
  {
    id: 1,
    title: "Gobi Manchurian",
    category: "Fast Food",
    price: manchurian.find((m) => m.name === "Gobi")?.price || 120,
    tag: "Crispy & Spicy Signature",
    description: "Crispy cauliflower florets tossed in authentic Indo-Chinese sauces, garlic, and spring onions.",
    image: "/Gobi.jpeg",
    accentColor: "#E5B95C"
  },
  {
    id: 2,
    title: "Mushroom Chilli",
    category: "Chef's Special Manchurian",
    price: manchurian.find((m) => m.name === "Mushroom Chilli")?.price || 150,
    tag: "Sizzling & Aromatic",
    description: "Fresh button mushrooms wok-tossed with green chillies, bell peppers, and savory soy sauce.",
    image: "/Mushroom.jpeg",
    accentColor: "#E5B95C"
  },
  {
    id: 3,
    title: "Gobi Rice",
    category: "Fast Food / Rice",
    price: 120,
    tag: "Flavorful Indo-Chinese Stir-Fry",
    description: "Aromatic fried rice tossed with crispy Gobi florets, crunchy veggies, and signature seasonings.",
    image: "/Gobi rice.jpeg",
    accentColor: "#E5B95C"
  },
  {
    id: 4,
    title: "Basanthi Ice",
    category: "Royal Dessert",
    price: specialIceCreams.find((m) => m.name === "Basanthi Ice")?.price || 130,
    tag: "Traditional Proddatur Delight",
    description: "Rich condensed saffron rabri served chilled over smooth handcrafted vanilla ice cream.",
    image: "/Basanti.jpeg",
    accentColor: "#EFE6D2"
  },
  {
    id: 5,
    title: "3 in 1 Ice Cream",
    category: "Tri-Flavor Delight",
    price: 110,
    tag: "Triple Scoop Harmony",
    description: "A combination of three classic ice cream flavors served in a royal scoop.",
    image: "/3 in 1.jpeg",
    accentColor: "#7A1B34"
  },
  {
    id: 6,
    title: "Chocolate Delight",
    category: "Chocolate Special",
    price: 110,
    tag: "Rich Cocoa Indulgence",
    description: "Velvety rich chocolate ice cream made with premium cocoa and dark chocolate drizzle.",
    image: "/Chocolate.jpeg",
    accentColor: "#C9A567"
  },
  {
    id: 7,
    title: "Priya Special Ice Cream",
    category: "Special Ice Cream",
    price: specialIceCreams.find((m) => m.name === "Priya Special")?.price || 140,
    tag: "House Speciality Since 1985",
    description: "Multi-layered royal scoops topped with cashews, raisins, tutty-fruity, and signature syrups.",
    image: "/priya special.jpeg",
    accentColor: "#7A1B34"
  }
];

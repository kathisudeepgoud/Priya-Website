export interface HeroFeature {
  iconType: "leaf" | "sparkles" | "snowflake" | "flame" | "star";
  title: string;
  sub: string;
}

export interface HeroItem {
  id: number;
  title: string;
  category: string;
  price: number;
  tag: string;
  description: string;
  image: string | null;
  accentColor: string;
  features: HeroFeature[];
}

export const HERO_ITEMS: HeroItem[] = [
  {
    id: 1,
    title: "Gobi Manchurian",
    category: "Fast Food",
    price: 120,
    tag: "Crispy & Spicy Signature",
    description: "Crispy cauliflower florets tossed in authentic Indo-Chinese sauces, garlic, and spring onions.",
    image: "/Gobi.jpeg",
    accentColor: "#E5B95C",
    features: [
      { iconType: "flame", title: "Crispy & Spicy", sub: "Signature Sauce" },
      { iconType: "leaf", title: "Fresh Florets", sub: "Garlic & Herbs" },
      { iconType: "star", title: "Wok Tossed", sub: "Proddatur Favorite" }
    ]
  },
  {
    id: 2,
    title: "Mushroom Chilli",
    category: "Chef's Special Manchurian",
    price: 160,
    tag: "Sizzling & Aromatic",
    description: "Fresh button mushrooms wok-tossed with green chillies, bell peppers, and savory soy sauce.",
    image: "/Mushroom.jpeg",
    accentColor: "#E5B95C",
    features: [
      { iconType: "flame", title: "Sizzling Hot", sub: "Green Chillies" },
      { iconType: "leaf", title: "Button Mushrooms", sub: "Handpicked Daily" },
      { iconType: "sparkles", title: "Chef's Special", sub: "Rich Soy Glaze" }
    ]
  },
  {
    id: 3,
    title: "Gobi Rice",
    category: "Fast Food / Rice",
    price: 120,
    tag: "Flavorful Indo-Chinese Stir-Fry",
    description: "Aromatic fried rice tossed with crispy Gobi florets, crunchy veggies, and signature seasonings.",
    image: "/Gobi rice.jpeg",
    accentColor: "#E5B95C",
    features: [
      { iconType: "leaf", title: "Aromatic Rice", sub: "Wok Stir-Fried" },
      { iconType: "flame", title: "Crispy Gobi", sub: "House Seasoning" },
      { iconType: "star", title: "Veggies Loaded", sub: "Authentic Flavor" }
    ]
  },
  {
    id: 4,
    title: "Basanthi Ice",
    category: "Royal Dessert",
    price: 140,
    tag: "Traditional Proddatur Delight",
    description: "Rich condensed saffron rabri served chilled over smooth handcrafted vanilla ice cream.",
    image: "/Basanti.jpeg",
    accentColor: "#EFE6D2",
    features: [
      { iconType: "leaf", title: "Rich & Creamy", sub: "Premium Ingredients" },
      { iconType: "sparkles", title: "Saffron Infused", sub: "Royal Flavour" },
      { iconType: "snowflake", title: "Chilled Delight", sub: "Always Fresh" }
    ]
  },
  {
    id: 5,
    title: "3 in 1 Ice Cream",
    category: "Tri-Flavor Delight",
    price: 120,
    tag: "Triple Scoop Harmony",
    description: "A combination of three classic ice cream flavors served in a royal scoop.",
    image: "/3 in 1.jpeg",
    accentColor: "#7A1B34",
    features: [
      { iconType: "sparkles", title: "3 Classic Flavors", sub: "Tri-Color Scoop" },
      { iconType: "snowflake", title: "Handcrafted Ice", sub: "Silky & Smooth" },
      { iconType: "star", title: "Heritage Recipe", sub: "Since 1985" }
    ]
  },
  {
    id: 6,
    title: "Chocolate Delight",
    category: "Chocolate Special",
    price: 120,
    tag: "Rich Cocoa Indulgence",
    description: "Velvety rich chocolate ice cream made with premium cocoa and dark chocolate drizzle.",
    image: "/Chocolate.jpeg",
    accentColor: "#C9A567",
    features: [
      { iconType: "sparkles", title: "Rich Cocoa", sub: "Dark Chocolate" },
      { iconType: "snowflake", title: "Velvety Texture", sub: "Double Chilled" },
      { iconType: "leaf", title: "Nutty Toppings", sub: "Fresh Cashews" }
    ]
  },
  {
    id: 7,
    title: "Priya Special Ice Cream",
    category: "Special Ice Cream",
    price: 150,
    tag: "House Speciality Since 1985",
    description: "Multi-layered royal scoops topped with cashews, raisins, tutty-fruity, and signature syrups.",
    image: "/priya special.jpeg",
    accentColor: "#7A1B34",
    features: [
      { iconType: "sparkles", title: "Royal Multi-Layer", sub: "House Speciality" },
      { iconType: "leaf", title: "Cashews & Raisins", sub: "Rich Dry Fruits" },
      { iconType: "snowflake", title: "Signature Syrup", sub: "Four Decades Legacy" }
    ]
  }
];

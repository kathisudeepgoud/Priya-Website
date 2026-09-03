export type MenuItem = {
  name: string;
  teluguName?: string;
  price: number;
  isEgg?: boolean;
  category: string;
};

export const businessInfo = {
  name: "Priya Ice Creams Fastfood North Indian",
  address: "Shivalayam Street, Ward 20, Holmus Pet, Proddatur, Andhra Pradesh, India",
  since: 1985,
  googleRating: 4.1,
  googleReviewCount: 336,
  googleMapsUrl: "https://www.google.com/maps/search/Priya+Ice+Creams+%26+Fast+Foods+Proddatur"
};

// FAST FOOD CATEGORIES
export const gobiItems: MenuItem[] = [
  { name: "Gobi", teluguName: "గోబి", price: 120, category: "Gobi" },
  { name: "Gobi Chilli", teluguName: "గోబి చిల్లి", price: 140, category: "Gobi" },
  { name: "Gobi 65", teluguName: "గోబి 65", price: 150, category: "Gobi" },
  { name: "Egg Gobi", teluguName: "ఎగ్ గోబి", price: 140, isEgg: true, category: "Gobi" },
  { name: "Garlic Gobi", teluguName: "గార్లిక్ గోబి", price: 150, category: "Gobi" },
  { name: "Golden Gobi", teluguName: "గోల్డెన్ గోబి", price: 150, category: "Gobi" }
];

export const mushroomItems: MenuItem[] = [
  { name: "Mushroom", teluguName: "మష్రూమ్", price: 180, category: "Mushroom" },
  { name: "Mushroom Chilli", teluguName: "మష్రూమ్ చిల్లి", price: 160, category: "Mushroom" },
  { name: "Mushroom 65", teluguName: "మష్రూమ్ 65", price: 170, category: "Mushroom" },
  { name: "Garlic Mushroom", teluguName: "గార్లిక్ మష్రూమ్", price: 200, category: "Mushroom" },
  { name: "Pepper Mushroom", teluguName: "పెప్పర్ మష్రూమ్", price: 200, category: "Mushroom" },
  { name: "Mushroom Fry", teluguName: "మష్రూమ్ ఫ్రై", price: 200, category: "Mushroom" }
];

export const paneerItems: MenuItem[] = [
  { name: "Paneer", teluguName: "పనీర్", price: 200, category: "Paneer" },
  { name: "Paneer Chilli", teluguName: "పనీర్ చిల్లి", price: 200, category: "Paneer" },
  { name: "Paneer 65", teluguName: "పనీర్ 65", price: 200, category: "Paneer" },
  { name: "Paneer Majestic", teluguName: "పనీర్ మెజెస్టిక్", price: 220, category: "Paneer" },
  { name: "Paneer 555", teluguName: "పనీర్ 555", price: 220, category: "Paneer" }
];

export const noodlesItems: MenuItem[] = [
  { name: "Noodles", teluguName: "నూడుల్స్", price: 100, category: "Noodles" },
  { name: "Gobi Noodles", teluguName: "గోబి నూడుల్స్", price: 120, category: "Noodles" },
  { name: "Paneer Noodles", teluguName: "పనీర్ నూడుల్స్", price: 180, category: "Noodles" },
  { name: "Mushroom Noodles", teluguName: "మష్రూమ్ నూడుల్స్", price: 150, category: "Noodles" },
  { name: "Veg Mix Noodles", teluguName: "వెజ్ మిక్స్ నూడుల్స్", price: 170, category: "Noodles" },
  { name: "Veg Hakka Noodles", teluguName: "వెజ్ హక్కా నూడుల్స్", price: 160, category: "Noodles" },
  { name: "Egg Noodles", teluguName: "ఎగ్ నూడుల్స్", price: 120, isEgg: true, category: "Noodles" },
  { name: "Egg Gobi Noodles", teluguName: "ఎగ్ గోబి నూడుల్స్", price: 140, isEgg: true, category: "Noodles" }
];

export const riceItems: MenuItem[] = [
  { name: "Fried Rice", teluguName: "ఫ్రైడ్ రైస్", price: 100, category: "Rice Items" },
  { name: "Gobi Rice", teluguName: "గోబి రైస్", price: 120, category: "Rice Items" },
  { name: "Mushroom Rice", teluguName: "మష్రూమ్ రైస్", price: 150, category: "Rice Items" },
  { name: "Paneer Rice", teluguName: "పనీర్ రైస్", price: 170, category: "Rice Items" },
  { name: "Kaju Rice", teluguName: "కాజూ రైస్", price: 200, category: "Rice Items" },
  { name: "Tomato Rice", teluguName: "టమాటా రైస్", price: 100, category: "Rice Items" },
  { name: "Jeera Rice", teluguName: "జీరా రైస్", price: 100, category: "Rice Items" },
  { name: "Baby Corn Rice", teluguName: "బేబీ కార్న్ రైస్", price: 150, category: "Rice Items" },
  { name: "Veg Schezwan Rice", teluguName: "వెజ్ షెజ్వాన్ రైస్", price: 150, category: "Rice Items" },
  { name: "Egg Rice", teluguName: "ఎగ్ రైస్", price: 120, isEgg: true, category: "Rice Items" },
  { name: "Egg Gobi Rice", teluguName: "ఎగ్ గోబి రైస్", price: 140, isEgg: true, category: "Rice Items" },
  { name: "Curd Rice", teluguName: "పెరుగన్నం", price: 100, category: "Rice Items" }
];

export const babyCornItems: MenuItem[] = [
  { name: "Baby Corn", teluguName: "బేబీ కార్న్", price: 170, category: "Baby Corn" },
  { name: "Baby Corn Chilli", teluguName: "బేబీ కార్న్ చిల్లి", price: 170, category: "Baby Corn" },
  { name: "Crispy Baby Corn", teluguName: "క్రిస్పీ బేబీ కార్న్", price: 200, category: "Baby Corn" },
  { name: "Garlic Baby Corn", teluguName: "గార్లిక్ బేబీ కార్న్", price: 200, category: "Baby Corn" },
  { name: "Crispy Corn", teluguName: "క్రిస్పీ కార్న్", price: 160, category: "Baby Corn" },
  { name: "Boiled Corn", teluguName: "బాయిల్డ్ కార్న్", price: 130, category: "Baby Corn" }
];

export const kajuItems: MenuItem[] = [
  { name: "Kaju Dry", teluguName: "కాజూ డ్రై", price: 210, category: "Kaju" },
  { name: "Chilli Kaju", teluguName: "చిల్లి కాజూ", price: 200, category: "Kaju" },
  { name: "Kaju 65", teluguName: "కాజూ 65", price: 200, category: "Kaju" }
];

// NORTH INDIAN CATEGORIES
export const soupItems: MenuItem[] = [
  { name: "Veg Manchow", teluguName: "వెజ్ మంచోవ్", price: 120, category: "Soups" },
  { name: "Mushroom", teluguName: "మష్రూమ్", price: 100, category: "Soups" },
  { name: "Veg Corn", teluguName: "వెజ్ కార్న్", price: 120, category: "Soups" },
  { name: "Tomato", teluguName: "టమాటా", price: 180, category: "Soups" },
  { name: "Veg Hot & Sour", teluguName: "వెజ్ హాట్ & సోర్", price: 100, category: "Soups" },
  { name: "Sweet Corn", teluguName: "స్వీట్ కార్న్", price: 120, category: "Soups" }
];

export const biryaniItems: MenuItem[] = [
  { name: "Veg Dum Biryani", teluguName: "వెజ్ డమ్ బిర్యానీ", price: 160, category: "Biryani" },
  { name: "Kaju Biryani", teluguName: "కాజూ బిర్యానీ", price: 200, category: "Biryani" },
  { name: "Mushroom Biryani", teluguName: "మష్రూమ్ బిర్యానీ", price: 180, category: "Biryani" },
  { name: "Paneer Biryani", teluguName: "పనీర్ బిర్యానీ", price: 200, category: "Biryani" },
  { name: "Veg Mix Biryani", teluguName: "వెజ్ మిక్స్ బిర్యానీ", price: 160, category: "Biryani" }
];

export const vegCurryItems: MenuItem[] = [
  { name: "Paneer Butter Masala", teluguName: "పనీర్ బటర్ మసాలా", price: 160, category: "Veg Curry" },
  { name: "Paneer Kofta", teluguName: "పనీర్ కోఫ్తా", price: 190, category: "Veg Curry" },
  { name: "Paneer Methi Chaman", teluguName: "పనీర్ మేథి చమన్", price: 200, category: "Veg Curry" },
  { name: "Kaju Paneer Masala", teluguName: "కాజూ పనీర్ మసాలా", price: 200, category: "Veg Curry" },
  { name: "Kadai Paneer", teluguName: "కడాయి పనీర్", price: 200, category: "Veg Curry" },
  { name: "Palak Paneer", teluguName: "పాలక్ పనీర్", price: 170, category: "Veg Curry" },
  { name: "Palak Zeera", teluguName: "పాలక్ జీరా", price: 160, category: "Veg Curry" },
  { name: "Tomato Palak", teluguName: "టమాటా పాలక్", price: 160, category: "Veg Curry" },
  { name: "Baby Corn Curry", teluguName: "బేబీ కార్న్ కర్రీ", price: 170, category: "Veg Curry" },
  { name: "Mushroom Curry", teluguName: "మష్రూమ్ కర్రీ", price: 170, category: "Veg Curry" },
  { name: "Mushroom Masala", teluguName: "మష్రూమ్ మసాలా", price: 170, category: "Veg Curry" },
  { name: "Kadai Mushroom", teluguName: "కడాయి మష్రూమ్", price: 170, category: "Veg Curry" },
  { name: "Palak Mushroom", teluguName: "పాలక్ మష్రూమ్", price: 170, category: "Veg Curry" },
  { name: "Mushroom Paneer", teluguName: "మష్రూమ్ పనీర్", price: 170, category: "Veg Curry" },
  { name: "Veg Mix Curry", teluguName: "వెజ్ మిక్స్ కర్రీ", price: 150, category: "Veg Curry" },
  { name: "Veg Kadai", teluguName: "వెజ్ కడాయి", price: 160, category: "Veg Curry" },
  { name: "Veg Kolhapuri", teluguName: "వెజ్ కొల్హాపురి", price: 173, category: "Veg Curry" },
  { name: "Veg Jaipuri", teluguName: "వెజ్ జైపురి", price: 180, category: "Veg Curry" },
  { name: "Veg Kofta", teluguName: "వెజ్ కోఫ్తా", price: 173, category: "Veg Curry" },
  { name: "Kaju Tomato", teluguName: "కాజూ టమాటా", price: 160, category: "Veg Curry" },
  { name: "Tomato Curry", teluguName: "టమాటా కర్రీ", price: 120, category: "Veg Curry" },
  { name: "Veg Chatpata", teluguName: "వెజ్ చట్పటా", price: 150, category: "Veg Curry" },
  { name: "Malai Kofta", teluguName: "మలై కోఫ్తా", price: 200, category: "Veg Curry" },
  { name: "Green Peas Masala", teluguName: "గ్రీన్ పీస్ మసాలా", price: 120, category: "Veg Curry" }
];

export const tandooriItems: MenuItem[] = [
  { name: "Roti", teluguName: "రోటీ", price: 25, category: "Tandoori" },
  { name: "Butter Roti", teluguName: "బటర్ రోటీ", price: 35, category: "Tandoori" },
  { name: "Plain Naan", teluguName: "ప్లెయిన్ నాన్", price: 30, category: "Tandoori" },
  { name: "Butter Naan", teluguName: "బటర్ నాన్", price: 40, category: "Tandoori" },
  { name: "Garlic Naan", teluguName: "గార్లిక్ నాన్", price: 50, category: "Tandoori" },
  { name: "Kashmir Naan", teluguName: "కాశ్మీర్ నాన్", price: 50, category: "Tandoori" },
  { name: "Plain Kulcha", teluguName: "ప్లెయిన్ కుల్చా", price: 45, category: "Tandoori" },
  { name: "Paneer Kulcha", teluguName: "పనీర్ కుల్చా", price: 45, category: "Tandoori" },
  { name: "Masala Kulcha", teluguName: "మసాలా కుల్చా", price: 50, category: "Tandoori" },
  { name: "Aloo Parota", teluguName: "ఆలూ పరోటా", price: 40, category: "Tandoori" },
  { name: "Paneer Parota", teluguName: "పనీర్ పరోటా", price: 45, category: "Tandoori" },
  { name: "Lacha Parota", teluguName: "లచ్చా పరోటా", price: 30, category: "Tandoori" }
];

export const vegStarterItems: MenuItem[] = [
  { name: "Veg Andhra", teluguName: "వెజ్ ఆంధ్ర", price: 200, category: "Veg Starters" },
  { name: "Veg Shangrila", teluguName: "వెజ్ షాంగ్రిలా", price: 200, category: "Veg Starters" },
  { name: "Veg Bullet", teluguName: "వెజ్ బులెట్", price: 180, category: "Veg Starters" },
  { name: "Veg Hong Kong", teluguName: "వెజ్ హాంగ్ కాంగ్", price: 200, category: "Veg Starters" },
  { name: "Veg Lollipop", teluguName: "వెజ్ లాలీపాప్", price: 190, category: "Veg Starters" },
  { name: "Veg Bull Bull", teluguName: "వెజ్ బుల్ బుల్", price: 180, category: "Veg Starters" },
  { name: "Veg Napoleon", teluguName: "వెజ్ నెపోలియన్", price: 160, category: "Veg Starters" },
  { name: "Veg Mongolian", teluguName: "వెజ్ మంగోలియన్", price: 190, category: "Veg Starters" }
];

// ICE CREAMS & DESSERTS
export const iceCreams: MenuItem[] = [
  { name: "Vanilla", teluguName: "వెనిల్లా", price: 110, category: "Ice Creams" },
  { name: "Strawberry", teluguName: "స్ట్రాబెర్రీ", price: 110, category: "Ice Creams" },
  { name: "Pineapple", teluguName: "పైనాపిల్", price: 110, category: "Ice Creams" },
  { name: "Pista", teluguName: "పిస్తా", price: 120, category: "Ice Creams" },
  { name: "Chocolate", teluguName: "చాక్లెట్", price: 120, category: "Ice Creams" },
  { name: "Mango", teluguName: "మాంగో", price: 120, category: "Ice Creams" },
  { name: "Badam Ice", teluguName: "బాదం ఐస్", price: 120, category: "Ice Creams" },
  { name: "Butterscotch", teluguName: "బటర్ స్కాచ్", price: 120, category: "Ice Creams" },
  { name: "3 in 1", teluguName: "3 ఇన్ 1", price: 120, category: "Ice Creams" }
];

export const specialIceCreams: MenuItem[] = [
  { name: "4 in 1", teluguName: "4 ఇన్ 1", price: 140, category: "Spl Ice Creams" },
  { name: "Priya Special", teluguName: "ప్రియ స్పెషల్", price: 150, category: "Spl Ice Creams" },
  { name: "Basanthi", teluguName: "బాసంతి", price: 110, category: "Spl Ice Creams" },
  { name: "Basanthi Ice", teluguName: "బాసంతి ఐస్", price: 140, category: "Spl Ice Creams" },
  { name: "Fruit Salad", teluguName: "ఫ్రూట్ సలాడ్", price: 140, category: "Spl Ice Creams" },
  { name: "Kaju Kismiss", teluguName: "కాజూ కిస్మిస్", price: 130, category: "Spl Ice Creams" },
  { name: "Rainbow Deluxe", teluguName: "రైన్బో డిలక్స్", price: 140, category: "Spl Ice Creams" },
  { name: "American Coconuts", teluguName: "అమెరికన్ కోకోనట్", price: 140, category: "Spl Ice Creams" },
  { name: "Badam Pista", teluguName: "బాదం పిస్తా", price: 130, category: "Spl Ice Creams" }
];

export const milkshakes: MenuItem[] = [
  { name: "Priya Milkshake", teluguName: "ప్రియ మిల్క్ షేక్", price: 100, category: "Milkshakes" },
  { name: "Mango Milkshake", teluguName: "మాంగో మిల్క్ షేక్", price: 90, category: "Milkshakes" },
  { name: "Pista Milkshake", teluguName: "పిస్తా మిల్క్ షేక్", price: 90, category: "Milkshakes" },
  { name: "Vanilla Milkshake", teluguName: "వెనిల్లా మిల్క్ షేక్", price: 80, category: "Milkshakes" },
  { name: "Strawberry Milkshake", teluguName: "స్ట్రాబెర్రీ మిల్క్ షేక్", price: 80, category: "Milkshakes" },
  { name: "Chocolate Milkshake", teluguName: "చాక్లెట్ మిల్క్ షేక్", price: 80, category: "Milkshakes" },
  { name: "Badam Milkshake", teluguName: "బాదం మిల్క్ షేక్", price: 90, category: "Milkshakes" },
  { name: "Butterscotch Milkshake", teluguName: "బటర్ స్కాచ్ మిల్క్ షేక్", price: 90, category: "Milkshakes" },
  { name: "Pineapple Milkshake", teluguName: "పైనాపిల్ మిల్క్ షేక్", price: 80, category: "Milkshakes" },
  { name: "Badam Milk", teluguName: "బాదం మిల్క్", price: 60, category: "Milkshakes" },
  { name: "Lassi", teluguName: "లస్సీ", price: 60, category: "Milkshakes" },
  { name: "Special Lassi", teluguName: "స్పెషల్ లస్సీ", price: 70, category: "Milkshakes" },
  { name: "Water Bottle · 1 Litre", teluguName: "వాటర్ బాటిల్", price: 20, category: "Milkshakes" },
  { name: "Water Bottle · 500 ml", teluguName: "వాటర్ బాటిల్", price: 10, category: "Milkshakes" }
];

export const iceCreamParcel: MenuItem[] = [
  { name: "Vanilla 500 ml", teluguName: "వెనిల్లా", price: 130, category: "Parcels" },
  { name: "Strawberry 500 ml", teluguName: "స్ట్రాబెర్రీ", price: 130, category: "Parcels" },
  { name: "Mango 500 ml", teluguName: "మాంగో", price: 150, category: "Parcels" },
  { name: "Chocolate 500 ml", teluguName: "చాక్లెట్", price: 150, category: "Parcels" },
  { name: "Pista 500 ml", teluguName: "పిస్తా", price: 150, category: "Parcels" },
  { name: "Badam Ice 500 ml", teluguName: "బాదం", price: 150, category: "Parcels" },
  { name: "Butterscotch 500 ml", teluguName: "బటర్ స్కాచ్", price: 150, category: "Parcels" },
  { name: "All Mix 500 ml", teluguName: "ఆల్ మిక్స్ 500 మి.లీ", price: 170, category: "Parcels" },
  { name: "All Mix 250 ml", teluguName: "ఆల్ మిక్స్ 250 మి.లీ", price: 100, category: "Parcels" }
];

export const basanthiParcel: MenuItem[] = [
  { name: "Basanthi", teluguName: "బాసంతి", price: 90, category: "Parcels" },
  { name: "Basanthi 250 ml", teluguName: "బాసంతి 250 మి.లీ", price: 160, category: "Parcels" },
  { name: "Basanthi 500 ml", teluguName: "బాసంతి 500 మి.లీ", price: 320, category: "Parcels" }
];

// Compatibility aliases for components using existing exports
export const manchurian = [...gobiItems, ...mushroomItems, ...paneerItems];
export const milkAndLassi = milkshakes.filter(m => m.price <= 70 || m.name.includes("Water"));

import { prismaClient } from "@/lib";

const data = [
  {
    name: "Traditional Nepali Set",
    description:
      "All sets served with rice, dal, seasonal vegetables, pickle, salad, and papad.",
    items: [
      { name: "Chicken Thali", variants: [{ label: "Standard", price: 500 }] },
      { name: "Mutton Thali", variants: [{ label: "Standard", price: 700 }] },
      { name: "Buff Thali", variants: [{ label: "Standard", price: 550 }] },
      { name: "Veg Thali", variants: [{ label: "Standard", price: 400 }] },
      {
        name: "Gundruk & Dhido Set (Millet/Ragi)",
        variants: [{ label: "Standard", price: 600 }],
      },
      {
        name: "Fish Curry Thali",
        variants: [{ label: "Standard", price: 600 }],
      },
    ],
  },
  {
    name: "Soup & Starters",
    subcategories: [
      {
        name: "Momos",
        items: [
          {
            name: "Chicken Momo",
            variants: [
              { label: "Steam", price: 250 },
              { label: "Fried", price: 280 },
              { label: "Kothey", price: 300 },
            ],
          },
          {
            name: "Buff Momo",
            variants: [
              { label: "Steam", price: 230 },
              { label: "Fried", price: 260 },
              { label: "Kothey", price: 280 },
            ],
          },
          { name: "Veg Momo", variants: [{ label: "Standard", price: 200 }] },
          {
            name: "Jhol Momo (Spicy Broth)",
            variants: [{ label: "Standard", price: 320 }],
          },
          {
            name: "Kothey Momo with Sauce",
            variants: [{ label: "Standard", price: 320 }],
          },
        ],
      },
      {
        name: "Starters",
        items: [
          {
            name: "Chicken Sekuwa (Grilled)",
            variants: [{ label: "Standard", price: 350 }],
          },
          {
            name: "Paneer Chilly",
            variants: [{ label: "Standard", price: 300 }],
          },
          {
            name: "Spring Roll (Veg)",
            variants: [{ label: "Standard", price: 200 }],
          },
          {
            name: "Tandoori Chicken",
            variants: [
              { label: "Half", price: 450 },
              { label: "Full", price: 800 },
            ],
          },
        ],
      },
      {
        name: "Soups",
        items: [
          {
            name: "Tomato Garlic Soup",
            variants: [{ label: "Standard", price: 150 }],
          },
          {
            name: "Thukpa",
            variants: [
              { label: "Veg", price: 220 },
              { label: "Chicken", price: 260 },
              { label: "Buff", price: 280 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Main Course - Nepali & Indian",
    subcategories: [
      {
        name: "Curries",
        description:
          "Classic and comforting curries, perfect with rice or naan.",
        items: [
          {
            name: "Butter Chicken",
            variants: [{ label: "Standard", price: 550 }],
          },
          {
            name: "Chicken Curry Nepali Style",
            variants: [{ label: "Standard", price: 500 }],
          },
          {
            name: "Paneer Butter Masala",
            variants: [{ label: "Standard", price: 450 }],
          },
          {
            name: "Kadai Paneer",
            variants: [{ label: "Standard", price: 450 }],
          },
          {
            name: "Mutton Masala",
            variants: [{ label: "Standard", price: 700 }],
          },
          {
            name: "Aloo Tama (Bamboo Shoots & Potato)",
            variants: [{ label: "Standard", price: 350 }],
          },
          {
            name: "Chana Masala (Vegan)",
            variants: [{ label: "Standard", price: 300 }],
          },
        ],
      },
      {
        name: "Rice & Bread",
        items: [
          { name: "Jeera Rice", variants: [{ label: "Standard", price: 200 }] },
          { name: "Plain Rice", variants: [{ label: "Standard", price: 150 }] },
          { name: "Veg Pulao", variants: [{ label: "Standard", price: 300 }] },
          {
            name: "Tandoori Roti / Naan / Butter Naan",
            variants: [
              { label: "Tandoori Roti", price: 50 },
              { label: "Naan", price: 60 },
              { label: "Butter Naan", price: 70 },
            ],
          },
          { name: "Garlic Naan", variants: [{ label: "Standard", price: 80 }] },
          {
            name: "Paratha (Stuffed)",
            variants: [{ label: "Standard", price: 100 }],
          },
        ],
      },
      {
        name: "Vegetarian Delights",
        items: [
          { name: "Aloo Tama", variants: [{ label: "Standard", price: 350 }] },
          {
            name: "Chana Masala",
            variants: [{ label: "Standard", price: 300 }],
          },
          {
            name: "Kadai Paneer",
            variants: [{ label: "Standard", price: 450 }],
          },
        ],
      },
      {
        name: "Non-Veg Specials",
        items: [
          {
            name: "Mutton Masala",
            variants: [{ label: "Standard", price: 700 }],
          },
          {
            name: "Chicken Curry Nepali Style",
            variants: [{ label: "Standard", price: 500 }],
          },
        ],
      },
    ],
  },
  {
    name: "Asian Delights",
    subcategories: [
      {
        name: "Noodles",
        items: [
          {
            name: "Chowmein",
            variants: [
              { label: "Veg", price: 220 },
              { label: "Chicken", price: 280 },
            ],
          },
          {
            name: "Buff Chowmein",
            variants: [{ label: "Standard", price: 260 }],
          },
          {
            name: "Schezwan Noodles",
            variants: [{ label: "Standard", price: 320 }],
          },
        ],
      },
      {
        name: "Fried Rice",
        items: [
          {
            name: "Fried Rice",
            variants: [
              { label: "Veg", price: 250 },
              { label: "Chicken", price: 300 },
              { label: "Buff", price: 320 },
            ],
          },
        ],
      },
      {
        name: "Pan-Asian Fusion",
        items: [
          {
            name: "Spring Roll (Veg)",
            variants: [{ label: "Standard", price: 200 }],
          },
          {
            name: "Kothey Momo with Sauce",
            variants: [{ label: "Standard", price: 320 }],
          },
        ],
      },
    ],
  },
  {
    name: "Salads & Sides",
    items: [
      { name: "Cucumber Salad", variants: [{ label: "Standard", price: 150 }] },
      {
        name: "Aloo Sadeko (Spiced Potato Salad)",
        variants: [{ label: "Standard", price: 200 }],
      },
      { name: "Chicken Sadeko", variants: [{ label: "Standard", price: 280 }] },
      {
        name: "Papad",
        variants: [
          { label: "Roasted", price: 50 },
          { label: "Fried", price: 50 },
        ],
      },
      { name: "Green Salad", variants: [{ label: "Standard", price: 180 }] },
    ],
  },
  {
    name: "International Corner",
    subcategories: [
      {
        name: "Burgers & Sandwiches",
        items: [
          {
            name: "Burger with Fries",
            variants: [
              { label: "Veg", price: 300 },
              { label: "Chicken", price: 350 },
            ],
          },
          {
            name: "Club Sandwich",
            variants: [{ label: "Standard", price: 300 }],
          },
        ],
      },
      {
        name: "Pizza & Pasta",
        items: [
          {
            name: "Pizza",
            variants: [
              { label: "Margherita", price: 500 },
              { label: "Chicken", price: 600 },
              { label: "Paneer", price: 550 },
            ],
          },
          {
            name: "Pasta",
            variants: [
              { label: "Alfredo", price: 400 },
              { label: "Arrabiata", price: 450 },
              { label: "Chicken", price: 500 },
            ],
          },
        ],
      },
      {
        name: "Sides",
        items: [
          {
            name: "French Fries",
            variants: [{ label: "Standard", price: 150 }],
          },
        ],
      },
    ],
  },
  {
    name: "Desserts",
    items: [
      {
        name: "Sel Roti with Yogurt",
        variants: [{ label: "Standard", price: 150 }],
      },
      {
        name: "Gulab Jamun (2 pcs)",
        variants: [{ label: "Standard", price: 120 }],
      },
      {
        name: "Kheer (Rice Pudding)",
        variants: [{ label: "Standard", price: 180 }],
      },
      {
        name: "Ice Cream",
        variants: [
          { label: "Vanilla", price: 150 },
          { label: "Chocolate", price: 150 },
          { label: "Strawberry", price: 150 },
        ],
      },
      {
        name: "Chocolate Brownie with Ice Cream",
        variants: [{ label: "Standard", price: 300 }],
      },
    ],
  },
  {
    name: "Drinks",
    subcategories: [
      {
        name: "Hot Beverages",
        items: [
          { name: "Masala Tea", variants: [{ label: "Standard", price: 50 }] },
          { name: "Milk Tea", variants: [{ label: "Standard", price: 40 }] },
          { name: "Black Tea", variants: [{ label: "Standard", price: 30 }] },
          { name: "Hot Coffee", variants: [{ label: "Standard", price: 120 }] },
        ],
      },
      {
        name: "Cold Beverages",
        items: [
          {
            name: "Cold Coffee",
            variants: [{ label: "Standard", price: 150 }],
          },
          {
            name: "Lassi",
            variants: [
              { label: "Sweet", price: 120 },
              { label: "Salted", price: 120 },
              { label: "Mango", price: 150 },
            ],
          },
          {
            name: "Fresh Juice (Seasonal)",
            variants: [{ label: "Standard", price: 200 }],
          },
        ],
      },
      {
        name: "Soft Drinks",
        items: [
          { name: "Soft Drinks", variants: [{ label: "Standard", price: 60 }] },
          {
            name: "Bottled Water (1L)",
            variants: [{ label: "Standard", price: 30 }],
          },
        ],
      },
    ],
  },
];

export const seedCategories = async () => {
  for (const item of data) {
    const category = await prismaClient.category.create({
      data: {
        name: item.name,
        description: item.description,
      },
    });

    if (item.subcategories) {
      for (const itemSubCategory of item.subcategories) {
        await prismaClient.category.create({
          data: {
            name: itemSubCategory.name,
            description: itemSubCategory.description,
            parentId: category.id,
          },
        });
      }
    }
  }
};

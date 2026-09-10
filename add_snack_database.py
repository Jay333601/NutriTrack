from pathlib import Path

path = Path("src/NutritionTracker.jsx")
text = path.read_text()

if "const MORE_SNACK_FOODS" in text:
    print("⚠️ Snack database already exists. Nothing added.")
    raise SystemExit(0)

marker = "const FOOD_DB_COMPLETE = [...FOOD_DB, ...MORE_INDIAN_FOODS];"

if marker not in text:
    raise SystemExit("Could not find FOOD_DB_COMPLETE.")

snack_data = r"""
const MORE_SNACK_FOODS = [
  // Biscuits & cookies
  { name: 'Marie biscuit', kcal: 450, protein: 7, carbs: 74, fat: 14, fiber: 2, sodium: 450 },
  { name: 'Glucose biscuit', kcal: 460, protein: 6, carbs: 72, fat: 17, fiber: 2, sodium: 400 },
  { name: 'Digestive biscuit', kcal: 480, protein: 7, carbs: 65, fat: 22, fiber: 7, sodium: 450 },
  { name: 'Cream biscuit', kcal: 500, protein: 5, carbs: 69, fat: 23, fiber: 2, sodium: 300 },
  { name: 'Chocolate biscuit', kcal: 495, protein: 6, carbs: 68, fat: 23, fiber: 3, sodium: 330 },
  { name: 'Chocolate chip cookie', kcal: 490, protein: 6, carbs: 65, fat: 24, fiber: 3, sodium: 350 },
  { name: 'Oat cookie', kcal: 450, protein: 7, carbs: 64, fat: 18, fiber: 5, sodium: 300 },
  { name: 'Butter cookies', kcal: 520, protein: 6, carbs: 61, fat: 28, fiber: 2, sodium: 300 },

  // Chips & crisps
  { name: 'Potato chips', kcal: 536, protein: 7, carbs: 53, fat: 35, fiber: 4, sodium: 530 },
  { name: 'Masala potato chips', kcal: 540, protein: 7, carbs: 53, fat: 36, fiber: 4, sodium: 650 },
  { name: 'Salted potato chips', kcal: 536, protein: 7, carbs: 53, fat: 35, fiber: 4, sodium: 530 },
  { name: 'Tortilla chips', kcal: 500, protein: 7, carbs: 63, fat: 25, fiber: 5, sodium: 420 },
  { name: 'Nachos', kcal: 500, protein: 7, carbs: 63, fat: 25, fiber: 5, sodium: 500 },
  { name: 'Banana chips', kcal: 520, protein: 2, carbs: 58, fat: 31, fiber: 7, sodium: 250 },
  { name: 'Corn chips', kcal: 500, protein: 7, carbs: 63, fat: 25, fiber: 5, sodium: 450 },

  // Indian namkeen
  { name: 'Aloo bhujia', kcal: 560, protein: 10, carbs: 48, fat: 37, fiber: 5, sodium: 850 },
  { name: 'Bikaneri bhujia', kcal: 570, protein: 10, carbs: 46, fat: 39, fiber: 5, sodium: 800 },
  { name: 'Mixture namkeen', kcal: 540, protein: 9, carbs: 50, fat: 34, fiber: 5, sodium: 700 },
  { name: 'Sev', kcal: 570, protein: 11, carbs: 45, fat: 39, fiber: 4, sodium: 800 },
  { name: 'Chivda', kcal: 450, protein: 9, carbs: 56, fat: 22, fiber: 5, sodium: 350 },
  { name: 'Corn flakes mixture', kcal: 460, protein: 8, carbs: 61, fat: 20, fiber: 4, sodium: 500 },
  { name: 'Peanut mixture', kcal: 550, protein: 17, carbs: 35, fat: 38, fiber: 7, sodium: 650 },
  { name: 'Masala peanuts', kcal: 590, protein: 25, carbs: 18, fat: 49, fiber: 8, sodium: 350 },
  { name: 'Salted peanuts', kcal: 585, protein: 25, carbs: 16, fat: 49, fiber: 8, sodium: 350 },
  { name: 'Namak para', kcal: 500, protein: 8, carbs: 58, fat: 27, fiber: 2, sodium: 400 },
  { name: 'Mathri', kcal: 480, protein: 8, carbs: 54, fat: 26, fiber: 3, sodium: 380 },
  { name: 'Murukku', kcal: 500, protein: 7, carbs: 55, fat: 28, fiber: 2, sodium: 350 },

  // Indian street-food snacks
  { name: 'Pakora / Pakoda', kcal: 280, protein: 6, carbs: 30, fat: 15, fiber: 3, sodium: 400 },
  { name: 'Onion pakora', kcal: 290, protein: 5, carbs: 32, fat: 15, fiber: 3, sodium: 420 },
  { name: 'Bread pakora', kcal: 300, protein: 7, carbs: 32, fat: 16, fiber: 2, sodium: 500 },
  { name: 'Aloo tikki', kcal: 210, protein: 4, carbs: 30, fat: 8, fiber: 3, sodium: 350 },
  { name: 'Aloo chaat', kcal: 140, protein: 3, carbs: 23, fat: 4, fiber: 3, sodium: 300 },
  { name: 'Samosa chaat', kcal: 220, protein: 5, carbs: 29, fat: 9, fiber: 4, sodium: 450 },
  { name: 'Kachori', kcal: 350, protein: 7, carbs: 38, fat: 19, fiber: 4, sodium: 420 },
  { name: 'Dahi puri', kcal: 180, protein: 5, carbs: 27, fat: 6, fiber: 2, sodium: 380 },
  { name: 'Pani puri', kcal: 140, protein: 3, carbs: 25, fat: 3, fiber: 2, sodium: 500 },
  { name: 'Sev puri', kcal: 190, protein: 4, carbs: 27, fat: 7, fiber: 3, sodium: 450 },
  { name: 'Dabeli', kcal: 220, protein: 5, carbs: 34, fat: 7, fiber: 3, sodium: 420 },
  { name: 'Vada pav', kcal: 290, protein: 7, carbs: 38, fat: 12, fiber: 4, sodium: 500 },
  { name: 'Frankie / vegetable roll', kcal: 210, protein: 6, carbs: 29, fat: 8, fiber: 3, sodium: 450 },
  { name: 'Paneer roll', kcal: 240, protein: 10, carbs: 25, fat: 11, fiber: 3, sodium: 450 },
  { name: 'Egg roll', kcal: 230, protein: 11, carbs: 25, fat: 10, fiber: 2, sodium: 430 },
  { name: 'Momos, steamed', kcal: 170, protein: 7, carbs: 25, fat: 4, fiber: 1, sodium: 420 },
  { name: 'Momos, fried', kcal: 230, protein: 7, carbs: 25, fat: 11, fiber: 1, sodium: 450 },
  { name: 'Spring roll, vegetable', kcal: 200, protein: 4, carbs: 25, fat: 9, fiber: 2, sodium: 500 },
  { name: 'Vegetable cutlet', kcal: 220, protein: 4, carbs: 27, fat: 10, fiber: 3, sodium: 380 },
  { name: 'Corn chaat', kcal: 120, protein: 4, carbs: 22, fat: 2, fiber: 3, sodium: 180 },
  { name: 'Masala corn', kcal: 125, protein: 4, carbs: 22, fat: 3, fiber: 3, sodium: 220 },

  // Chocolate
  { name: 'Milk chocolate', kcal: 535, protein: 7.7, carbs: 59, fat: 30, fiber: 3.4, sodium: 79 },
  { name: 'Dark chocolate', kcal: 546, protein: 7.8, carbs: 46, fat: 31, fiber: 11, sodium: 20 },
  { name: 'White chocolate', kcal: 539, protein: 6, carbs: 59, fat: 32, fiber: 0, sodium: 86 },
  { name: 'Chocolate with nuts', kcal: 550, protein: 9, carbs: 52, fat: 34, fiber: 4, sodium: 90 },
  { name: 'Chocolate wafer', kcal: 520, protein: 6, carbs: 65, fat: 27, fiber: 2, sodium: 180 },

  // Other common snack foods
  { name: 'Popcorn, salted', kcal: 450, protein: 9, carbs: 58, fat: 20, fiber: 10, sodium: 500 },
  { name: 'Popcorn, cheese', kcal: 500, protein: 9, carbs: 55, fat: 26, fiber: 8, sodium: 700 },
  { name: 'Granola bar', kcal: 430, protein: 8, carbs: 65, fat: 15, fiber: 6, sodium: 220 },
  { name: 'Energy bar', kcal: 400, protein: 12, carbs: 50, fat: 16, fiber: 6, sodium: 180 },
  { name: 'Peanut butter', kcal: 588, protein: 25, carbs: 20, fat: 50, fiber: 6, sodium: 450 },
  { name: 'Trail mix', kcal: 500, protein: 14, carbs: 35, fat: 35, fiber: 7, sodium: 180 },

  // Indian sweets
  { name: 'Gulab jamun', kcal: 300, protein: 5, carbs: 45, fat: 11, fiber: 1, sodium: 100 },
  { name: 'Rasgulla', kcal: 180, protein: 4, carbs: 30, fat: 5, fiber: 0, sodium: 60 },
  { name: 'Jalebi', kcal: 400, protein: 2, carbs: 70, fat: 12, fiber: 1, sodium: 30 },
  { name: 'Kaju katli', kcal: 490, protein: 9, carbs: 55, fat: 27, fiber: 3, sodium: 20 },
  { name: 'Laddu', kcal: 450, protein: 8, carbs: 55, fat: 22, fiber: 3, sodium: 100 },
  { name: 'Mysore pak', kcal: 500, protein: 5, carbs: 45, fat: 34, fiber: 1, sodium: 100 },
  { name: 'Barfi', kcal: 400, protein: 8, carbs: 50, fat: 19, fiber: 1, sodium: 80 },
  { name: 'Soan papdi', kcal: 450, protein: 7, carbs: 60, fat: 20, fiber: 1, sodium: 60 },
];
"""

text = text.replace(marker, snack_data + "\n" + marker, 1)

text = text.replace(
    "const FOOD_DB_COMPLETE = [...FOOD_DB, ...MORE_INDIAN_FOODS];",
    "const FOOD_DB_COMPLETE = [...FOOD_DB, ...MORE_INDIAN_FOODS, ...MORE_SNACK_FOODS];",
    1
)

path.write_text(text)

print("✅ Snack database added.")
print("✅ Biscuits and cookies")
print("✅ Chips and crisps")
print("✅ Indian namkeen")
print("✅ Indian street-food snacks")
print("✅ Chocolates")
print("✅ Indian sweets")
print("✅ Packaged/common snacks")

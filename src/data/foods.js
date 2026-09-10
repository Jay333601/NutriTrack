/* Nutrition database extracted from the working tracker. */

const FOOD_DB = [

  { name: 'White rice, cooked', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sodium: 1 },
  { name: 'Brown rice, cooked', kcal: 123, protein: 2.7, carbs: 26, fat: 1, fiber: 1.6, sodium: 4 },
  { name: 'Roti / chapati', kcal: 297, protein: 11, carbs: 58, fat: 4, fiber: 10, sodium: 600 },
  { name: 'Naan', kcal: 310, protein: 9, carbs: 50, fat: 8, fiber: 2, sodium: 500 },
  { name: 'Toor dal, cooked', kcal: 116, protein: 7, carbs: 20, fat: 0.4, fiber: 5, sodium: 2 },
  { name: 'Lentils, cooked', kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, sodium: 2 },
  { name: 'Chickpeas, cooked', kcal: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, sodium: 7 },
  { name: 'Black beans, cooked', kcal: 132, protein: 8.9, carbs: 24, fat: 0.5, fiber: 8.7, sodium: 2 },
  { name: 'Paneer', kcal: 265, protein: 18, carbs: 1.2, fat: 21, fiber: 0, sodium: 18 },
  { name: 'Tofu', kcal: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, sodium: 7 },
  { name: 'Idli', kcal: 132, protein: 4, carbs: 26, fat: 0.3, fiber: 1.3, sodium: 300 },
  { name: 'Dosa, plain', kcal: 168, protein: 3.9, carbs: 28, fat: 4, fiber: 1.3, sodium: 300 },
  { name: 'Sambar', kcal: 65, protein: 3, carbs: 10, fat: 1.5, fiber: 2, sodium: 400 },
  { name: 'Rasam', kcal: 40, protein: 1.5, carbs: 7, fat: 0.8, fiber: 1, sodium: 400 },
  { name: 'Upma', kcal: 143, protein: 3.5, carbs: 18, fat: 6, fiber: 1.5, sodium: 300 },
  { name: 'Poha', kcal: 130, protein: 2.5, carbs: 24, fat: 2.5, fiber: 1, sodium: 250 },
  { name: 'Curd rice', kcal: 150, protein: 3.5, carbs: 25, fat: 3, fiber: 0.5, sodium: 150 },
  { name: 'Biryani, chicken', kcal: 200, protein: 10, carbs: 22, fat: 8, fiber: 1.5, sodium: 450 },
  { name: 'Butter chicken', kcal: 210, protein: 14, carbs: 6, fat: 14, fiber: 1, sodium: 500 },
  { name: 'Chicken curry', kcal: 190, protein: 15, carbs: 6, fat: 12, fiber: 1, sodium: 400 },
  { name: 'Mutton curry', kcal: 250, protein: 20, carbs: 5, fat: 17, fiber: 1, sodium: 350 },
  { name: 'Fish curry', kcal: 150, protein: 18, carbs: 4, fat: 7, fiber: 1, sodium: 300 },
  { name: 'Samosa', kcal: 262, protein: 4, carbs: 24, fat: 17, fiber: 2, sodium: 350 },
  { name: 'Vada', kcal: 245, protein: 6, carbs: 27, fat: 12, fiber: 3, sodium: 400 },
  { name: 'Curd / yogurt, plain', kcal: 61, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0, sodium: 50 },
  { name: 'Milk, whole', kcal: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, sodium: 44 },
  { name: 'Egg, boiled', kcal: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, sodium: 124 },
  { name: 'Chicken breast, cooked', kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sodium: 74 },
  { name: 'Salmon, cooked', kcal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sodium: 59 },
  { name: 'Shrimp, cooked', kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, sodium: 111 },
  { name: 'Beef, lean, cooked', kcal: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, sodium: 72 },
  { name: 'Banana', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sodium: 1 },
  { name: 'Apple', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sodium: 1 },
  { name: 'Mango', kcal: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, sodium: 1 },
  { name: 'Orange', kcal: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, sodium: 0 },
  { name: 'Grapes', kcal: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9, sodium: 2 },
  { name: 'Papaya', kcal: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, sodium: 3 },
  { name: 'Potato, boiled', kcal: 87, protein: 1.9, carbs: 20, fat: 0.1, fiber: 1.8, sodium: 5 },
  { name: 'Sweet potato, boiled', kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, sodium: 6 },
  { name: 'Tomato', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sodium: 5 },
  { name: 'Onion', kcal: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, sodium: 4 },
  { name: 'Spinach, cooked', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sodium: 70 },
  { name: 'Cauliflower, cooked', kcal: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2.4, sodium: 15 },
  { name: 'Cucumber', kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, sodium: 2 },
  { name: 'Carrot', kcal: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, sodium: 69 },
  { name: 'Almonds', kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5, sodium: 1 },
  { name: 'Peanuts', kcal: 567, protein: 26, carbs: 16, fat: 49, fiber: 8.5, sodium: 18 },
  { name: 'Cashews', kcal: 553, protein: 18, carbs: 30, fat: 44, fiber: 3.3, sodium: 12 },
  { name: 'Walnuts', kcal: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7, sodium: 2 },
  { name: 'Oats, dry', kcal: 389, protein: 17, carbs: 66, fat: 7, fiber: 10.6, sodium: 2 },
  { name: 'Wheat flour (atta)', kcal: 340, protein: 12, carbs: 72, fat: 1.7, fiber: 11, sodium: 2 },
  { name: 'Bread, white', kcal: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7, sodium: 491 },
  { name: 'Bread, whole wheat', kcal: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7, sodium: 400 },
  { name: 'Butter', kcal: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, sodium: 11 },
  { name: 'Ghee', kcal: 900, protein: 0, carbs: 0, fat: 100, fiber: 0, sodium: 0 },
  { name: 'Olive oil', kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, sodium: 2 },
  { name: 'Sugar', kcal: 387, protein: 0, carbs: 100, fat: 0, fiber: 0, sodium: 1 },
  { name: 'Honey', kcal: 304, protein: 0.3, carbs: 82, fat: 0, fiber: 0.2, sodium: 4 },
  { name: 'Pasta, cooked', kcal: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8, sodium: 1 },
  { name: 'Pizza, cheese', kcal: 266, protein: 11, carbs: 33, fat: 10, fiber: 2.3, sodium: 598 },
  { name: 'French fries', kcal: 312, protein: 3.4, carbs: 41, fat: 15, fiber: 3.8, sodium: 210 },
  { name: 'Cheddar cheese', kcal: 402, protein: 25, carbs: 1.3, fat: 33, fiber: 0, sodium: 621 },
  { name: 'Popcorn, air-popped', kcal: 387, protein: 13, carbs: 78, fat: 4.5, fiber: 15, sodium: 8 },
  { name: 'Dark chocolate', kcal: 546, protein: 7.8, carbs: 46, fat: 31, fiber: 11, sodium: 20 },
  { name: 'Milk chocolate', kcal: 535, protein: 7.7, carbs: 59, fat: 30, fiber: 3.4, sodium: 79 },
  { name: 'Cola', kcal: 42, protein: 0, carbs: 10.6, fat: 0, fiber: 0, sodium: 4 },
  { name: 'Orange juice', kcal: 45, protein: 0.7, carbs: 10.4, fat: 0.2, fiber: 0.2, sodium: 1 },
  { name: 'Green tea, unsweetened', kcal: 1, protein: 0, carbs: 0.2, fat: 0, fiber: 0, sodium: 1 },
  { name: 'Black coffee', kcal: 2, protein: 0.1, carbs: 0, fat: 0, fiber: 0, sodium: 2 },
];

const MORE_INDIAN_FOODS = [

  { name: 'Rajma, cooked', kcal: 127, protein: 8.7, carbs: 22.8, fat: 0.5, fiber: 6.4, sodium: 2 },
  { name: 'Moong dal, cooked', kcal: 105, protein: 7.0, carbs: 19.2, fat: 0.4, fiber: 7.6, sodium: 2 },
  { name: 'Masoor dal, cooked', kcal: 116, protein: 9.0, carbs: 20.1, fat: 0.4, fiber: 7.9, sodium: 2 },
  { name: 'Chana dal, cooked', kcal: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fiber: 7.6, sodium: 7 },
  { name: 'Urad dal, cooked', kcal: 116, protein: 7.6, carbs: 20.0, fat: 0.4, fiber: 6.4, sodium: 2 },

  { name: 'Khichdi', kcal: 120, protein: 4.5, carbs: 20, fat: 2.5, fiber: 2.5, sodium: 180 },
  { name: 'Vegetable khichdi', kcal: 118, protein: 4.2, carbs: 19, fat: 2.8, fiber: 3, sodium: 190 },
  { name: 'Moong dal khichdi', kcal: 112, protein: 5, carbs: 18, fat: 2.2, fiber: 3, sodium: 150 },

  { name: 'Paratha, plain', kcal: 320, protein: 8, carbs: 46, fat: 12, fiber: 5, sodium: 400 },
  { name: 'Aloo paratha', kcal: 250, protein: 6, carbs: 35, fat: 10, fiber: 4, sodium: 400 },
  { name: 'Paneer paratha', kcal: 280, protein: 10, carbs: 34, fat: 11, fiber: 4, sodium: 420 },
  { name: 'Thepla', kcal: 270, protein: 8, carbs: 43, fat: 8, fiber: 5, sodium: 380 },
  { name: 'Puri', kcal: 330, protein: 6, carbs: 46, fat: 14, fiber: 3, sodium: 300 },

  { name: 'Pav bhaji', kcal: 150, protein: 4, carbs: 20, fat: 6, fiber: 4, sodium: 500 },
  { name: 'Misal pav', kcal: 175, protein: 7, carbs: 24, fat: 6, fiber: 5, sodium: 550 },
  { name: 'Chole', kcal: 150, protein: 7.5, carbs: 21, fat: 4, fiber: 6, sodium: 350 },
  { name: 'Chole bhature', kcal: 250, protein: 7, carbs: 34, fat: 9, fiber: 4, sodium: 500 },
  { name: 'Dal makhani', kcal: 170, protein: 7, carbs: 18, fat: 7, fiber: 5, sodium: 420 },

  { name: 'Palak paneer', kcal: 150, protein: 8, carbs: 6, fat: 10, fiber: 2.5, sodium: 300 },
  { name: 'Shahi paneer', kcal: 220, protein: 9, carbs: 10, fat: 16, fiber: 1, sodium: 350 },
  { name: 'Matar paneer', kcal: 160, protein: 8, carbs: 9, fat: 10, fiber: 3, sodium: 300 },
  { name: 'Paneer tikka', kcal: 180, protein: 15, carbs: 5, fat: 11, fiber: 1.5, sodium: 320 },
  { name: 'Tandoori chicken', kcal: 190, protein: 26, carbs: 5, fat: 7, fiber: 1, sodium: 380 },

  { name: 'Chicken tikka', kcal: 175, protein: 27, carbs: 4, fat: 6, fiber: 0.5, sodium: 350 },
  { name: 'Chicken biryani', kcal: 200, protein: 10, carbs: 22, fat: 8, fiber: 1.5, sodium: 450 },
  { name: 'Egg curry', kcal: 145, protein: 9, carbs: 5, fat: 10, fiber: 1.5, sodium: 300 },
  { name: 'Keema curry', kcal: 230, protein: 19, carbs: 6, fat: 15, fiber: 1, sodium: 360 },
  { name: 'Fish fry', kcal: 220, protein: 22, carbs: 8, fat: 11, fiber: 1, sodium: 350 },

  { name: 'Pesarattu', kcal: 145, protein: 7, carbs: 23, fat: 3, fiber: 4, sodium: 220 },
  { name: 'Appam', kcal: 150, protein: 2.5, carbs: 28, fat: 2.5, fiber: 1, sodium: 120 },
  { name: 'Uttapam', kcal: 160, protein: 4, carbs: 27, fat: 4, fiber: 2, sodium: 280 },
  { name: 'Medu vada', kcal: 245, protein: 6, carbs: 27, fat: 12, fiber: 3, sodium: 400 },
  { name: 'Pongal', kcal: 160, protein: 5, carbs: 25, fat: 4.5, fiber: 2, sodium: 220 },

  { name: 'Lemon rice', kcal: 175, protein: 3, carbs: 29, fat: 5.5, fiber: 2, sodium: 250 },
  { name: 'Tomato rice', kcal: 160, protein: 3, carbs: 27, fat: 4.5, fiber: 2, sodium: 240 },
  { name: 'Vegetable pulao', kcal: 150, protein: 3.5, carbs: 27, fat: 3.5, fiber: 2, sodium: 220 },
  { name: 'Jeera rice', kcal: 150, protein: 3, carbs: 28, fat: 2.5, fiber: 1, sodium: 120 },
  { name: 'Dal tadka', kcal: 135, protein: 7, carbs: 18, fat: 4, fiber: 5, sodium: 350 },

  { name: 'Mixed vegetable sabzi', kcal: 90, protein: 3, carbs: 11, fat: 4, fiber: 3.5, sodium: 220 },
  { name: 'Bhindi masala', kcal: 105, protein: 2.5, carbs: 10, fat: 6, fiber: 4, sodium: 230 },
  { name: 'Baingan bharta', kcal: 95, protein: 2, carbs: 9, fat: 5, fiber: 3.5, sodium: 240 },
  { name: 'Aloo gobi', kcal: 110, protein: 3, carbs: 14, fat: 4.5, fiber: 3, sodium: 220 },
  { name: 'Palak dal', kcal: 125, protein: 7, carbs: 17, fat: 3, fiber: 5, sodium: 230 },

  { name: 'Raita', kcal: 70, protein: 3.5, carbs: 5, fat: 3, fiber: 0.5, sodium: 100 },
  { name: 'Lassi, plain', kcal: 70, protein: 3.5, carbs: 7, fat: 3, fiber: 0, sodium: 45 },
  { name: 'Buttermilk', kcal: 40, protein: 2, carbs: 4, fat: 1.5, fiber: 0, sodium: 60 },

  { name: 'Sprouts chaat', kcal: 120, protein: 7, carbs: 18, fat: 2, fiber: 5, sodium: 180 },
  { name: 'Bhel puri', kcal: 150, protein: 4, carbs: 27, fat: 3, fiber: 3, sodium: 400 },
  { name: 'Fruit chaat', kcal: 65, protein: 1, carbs: 15, fat: 0.2, fiber: 2.5, sodium: 15 },

  { name: 'Besan chilla', kcal: 170, protein: 8, carbs: 22, fat: 5, fiber: 4, sodium: 260 },
  { name: 'Moong dal chilla', kcal: 145, protein: 8, carbs: 21, fat: 3, fiber: 4, sodium: 220 },
  { name: 'Paneer bhurji', kcal: 190, protein: 14, carbs: 6, fat: 12, fiber: 1.5, sodium: 280 },
  { name: 'Oats upma', kcal: 150, protein: 5, carbs: 22, fat: 4, fiber: 4, sodium: 230 },
];

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
  ,
  ,
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
  { name: 'Masala Puri', kcal: 190, protein: 5, carbs: 29, fat: 6, fiber: 4, sodium: 400 },
];


const CATEGORY_RULES = [
  ['Biscuits & Cookies', ['biscuit', 'cookie']],
  ['Chocolate', ['chocolate']],
  ['Chips & Crisps', ['potato chips', 'tortilla chips', 'nachos', 'corn chips', 'banana chips']],
  ['Indian Sweets', ['gulab jamun', 'rasgulla', 'jalebi', 'kaju katli', 'laddu', 'mysore pak', 'barfi', 'soan papdi']],
  ['Indian Snacks', [
    'samosa', 'pakora', 'pakoda', 'tikki', 'kachori', 'pani puri',
    'sev puri', 'dahi puri', 'bhel puri', 'dabeli', 'vada pav',
    'frankie', 'momos', 'spring roll', 'cutlet', 'corn chaat',
    'peanut chaat', 'makhana', 'namak para', 'mathri', 'murukku',
    'chivda', 'bhujia', 'namkeen', 'sev', 'masala puri'
  ]],
  ['Breakfast', [
    'idli', 'dosa', 'upma', 'poha', 'uttapam', 'pesarattu',
    'pongal', 'paratha', 'thepla', 'chilla', 'omelette',
    'oats'
  ]],
  ['Indian Rice', ['rice', 'biryani', 'pulao', 'khichdi']],
  ['Indian Dal & Legumes', [
    'dal', 'rajma', 'chickpeas', 'chole', 'lentils',
    'black beans', 'sprouts'
  ]],
  ['Indian Non-Veg', [
    'chicken', 'mutton', 'fish', 'egg', 'shrimp',
    'beef', 'salmon', 'keema'
  ]],
  ['Dairy', [
    'paneer', 'tofu', 'curd', 'yogurt', 'milk',
    'cheese', 'butter', 'ghee', 'lassi',
    'buttermilk', 'raita'
  ]],
  ['Fruits', [
    'banana', 'apple', 'mango', 'orange',
    'grapes', 'papaya'
  ]],
  ['Vegetables', [
    'tomato', 'onion', 'spinach', 'cauliflower',
    'cucumber', 'carrot', 'potato', 'sweet potato',
    'bhindi', 'baingan', 'gobi', 'sabzi', 'palak'
  ]],
  ['Nuts & Seeds', [
    'almonds', 'peanuts', 'cashews', 'walnuts',
    'peanut butter'
  ]],
  ['Drinks', [
    'cola', 'juice', 'tea', 'coffee',
    'buttermilk', 'lassi'
  ]],
]

export function getFoodCategory(foodName) {
  const name = foodName.toLowerCase()

  for (const [category, keywords] of CATEGORY_RULES) {
    if (keywords.some((keyword) => name.includes(keyword))) {
      return category
    }
  }

  if (
    name.includes('pasta') ||
    name.includes('pizza') ||
    name.includes('bread') ||
    name.includes('french fries') ||
    name.includes('popcorn') ||
    name.includes('granola') ||
    name.includes('energy bar') ||
    name.includes('trail mix')
  ) {
    return 'International'
  }

  return 'Other'
}

export const FOOD_CATEGORIES = [
  'All',
  'Breakfast',
  'Indian Rice',
  'Indian Dal & Legumes',
  'Indian Non-Veg',
  'Indian Snacks',
  'Indian Sweets',
  'Biscuits & Cookies',
  'Chips & Crisps',
  'Chocolate',
  'Dairy',
  'Fruits',
  'Vegetables',
  'Nuts & Seeds',
  'Drinks',
  'International',
  'Other',
]

export const FOOD_DB_COMPLETE = [
  ...FOOD_DB,
  ...MORE_INDIAN_FOODS,
  ...MORE_SNACK_FOODS,
];

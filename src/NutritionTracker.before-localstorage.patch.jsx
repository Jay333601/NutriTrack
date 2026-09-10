import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Per 100g values: kcal, protein(g), carbs(g), fat(g), fiber(g), sodium(mg)
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

const FOOD_DB_COMPLETE = [...FOOD_DB, ...MORE_INDIAN_FOODS];

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const HEALTHY_RECIPES = [
  {
    id: 1,
    name: 'Moong Dal Chilla',
    category: 'High Protein',
    time: '20 min',
    protein: 12,
    kcal: 210,
    description: 'Protein-rich savoury pancakes made from soaked moong dal.',
    ingredients: ['1 cup moong dal', '1 small onion', '1 tomato', 'Green chilli', 'Coriander', 'Salt', 'Water', '1 tsp oil'],
    steps: ['Soak moong dal for 3–4 hours.', 'Blend with a little water into a smooth batter.', 'Mix in onion, tomato, chilli and coriander.', 'Heat a pan and spread the batter.', 'Cook both sides with a small amount of oil.']
  },
  {
    id: 2,
    name: 'Paneer Tikka Bowl',
    category: 'High Protein',
    time: '25 min',
    protein: 28,
    kcal: 390,
    description: 'Paneer with colourful vegetables and a light yoghurt marinade.',
    ingredients: ['150g paneer', 'Capsicum', 'Onion', 'Tomato', '100g curd', 'Turmeric', 'Chilli powder', 'Garam masala', 'Lemon'],
    steps: ['Mix curd and spices.', 'Coat paneer and vegetables with the marinade.', 'Rest for 15 minutes.', 'Cook on a pan or grill until lightly browned.', 'Serve with lemon and fresh vegetables.']
  },
  {
    id: 3,
    name: 'Chicken Tikka Rice Bowl',
    category: 'High Protein',
    time: '30 min',
    protein: 36,
    kcal: 470,
    description: 'Lean chicken with rice and vegetables for a balanced meal.',
    ingredients: ['150g chicken breast', '120g cooked rice', 'Capsicum', 'Onion', 'Curd', 'Spices', 'Lemon'],
    steps: ['Marinate chicken in curd, lemon and spices.', 'Cook chicken thoroughly in a pan or oven.', 'Cook vegetables separately.', 'Add cooked rice to a bowl.', 'Top with chicken and vegetables.']
  },
  {
    id: 4,
    name: 'Vegetable Khichdi',
    category: 'Balanced',
    time: '30 min',
    protein: 10,
    kcal: 320,
    description: 'Comforting rice and dal meal with vegetables.',
    ingredients: ['½ cup rice', '½ cup moong dal', 'Carrot', 'Peas', 'Beans', 'Turmeric', 'Cumin', 'Salt'],
    steps: ['Wash rice and dal.', 'Add vegetables and spices.', 'Pressure cook until soft.', 'Mix well and serve warm.']
  },
  {
    id: 5,
    name: 'Sprouts Chaat',
    category: 'Light',
    time: '10 min',
    protein: 9,
    kcal: 190,
    description: 'Fresh sprouts with vegetables, lemon and spices.',
    ingredients: ['1 cup mixed sprouts', 'Tomato', 'Onion', 'Cucumber', 'Coriander', 'Lemon', 'Chaat masala'],
    steps: ['Add sprouts to a bowl.', 'Mix in chopped vegetables.', 'Add lemon juice and spices.', 'Mix and serve.']
  },
  {
    id: 6,
    name: 'Egg Bhurji with Roti',
    category: 'High Protein',
    time: '15 min',
    protein: 24,
    kcal: 380,
    description: 'Simple egg scramble with vegetables served with roti.',
    ingredients: ['3 eggs', 'Onion', 'Tomato', 'Capsicum', '2 rotis', 'Turmeric', 'Pepper'],
    steps: ['Sauté onion, tomato and capsicum.', 'Add beaten eggs.', 'Scramble until fully cooked.', 'Season with turmeric and pepper.', 'Serve with roti.']
  },
  {
    id: 7,
    name: 'Curd Rice with Vegetables',
    category: 'Light',
    time: '15 min',
    protein: 9,
    kcal: 300,
    description: 'Cooling yoghurt rice with vegetables.',
    ingredients: ['150g cooked rice', '150g plain curd', 'Carrot', 'Cucumber', 'Coriander', 'Cumin'],
    steps: ['Let cooked rice cool slightly.', 'Mix with curd.', 'Add chopped vegetables.', 'Add cumin and coriander.']
  },
  {
    id: 8,
    name: 'Besan Chilla',
    category: 'Vegetarian',
    time: '20 min',
    protein: 11,
    kcal: 240,
    description: 'Easy savoury chickpea-flour pancakes.',
    ingredients: ['1 cup besan', 'Onion', 'Tomato', 'Coriander', 'Chilli', 'Water', '1 tsp oil'],
    steps: ['Make a smooth batter with besan and water.', 'Add vegetables and spices.', 'Spread batter on a hot pan.', 'Cook both sides until golden.']
  },
  {
    id: 9,
    name: 'Oats Upma',
    category: 'Balanced',
    time: '15 min',
    protein: 9,
    kcal: 280,
    description: 'A higher-fibre twist on traditional upma.',
    ingredients: ['1 cup oats', 'Carrot', 'Peas', 'Onion', 'Mustard seeds', 'Curry leaves', 'Water'],
    steps: ['Lightly roast oats.', 'Sauté mustard seeds, curry leaves and vegetables.', 'Add water.', 'Add oats and cook until soft.']
  },
  {
    id: 10,
    name: 'Dal Palak',
    category: 'High Fibre',
    time: '25 min',
    protein: 14,
    kcal: 290,
    description: 'Lentils combined with spinach for fibre and protein.',
    ingredients: ['1 cup dal', '2 cups spinach', 'Tomato', 'Onion', 'Garlic', 'Turmeric', 'Cumin'],
    steps: ['Cook dal until soft.', 'Cook onion, tomato and spices.', 'Add spinach.', 'Mix in cooked dal.', 'Simmer for a few minutes.']
  }
];


function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function last7Dates() {
  const arr = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    arr.push(d.toISOString().slice(0, 10));
  }
  return arr;
}

export default function NutritionTracker() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [entries, setEntries] = useState([]);
  const [customFoods, setCustomFoods] = useState({});
  const [date, setDate] = useState(todayStr());
  const [meal, setMeal] = useState('Breakfast');
  const [foodInput, setFoodInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [adding, setAdding] = useState(false);

  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeCategory, setRecipeCategory] = useState('All');

  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I’m your Nutrition Assistant. Ask me about calories, protein, Indian foods, or healthy recipes.'
    }
  ]);

  const recipeCategories = useMemo(
    () => ['All', ...new Set(HEALTHY_RECIPES.map((recipe) => recipe.category))],
    []
  );

  const filteredRecipes = useMemo(() => {
    if (recipeCategory === 'All') return HEALTHY_RECIPES;

    return HEALTHY_RECIPES.filter(
      (recipe) => recipe.category === recipeCategory
    );
  }, [recipeCategory]);



  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAll() {
    setLoading(true);
    setError('');
    try {
      const [profilesRes, entriesRes, customRes, selectedRes] = await Promise.allSettled([
        window.storage.get('profiles', true),
        window.storage.get('entries', true),
        window.storage.get('custom-foods', true),
        window.storage.get('selected-profile', false),
      ]);
      const profs = profilesRes.status === 'fulfilled' && profilesRes.value ? JSON.parse(profilesRes.value.value) : [];
      const ents = entriesRes.status === 'fulfilled' && entriesRes.value ? JSON.parse(entriesRes.value.value) : [];
      const custom = customRes.status === 'fulfilled' && customRes.value ? JSON.parse(customRes.value.value) : {};
      const sel = selectedRes.status === 'fulfilled' && selectedRes.value ? selectedRes.value.value : (profs[0] || '');
      setProfiles(profs);
      setEntries(ents);
      setCustomFoods(custom);
      setSelectedProfile(sel);
    } catch (e) {
      setError('Could not load your saved data. Try reloading the page.');
    } finally {
      setLoading(false);
    }
  }

  async function saveProfiles(next) {
    setProfiles(next);
    try {
      await window.storage.set('profiles', JSON.stringify(next), true);
    } catch (e) {
      setError('Could not save the profile list.');
    }
  }

  async function saveEntries(next) {
    setEntries(next);
    try {
      await window.storage.set('entries', JSON.stringify(next), true);
    } catch (e) {
      setError('Could not save that entry. Check your connection and try again.');
    }
  }

  async function saveCustomFoods(next) {
    setCustomFoods(next);
    try {
      await window.storage.set('custom-foods', JSON.stringify(next), true);
    } catch (e) {
      // non-critical, entry still gets added
    }
  }

  async function selectProfile(name) {
    setSelectedProfile(name);
    try {
      await window.storage.set('selected-profile', name, false);
    } catch (e) {
      // non-critical
    }
  }

  async function addProfile() {
    const name = newProfileName.trim();
    if (!name) return;
    if (!profiles.includes(name)) {
      await saveProfiles([...profiles, name]);
    }
    await selectProfile(name);
    setNewProfileName('');
  }

  const allFoodNames = useMemo(() => {
    const dbNames = FOOD_DB_COMPLETE.map((f) => f.name);
    const customNames = Object.keys(customFoods);
    return Array.from(new Set([...dbNames, ...customNames]));
  }, [customFoods]);

  const suggestions = useMemo(() => {
    const q = foodInput.trim().toLowerCase();
    if (!q) return [];
    return allFoodNames.filter((n) => n.toLowerCase().includes(q)).slice(0, 6);
  }, [foodInput, allFoodNames]);

  function findFood(name) {
    const lower = name.trim().toLowerCase();
    const db = FOOD_DB_COMPLETE.find((f) => f.name.toLowerCase() === lower);
    if (db) return db;
    const key = Object.keys(customFoods).find((k) => k.toLowerCase() === lower);
    if (key) return { name: key, ...customFoods[key] };
    return null;
  }

  async function estimateWithAI(name) {
    const prompt = `Give estimated nutrition per 100 grams of "${name}" as typically eaten (cooked/prepared if that's how it's normally consumed). Respond with ONLY a JSON object, no other text, no markdown code fences, in exactly this shape: {"kcal": number, "protein": number, "carbs": number, "fat": number, "fiber": number, "sodium": number}. kcal is calories; protein, carbs, fat, fiber are in grams; sodium is in milligrams. Always give your best realistic estimate even if unsure.`;
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await res.json();
    const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    return {
      kcal: Number(parsed.kcal) || 0,
      protein: Number(parsed.protein) || 0,
      carbs: Number(parsed.carbs) || 0,
      fat: Number(parsed.fat) || 0,
      fiber: Number(parsed.fiber) || 0,
      sodium: Number(parsed.sodium) || 0,
    };
  }


  function nutritionChatReply(message) {
    const q = message.toLowerCase();

    if (q.includes('protein') && (q.includes('high') || q.includes('rich'))) {
      return 'Try Chicken Tikka Rice Bowl, Paneer Tikka Bowl, Egg Bhurji with Roti, Moong Dal Chilla or Dal Palak.';
    }

    if (q.includes('protein')) {
      return 'Protein-rich foods in this app include chicken breast, eggs, paneer, tofu, dal, chickpeas, sprouts and moong dal chilla.';
    }

    if (q.includes('breakfast') || q.includes('morning')) {
      return 'Good breakfast choices include Moong Dal Chilla, Besan Chilla, Oats Upma and Egg Bhurji with Roti.';
    }

    if (q.includes('dinner') || q.includes('night')) {
      return 'For dinner, try Chicken Tikka Rice Bowl, Dal Palak, Vegetable Khichdi or Paneer Tikka Bowl.';
    }

    if (q.includes('vegetarian') || q.includes('veg')) {
      return 'Vegetarian choices include Paneer Tikka Bowl, Moong Dal Chilla, Besan Chilla, Vegetable Khichdi, Dal Palak, Sprouts Chaat and Oats Upma.';
    }

    if (q.includes('indian')) {
      return 'This tracker now includes many Indian foods such as dal, rajma, chole, khichdi, paneer dishes, paratha, poha, dosa, idli, uttapam, pulao, biryani and several vegetable dishes.';
    }

    if (q.includes('recipe') || q.includes('what should i eat') || q.includes('what can i eat')) {
      return 'Open Healthy Recipes and browse High Protein, Balanced, Vegetarian, Light and High Fibre meals.';
    }

    if (q.includes('calorie') || q.includes('calories')) {
      return `Your current ${date} total is ${totals.kcal} kcal with ${totals.protein.toFixed(1)}g protein, ${totals.carbs.toFixed(1)}g carbs and ${totals.fat.toFixed(1)}g fat.`;
    }

    return 'I can help with calories, protein, Indian food ideas, healthy recipes and your current nutrition totals.';
  }

  function sendChatMessage() {
    const message = chatInput.trim();

    if (!message) return;

    const reply = nutritionChatReply(message);

    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text: message },
      { role: 'assistant', text: reply }
    ]);

    setChatInput('');
  }

  async function handleAdd() {
    setError('');
    const name = foodInput.trim();
    const weight = parseFloat(weightInput);
    if (!selectedProfile) {
      setError('Add or pick a profile first.');
      return;
    }
    if (!name) {
      setError('Enter what you ate.');
      return;
    }
    if (!weight || weight <= 0) {
      setError('Enter the net weight in grams.');
      return;
    }

    setAdding(true);
    try {
      let food = findFood(name);
      let usedName = food ? food.name : name;
      if (!food) {
        const est = await estimateWithAI(name);
        food = est;
        usedName = name;
        await saveCustomFoods({ ...customFoods, [name]: est });
      }
      const factor = weight / 100;
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        profile: selectedProfile,
        date,
        meal,
        food: usedName,
        weight,
        kcal: Math.round(food.kcal * factor),
        protein: +(food.protein * factor).toFixed(1),
        carbs: +(food.carbs * factor).toFixed(1),
        fat: +(food.fat * factor).toFixed(1),
        fiber: +(food.fiber * factor).toFixed(1),
        sodium: Math.round(food.sodium * factor),
      };
      await saveEntries([...entries, entry]);
      setFoodInput('');
      setWeightInput('');
      setShowSuggestions(false);
    } catch (e) {
      setError("Could not estimate that food. Try a simpler name, or check your connection.");
    } finally {
      setAdding(false);
    }
  }

  async function deleteEntry(id) {
    await saveEntries(entries.filter((e) => e.id !== id));
  }

  async function clearMyEntries() {
    if (!window.confirm(`Delete every logged entry for ${selectedProfile}? This can't be undone.`)) return;
    await saveEntries(entries.filter((e) => e.profile !== selectedProfile));
  }

  const todaysEntries = entries.filter((e) => e.profile === selectedProfile && e.date === date);
  const totals = todaysEntries.reduce(
    (acc, e) => ({
      kcal: acc.kcal + e.kcal,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const groupedMeals = MEALS.map((m) => ({ meal: m, items: todaysEntries.filter((e) => e.meal === m) }));

  const weeklyData = last7Dates().map((d) => {
    const kcal = entries
      .filter((e) => e.profile === selectedProfile && e.date === d)
      .reduce((s, e) => s + e.kcal, 0);
    const label = new Date(d + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short' });
    return { date: d, label, kcal };
  });

  return (
    <div className="nutri-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&display=swap');

        .nutri-app {
          --bg: #EDEFEA;
          --surface: #FFFFFF;
          --border: #D9DED2;
          --text: #1C2B22;
          --text-muted: #707B70;
          --accent: #E8823C;
          --accent-soft: #FBE4CF;
          --herb: #4B7B6D;
          --herb-soft: #DCEAE3;
          --berry: #A6425B;
          font-family: 'Public Sans', system-ui, -apple-system, sans-serif;
          color: var(--text);
          background: var(--bg);
          min-height: 100vh;
          padding: 24px 16px 60px;
          box-sizing: border-box;
        }
        .nutri-app * { box-sizing: border-box; }
        .n-headline { font-family: 'Fraunces', Georgia, serif; }
        .n-shell { max-width: 1040px; margin: 0 auto; }

        .n-header {
          display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between;
          gap: 12px; margin-bottom: 20px;
        }
        .n-title { font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.01em; }
        .n-sub { color: var(--text-muted); font-size: 14px; margin-top: 4px; }

        .n-profile-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .n-select, .n-input {
          font-family: inherit; font-size: 14px; padding: 8px 10px;
          border: 1px solid var(--border); border-radius: 7px; background: var(--surface); color: var(--text);
        }
        .n-select:focus, .n-input:focus { outline: 2px solid var(--herb); outline-offset: 1px; }

        .n-totals {
          background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
          padding: 20px 24px; margin-bottom: 20px;
          display: flex; flex-wrap: wrap; gap: 28px; align-items: flex-end;
          animation: n-rise 0.5s ease-out;
        }
        @keyframes n-rise { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
        .n-stat-label { font-size: 12px; color: var(--text-muted); margin-bottom: 2px; }
        .n-stat-value { font-family: 'Fraunces', Georgia, serif; font-size: 34px; font-weight: 600; line-height: 1; }
        .n-stat-value.big { color: var(--accent); }
        .n-stat-unit { font-size: 15px; color: var(--text-muted); margin-left: 4px; font-family: 'Public Sans', sans-serif; }

        .n-grid { display: grid; grid-template-columns: 320px 1fr; gap: 20px; }
        @media (max-width: 820px) { .n-grid { grid-template-columns: 1fr; } }

        .n-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 18px;
        }
        .n-card h2 { font-size: 15px; margin: 0 0 14px; font-weight: 600; }

        .n-field { margin-bottom: 12px; position: relative; }
        .n-field label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 4px; }
        .n-field .n-input, .n-field .n-select { width: 100%; }

        .n-suggestions {
          position: absolute; top: 100%; left: 0; right: 0; background: var(--surface);
          border: 1px solid var(--border); border-radius: 7px; margin-top: 4px; z-index: 5;
          box-shadow: 0 4px 14px rgba(28,43,34,0.08); overflow: hidden;
        }
        .n-suggestions button {
          display: block; width: 100%; text-align: left; padding: 8px 10px; border: none; background: none;
          font-size: 14px; cursor: pointer; font-family: inherit; color: var(--text);
        }
        .n-suggestions button:hover { background: var(--herb-soft); }

        .n-add-btn {
          width: 100%; padding: 10px; border-radius: 7px; border: none; background: var(--accent); color: white;
          font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 4px;
        }
        .n-add-btn:disabled { opacity: 0.6; cursor: default; }
        .n-add-btn:hover:not(:disabled) { filter: brightness(0.95); }

        .n-error { color: var(--berry); font-size: 13px; margin-top: 8px; }

        .n-meal-group { margin-bottom: 16px; }
        .n-meal-group:last-child { margin-bottom: 0; }
        .n-meal-name { font-size: 12px; text-transform: none; color: var(--herb); font-weight: 600; margin-bottom: 6px; }
        .n-empty { color: var(--text-muted); font-size: 13px; }

        .n-entry {
          display: flex; justify-content: space-between; align-items: center; gap: 10px;
          padding: 8px 0; border-bottom: 1px solid var(--border);
        }
        .n-entry:last-child { border-bottom: none; }
        .n-entry-name { font-size: 14px; }
        .n-entry-meta { font-size: 12px; color: var(--text-muted); }
        .n-entry-kcal { font-size: 14px; font-weight: 600; white-space: nowrap; }
        .n-del { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 13px; padding: 4px 6px; }
        .n-del:hover { color: var(--berry); }

        .n-chart-card { grid-column: 1 / -1; margin-top: 20px; }

        .n-footer { margin-top: 20px; text-align: right; }
        .n-link-btn { background: none; border: none; color: var(--text-muted); font-size: 12px; cursor: pointer; text-decoration: underline; font-family: inherit; }
        .n-link-btn:hover { color: var(--berry); }


        .n-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .n-menu-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .n-menu-btn {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          border-radius: 8px;
          padding: 9px 13px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .n-menu-btn:hover {
          transform: translateY(-2px);
          background: var(--herb-soft);
          border-color: var(--herb);
        }

        .n-chat-btn {
          background: var(--text);
          color: white;
          border-color: var(--text);
        }

        .n-chat-btn:hover {
          background: var(--herb);
        }

        .n-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(28, 43, 34, 0.42);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          animation: n-fade-in 0.2s ease;
        }

        @keyframes n-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .n-modal {
          width: min(920px, 100%);
          max-height: 88vh;
          overflow-y: auto;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: 0 20px 70px rgba(28,43,34,0.2);
          padding: 24px;
          animation: n-modal-rise 0.25s ease-out;
        }

        @keyframes n-modal-rise {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .n-modal-header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .n-modal-header h2 {
          margin: 0;
          font-size: 28px;
        }

        .n-modal-header p {
          margin: 5px 0 0;
          color: var(--text-muted);
          font-size: 13px;
        }

        .n-close {
          border: 1px solid var(--border);
          background: var(--surface);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          color: var(--text-muted);
        }

        .n-category-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 6px;
          margin-bottom: 18px;
        }

        .n-category-btn {
          border: 1px solid var(--border);
          background: var(--surface);
          padding: 8px 12px;
          border-radius: 999px;
          font-family: inherit;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
        }

        .n-category-btn.active {
          background: var(--herb);
          color: white;
          border-color: var(--herb);
        }

        .n-recipe-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .n-recipe-card {
          text-align: left;
          border: 1px solid var(--border);
          background: #fbfcfa;
          border-radius: 14px;
          padding: 16px;
          cursor: pointer;
          font-family: inherit;
          color: var(--text);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .n-recipe-card:hover {
          transform: translateY(-3px);
          border-color: var(--herb);
          box-shadow: 0 10px 30px rgba(28,43,34,0.08);
        }

        .n-recipe-icon {
          font-size: 28px;
          margin-bottom: 12px;
        }

        .n-recipe-card-top {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
          font-size: 11px;
          margin-bottom: 8px;
        }

        .n-recipe-card h3 {
          margin: 0;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 20px;
        }

        .n-recipe-card p {
          color: var(--text-muted);
          font-size: 13px;
          line-height: 1.5;
        }

        .n-recipe-card-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
          font-size: 12px;
        }

        .n-recipe-card-footer strong {
          color: var(--herb);
        }

        .n-recipe-detail h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 32px;
          margin: 18px 0 8px;
        }

        .n-back-btn {
          background: none;
          border: none;
          padding: 0;
          color: var(--herb);
          font-family: inherit;
          cursor: pointer;
        }

        .n-recipe-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 12px 0;
        }

        .n-recipe-stats span {
          padding: 7px 10px;
          background: var(--herb-soft);
          color: var(--herb);
          border-radius: 999px;
          font-size: 12px;
        }

        .n-recipe-description {
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.6;
        }

        .n-recipe-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 22px;
        }

        .n-recipe-columns li {
          margin-bottom: 8px;
          font-size: 14px;
          line-height: 1.5;
        }

        .n-log-recipe {
          margin-top: 20px;
          border: none;
          background: var(--accent);
          color: white;
          padding: 11px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
          font-weight: 600;
        }

        .n-chat-modal {
          width: min(650px, 100%);
        }

        .n-chat-messages {
          height: 380px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 8px 0 16px;
        }

        .n-chat-message {
          max-width: 82%;
          padding: 10px 13px;
          border-radius: 13px;
          font-size: 13px;
          line-height: 1.5;
        }

        .n-chat-message.assistant {
          align-self: flex-start;
          background: var(--herb-soft);
        }

        .n-chat-message.user {
          align-self: flex-end;
          background: var(--text);
          color: white;
        }

        .n-chat-suggestions {
          display: flex;
          gap: 7px;
          overflow-x: auto;
          padding-bottom: 12px;
        }

        .n-chat-suggestions button {
          white-space: nowrap;
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 999px;
          padding: 7px 10px;
          font-family: inherit;
          font-size: 11px;
          cursor: pointer;
        }

        .n-chat-input-row {
          display: flex;
          gap: 8px;
        }

        .n-chat-input-row .n-input {
          flex: 1;
        }

        .n-send-btn {
          border: none;
          border-radius: 8px;
          background: var(--herb);
          color: white;
          padding: 0 16px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 700px) {
          .n-header-right {
            width: 100%;
            align-items: stretch;
          }

          .n-menu-actions {
            justify-content: stretch;
          }

          .n-menu-btn {
            flex: 1;
          }

          .n-recipe-grid {
            grid-template-columns: 1fr;
          }

          .n-recipe-columns {
            grid-template-columns: 1fr;
          }
        }

        .n-loading { padding: 60px 20px; text-align: center; color: var(--text-muted); }
      `}</style>

      <div className="n-shell">
        <div className="n-header">
          <div>
            <h1 className="n-title n-headline">Daily bites</h1>
            <div className="n-sub">Log what you eat by weight, see the totals add up.</div>
          </div>
          <div className="n-header-right">
            <div className="n-profile-row">
            {profiles.length > 0 && (
              <select className="n-select" value={selectedProfile} onChange={(e) => selectProfile(e.target.value)}>
                {profiles.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            )}
            <input
              className="n-input"
              placeholder={profiles.length ? 'Add another person' : 'Your name'}
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addProfile()}
              style={{ width: 150 }}
            />
            <button className="n-add-btn" style={{ width: 'auto', padding: '8px 12px' }} onClick={addProfile}>
              {profiles.includes(newProfileName.trim()) ? 'Switch' : 'Add'}
            </button>
          </div>

            <div className="n-menu-actions">
              <button
                className="n-menu-btn"
                onClick={() => setShowRecipes(true)}
              >
                🍲 Healthy Recipes
              </button>

              <button
                className="n-menu-btn n-chat-btn"
                onClick={() => setShowChat(true)}
              >
                ✦ Nutrition Assistant
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="n-loading">Loading your log…</div>
        ) : !selectedProfile ? (
          <div className="n-card">Add your name above to start logging meals. Anyone you share this app with can add themselves too.</div>
        ) : (
          <>
            <div className="n-totals">
              <div>
                <div className="n-stat-label">Calories, {date === todayStr() ? 'today' : date}</div>
                <div className="n-stat-value big">{totals.kcal}<span className="n-stat-unit">kcal</span></div>
              </div>
              <div>
                <div className="n-stat-label">Protein</div>
                <div className="n-stat-value" style={{ fontSize: 22 }}>{totals.protein.toFixed(1)}<span className="n-stat-unit">g</span></div>
              </div>
              <div>
                <div className="n-stat-label">Carbs</div>
                <div className="n-stat-value" style={{ fontSize: 22 }}>{totals.carbs.toFixed(1)}<span className="n-stat-unit">g</span></div>
              </div>
              <div>
                <div className="n-stat-label">Fat</div>
                <div className="n-stat-value" style={{ fontSize: 22 }}>{totals.fat.toFixed(1)}<span className="n-stat-unit">g</span></div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <input
                  type="date"
                  className="n-input"
                  value={date}
                  max={todayStr()}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="n-grid">
              <div className="n-card">
                <h2>Log a food</h2>
                <div className="n-field">
                  <label>What did you eat</label>
                  <input
                    className="n-input"
                    value={foodInput}
                    onChange={(e) => { setFoodInput(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder="e.g. Chicken curry, or type anything"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="n-suggestions">
                      {suggestions.map((s) => (
                        <button key={s} onMouseDown={() => { setFoodInput(s); setShowSuggestions(false); }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="n-field">
                  <label>Net weight (grams)</label>
                  <input
                    className="n-input"
                    type="number"
                    min="0"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    placeholder="e.g. 150"
                  />
                </div>
                <div className="n-field">
                  <label>Meal</label>
                  <select className="n-select" value={meal} onChange={(e) => setMeal(e.target.value)}>
                    {MEALS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <button className="n-add-btn" onClick={handleAdd} disabled={adding}>
                  {adding ? 'Estimating…' : 'Add to log'}
                </button>
                {error && <div className="n-error">{error}</div>}
                <div className="n-sub" style={{ marginTop: 10, fontSize: 12 }}>
                  Not in the built-in list? Claude estimates it on the fly and remembers it for next time.
                </div>
              </div>

              <div className="n-card">
                <h2>{date === todayStr() ? "Today's log" : `Log for ${date}`}</h2>
                {groupedMeals.every((g) => g.items.length === 0) ? (
                  <div className="n-empty">Nothing logged yet for this day.</div>
                ) : (
                  groupedMeals.map((g) => (
                    <div className="n-meal-group" key={g.meal}>
                      <div className="n-meal-name">{g.meal}</div>
                      {g.items.length === 0 ? (
                        <div className="n-empty">—</div>
                      ) : (
                        g.items.map((e) => (
                          <div className="n-entry" key={e.id}>
                            <div>
                              <div className="n-entry-name">{e.food}</div>
                              <div className="n-entry-meta">{e.weight} g · P {e.protein}g · C {e.carbs}g · F {e.fat}g</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div className="n-entry-kcal">{e.kcal} kcal</div>
                              <button className="n-del" onClick={() => deleteEntry(e.id)} aria-label="Delete entry">✕</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="n-card n-chart-card">
                <h2>Last 7 days — {selectedProfile}</h2>
                <div style={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <BarChart data={weeklyData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#D9DED2" vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#707B70' }} axisLine={{ stroke: '#D9DED2' }} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#707B70' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: '1px solid #D9DED2', fontSize: 13 }}
                        formatter={(v) => [`${v} kcal`, 'Calories']}
                      />
                      <Bar dataKey="kcal" fill="#E8823C" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="n-footer">
              <button className="n-link-btn" onClick={clearMyEntries}>Clear all entries for {selectedProfile}</button>
            </div>
          </>
        )}

      {showRecipes && (
        <div className="n-overlay" onClick={() => setShowRecipes(false)}>
          <div
            className="n-modal n-recipes-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="n-modal-header">
              <div>
                <h2 className="n-headline">Healthy Recipes</h2>
                <p>Indian-friendly meals for everyday nutrition.</p>
              </div>

              <button
                className="n-close"
                onClick={() => setShowRecipes(false)}
              >
                ✕
              </button>
            </div>

            <div className="n-category-row">
              {recipeCategories.map((category) => (
                <button
                  key={category}
                  className={`n-category-btn ${
                    recipeCategory === category ? 'active' : ''
                  }`}
                  onClick={() => setRecipeCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {selectedRecipe ? (
              <div className="n-recipe-detail">
                <button
                  className="n-back-btn"
                  onClick={() => setSelectedRecipe(null)}
                >
                  ← Back to recipes
                </button>

                <h3 className="n-headline">{selectedRecipe.name}</h3>

                <div className="n-recipe-stats">
                  <span>{selectedRecipe.category}</span>
                  <span>{selectedRecipe.time}</span>
                  <span>{selectedRecipe.kcal} kcal</span>
                  <span>{selectedRecipe.protein}g protein</span>
                </div>

                <p className="n-recipe-description">
                  {selectedRecipe.description}
                </p>

                <div className="n-recipe-columns">
                  <div>
                    <h4>Ingredients</h4>
                    <ul>
                      {selectedRecipe.ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Method</h4>
                    <ol>
                      {selectedRecipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <button
                  className="n-log-recipe"
                  onClick={() => {
                    setFoodInput(selectedRecipe.name);
                    setShowRecipes(false);
                    setSelectedRecipe(null);
                  }}
                >
                  Log this food
                </button>
              </div>
            ) : (
              <div className="n-recipe-grid">
                {filteredRecipes.map((recipe) => (
                  <button
                    className="n-recipe-card"
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="n-recipe-icon">🥗</div>

                    <div className="n-recipe-card-top">
                      <span>{recipe.category}</span>
                      <span>{recipe.time}</span>
                    </div>

                    <h3>{recipe.name}</h3>

                    <p>{recipe.description}</p>

                    <div className="n-recipe-card-footer">
                      <span>{recipe.kcal} kcal</span>
                      <strong>{recipe.protein}g protein</strong>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showChat && (
        <div className="n-overlay" onClick={() => setShowChat(false)}>
          <div
            className="n-modal n-chat-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="n-modal-header">
              <div>
                <h2 className="n-headline">Nutrition Assistant</h2>
                <p>Ask about food, protein, calories or recipes.</p>
              </div>

              <button
                className="n-close"
                onClick={() => setShowChat(false)}
              >
                ✕
              </button>
            </div>

            <div className="n-chat-messages">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`n-chat-message ${
                    message.role === 'user' ? 'user' : 'assistant'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="n-chat-suggestions">
              {[
                'High protein Indian meals',
                'Healthy breakfast ideas',
                'What should I eat for dinner?',
                'Show my calories'
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setChatInput(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="n-chat-input-row">
              <input
                className="n-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') sendChatMessage();
                }}
                placeholder="Ask something..."
              />

              <button
                className="n-send-btn"
                onClick={sendChatMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}

from pathlib import Path
import re

path = Path("src/NutritionTracker.jsx")
text = path.read_text()

# ============================================================
# 1. Replace window.storage with browser localStorage
# ============================================================

load_pattern = r"""  async function loadAll\(\) \{.*?  \n  \}"""

load_replacement = r"""  async function loadAll() {
    setLoading(true);
    setError('');

    try {
      const profs = JSON.parse(
        localStorage.getItem('nutrition-profiles') || '[]'
      );

      const ents = JSON.parse(
        localStorage.getItem('nutrition-entries') || '[]'
      );

      const custom = JSON.parse(
        localStorage.getItem('nutrition-custom-foods') || '{}'
      );

      const savedProfile =
        localStorage.getItem('nutrition-selected-profile') ||
        profs[0] ||
        '';

      setProfiles(profs);
      setEntries(ents);
      setCustomFoods(custom);
      setSelectedProfile(savedProfile);
    } catch (e) {
      setError('Could not load your saved data. Try reloading the page.');
    } finally {
      setLoading(false);
    }
  }"""

text, count = re.subn(load_pattern, load_replacement, text, count=1, flags=re.S)

if count != 1:
    raise SystemExit("Could not replace loadAll()")

profiles_pattern = r"""  async function saveProfiles\(next\) \{.*?  \n  \}"""

profiles_replacement = r"""  async function saveProfiles(next) {
    setProfiles(next);

    try {
      localStorage.setItem(
        'nutrition-profiles',
        JSON.stringify(next)
      );
    } catch (e) {
      setError('Could not save the profile list.');
    }
  }"""

text, count = re.subn(
    profiles_pattern,
    profiles_replacement,
    text,
    count=1,
    flags=re.S
)

if count != 1:
    raise SystemExit("Could not replace saveProfiles()")

entries_pattern = r"""  async function saveEntries\(next\) \{.*?  \n  \}"""

entries_replacement = r"""  async function saveEntries(next) {
    setEntries(next);

    try {
      localStorage.setItem(
        'nutrition-entries',
        JSON.stringify(next)
      );
    } catch (e) {
      setError('Could not save that entry in this browser.');
    }
  }"""

text, count = re.subn(
    entries_pattern,
    entries_replacement,
    text,
    count=1,
    flags=re.S
)

if count != 1:
    raise SystemExit("Could not replace saveEntries()")

custom_pattern = r"""  async function saveCustomFoods\(next\) \{.*?  \n  \}"""

custom_replacement = r"""  async function saveCustomFoods(next) {
    setCustomFoods(next);

    try {
      localStorage.setItem(
        'nutrition-custom-foods',
        JSON.stringify(next)
      );
    } catch (e) {
      // Non-critical.
    }
  }"""

text, count = re.subn(
    custom_pattern,
    custom_replacement,
    text,
    count=1,
    flags=re.S
)

if count != 1:
    raise SystemExit("Could not replace saveCustomFoods()")

select_pattern = r"""  async function selectProfile\(name\) \{.*?  \n  \}"""

select_replacement = r"""  async function selectProfile(name) {
    setSelectedProfile(name);

    try {
      localStorage.setItem(
        'nutrition-selected-profile',
        name
      );
    } catch (e) {
      // Non-critical.
    }
  }"""

text, count = re.subn(
    select_pattern,
    select_replacement,
    text,
    count=1,
    flags=re.S
)

if count != 1:
    raise SystemExit("Could not replace selectProfile()")


# ============================================================
# 2. Add 30+ more healthy recipes
# ============================================================

if "const MORE_HEALTHY_RECIPES" not in text:

    marker = "\nconst HEALTHY_RECIPES = ["

    more_recipes = r"""

const MORE_HEALTHY_RECIPES = [
  {
    id: 11,
    name: 'Vegetable Poha',
    category: 'Breakfast',
    time: '15 min',
    protein: 6,
    kcal: 260,
    description: 'Light poha with vegetables, peanuts and lemon.',
    ingredients: ['1 cup poha', 'Onion', 'Carrot', 'Peas', 'Peanuts', 'Curry leaves', 'Lemon', 'Turmeric'],
    steps: ['Rinse poha and drain.', 'Sauté onion, vegetables and curry leaves.', 'Add turmeric and poha.', 'Cook for a few minutes.', 'Finish with lemon and coriander.']
  },
  {
    id: 12,
    name: 'Vegetable Upma',
    category: 'Breakfast',
    time: '20 min',
    protein: 7,
    kcal: 290,
    description: 'Classic semolina upma loaded with vegetables.',
    ingredients: ['1 cup semolina', 'Carrot', 'Peas', 'Beans', 'Onion', 'Mustard seeds', 'Curry leaves'],
    steps: ['Roast semolina lightly.', 'Sauté spices and vegetables.', 'Add water.', 'Slowly add semolina while stirring.', 'Cook until fluffy.']
  },
  {
    id: 13,
    name: 'Idli with Sambar',
    category: 'South Indian',
    time: '20 min',
    protein: 11,
    kcal: 330,
    description: 'Steamed idli paired with protein-rich sambar.',
    ingredients: ['3 idlis', '1 cup sambar', 'Coriander', 'Lemon'],
    steps: ['Steam idlis until cooked.', 'Heat sambar.', 'Serve together with coriander and lemon.']
  },
  {
    id: 14,
    name: 'Vegetable Dosa',
    category: 'South Indian',
    time: '20 min',
    protein: 7,
    kcal: 300,
    description: 'Crisp dosa served with vegetables and chutney.',
    ingredients: ['Dosa batter', 'Onion', 'Carrot', 'Capsicum', 'Coriander'],
    steps: ['Spread batter on a hot pan.', 'Add vegetables.', 'Cook until crisp.', 'Fold and serve.']
  },
  {
    id: 15,
    name: 'Pesarattu',
    category: 'South Indian',
    time: '20 min',
    protein: 10,
    kcal: 250,
    description: 'Green gram dosa with a strong protein profile.',
    ingredients: ['Moong dal', 'Ginger', 'Green chilli', 'Onion', 'Coriander'],
    steps: ['Soak moong dal.', 'Blend into batter.', 'Add ginger and chilli.', 'Spread on a hot pan.', 'Cook both sides.']
  },
  {
    id: 16,
    name: 'Vegetable Uttapam',
    category: 'South Indian',
    time: '20 min',
    protein: 8,
    kcal: 280,
    description: 'Soft fermented pancake topped with colourful vegetables.',
    ingredients: ['Uttapam batter', 'Onion', 'Tomato', 'Capsicum', 'Coriander'],
    steps: ['Pour batter onto a hot pan.', 'Top with vegetables.', 'Cook both sides until done.']
  },
  {
    id: 17,
    name: 'Ragi Dosa',
    category: 'South Indian',
    time: '20 min',
    protein: 7,
    kcal: 250,
    description: 'Ragi-based dosa for a fibre-rich meal.',
    ingredients: ['Ragi flour', 'Rice flour', 'Curd', 'Water', 'Onion', 'Cumin'],
    steps: ['Mix ingredients into a thin batter.', 'Pour onto a hot pan.', 'Cook until crisp.', 'Serve with chutney.']
  },
  {
    id: 18,
    name: 'Ragi Idli',
    category: 'South Indian',
    time: '25 min',
    protein: 6,
    kcal: 220,
    description: 'Steamed ragi idlis with a hearty texture.',
    ingredients: ['Ragi flour', 'Idli batter', 'Curd', 'Salt'],
    steps: ['Mix the ingredients.', 'Rest briefly.', 'Steam in idli moulds.', 'Serve hot.']
  },
  {
    id: 19,
    name: 'Vegetable Sambar',
    category: 'South Indian',
    time: '30 min',
    protein: 7,
    kcal: 180,
    description: 'Lentil-based vegetable stew full of flavour.',
    ingredients: ['Toor dal', 'Drumstick', 'Carrot', 'Tomato', 'Pumpkin', 'Sambar powder'],
    steps: ['Cook dal.', 'Cook vegetables.', 'Combine dal and vegetables.', 'Add spices.', 'Simmer until flavours combine.']
  },
  {
    id: 20,
    name: 'Chana Salad',
    category: 'Light & Balanced',
    time: '10 min',
    protein: 12,
    kcal: 260,
    description: 'Chickpea salad with fresh vegetables and lemon.',
    ingredients: ['Cooked chickpeas', 'Cucumber', 'Tomato', 'Onion', 'Coriander', 'Lemon'],
    steps: ['Add chickpeas to a bowl.', 'Add chopped vegetables.', 'Mix with lemon and coriander.']
  },
  {
    id: 21,
    name: 'Rajma Rice Bowl',
    category: 'North Indian',
    time: '30 min',
    protein: 14,
    kcal: 430,
    description: 'Classic rajma with rice for a filling vegetarian meal.',
    ingredients: ['Cooked rajma', 'Cooked rice', 'Tomato', 'Onion', 'Ginger', 'Garlic', 'Spices'],
    steps: ['Prepare rajma gravy.', 'Heat cooked rice.', 'Serve together with coriander.']
  },
  {
    id: 22,
    name: 'Chole Salad Bowl',
    category: 'North Indian',
    time: '15 min',
    protein: 13,
    kcal: 300,
    description: 'Chole combined with fresh vegetables for a lighter meal.',
    ingredients: ['Cooked chickpeas', 'Cucumber', 'Tomato', 'Onion', 'Coriander', 'Lemon', 'Chaat masala'],
    steps: ['Add chickpeas and vegetables.', 'Season with lemon and chaat masala.', 'Mix well.']
  },
  {
    id: 23,
    name: 'Palak Dal Rice Bowl',
    category: 'Vegetarian',
    time: '30 min',
    protein: 15,
    kcal: 390,
    description: 'Spinach dal served over rice.',
    ingredients: ['Cooked dal', 'Spinach', 'Cooked rice', 'Tomato', 'Garlic', 'Cumin'],
    steps: ['Cook spinach with spices.', 'Add cooked dal.', 'Simmer.', 'Serve with rice.']
  },
  {
    id: 24,
    name: 'Paneer Bhurji Bowl',
    category: 'High Protein',
    time: '20 min',
    protein: 25,
    kcal: 390,
    description: 'Spiced scrambled paneer with vegetables.',
    ingredients: ['Paneer', 'Onion', 'Tomato', 'Capsicum', 'Turmeric', 'Garam masala'],
    steps: ['Sauté vegetables.', 'Add crumbled paneer.', 'Add spices.', 'Cook until combined.']
  },
  {
    id: 25,
    name: 'Paneer Wrap',
    category: 'High Protein',
    time: '20 min',
    protein: 26,
    kcal: 420,
    description: 'Paneer and vegetables wrapped in a whole-wheat roti.',
    ingredients: ['Paneer', 'Whole-wheat roti', 'Capsicum', 'Onion', 'Curd', 'Spices'],
    steps: ['Cook spiced paneer and vegetables.', 'Place inside roti.', 'Add curd sauce.', 'Roll and serve.']
  },
  {
    id: 26,
    name: 'Chicken Salad Bowl',
    category: 'High Protein',
    time: '20 min',
    protein: 35,
    kcal: 350,
    description: 'Lean chicken with a large serving of fresh vegetables.',
    ingredients: ['Chicken breast', 'Cucumber', 'Tomato', 'Carrot', 'Lettuce', 'Lemon'],
    steps: ['Cook chicken thoroughly.', 'Slice vegetables.', 'Combine and add lemon.']
  },
  {
    id: 27,
    name: 'Tandoori Chicken Bowl',
    category: 'High Protein',
    time: '30 min',
    protein: 38,
    kcal: 400,
    description: 'Spiced grilled chicken with vegetables and yoghurt.',
    ingredients: ['Chicken breast', 'Curd', 'Turmeric', 'Chilli powder', 'Garam masala', 'Onion', 'Capsicum'],
    steps: ['Marinate chicken.', 'Cook thoroughly on a grill or pan.', 'Serve with vegetables and curd.']
  },
  {
    id: 28,
    name: 'Egg Salad Roti',
    category: 'High Protein',
    time: '15 min',
    protein: 23,
    kcal: 360,
    description: 'Boiled eggs with vegetables wrapped in roti.',
    ingredients: ['2 boiled eggs', '2 rotis', 'Cucumber', 'Tomato', 'Onion', 'Curd'],
    steps: ['Slice eggs.', 'Add vegetables.', 'Place inside rotis.', 'Add curd and roll.']
  },
  {
    id: 29,
    name: 'Masala Omelette with Roti',
    category: 'Breakfast',
    time: '15 min',
    protein: 22,
    kcal: 340,
    description: 'Vegetable omelette served with roti.',
    ingredients: ['3 eggs', 'Onion', 'Tomato', 'Capsicum', 'Coriander', '2 rotis'],
    steps: ['Beat eggs.', 'Mix vegetables.', 'Cook omelette completely.', 'Serve with rotis.']
  },
  {
    id: 30,
    name: 'Sprouts Sandwich',
    category: 'Light & Balanced',
    time: '10 min',
    protein: 13,
    kcal: 300,
    description: 'Whole-wheat sandwich filled with sprouts and vegetables.',
    ingredients: ['Whole-wheat bread', 'Sprouts', 'Cucumber', 'Tomato', 'Curd', 'Pepper'],
    steps: ['Mix sprouts and chopped vegetables.', 'Spread onto bread.', 'Close sandwich and serve.']
  },
  {
    id: 31,
    name: 'Peanut Chaat',
    category: 'Snacks',
    time: '10 min',
    protein: 10,
    kcal: 230,
    description: 'Simple peanut chaat with onion, tomato and lemon.',
    ingredients: ['Roasted peanuts', 'Onion', 'Tomato', 'Coriander', 'Lemon', 'Chaat masala'],
    steps: ['Combine peanuts and vegetables.', 'Add lemon and spices.', 'Mix and serve.']
  },
  {
    id: 32,
    name: 'Makhana Chaat',
    category: 'Snacks',
    time: '15 min',
    protein: 6,
    kcal: 190,
    description: 'Roasted makhana with vegetables and spices.',
    ingredients: ['Makhana', 'Cucumber', 'Tomato', 'Onion', 'Chaat masala', 'Lemon'],
    steps: ['Dry roast makhana.', 'Cool slightly.', 'Add vegetables and spices.', 'Mix well.']
  },
  {
    id: 33,
    name: 'Roasted Makhana',
    category: 'Snacks',
    time: '10 min',
    protein: 5,
    kcal: 160,
    description: 'Crunchy roasted makhana seasoned with mild spices.',
    ingredients: ['Makhana', '1 tsp ghee or oil', 'Turmeric', 'Pepper', 'Salt'],
    steps: ['Heat a pan.', 'Add makhana.', 'Roast until crisp.', 'Season and serve.']
  },
  {
    id: 34,
    name: 'Vegetable Soup',
    category: 'Light & Balanced',
    time: '25 min',
    protein: 4,
    kcal: 140,
    description: 'Warm soup packed with mixed vegetables.',
    ingredients: ['Carrot', 'Beans', 'Cabbage', 'Capsicum', 'Tomato', 'Pepper'],
    steps: ['Chop vegetables.', 'Cook in water or stock.', 'Season with pepper and salt.', 'Simmer until tender.']
  },
  {
    id: 35,
    name: 'Tomato Soup',
    category: 'Light & Balanced',
    time: '20 min',
    protein: 3,
    kcal: 120,
    description: 'Simple tomato soup with herbs and pepper.',
    ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Pepper', 'Coriander'],
    steps: ['Cook tomatoes, onion and garlic.', 'Blend until smooth.', 'Heat again.', 'Season and serve.']
  },
  {
    id: 36,
    name: 'Vegetable Raita Bowl',
    category: 'Light & Balanced',
    time: '10 min',
    protein: 7,
    kcal: 150,
    description: 'Cooling curd with cucumber, carrot and herbs.',
    ingredients: ['Curd', 'Cucumber', 'Carrot', 'Coriander', 'Cumin'],
    steps: ['Whisk curd.', 'Add chopped vegetables.', 'Season with cumin.', 'Serve chilled.']
  },
  {
    id: 37,
    name: 'Mango Yogurt Bowl',
    category: 'Breakfast',
    time: '5 min',
    protein: 8,
    kcal: 220,
    description: 'Yoghurt topped with mango and nuts.',
    ingredients: ['Plain curd', 'Mango', 'Almonds', 'Chia seeds'],
    steps: ['Add curd to a bowl.', 'Top with mango.', 'Add nuts and seeds.']
  },
  {
    id: 38,
    name: 'Banana Oats Bowl',
    category: 'Breakfast',
    time: '10 min',
    protein: 9,
    kcal: 300,
    description: 'Oats with banana, milk and nuts.',
    ingredients: ['Oats', 'Milk', 'Banana', 'Almonds', 'Cinnamon'],
    steps: ['Cook oats with milk.', 'Top with banana and almonds.', 'Add cinnamon.']
  },
  {
    id: 39,
    name: 'Overnight Oats Indian Style',
    category: 'Breakfast',
    time: '5 min',
    protein: 10,
    kcal: 310,
    description: 'Overnight oats with yoghurt, fruit and nuts.',
    ingredients: ['Oats', 'Curd', 'Milk', 'Banana', 'Chia seeds', 'Almonds'],
    steps: ['Mix oats, milk and curd.', 'Refrigerate overnight.', 'Add fruit and nuts before serving.']
  },
  {
    id: 40,
    name: 'Salted Buttermilk',
    category: 'Drinks',
    time: '5 min',
    protein: 3,
    kcal: 60,
    description: 'Refreshing yoghurt-based drink with cumin and herbs.',
    ingredients: ['Curd', 'Water', 'Roasted cumin', 'Coriander', 'Salt'],
    steps: ['Whisk curd with water.', 'Add cumin, coriander and salt.', 'Serve chilled.']
  },
  {
    id: 41,
    name: 'Coconut Water & Fruit Bowl',
    category: 'Drinks',
    time: '5 min',
    protein: 2,
    kcal: 130,
    description: 'Simple hydration-focused option with fresh fruit.',
    ingredients: ['Coconut water', 'Orange', 'Apple', 'Banana'],
    steps: ['Chop fruit.', 'Serve alongside chilled coconut water.']
  },
  {
    id: 42,
    name: 'Vegetable Dal Soup',
    category: 'High Fibre',
    time: '30 min',
    protein: 12,
    kcal: 240,
    description: 'Thick lentil soup with vegetables.',
    ingredients: ['Moong dal', 'Carrot', 'Tomato', 'Spinach', 'Cumin', 'Turmeric'],
    steps: ['Cook dal and vegetables.', 'Blend partially.', 'Season with cumin and turmeric.', 'Simmer and serve.']
  }
];

const ALL_RECIPES = [...HEALTHY_RECIPES, ...MORE_HEALTHY_RECIPES];
"""

    if marker not in text:
        raise SystemExit("Could not find HEALTHY_RECIPES marker")

    text = text.replace(marker, more_recipes + marker, 1)

# Replace recipe references with ALL_RECIPES
text = text.replace(
    "HEALTHY_RECIPES.map((recipe) => recipe.category)",
    "ALL_RECIPES.map((recipe) => recipe.category)"
)

text = text.replace(
    "if (recipeCategory === 'All') return HEALTHY_RECIPES;",
    "if (recipeCategory === 'All') return ALL_RECIPES;"
)

text = text.replace(
    "return HEALTHY_RECIPES.filter(",
    "return ALL_RECIPES.filter("
)

path.write_text(text)

print("✅ Nutrition tracker upgraded successfully.")
print(f"📄 File: {path}")
print(f"📏 Lines: {len(text.splitlines())}")

print()
print("✅ localStorage persistence enabled")
print("✅ 40+ healthy recipes available")
print("✅ Recipe categories expanded")

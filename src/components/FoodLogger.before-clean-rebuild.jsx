import { useMemo, useState } from 'react'
import { Search, Plus, X, Utensils } from 'lucide-react'
import { FOOD_DB_COMPLETE } from '../data/foods'
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function loadEntries() {
  try {
    return JSON.parse(
      localStorage.getItem('nutrition-entries') || '[]'
    )
  } catch {
    return []
  }
}

function saveEntries(entries) {
  localStorage.setItem(
    'nutrition-entries',
    JSON.stringify(entries)
  )
}

export default function FoodLogger() {
  const [foodInput, setFoodInput] = useState('')
  const [weightInput, setWeightInput] = useState('')
  const [meal, setMeal] = useState('Breakfast')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [entries, setEntries] = useState(loadEntries)
  const [message, setMessage] = useState('')

  const suggestions = useMemo(() => {
    const query = foodInput.trim().toLowerCase()

    if (!query) return []

    return FOOD_DB_COMPLETE
      .filter((food) =>
        food.name.toLowerCase().includes(query)
      )
      .slice(0, 8)
  }, [foodInput])

  const todayEntries = entries.filter(
    (entry) => entry.date === todayStr()
  )

  function addFood() {
    setMessage('')

    const name = foodInput.trim()
    const weight = Number(weightInput)

    if (!name) {
      setMessage('Enter a food name.')
      return
    }

    if (!weight || weight <= 0) {
      setMessage('Enter a valid weight in grams.')
      return
    }

    const food = FOOD_DB_COMPLETE.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    )

    if (!food) {
      setMessage(
        'That food is not in the database yet. Try a similar name.'
      )
      return
    }

    const factor = weight / 100

    const entry = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      date: todayStr(),
      meal,
      food: food.name,
      weight,
      kcal: Math.round(food.kcal * factor),
      protein: +(food.protein * factor).toFixed(1),
      carbs: +(food.carbs * factor).toFixed(1),
      fat: +(food.fat * factor).toFixed(1),
      fiber: +(food.fiber * factor).toFixed(1),
      sodium: Math.round(food.sodium * factor),
    }

    const nextEntries = [...entries, entry]

    setEntries(nextEntries)
    saveEntries(nextEntries)

    setFoodInput('')
    setWeightInput('')
    setShowSuggestions(false)

    setMessage(`${food.name} added to ${meal}.`)
  }

  function removeEntry(id) {
    const nextEntries = entries.filter(
      (entry) => entry.id !== id
    )

    setEntries(nextEntries)
    saveEntries(nextEntries)
  }

  return (
    <div className="space-y-6 text-[#1c2b22]">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[#6d766d]">
          Add something you ate
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Log Food
        </h1>

        <p className="mt-2 text-sm text-[#7b847b]">
          Search your food, enter the weight and add it to today's log.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">

        {/* Add food card */}
        <section className="rounded-3xl border border-[#dce1d8] bg-white p-6">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dceae3] text-[#356556]">
              <Utensils size={20} />
            </div>

            <div>
              <h2 className="font-semibold">
                Add food
              </h2>

              <p className="text-xs text-[#7b847b]">
                190+ foods available
              </p>
            </div>
          </div>

          {/* Food search */}
          <div className="relative">
            <label className="mb-2 block text-xs font-medium text-[#717a71]">
              Food
            </label>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929990]"
              />

              <input
                value={foodInput}
                onChange={(event) => {
                  setFoodInput(event.target.value)
                  setShowSuggestions(true)
                  setMessage('')
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search rice, paneer, chips..."
                className="w-full rounded-xl border border-[#dce1d8] bg-[#fafbf9] py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#4b7b6d] focus:bg-white"
              />
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[72px] z-20 overflow-hidden rounded-xl border border-[#dce1d8] bg-white shadow-xl">

                {suggestions.map((food) => (
                  <button
                    key={food.name}
                    onMouseDown={() => {
                      setFoodInput(food.name)
                      setShowSuggestions(false)
                    }}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-[#edf4ef]"
                  >
                    <span>{food.name}</span>

                    <span className="text-xs text-[#7b847b]">
                      {food.kcal} kcal
                    </span>
                  </button>
                ))}

              </div>
            )}
          </div>

          {/* Weight */}
          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium text-[#717a71]">
              Weight
            </label>

            <div className="relative">
              <input
                type="number"
                min="1"
                value={weightInput}
                onChange={(event) => {
                  setWeightInput(event.target.value)
                  setMessage('')
                }}
                placeholder="150"
                className="w-full rounded-xl border border-[#dce1d8] bg-[#fafbf9] px-3 py-3 pr-12 text-sm outline-none transition focus:border-[#4b7b6d] focus:bg-white"
              />

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7b847b]">
                grams
              </span>
            </div>
          </div>

          {/* Meal */}
          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium text-[#717a71]">
              Meal
            </label>

            <div className="grid grid-cols-2 gap-2">
              {MEALS.map((item) => (
                <button
                  key={item}
                  onClick={() => setMeal(item)}
                  className={[
                    'rounded-xl border px-3 py-2.5 text-sm font-medium transition',
                    meal === item
                      ? 'border-[#4b7b6d] bg-[#dceae3] text-[#356556]'
                      : 'border-[#dce1d8] bg-white text-[#707970] hover:bg-[#f5f7f4]',
                  ].join(' ')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={addFood}
            className="mt-6 w-full"
          >
            Add to today's log
          </button>

          {message && (
            <p className="mt-3 text-center text-xs text-[#356556]">
              {message}
            </p>
          )}

        </section>

        {/* Today's entries */}
        <section className="rounded-3xl border border-[#dce1d8] bg-white p-6">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Today's food
              </h2>

              <p className="mt-1 text-xs text-[#7b847b]">
                {todayEntries.length} item
                {todayEntries.length === 1 ? '' : 's'} logged
              </p>
            </div>
          </div>

          {todayEntries.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf4ef] text-[#4b7b6d]">
                  <Utensils size={22} />
                </div>

                <p className="mt-4 text-sm font-medium">
                  Nothing logged yet
                </p>

                <p className="mt-1 text-xs text-[#7b847b]">
                  Add your first meal from the panel on the left.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {todayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-2xl bg-[#f7f9f6] p-4"
                >
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a9289]">
                      {entry.meal}
                    </div>

                    <div className="mt-1 text-sm font-semibold">
                      {entry.food}
                    </div>

                    <div className="mt-1 text-xs text-[#7b847b]">
                      {entry.weight} g · P {entry.protein}g · C{' '}
                      {entry.carbs}g · F {entry.fat}g
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#e27d3b]">
                        {entry.kcal}
                      </div>

                      <div className="text-[10px] text-[#8a9289]">
                        kcal
                      </div>
                    </div>

                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="rounded-lg p-2 text-[#999f98] transition hover:bg-[#f1e4e5] hover:text-[#a6425b]"
                      aria-label={`Remove ${entry.food}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </div>
  )
}

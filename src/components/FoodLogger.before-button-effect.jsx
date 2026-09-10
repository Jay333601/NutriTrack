import { useMemo, useState } from 'react'
import { Search, Plus, X, Utensils } from 'lucide-react'
import { FOOD_DB_COMPLETE } from '../data/foods'

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem('nutrition-entries') || '[]')
  } catch {
    return []
  }
}

function saveEntries(entries) {
  localStorage.setItem('nutrition-entries', JSON.stringify(entries))
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
      .filter(
        (food) =>
          food &&
          typeof food.name === 'string' &&
          food.name.toLowerCase().includes(query)
      )
      .slice(0, 8)
  }, [foodInput])

  const todayEntries = entries.filter(
    (entry) => entry.date === todayStr()
  )

  function selectFood(name) {
    setFoodInput(name)
    setShowSuggestions(false)
    setMessage('')
  }

  function addFood() {
    setMessage('')

    const name = foodInput.trim()
    const weight = Number(weightInput)

    if (!name) {
      setMessage('Please select a food.')
      return
    }

    if (!weight || weight <= 0) {
      setMessage('Please enter a valid weight in grams.')
      return
    }

    const food = FOOD_DB_COMPLETE.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    )

    if (!food) {
      setMessage('Please select a food from the search results.')
      return
    }

    const factor = weight / 100

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
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
    const nextEntries = entries.filter((entry) => entry.id !== id)
    setEntries(nextEntries)
    saveEntries(nextEntries)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        color: '#1c2b22',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#6d766d',
          }}
        >
          Add something you ate
        </div>

        <h1
          style={{
            margin: '4px 0 0',
            fontSize: '32px',
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          Log Food
        </h1>

        <p
          style={{
            margin: '8px 0 0',
            fontSize: '14px',
            color: '#7b847b',
          }}
        >
          Search your food, enter the weight and add it to today's log.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 420px) minmax(0, 1fr)',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Add Food */}
        <section
          style={{
            position: 'relative',
            zIndex: 5,
            border: '1px solid #dce1d8',
            borderRadius: '24px',
            background: '#ffffff',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(28,43,34,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#dceae3',
                color: '#356556',
              }}
            >
              <Utensils size={20} />
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                Add food
              </h2>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '12px',
                  color: '#7b847b',
                }}
              >
                190+ foods available
              </p>
            </div>
          </div>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#717a71',
              }}
            >
              Food
            </label>

            <div style={{ position: 'relative' }}>
              <Search
                size={17}
                style={{
                  position: 'absolute',
                  left: '13px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#929990',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              <input
                type="text"
                value={foodInput}
                onChange={(event) => {
                  setFoodInput(event.target.value)
                  setShowSuggestions(true)
                  setMessage('')
                }}
                onFocus={() => {
                  if (foodInput.trim()) {
                    setShowSuggestions(true)
                  }
                }}
                placeholder="Search rice, paneer, chips..."
                autoComplete="off"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '48px',
                  padding: '0 14px 0 40px',
                  border: '1px solid #dce1d8',
                  borderRadius: '12px',
                  outline: 'none',
                  background: '#fafbf9',
                  color: '#1c2b22',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {showSuggestions && foodInput.trim() && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '74px',
                  zIndex: 100,
                  maxHeight: '320px',
                  overflowY: 'auto',
                  border: '1px solid #dce1d8',
                  borderRadius: '12px',
                  background: '#ffffff',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
                }}
              >
                {suggestions.length > 0 ? (
                  suggestions.map((food) => (
                    <button
                      key={food.name}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectFood(food.name)}
                      style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: 0,
                        borderBottom: '1px solid #eef1ed',
                        background: '#ffffff',
                        padding: '12px 14px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: '#1c2b22',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {food.name}
                      </span>

                      <span
                        style={{
                          fontSize: '11px',
                          color: '#7b847b',
                        }}
                      >
                        {food.kcal} kcal / 100g
                      </span>
                    </button>
                  ))
                ) : (
                  <div
                    style={{
                      padding: '14px',
                      fontSize: '13px',
                      color: '#7b847b',
                    }}
                  >
                    No matching food found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Weight */}
          <div style={{ marginTop: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#717a71',
              }}
            >
              Weight
            </label>

            <div style={{ position: 'relative' }}>
              <input
                type="number"
                min="1"
                step="1"
                value={weightInput}
                onChange={(event) => {
                  setWeightInput(event.target.value)
                  setMessage('')
                }}
                placeholder="150"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '48px',
                  padding: '0 70px 0 14px',
                  border: '1px solid #dce1d8',
                  borderRadius: '12px',
                  outline: 'none',
                  background: '#fafbf9',
                  color: '#1c2b22',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />

              <span
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '12px',
                  color: '#7b847b',
                  pointerEvents: 'none',
                }}
              >
                grams
              </span>
            </div>
          </div>

          {/* Meal */}
          <div style={{ marginTop: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#717a71',
              }}
            >
              Meal
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}
            >
              {MEALS.map((item) => {
                const selected = meal === item

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMeal(item)}
                    style={{
                      height: '42px',
                      borderRadius: '10px',
                      border: selected
                        ? '1px solid #4b7b6d'
                        : '1px solid #dce1d8',
                      background: selected ? '#dceae3' : '#ffffff',
                      color: selected ? '#356556' : '#707970',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Add button */}
          <button
            type="button"
            onClick={addFood}
            style={{
              display: 'flex',
              width: '100%',
              height: '50px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '22px',
              border: '1px solid #29483a',
              borderRadius: '12px',
              background: '#1d3228',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(29,50,40,0.18)',
            }}
          >
            <Plus size={18} />
            Add food to today's log
          </button>

          {message && (
            <p
              style={{
                margin: '12px 0 0',
                textAlign: 'center',
                fontSize: '12px',
                color: message.includes('added') ? '#356556' : '#a24f38',
              }}
            >
              {message}
            </p>
          )}
        </section>

        {/* Today's Food */}
        <section
          style={{
            border: '1px solid #dce1d8',
            borderRadius: '24px',
            background: '#ffffff',
            padding: '24px',
            minHeight: '420px',
            boxShadow: '0 8px 30px rgba(28,43,34,0.05)',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '17px',
                fontWeight: 600,
              }}
            >
              Today's food
            </h2>

            <p
              style={{
                margin: '5px 0 0',
                fontSize: '12px',
                color: '#7b847b',
              }}
            >
              {todayEntries.length} item
              {todayEntries.length === 1 ? '' : 's'} logged
            </p>
          </div>

          {todayEntries.length === 0 ? (
            <div
              style={{
                minHeight: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '16px',
                    background: '#edf4ef',
                    color: '#4b7b6d',
                  }}
                >
                  <Utensils size={22} />
                </div>

                <p
                  style={{
                    margin: '16px 0 0',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  Nothing logged yet
                </p>

                <p
                  style={{
                    margin: '5px 0 0',
                    fontSize: '12px',
                    color: '#7b847b',
                  }}
                >
                  Add your first meal from the panel on the left.
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {todayEntries.map((entry) => (
                <div
                  key={entry.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    borderRadius: '16px',
                    background: '#f7f9f6',
                    padding: '16px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#8a9289',
                      }}
                    >
                      {entry.meal}
                    </div>

                    <div
                      style={{
                        marginTop: '5px',
                        fontSize: '14px',
                        fontWeight: 700,
                      }}
                    >
                      {entry.food}
                    </div>

                    <div
                      style={{
                        marginTop: '5px',
                        fontSize: '12px',
                        color: '#7b847b',
                      }}
                    >
                      {entry.weight} g · P {entry.protein}g · C {entry.carbs}g ·
                      {' '}F {entry.fat}g
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#d06d35',
                        }}
                      >
                        {entry.kcal}
                      </div>
                      <div
                        style={{
                          fontSize: '10px',
                          color: '#8a9289',
                        }}
                      >
                        kcal
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeEntry(entry.id)}
                      aria-label={`Remove ${entry.food}`}
                      style={{
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 0,
                        borderRadius: '9px',
                        background: 'transparent',
                        color: '#999f98',
                        cursor: 'pointer',
                      }}
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

      <style>{`
        @media (max-width: 1100px) {
          .food-log-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

import { useMemo } from 'react'
import {
  Utensils,
  ChefHat,
  MessageCircle,
  TrendingUp,
} from 'lucide-react'
import { motion } from 'framer-motion'
import SpinningBorderButton from './ui/spinning-border-button'

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

export default function Dashboard({ onNavigate }) {
  const entries = loadEntries()

  const today = todayStr()

  const todayEntries = useMemo(
    () => entries.filter((entry) => entry.date === today),
    [entries, today]
  )

  const totals = useMemo(
    () =>
      todayEntries.reduce(
        (total, entry) => ({
          kcal: total.kcal + Number(entry.kcal || 0),
          protein:
            total.protein + Number(entry.protein || 0),
          carbs:
            total.carbs + Number(entry.carbs || 0),
          fat: total.fat + Number(entry.fat || 0),
        }),
        {
          kcal: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        }
      ),
    [todayEntries]
  )

  const recentEntries = todayEntries.slice(-4).reverse()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >

      <div>
        <p className="text-sm font-medium text-[#6d766d]">
          Today
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
          Your nutrition
        </h1>

        <p className="mt-2 text-sm text-[#7b847b]">
          Here's everything you've logged today.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Stat
          label="Calories"
          value={Math.round(totals.kcal).toLocaleString()}
          unit="kcal"
          accent
        />

        <Stat
          label="Protein"
          value={totals.protein.toFixed(1)}
          unit="g"
        />

        <Stat
          label="Carbohydrates"
          value={totals.carbs.toFixed(1)}
          unit="g"
        />

        <Stat
          label="Fat"
          value={totals.fat.toFixed(1)}
          unit="g"
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">

        {/* Recent food */}
        <section className="rounded-3xl border border-[#dce1d8] bg-white p-6">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Today's meals
              </h2>

              <p className="mt-1 text-xs text-[#7b847b]">
                {todayEntries.length} food item
                {todayEntries.length === 1 ? '' : 's'}
              </p>
            </div>

            <SpinningBorderButton
              type="button"
              onClick={() => onNavigate('food')}
            >
              Log food
            </SpinningBorderButton>
          </div>

          {recentEntries.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf4ef] text-[#4b7b6d]">
                  <Utensils size={22} />
                </div>

                <p className="mt-4 text-sm font-medium">
                  Start logging your meals
                </p>

                <p className="mt-1 text-xs text-[#7b847b]">
                  Your food will appear here automatically.
                </p>

                <button
                  onClick={() => onNavigate('food')}
                  className="mt-4 text-xs font-semibold text-[#356556]"
                >
                  Add your first food →
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {recentEntries.map((entry) => (
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
                      {entry.weight} g · P {entry.protein}g
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-[#e27d3b]">
                    {entry.kcal} kcal
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* Quick actions */}
        <section className="rounded-3xl border border-[#dce1d8] bg-white p-6">

          <h2 className="font-semibold">
            Quick actions
          </h2>

          <p className="mt-1 text-xs text-[#7b847b]">
            What do you want to do?
          </p>

          <div className="mt-5 space-y-3">

            <Action
              icon={<Utensils size={18} />}
              title="Log food"
              text="Add something you ate"
              onClick={() => onNavigate('food')}
            />

            <Action
              icon={<ChefHat size={18} />}
              title="Healthy recipes"
              text="Find your next meal"
              onClick={() => onNavigate('recipes')}
            />

            <Action
              icon={<MessageCircle size={18} />}
              title="Nutrition Assistant"
              text="Ask about your nutrition"
              onClick={() => onNavigate('assistant')}
            />

          </div>

          <div className="mt-5 rounded-2xl bg-[#edf4ef] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#356556]">
              <TrendingUp size={15} />
              Keep your log consistent
            </div>

            <p className="mt-2 text-xs leading-5 text-[#668073]">
              The more meals you log, the more useful your nutrition history becomes.
            </p>
          </div>

        </section>

      </div>

    </motion.div>
  )
}

function Stat({
  label,
  value,
  unit,
  accent,
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-[#dce1d8] bg-white p-5"
    >
      <div className="text-sm text-[#7b847b]">
        {label}
      </div>

      <div
        className={[
          'mt-3 text-3xl font-semibold tracking-tight',
          accent
            ? 'text-[#e27d3b]'
            : 'text-[#1c2b22]',
        ].join(' ')}
      >
        {value}

        <span className="ml-1.5 text-sm font-normal text-[#7b847b]">
          {unit}
        </span>
      </div>
    </motion.div>
  )
}

function Action({
  icon,
  title,
  text,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-[#e2e6df] p-4 text-left transition hover:-translate-y-0.5 hover:bg-[#fafcf9]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dceae3] text-[#356556]">
        {icon}
      </div>

      <div>
        <div className="text-sm font-semibold">
          {title}
        </div>

        <div className="mt-0.5 text-xs text-[#7b847b]">
          {text}
        </div>
      </div>
    </button>
  )
}

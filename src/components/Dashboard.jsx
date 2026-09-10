import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ChefHat,
  MessageCircle,
  Utensils,
  Activity,
} from 'lucide-react'
import { ExperienceHero } from './ui/experience-hero'
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
          protein: total.protein + Number(entry.protein || 0),
          carbs: total.carbs + Number(entry.carbs || 0),
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

  const recentEntries = [...todayEntries].reverse().slice(0, 5)

  return (
    <div className="min-h-screen bg-[#020202] text-white">

      {/* 3D hero */}
      <ExperienceHero
        calories={totals.kcal}
        protein={totals.protein}
        carbs={totals.carbs}
        fat={totals.fat}
        onLogFood={() => onNavigate('food')}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 md:px-8"
      >

        {/* Section heading */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              LIVE NUTRITION DATA
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Today's overview
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('food')}
          >
            Log food
          </button>
        </div>

        {/* Stat grid */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

          <GlassStat
            id="001"
            label="CALORIES"
            value={Math.round(totals.kcal).toLocaleString()}
            unit="KCAL"
          />

          <GlassStat
            id="002"
            label="PROTEIN"
            value={totals.protein.toFixed(1)}
            unit="G"
          />

          <GlassStat
            id="003"
            label="CARBOHYDRATES"
            value={totals.carbs.toFixed(1)}
            unit="G"
          />

          <GlassStat
            id="004"
            label="FAT"
            value={totals.fat.toFixed(1)}
            unit="G"
          />

        </div>

        {/* Main panels */}
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.35fr_0.65fr]">

          {/* Meals */}
          <section className="glass-card min-h-[360px] p-5 md:p-7">

            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
                  005 // TODAY'S MEALS
                </div>

                <h3 className="mt-2 text-lg font-semibold">
                  Food log
                </h3>
              </div>

              <div className="font-mono text-[10px] text-white/25">
                {String(todayEntries.length).padStart(2, '0')} ITEMS
              </div>
            </div>

            {recentEntries.length === 0 ? (
              <div className="flex min-h-[250px] items-center justify-center text-center">

                <div>
                  <Activity
                    size={22}
                    className="mx-auto text-white/25"
                  />

                  <p className="mt-4 text-sm font-medium text-white/70">
                    No food logged yet
                  </p>

                  <p className="mt-2 max-w-xs text-xs leading-5 text-white/30">
                    Start your log and your meals will appear here.
                  </p>
                </div>

              </div>
            ) : (
              <div className="mt-6 space-y-2">

                {recentEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                    }}
                    className="group flex items-center justify-between border border-white/[0.06] bg-white/[0.025] px-4 py-4 transition hover:bg-white/[0.045]"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
                        {entry.meal}
                      </div>

                      <div className="mt-1 truncate text-sm font-medium text-white/85">
                        {entry.food}
                      </div>

                      <div className="mt-1 text-xs text-white/30">
                        {entry.weight}g · P {entry.protein}g · C {entry.carbs}g · F {entry.fat}g
                      </div>
                    </div>

                    <div className="ml-4 shrink-0 text-right">
                      <div className="font-mono text-sm text-white/80">
                        {entry.kcal}
                      </div>

                      <div className="font-mono text-[9px] uppercase tracking-widest text-white/25">
                        kcal
                      </div>
                    </div>
                  </motion.div>
                ))}

              </div>
            )}

          </section>

          {/* Quick actions */}
          <section className="glass-card p-5 md:p-7">

            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
              006 // QUICK ACCESS
            </div>

            <h3 className="mt-2 text-lg font-semibold">
              Explore
            </h3>

            <div className="mt-6 space-y-2">

              <QuickAction
                icon={<Utensils size={17} />}
                title="Log food"
                description="Add today's meals"
                onClick={() => onNavigate('food')}
              />

              <QuickAction
                icon={<ChefHat size={17} />}
                title="Healthy recipes"
                description="Find your next meal"
                onClick={() => onNavigate('recipes')}
              />

              <QuickAction
                icon={<MessageCircle size={17} />}
                title="Nutrition AI"
                description="Ask about your nutrition"
                onClick={() => onNavigate('assistant')}
              />

            </div>

            <div className="mt-5 border-t border-white/[0.07] pt-5">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                SYSTEM STATUS
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Tracker active
              </div>
            </div>

          </section>

        </div>

        {/* Lower stats strip */}
        <section className="glass-card mt-3 p-5 md:p-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
                007 // DAILY SIGNAL
              </div>

              <h3 className="mt-2 text-lg font-semibold">
                Your nutrition history
              </h3>

              <p className="mt-1 text-xs text-white/30">
                Keep logging meals to build a useful weekly pattern.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('food')}
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition hover:text-white"
            >
              Open food log
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

          </div>

          <div className="mt-7 grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-16 border border-white/[0.05] bg-white/[0.02]"
              />
            ))}
          </div>

        </section>

      </motion.div>

      <style>{`
        .glass-card {
          border: 1px solid rgba(255,255,255,0.09);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.018)
            );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 20px 60px rgba(0,0,0,0.2);
        }
      `}</style>

    </div>
  )
}

function GlassStat({
  id,
  label,
  value,
  unit,
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-5"
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
        {id} // {label}
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div className="text-3xl font-semibold tracking-[-0.04em] text-white">
          {value}
        </div>

        <div className="font-mono text-[10px] text-white/30">
          {unit}
        </div>
      </div>

      <div className="mt-5 h-px bg-white/[0.07]" />
    </motion.div>
  )
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 border border-white/[0.07] bg-white/[0.02] p-3.5 text-left transition-all hover:border-white/[0.16] hover:bg-white/[0.05]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/[0.08] bg-white/[0.03] text-white/60 transition group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <div className="text-sm font-medium text-white/80">
          {title}
        </div>

        <div className="mt-0.5 text-xs text-white/30">
          {description}
        </div>
      </div>

      <ArrowUpRight
        size={14}
        className="ml-auto text-white/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60"
      />
    </button>
  )
}

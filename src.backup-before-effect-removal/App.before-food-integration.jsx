import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Utensils,
  ChefHat,
  MessageCircle,
  Settings,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'

const navigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'food',
    label: 'Log Food',
    icon: Utensils,
  },
  {
    id: 'recipes',
    label: 'Healthy Recipes',
    icon: ChefHat,
  },
  {
    id: 'assistant',
    label: 'Nutrition Assistant',
    icon: MessageCircle,
  },
]

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeItem =
    navigation.find((item) => item.id === activePage) ?? navigation[0]

  function navigate(id) {
    setActivePage(id)
    setMobileOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f3f5f0] text-[#1c2b22]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] border-r border-[#dce1d8] bg-white md:block">
        <Sidebar activePage={activePage} navigate={navigate} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : -280 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed inset-y-0 left-0 z-50 w-[260px] border-r border-[#dce1d8] bg-white md:hidden"
      >
        <div className="flex items-center justify-between p-5">
          <Brand />

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-[#6f786f] hover:bg-[#f2f4f0]"
          >
            <X size={20} />
          </button>
        </div>

        <Navigation
          activePage={activePage}
          navigate={navigate}
        />
      </motion.aside>

      {/* Main application */}
      <div className="min-h-screen md:pl-[250px]">
        <header className="sticky top-0 z-30 border-b border-[#dce1d8] bg-white/90 backdrop-blur">
          <div className="flex h-[76px] items-center justify-between px-5 md:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl p-2 text-[#6f786f] hover:bg-[#f2f4f0] md:hidden"
              >
                <Menu size={22} />
              </button>

              <div>
                <div className="text-lg font-semibold tracking-tight">
                  {activeItem.label}
                </div>

                <div className="hidden text-sm text-[#7b847b] sm:block">
                  Your everyday nutrition companion
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('assistant')}
              className="flex items-center gap-2 rounded-xl bg-[#1c2b22] px-3.5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#355d50]"
            >
              <Sparkles size={16} />
              <span className="hidden sm:inline">Ask Nutri AI</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] p-5 md:p-8">
          {activePage === 'dashboard' && (
            <Dashboard onNavigate={navigate} />
          )}

          {activePage === 'food' && (
            <PagePlaceholder
              title="Log Food"
              description="Your existing food logger will be connected here."
            />
          )}

          {activePage === 'recipes' && (
            <PagePlaceholder
              title="Healthy Recipes"
              description="Your recipe library will be transformed into a full recipe experience here."
            />
          )}

          {activePage === 'assistant' && (
            <PagePlaceholder
              title="Nutrition Assistant"
              description="Your nutrition chatbot will live here."
            />
          )}
        </main>
      </div>
    </div>
  )
}

function Brand() {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight">
        Nutri<span className="text-[#4b7b6d]">Track</span>
      </div>

      <div className="mt-1 text-xs text-[#7b847b]">
        Nutrition made simple
      </div>
    </div>
  )
}

function Sidebar({ activePage, navigate }) {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="mb-10">
        <Brand />
      </div>

      <Navigation
        activePage={activePage}
        navigate={navigate}
      />

      <div className="mt-auto border-t border-[#e5e8e2] pt-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#6f786f] transition hover:bg-[#f3f5f0] hover:text-[#1c2b22]">
          <Settings size={19} />
          Settings
        </button>

        <div className="mt-4 rounded-2xl bg-[#edf4ef] p-4">
          <div className="text-xs font-semibold text-[#356556]">
            Nutri AI
          </div>

          <div className="mt-1 text-xs leading-5 text-[#668073]">
            Ask questions about your meals, protein and recipes.
          </div>

          <button
            onClick={() => navigate('assistant')}
            className="mt-3 text-xs font-semibold text-[#356556]"
          >
            Open assistant →
          </button>
        </div>
      </div>
    </div>
  )
}

function Navigation({ activePage, navigate }) {
  return (
    <nav className="space-y-1.5">
      {navigation.map((item) => {
        const Icon = item.icon
        const active = activePage === item.id

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={[
              'group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all',
              active
                ? 'bg-[#dceae3] text-[#356556]'
                : 'text-[#727b72] hover:bg-[#f4f6f2] hover:text-[#1c2b22]',
            ].join(' ')}
          >
            <Icon
              size={19}
              className={[
                'transition-transform',
                active ? 'scale-105' : 'group-hover:scale-105',
              ].join(' ')}
            />

            {item.label}
          </button>
        )
      })}
    </nav>
  )
}

function Dashboard({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <p className="text-sm font-medium text-[#6d766d]">
          Today
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
          Good evening 👋
        </h1>

        <p className="mt-2 text-sm text-[#7b847b] md:text-base">
          Here's a simple look at your nutrition today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <NutritionCard
          label="Calories"
          value="1,420"
          unit="kcal"
          accent="orange"
        />

        <NutritionCard
          label="Protein"
          value="72"
          unit="g"
        />

        <NutritionCard
          label="Carbohydrates"
          value="180"
          unit="g"
        />

        <NutritionCard
          label="Fat"
          value="46"
          unit="g"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-[#dce1d8] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Today's meals
              </h2>

              <p className="mt-1 text-sm text-[#7b847b]">
                Everything you've logged today.
              </p>
            </div>

            <button
              onClick={() => onNavigate('food')}
              className="rounded-xl bg-[#1c2b22] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#355d50]"
            >
              Log food
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <MealRow
              meal="Breakfast"
              food="Eggs + Roti"
              calories="340 kcal"
            />

            <MealRow
              meal="Lunch"
              food="Chicken Curry + Rice"
              calories="520 kcal"
            />

            <MealRow
              meal="Snack"
              food="Banana + Almonds"
              calories="280 kcal"
            />

            <MealRow
              meal="Dinner"
              food="Not logged"
              calories="—"
              muted
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#dce1d8] bg-white p-6">
          <div>
            <h2 className="text-lg font-semibold">
              Quick actions
            </h2>

            <p className="mt-1 text-sm text-[#7b847b]">
              Jump straight into what you need.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <QuickAction
              icon={<Utensils size={18} />}
              title="Log a food"
              description="Add something you just ate"
              onClick={() => onNavigate('food')}
            />

            <QuickAction
              icon={<ChefHat size={18} />}
              title="Find a recipe"
              description="Browse healthy meal ideas"
              onClick={() => onNavigate('recipes')}
            />

            <QuickAction
              icon={<MessageCircle size={18} />}
              title="Ask Nutri AI"
              description="Get help with your nutrition"
              onClick={() => onNavigate('assistant')}
            />
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-[#dce1d8] bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Weekly calorie trend
            </h2>

            <p className="mt-1 text-sm text-[#7b847b]">
              Your last seven days at a glance.
            </p>
          </div>

          <span className="rounded-full bg-[#edf4ef] px-3 py-1.5 text-xs font-semibold text-[#356556]">
            Last 7 days
          </span>
        </div>

        <div className="mt-8 flex h-[220px] items-end gap-3 sm:gap-5">
          {[58, 82, 66, 92, 75, 48, 84].map((height, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-3"
            >
              <div className="flex h-full w-full items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                  }}
                  className="w-full rounded-t-2xl bg-[#7da497] transition hover:bg-[#4b7b6d]"
                />
              </div>

              <span className="text-xs text-[#7b847b]">
                {['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'][index]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

function NutritionCard({ label, value, unit, accent }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-[#dce1d8] bg-white p-5"
    >
      <div className="text-sm text-[#7b847b]">
        {label}
      </div>

      <div
        className={[
          'mt-3 text-3xl font-semibold tracking-tight',
          accent === 'orange'
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

function MealRow({ meal, food, calories, muted }) {
  return (
    <div
      className={[
        'flex items-center justify-between rounded-2xl px-4 py-3.5',
        muted ? 'bg-[#fafbf9]' : 'bg-[#f6f8f4]',
      ].join(' ')}
    >
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a9289]">
          {meal}
        </div>

        <div
          className={[
            'mt-1 text-sm font-medium',
            muted ? 'text-[#a1a89f]' : 'text-[#1c2b22]',
          ].join(' ')}
        >
          {food}
        </div>
      </div>

      <div
        className={[
          'text-sm font-semibold',
          muted ? 'text-[#a1a89f]' : 'text-[#356556]',
        ].join(' ')}
      >
        {calories}
      </div>
    </div>
  )
}

function QuickAction({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-2xl border border-[#e2e6df] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#b8cbc2] hover:bg-[#fafcf9]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dceae3] text-[#356556]">
        {icon}
      </div>

      <div>
        <div className="text-sm font-semibold">
          {title}
        </div>

        <div className="mt-0.5 text-xs text-[#7b847b]">
          {description}
        </div>
      </div>
    </button>
  )
}

function PagePlaceholder({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-[#dce1d8] bg-white p-8"
    >
      <h1 className="text-3xl font-semibold tracking-tight">
        {title}
      </h1>

      <p className="mt-2 text-[#7b847b]">
        {description}
      </p>
    </motion.div>
  )
}

export default App

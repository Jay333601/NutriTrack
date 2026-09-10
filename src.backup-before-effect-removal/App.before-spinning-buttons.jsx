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

import Dashboard from './components/Dashboard'
import { ExperienceHero } from './components/ui/experience-hero'
import FoodLogger from './components/FoodLogger'

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

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeItem =
    navigation.find((item) => item.id === activePage) ??
    navigation[0]

  function navigate(page) {
    setActivePage(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#f3f5f0] text-[#1c2b22]">

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] border-r border-[#dce1d8] bg-white md:block">
        <Sidebar
          activePage={activePage}
          navigate={navigate}
        />
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
        animate={{
          x: mobileOpen ? 0 : -280,
        }}
        transition={{
          duration: 0.25,
          ease: 'easeOut',
        }}
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

      {/* Main app */}
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

              <span className="hidden sm:inline">
                Ask Nutri AI
              </span>
            </button>

          </div>
        </header>

        <main className="relative z-20 mx-auto max-w-[1400px] p-5 md:p-8">

          {activePage === 'dashboard' && (
            <div className="-mx-5 -mt-8 md:-mx-8">
              <ExperienceHero onLogFood={() => navigate('food')} />
              <div className="mx-auto max-w-[1400px] p-5 md:p-8">
                <Dashboard onNavigate={navigate} />
              </div>
            </div>
          )}

          {activePage === 'food' && (
            <FoodLogger />
          )}

          {activePage === 'recipes' && (
            <Placeholder
              title="Healthy Recipes"
              description="We'll connect your recipe library here next."
            />
          )}

          {activePage === 'assistant' && (
            <Placeholder
              title="Nutrition Assistant"
              description="We'll connect the nutrition assistant here next."
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

function Sidebar({
  activePage,
  navigate,
}) {
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

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#6f786f] hover:bg-[#f3f5f0] hover:text-[#1c2b22]">
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

        </div>
      </div>
    </div>
  )
}

function Navigation({
  activePage,
  navigate,
}) {
  return (
    <nav className="space-y-1.5">

      {navigation.map((item) => {
        const Icon = item.icon

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={[
              'group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all',
              activePage === item.id
                ? 'bg-[#dceae3] text-[#356556]'
                : 'text-[#727b72] hover:bg-[#f4f6f2] hover:text-[#1c2b22]',
            ].join(' ')}
          >
            <Icon size={19} />

            {item.label}
          </button>
        )
      })}

    </nav>
  )
}

function Placeholder({
  title,
  description,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
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

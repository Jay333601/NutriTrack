import { useMemo, useState } from 'react'
import { Bot, Send, Sparkles, Utensils } from 'lucide-react'
import { ALL_RECIPES } from '../NutritionTracker'
import { FOOD_DB_COMPLETE } from '../data/foods'

function getTodayEntries() {
  try {
    const entries = JSON.parse(
      localStorage.getItem('nutrition-entries') || '[]'
    )

    const today = new Date().toISOString().slice(0, 10)

    return Array.isArray(entries)
      ? entries.filter((entry) => entry?.date === today)
      : []
  } catch {
    return []
  }
}

export default function NutritionAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hey! I'm your Nutri AI assistant. Ask me about today's meals, protein, calories, or what you could eat next.",
    },
  ])

  const [input, setInput] = useState('')

  const todayEntries = useMemo(() => getTodayEntries(), [messages])

  const totals = useMemo(() => {
    return todayEntries.reduce(
      (total, entry) => ({
        kcal: total.kcal + Number(entry?.kcal || 0),
        protein: total.protein + Number(entry?.protein || 0),
        carbs: total.carbs + Number(entry?.carbs || 0),
        fat: total.fat + Number(entry?.fat || 0),
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }, [todayEntries])

  function generateReply(question) {
    const q = question.toLowerCase()

    if (
      q.includes('today') ||
      q.includes('eaten') ||
      q.includes('logged')
    ) {
      if (todayEntries.length === 0) {
        return "You haven't logged any food today yet. Start in Log Food and I'll use your meals here."
      }

      return `Today you've logged ${todayEntries.length} item${todayEntries.length === 1 ? '' : 's'}: ${Math.round(totals.kcal)} kcal, ${totals.protein.toFixed(1)}g protein, ${totals.carbs.toFixed(1)}g carbs and ${totals.fat.toFixed(1)}g fat.`
    }

    if (q.includes('protein')) {
      return `You've logged ${totals.protein.toFixed(1)}g protein today. For your next meal, a protein-focused option such as paneer, eggs, dal, chicken, curd or sprouts can be useful.`
    }

    if (q.includes('calorie') || q.includes('calories') || q.includes('kcal')) {
      return `Your current logged total is ${Math.round(totals.kcal)} kcal today. Your appropriate calorie target depends on your body size, activity and goal, so treat this as a tracking number rather than a medical target.`
    }

    if (
      q.includes('what should i eat') ||
      q.includes('what can i eat') ||
      q.includes('next meal') ||
      q.includes('recommend')
    ) {
      const picks = ALL_RECIPES
        .filter(Boolean)
        .slice(0, 3)
        .map((recipe) => recipe.name)
        .join(', ')

      return `A few good recipe ideas from your library are ${picks}. I can narrow this down further by protein, calories, meal type or cuisine.`
    }

    if (q.includes('healthy')) {
      return 'A balanced meal usually works well when it includes a protein source, vegetables or fruit, a sensible carbohydrate source, and enough fluids. Your recipe section has several practical options.'
    }

    if (q.includes('food')) {
      return `Your database currently contains ${FOOD_DB_COMPLETE.length} food entries, including Indian dishes and common snacks. You can search them from Log Food.`
    }

    return "I can help with your logged nutrition, protein, calories, food choices and recipes. Try asking “What have I eaten today?”, “How much protein have I logged?”, or “What should I eat next?”"
  }

  function sendMessage(text = input) {
    const question = text.trim()

    if (!question) return

    const reply = generateReply(question)

    setMessages((current) => [
      ...current,
      { role: 'user', text: question },
      { role: 'assistant', text: reply },
    ])

    setInput('')
  }

  const suggestions = [
    'What have I eaten today?',
    'How much protein have I logged?',
    'What should I eat next?',
    'Show me healthy options.',
  ]

  return (
    <div className="space-y-7 text-white">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
            <Bot size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Smart nutrition
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Nutrition Assistant
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
          Ask questions about your logged food, nutrition and recipe choices.
        </p>
      </div>

      {/* Today summary */}
      <div className="grid gap-3 sm:grid-cols-4">
        <MiniStat label="Calories" value={`${Math.round(totals.kcal)}`} />
        <MiniStat label="Protein" value={`${totals.protein.toFixed(1)}g`} />
        <MiniStat label="Carbs" value={`${totals.carbs.toFixed(1)}g`} />
        <MiniStat label="Fat" value={`${totals.fat.toFixed(1)}g`} />
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl">
        {/* Chat */}
        <div className="min-h-[440px] space-y-5 p-5 md:p-7">
          {messages.map((message, index) => (
            <div
              key={index}
              className={[
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start',
              ].join(' ')}
            >
              <div
                className={[
                  'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6',
                  message.role === 'user'
                    ? 'bg-white text-black'
                    : 'border border-white/10 bg-black/30 text-white/60',
                ].join(' ')}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/30">
            <Sparkles size={13} />
            Suggested questions
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/45 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(event) => {
            event.preventDefault()
            sendMessage()
          }}
          className="border-t border-white/10 p-4"
        >
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 focus-within:border-white/20">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask Nutri AI something..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/25"
            />

            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-30"
              disabled={!input.trim()}
            >
              <Send size={16} />
            </button>
          </div>

          <p className="mt-3 text-[10px] text-white/20">
            Nutri AI is for nutrition guidance and tracking, not diagnosis or
            medical advice.
          </p>
        </form>
      </div>
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="text-[10px] uppercase tracking-[0.12em] text-white/25">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  )
}

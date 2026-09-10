import { useMemo, useState } from 'react'
import { ChefHat, Clock3, Flame, Search, X } from 'lucide-react'
import { ALL_RECIPES } from '../NutritionTracker'

function nutritionValue(recipe, key, fallback = 0) {
  if (recipe?.[key] != null) return recipe[key]
  if (recipe?.nutrition?.[key] != null) return recipe.nutrition[key]
  return fallback
}

function recipeIngredients(recipe) {
  if (Array.isArray(recipe?.ingredients)) return recipe.ingredients
  return []
}

function recipeInstructions(recipe) {
  if (Array.isArray(recipe?.instructions)) return recipe.instructions
  if (Array.isArray(recipe?.steps)) return recipe.steps
  return []
}

export default function HealthyRecipes() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(
        ALL_RECIPES
          .map((recipe) => recipe?.category)
          .filter(Boolean)
      ),
    ]
  }, [])

  const filteredRecipes = useMemo(() => {
    const q = query.trim().toLowerCase()

    return ALL_RECIPES.filter((recipe) => {
      if (!recipe) return false

      const matchesCategory =
        category === 'All' || recipe.category === category

      const searchable = [
        recipe.name,
        recipe.category,
        recipe.description,
        ...(recipe.ingredients || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return matchesCategory && (!q || searchable.includes(q))
    })
  }, [query, category])

  return (
    <div className="space-y-7 text-white">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
            <ChefHat size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Eat better
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Healthy Recipes
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
          Simple recipes for better nutrition, from high-protein meals to
          practical Indian favourites.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
          />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search recipes, paneer, chicken, oats..."
            className="w-full rounded-2xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/20"
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={[
                'whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all',
                category === item
                  ? 'border-white/20 bg-white text-black'
                  : 'border-white/10 bg-white/[0.03] text-white/45 hover:bg-white/[0.08] hover:text-white',
              ].join(' ')}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-white/30">
        {filteredRecipes.length} recipe
        {filteredRecipes.length === 1 ? '' : 's'}
      </div>

      {/* Recipe cards */}
      {filteredRecipes.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-12 text-center">
          <ChefHat className="mx-auto text-white/20" size={32} />
          <p className="mt-4 text-sm font-medium text-white/70">
            No recipes found
          </p>
          <p className="mt-1 text-xs text-white/30">
            Try another ingredient or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe, index) => {
            const kcal = nutritionValue(recipe, 'kcal')
            const protein = nutritionValue(recipe, 'protein')
            const carbs = nutritionValue(recipe, 'carbs')
            const fat = nutritionValue(recipe, 'fat')

            return (
              <button
                key={`${recipe.name}-${index}`}
                type="button"
                onClick={() => setSelectedRecipe(recipe)}
                className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                      {recipe.category || 'Healthy'}
                    </div>

                    <h2 className="mt-2 text-lg font-semibold text-white">
                      {recipe.name}
                    </h2>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-2.5 text-white/50">
                    <ChefHat size={17} />
                  </div>
                </div>

                {recipe.description && (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/40">
                    {recipe.description}
                  </p>
                )}

                <div className="mt-5 grid grid-cols-4 gap-2">
                  <Stat label="Kcal" value={kcal} />
                  <Stat label="Protein" value={`${protein}g`} />
                  <Stat label="Carbs" value={`${carbs}g`} />
                  <Stat label="Fat" value={`${fat}g`} />
                </div>

                <div className="mt-5 text-xs font-medium text-white/35 transition group-hover:text-white/60">
                  View recipe →
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Detail modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-5 backdrop-blur-md"
          onMouseDown={() => setSelectedRecipe(null)}
        >
          <div
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                  {selectedRecipe.category || 'Healthy'}
                </div>

                <h2 className="mt-2 text-2xl font-semibold">
                  {selectedRecipe.name}
                </h2>

                {selectedRecipe.description && (
                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {selectedRecipe.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/45 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <DetailStat
                icon={<Flame size={15} />}
                label="Calories"
                value={nutritionValue(selectedRecipe, 'kcal')}
              />
              <DetailStat
                label="Protein"
                value={`${nutritionValue(selectedRecipe, 'protein')}g`}
              />
              <DetailStat
                label="Carbs"
                value={`${nutritionValue(selectedRecipe, 'carbs')}g`}
              />
              <DetailStat
                label="Fat"
                value={`${nutritionValue(selectedRecipe, 'fat')}g`}
              />
            </div>

            {selectedRecipe.time && (
              <div className="mt-3 flex items-center gap-2 text-xs text-white/35">
                <Clock3 size={14} />
                {selectedRecipe.time}
              </div>
            )}

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">Ingredients</h3>

                {recipeIngredients(selectedRecipe).length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {recipeIngredients(selectedRecipe).map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-white/55"
                      >
                        {typeof item === 'string'
                          ? item
                          : item?.name || JSON.stringify(item)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-white/30">
                    Ingredients are included in the recipe data.
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold">Instructions</h3>

                {recipeInstructions(selectedRecipe).length > 0 ? (
                  <div className="mt-3 space-y-3">
                    {recipeInstructions(selectedRecipe).map((step, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                          {index + 1}
                        </div>

                        <p className="pt-1 text-sm leading-6 text-white/50">
                          {typeof step === 'string'
                            ? step
                            : step?.text || JSON.stringify(step)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-white/30">
                    Cooking instructions are included in the recipe data.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/20 p-2.5">
      <div className="text-[9px] uppercase tracking-[0.12em] text-white/25">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white/80">
        {value}
      </div>
    </div>
  )
}

function DetailStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center gap-2 text-white/30">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  )
}

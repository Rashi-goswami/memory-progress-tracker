
import { useEffect, useState } from 'react'
import {
  Plus,
  Trash2,
  Trophy,
  Target,
  Star,
  Award,
  Sparkles,
} from 'lucide-react'

type Achievement = {
  id: string
  title: string
  category: string
  description: string
  targetDate: string
  completed: boolean
  unlockedDate: string | null
}

const STORAGE_KEY = 'mpt-achievements'

const categories = [
  'Cybersecurity',
  'DSA',
  'Academics',
  'Game Development',
  'Personal',
  'Other',
]

function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Cybersecurity')
  const [description, setDescription] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements))
  }, [achievements])

  function addAchievement(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title.trim()) return

    const newAchievement: Achievement = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category,
      description: description.trim(),
      targetDate,
      completed: false,
      unlockedDate: null,
    }

    setAchievements(previous => [newAchievement, ...previous])
    setTitle('')
    setDescription('')
    setTargetDate('')
  }

  function toggleAchievement(id: string) {
    setAchievements(previous =>
      previous.map(item => {
        if (item.id !== id) return item

        const completed = !item.completed

        return {
          ...item,
          completed,
          unlockedDate: completed
            ? new Date().toISOString().slice(0, 10)
            : null,
        }
      })
    )
  }

  function deleteAchievement(id: string) {
    setAchievements(previous =>
      previous.filter(item => item.id !== id)
    )
  }

  const completedCount = achievements.filter(
    item => item.completed
  ).length

  const pendingCount = achievements.length - completedCount

  const filteredAchievements = achievements.filter(item => {
    if (filter === 'Unlocked') return item.completed
    if (filter === 'In progress') return !item.completed
    return true
  })

  const categoryStats = categories.map(name => ({
    name,
    total: achievements.filter(item => item.category === name).length,
    completed: achievements.filter(
      item => item.category === name && item.completed
    ).length,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Achievements</h2>
        <p className="mt-1 text-sm text-slate-400">
          Celebrate milestones and keep track of how far you've come.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Target className="mb-3 text-cyan-400" size={22} />
          <p className="text-sm text-slate-400">Total achievements</p>
          <p className="mt-2 text-3xl font-bold">{achievements.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Trophy className="mb-3 text-amber-400" size={22} />
          <p className="text-sm text-slate-400">Unlocked</p>
          <p className="mt-2 text-3xl font-bold">{completedCount}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Star className="mb-3 text-violet-400" size={22} />
          <p className="text-sm text-slate-400">In progress</p>
          <p className="mt-2 text-3xl font-bold">{pendingCount}</p>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="mb-5 font-semibold">Progress by category</h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {categoryStats.map(item => {
            const progress = item.total
              ? Math.round((item.completed / item.total) * 100)
              : 0

            return (
              <div key={item.name}>
                <div className="mb-2 flex justify-between gap-2">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-slate-400">
                    {item.completed}/{item.total}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-cyan-400 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {progress}% unlocked
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <form
        onSubmit={addAchievement}
        className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="text-amber-400" size={20} />
          <h3 className="font-semibold">Add an achievement</h3>
        </div>

        <label className="block text-sm text-slate-300">
          Achievement title
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="e.g. Complete my first TryHackMe room"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          />
        </label>

        <label className="block text-sm text-slate-300">
          Category
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          >
            {categories.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          Description
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe what you want to achieve..."
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          />
        </label>

        <label className="block text-sm text-slate-300">
          Target date (optional)
          <input
            type="date"
            value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          />
        </label>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add achievement
        </button>
      </form>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold">My achievements</h3>

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm text-white"
          >
            <option>All</option>
            <option>Unlocked</option>
            <option>In progress</option>
          </select>
        </div>

        {filteredAchievements.length === 0 ? (
          <div className="py-8 text-center">
            <Award className="mx-auto mb-3 text-slate-600" size={32} />
            <p className="text-sm text-slate-500">
              No achievements here yet. Add your first milestone above!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAchievements.map(item => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{item.title}</p>

                    {item.completed && (
                      <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-400">
                        Unlocked
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="mt-1 text-sm text-slate-400">
                      {item.description}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-slate-500">
                    {item.category}
                    {item.targetDate && ` · Target: ${item.targetDate}`}
                  </p>

                  {item.unlockedDate && (
                    <p className="mt-1 text-xs text-emerald-400">
                      Unlocked on: {item.unlockedDate}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleAchievement(item.id)}
                    className="mt-3 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    {item.completed
                      ? 'Mark as in progress'
                      : 'Mark as unlocked'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => deleteAchievement(item.id)}
                  aria-label={`Delete ${item.title}`}
                  className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Achievements

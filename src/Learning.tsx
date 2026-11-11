
import { useEffect, useState } from 'react'
import {
  Plus,
  Trash2,
  Shield,
  Code2,
  BookOpen,
  Gamepad2,
  Trophy,
  Target,
} from 'lucide-react'

type LearningEntry = {
  id: string
  category: string
  title: string
  description: string
  date: string
  completed: boolean
}

const STORAGE_KEY = 'mpt-learning-entries'

const categories = [
  { name: 'Cybersecurity', icon: Shield, color: 'text-cyan-400' },
  { name: 'DSA', icon: Code2, color: 'text-violet-400' },
  { name: 'CS Fundamentals', icon: BookOpen, color: 'text-emerald-400' },
  { name: 'Game Development', icon: Gamepad2, color: 'text-amber-400' },
]

function Learning() {
  const [entries, setEntries] = useState<LearningEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  const [category, setCategory] = useState('Cybersecurity')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  function addEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title.trim()) return

    const newEntry: LearningEntry = {
      id: crypto.randomUUID(),
      category,
      title: title.trim(),
      description: description.trim(),
      date: new Date().toISOString().slice(0, 10),
      completed: false,
    }

    setEntries(previous => [newEntry, ...previous])
    setTitle('')
    setDescription('')
  }

  function toggleComplete(id: string) {
    setEntries(previous =>
      previous.map(entry =>
        entry.id === id
          ? { ...entry, completed: !entry.completed }
          : entry
      )
    )
  }

  function deleteEntry(id: string) {
    setEntries(previous =>
      previous.filter(entry => entry.id !== id)
    )
  }

  const completedCount = entries.filter(e => e.completed).length
  const pendingCount = entries.length - completedCount

  const filteredEntries =
    filter === 'All'
      ? entries
      : entries.filter(entry => entry.category === filter)

  const categoryStats = categories.map(item => {
    const categoryEntries = entries.filter(
      entry => entry.category === item.name
    )

    return {
      ...item,
      total: categoryEntries.length,
      completed: categoryEntries.filter(e => e.completed).length,
    }
  })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Learning Tracker</h2>
        <p className="mt-1 text-sm text-slate-400">
          Track what you learn, practise and complete.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Target className="mb-3 text-cyan-400" size={22} />
          <p className="text-sm text-slate-400">Total learning goals</p>
          <p className="mt-2 text-3xl font-bold">{entries.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Trophy className="mb-3 text-emerald-400" size={22} />
          <p className="text-sm text-slate-400">Completed</p>
          <p className="mt-2 text-3xl font-bold">{completedCount}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <BookOpen className="mb-3 text-amber-400" size={22} />
          <p className="text-sm text-slate-400">In progress</p>
          <p className="mt-2 text-3xl font-bold">{pendingCount}</p>
        </div>

      </div>

      {/* Category progress */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="mb-5 font-semibold">Learning areas</h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {categoryStats.map(item => {
            const Icon = item.icon
            const progress = item.total
              ? Math.round((item.completed / item.total) * 100)
              : 0

            return (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={19} className={item.color} />
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  </div>

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
                  {progress}% completed
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Add learning goal */}
      <form
        onSubmit={addEntry}
        className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
      >
        <h3 className="font-semibold">Add learning activity</h3>

        <label className="block text-sm text-slate-300">
          Category
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          >
            {categories.map(item => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          Topic or task
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Complete SQL injection lab"
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          />
        </label>

        <label className="block text-sm text-slate-300">
          Description (optional)
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What did you learn or practise?"
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          />
        </label>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add learning activity
        </button>
      </form>

      {/* Activity history */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold">Learning history</h3>

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm text-white"
          >
            <option>All</option>
            {categories.map(item => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </div>

        {filteredEntries.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No learning activities yet. Add your first one above.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map(entry => (
              <div
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{entry.title}</p>

                  {entry.description && (
                    <p className="mt-1 text-sm text-slate-400">
                      {entry.description}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-slate-500">
                    {entry.category} · {entry.date}
                  </p>

                  <button
                    onClick={() => toggleComplete(entry.id)}
                    className="mt-2 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    {entry.completed
                      ? 'Completed ✓'
                      : 'Mark as completed'}
                  </button>
                </div>

                <button
                  onClick={() => deleteEntry(entry.id)}
                  aria-label="Delete learning activity"
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

export default Learning

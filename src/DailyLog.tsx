
import { useEffect, useState } from 'react'
import { Plus, Trash2, Clock3, CheckCircle2 } from 'lucide-react'

type LogEntry = {
  id: string
  date: string
  category: string
  task: string
  hours: number
  completed: boolean
}

const STORAGE_KEY = 'mpt-daily-logs'

function DailyLog() {
  const [entries, setEntries] = useState<LogEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [category, setCategory] = useState('Cybersecurity')
  const [task, setTask] = useState('')
  const [hours, setHours] = useState('1')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  function addEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!task.trim() || Number(hours) <= 0) return

    const newEntry: LogEntry = {
      id: crypto.randomUUID(),
      date,
      category,
      task: task.trim(),
      hours: Number(hours),
      completed: false,
    }

    setEntries((previous) => [newEntry, ...previous])
    setTask('')
    setHours('1')
  }

  function deleteEntry(id: string) {
    setEntries((previous) => previous.filter((entry) => entry.id !== id))
  }

  function toggleComplete(id: string) {
    setEntries((previous) =>
      previous.map((entry) =>
        entry.id === id
          ? { ...entry, completed: !entry.completed }
          : entry
      )
    )
  }

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)
  const completedTasks = entries.filter((entry) => entry.completed).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Daily Log</h2>
        <p className="mt-1 text-sm text-slate-400">
          Record your work and track your consistency.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Clock3 className="mb-3 text-cyan-400" />
          <p className="text-sm text-slate-400">Total hours logged</p>
          <p className="mt-2 text-3xl font-bold">{totalHours} hrs</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <CheckCircle2 className="mb-3 text-emerald-400" />
          <p className="text-sm text-slate-400">Completed tasks</p>
          <p className="mt-2 text-3xl font-bold">{completedTasks}</p>
        </div>
      </div>

      <form
        onSubmit={addEntry}
        className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
      >
        <h3 className="font-semibold">Add an activity</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-300">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </label>

          <label className="text-sm text-slate-300">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            >
              <option>Cybersecurity</option>
              <option>DSA</option>
              <option>CS Fundamentals</option>
              <option>Game Development</option>
              <option>Academics</option>
              <option>Health</option>
              <option>Portfolio</option>
            </select>
          </label>

          <label className="text-sm text-slate-300 sm:col-span-2">
            What did you work on?
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. Completed a TryHackMe lab"
              required
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </label>

          <label className="text-sm text-slate-300">
            Time spent (hours)
            <input
              type="number"
              min="0.25"
              max="24"
              step="0.25"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add activity
        </button>
      </form>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="mb-4 font-semibold">Activity history</h3>

        {entries.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No activities yet. Add your first activity above.
          </p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex-1">
                  <p className="font-medium">{entry.task}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {entry.category} · {entry.date} · {entry.hours} hrs
                  </p>
                  <button
                    onClick={() => toggleComplete(entry.id)}
                    className="mt-2 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    {entry.completed ? 'Completed ✓' : 'Mark as completed'}
                  </button>
                </div>

                <button
                  onClick={() => deleteEntry(entry.id)}
                  aria-label="Delete activity"
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

export default DailyLog

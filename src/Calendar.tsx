
import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  CalendarDays,
} from 'lucide-react'

type CalendarEvent = {
  id: string
  title: string
  description: string
  date: string
  category: string
  priority: string
}

const STORAGE_KEY = 'mpt-calendar-events'

const categories = [
  'Exam',
  'Assignment',
  'Internship',
  'Personal',
  'Other',
]

const priorities = ['Low', 'Medium', 'High']

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Exam')
  const [priority, setPriority] = useState('Medium')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  }, [events])

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarCells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ]

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null)
  }

  const selectedEvents = events.filter(
    event => event.date === selectedDate
  )

  const upcomingEvents = [...events]
    .filter(event => event.date >= formatDate(new Date()))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6)

  function changeMonth(amount: number) {
    setCurrentMonth(new Date(year, month + amount, 1))
  }

  function addEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title.trim()) return

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      date: selectedDate,
      category,
      priority,
    }

    setEvents(previous => [...previous, newEvent])
    setTitle('')
    setDescription('')
    setCategory('Exam')
    setPriority('Medium')
  }

  function deleteEvent(id: string) {
    setEvents(previous => previous.filter(event => event.id !== id))
  }

  const today = formatDate(new Date())

  return (
    <div className="space-y-6">

      {/* Calendar heading */}
      <div>
        <h3 className="text-xl font-semibold">Important Dates</h3>
        <p className="mt-1 text-sm text-slate-400">
          Keep track of deadlines, exams and personal milestones.
        </p>
      </div>

      {/* Monthly calendar */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">
              {currentMonth.toLocaleDateString('en-IN', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Select a date to view or add events
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="rounded-lg border border-slate-700 p-2 hover:bg-slate-800"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="rounded-lg border border-slate-700 p-2 hover:bg-slate-800"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="py-2 text-xs font-semibold text-slate-500"
            >
              {day}
            </div>
          ))}

          {calendarCells.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="min-h-16" />
            }

            const dateString = formatDate(new Date(year, month, day))
            const hasEvents = events.some(event => event.date === dateString)
            const isSelected = selectedDate === dateString
            const isToday = today === dateString

            return (
              <button
                type="button"
                key={dateString}
                onClick={() => setSelectedDate(dateString)}
                className={`relative flex min-h-16 flex-col items-center justify-center rounded-xl border text-sm transition ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                    : 'border-transparent hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span className={isToday ? 'font-bold text-amber-400' : ''}>
                  {day}
                </span>

                {hasEvents && (
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Selected date and events */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5 flex items-center gap-2">
          <CalendarDays className="text-cyan-400" size={20} />
          <h3 className="font-semibold">
            Events on {parseDate(selectedDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </h3>
        </div>

        {selectedEvents.length === 0 ? (
          <p className="mb-5 text-sm text-slate-500">
            No events on this date yet.
          </p>
        ) : (
          <div className="mb-5 space-y-3">
            {selectedEvents.map(event => (
              <div
                key={event.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium">{event.title}</p>
                  {event.description && (
                    <p className="mt-1 text-sm text-slate-400">
                      {event.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-slate-500">
                    {event.category} · {event.priority} priority
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteEvent(event.id)}
                  aria-label={`Delete ${event.title}`}
                  className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add event form */}
        <form onSubmit={addEvent} className="space-y-4 border-t border-slate-800 pt-5">
          <h4 className="font-semibold">Add an event</h4>

          <label className="block text-sm text-slate-300">
            Event title
            <input
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Data Structures exam"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Description
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              placeholder="Additional details..."
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
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
              Priority
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
              >
                {priorities.map(item => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            <Plus size={18} />
            Add event
          </button>
        </form>
      </section>

      {/* Upcoming events */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="mb-4 font-semibold">Upcoming events</h3>

        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-slate-500">
            No upcoming events. Add an important date to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <button
                type="button"
                key={event.id}
                onClick={() => {
                  setSelectedDate(event.date)
                  const date = parseDate(event.date)
                  setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1))
                }}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 text-left hover:border-cyan-400/50"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {event.category} · {event.priority} priority
                  </p>
                </div>

                <span className="shrink-0 text-xs text-cyan-400">
                  {parseDate(event.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Calendar

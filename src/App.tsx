
import { useState } from 'react'
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  GraduationCap,
  Trophy,
  Menu,
  X,
} from 'lucide-react'
import DailyLog from './DailyLog'
import Learning from './Learning'
import Academics from './Academics'

const navigation = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Daily Log', icon: CalendarDays },
  { name: 'Learning', icon: BookOpen },
  { name: 'Academics', icon: GraduationCap },
  { name: 'Achievements', icon: Trophy },
]

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-white md:flex">
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900 p-6 md:block">
        <h1 className="text-2xl font-bold text-cyan-400">MPT.</h1>
        <p className="mt-1 text-xs text-slate-500">Memory Progress Tracker</p>

        <nav className="mt-10 space-y-2">
          {navigation.map(item => {
            const Icon = item.icon
            const isActive = activePage === item.name

            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? 'bg-cyan-400/10 text-cyan-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={19} />
                {item.name}
              </button>
            )
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-5 py-4 md:px-8">
          <div>
            <h2 className="font-semibold">Memory Progress Tracker</h2>
            <p className="text-xs text-slate-500">Build. Track. Improve.</p>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </header>

        {mobileMenuOpen && (
          <nav className="space-y-2 border-b border-slate-800 bg-slate-900 p-4 md:hidden">
            {navigation.map(item => {
              const Icon = item.icon

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                    activePage === item.name
                      ? 'bg-cyan-400/10 text-cyan-400'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              )
            })}
          </nav>
        )}

        <main className="mx-auto max-w-7xl p-5 md:p-8">
          {activePage === 'Overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Welcome back!</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Your personal progress dashboard.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Daily Activities', value: 'Track daily' },
                  { label: 'Learning Goals', value: 'Keep learning' },
                  { label: 'Academic Progress', value: 'Stay focused' },
                  { label: 'Achievements', value: 'Coming soon' },
                ].map(item => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                  >
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-3 text-xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="font-semibold">Your journey starts here</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Use the sidebar to record daily activities, track learning
                  goals and monitor academic performance. Your current entries
                  are saved in this browser.
                </p>
              </div>
            </div>
          )}

          {activePage === 'Daily Log' && <DailyLog />}
          {activePage === 'Learning' && <Learning />}
          {activePage === 'Academics' && <Academics />}

          {activePage === 'Achievements' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
              <Trophy className="mx-auto mb-4 text-amber-400" size={36} />
              <h2 className="text-xl font-bold">Achievements</h2>
              <p className="mt-2 text-sm text-slate-400">
                Achievement tracking is coming soon.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App

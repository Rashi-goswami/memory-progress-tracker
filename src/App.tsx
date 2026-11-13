
import { useState } from 'react'
import {
  LayoutDashboard,
  CalendarDays,
  CalendarRange,
  BookOpen,
  GraduationCap,
  Trophy,
  Menu,
  X,
} from 'lucide-react'

import DailyLog from './DailyLog'
import Learning from './Learning'
import Academics from './Academics'
import Achievements from './Achievements'
import Calendar from './Calendar'

const navigation = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Daily Log', icon: CalendarDays },
  { name: 'Learning', icon: BookOpen },
  { name: 'Academics', icon: GraduationCap },
  { name: 'Achievements', icon: Trophy },
  { name: 'Calendar', icon: CalendarRange },
]

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function handleNavigation(page: string) {
    setActivePage(page)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">

        {/* Mobile header */}
        <div className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4 lg:hidden">
          <h1 className="text-lg font-bold">
            Memory<span className="text-cyan-400">.</span>
          </h1>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-800 bg-slate-950 p-5 transition-transform lg:translate-x-0 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Memory<span className="text-cyan-400">.</span>
            </h1>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigation.map(item => {
              const Icon = item.icon

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    activePage === item.name
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              )
            })}
          </nav>

          <div className="absolute bottom-6 left-5 right-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm font-semibold">Keep moving forward.</p>
            <p className="mt-1 text-xs text-slate-500">
              Every small step counts.
            </p>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <button
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 p-5 pt-24 lg:ml-64 lg:p-10">
          <div className="mx-auto max-w-6xl">

            {/* Page heading */}
            <div className="mb-8">
              <p className="text-sm text-cyan-400">
                YOUR PERSONAL GROWTH SPACE
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {activePage}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Track your progress. Build your future.
              </p>
            </div>

            {/* Overview */}
            {activePage === 'Overview' && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <BookOpen className="mb-4 text-cyan-400" size={25} />
                  <h3 className="font-semibold">Learning</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Track skills and learning progress.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <GraduationCap className="mb-4 text-violet-400" size={25} />
                  <h3 className="font-semibold">Academics</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Keep track of subjects and academic performance.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <Trophy className="mb-4 text-amber-400" size={25} />
                  <h3 className="font-semibold">Achievements</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Celebrate your milestones.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <CalendarDays className="mb-4 text-emerald-400" size={25} />
                  <h3 className="font-semibold">Daily Log</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Record your daily activities.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <CalendarRange className="mb-4 text-pink-400" size={25} />
                  <h3 className="font-semibold">Calendar</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Manage important dates and upcoming events.
                  </p>
                </div>

              </div>
            )}

            {/* Feature pages */}
            {activePage === 'Daily Log' && <DailyLog />}
            {activePage === 'Learning' && <Learning />}
            {activePage === 'Academics' && <Academics />}
            {activePage === 'Achievements' && <Achievements />}
            {activePage === 'Calendar' && <Calendar />}

          </div>
        </main>
      </div>
    </div>
  )
}

export default App

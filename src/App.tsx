import { useState } from 'react'
import {
  Activity,
  BookOpen,
  CalendarDays,
  Code2,
  Gamepad2,
  GitBranch,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Shield,
  Target,
  TrendingUp,
  Trophy,
  Clock3,
  Zap,
} from 'lucide-react'

import DailyLog from './DailyLog'
import Learning from './Learning'

const learningAreas = [
  { name: 'Cybersecurity', detail: 'TryHackMe & security labs', progress: 35, icon: Shield, color: 'bg-cyan-400' },
  { name: 'DSA & LeetCode', detail: 'Problem solving', progress: 25, icon: Code2, color: 'bg-violet-400' },
  { name: 'Game Development', detail: 'Godot & graphics', progress: 45, icon: Gamepad2, color: 'bg-amber-400' },
]

const activities = [
  { day: 'Mon', hours: 3 },
  { day: 'Tue', hours: 2 },
  { day: 'Wed', hours: 4 },
  { day: 'Thu', hours: 1 },
  { day: 'Fri', hours: 3 },
  { day: 'Sat', hours: 5 },
  { day: 'Sun', hours: 2 },
]

const navigation = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Daily Log', icon: CalendarDays },
  { name: 'Learning', icon: BookOpen },
  { name: 'Academics', icon: GraduationCap },
  { name: 'Achievements', icon: Trophy },
]

function App() {
  const [activePage, setActivePage] = useState('Overview')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:flex">

      {/* Sidebar */}
      <aside className="border-b border-slate-800 bg-slate-900 p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-cyan-400 p-2 text-slate-950">
            <Activity size={23} />
          </div>
          <div>
            <h1 className="text-lg font-bold">Memory MPT</h1>
            <p className="text-xs text-slate-400">Progress Tracker</p>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  activePage === item.name
                    ? 'bg-cyan-400/10 font-semibold text-cyan-300'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            )
          })}
        </nav>

        <div className="mt-8 hidden rounded-2xl border border-slate-700 bg-slate-800/60 p-4 md:block">
          <Target className="mb-3 text-cyan-400" size={22} />
          <p className="text-sm font-semibold">Semester goal</p>
          <p className="mt-1 text-xs text-slate-400">Target GPA: above 7.5</p>
          <div className="mt-3 h-2 rounded-full bg-slate-700">
            <div className="h-2 w-2/5 rounded-full bg-cyan-400" />
          </div>
          <p className="mt-2 text-xs text-slate-500">Sample progress</p>
        </div>

        <div className="mt-8 hidden space-y-3 text-sm text-slate-400 md:block">
          <div className="flex items-center gap-3">
            <GitBranch size={17} /> GitHub
          </div>
          <div className="flex items-center gap-3">
            <Settings size={17} /> Settings
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 p-5 md:p-8">

        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Your personal workspace</p>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">
              {activePage === 'Overview' ? 'Dashboard' : activePage}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Small steps every day. Measurable progress over time.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 font-bold text-cyan-300">
              M
            </div>
            <div>
              <p className="text-sm font-semibold">memory</p>
              <p className="text-xs text-slate-500">Personal account</p>
            </div>
          </div>
        </header>

        {/* Overview */}
        {activePage === 'Overview' && (
          <div className="space-y-6">

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Study hours', value: '20 hrs', note: 'This week', icon: Clock3, color: 'text-cyan-400' },
                { label: 'Tasks completed', value: '14', note: 'This week', icon: Zap, color: 'text-violet-400' },
                { label: 'Current streak', value: '6 days', note: 'Keep it going', icon: TrendingUp, color: 'text-emerald-400' },
                { label: 'Achievements', value: '8', note: 'Total unlocked', icon: Trophy, color: 'text-amber-400' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <Icon className={stat.color} size={20} />
                    </div>
                    <p className="mt-4 text-3xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-500">{stat.note} · Demo data</p>
                  </div>
                )
              })}
            </section>

            <div className="grid gap-6 xl:grid-cols-3">
              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 xl:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Weekly activity</h3>
                    <p className="mt-1 text-xs text-slate-400">Study hours per day · Sample data</p>
                  </div>
                  <CalendarDays className="text-slate-400" size={20} />
                </div>

                <div className="flex h-48 items-end justify-between gap-3">
                  {activities.map((item) => (
                    <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <span className="text-xs text-slate-400">{item.hours}h</span>
                      <div
                        className="w-full max-w-12 rounded-t-lg bg-cyan-400/80 transition hover:bg-cyan-300"
                        style={{ height: `${(item.hours / 5) * 100}%` }}
                      />
                      <span className="text-xs text-slate-500">{item.day}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold">Learning progress</h3>
                <p className="mt-1 text-xs text-slate-400">Your focus areas</p>

                <div className="mt-6 space-y-6">
                  {learningAreas.map((area) => {
                    const Icon = area.icon
                    return (
                      <div key={area.name}>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon size={17} className="text-slate-400" />
                            <span className="text-sm font-medium">{area.name}</span>
                          </div>
                          <span className="text-xs text-slate-400">{area.progress}%</span>
                        </div>
                        <p className="mb-2 text-xs text-slate-500">{area.detail}</p>
                        <div className="h-2 rounded-full bg-slate-800">
                          <div className={`h-2 rounded-full ${area.color}`} style={{ width: `${area.progress}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="font-semibold">Today's focus</h3>
              <p className="mt-1 text-xs text-slate-400">A starting point for your daily log</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Cybersecurity', task: 'Complete one security lab', icon: Shield },
                  { title: 'DSA', task: 'Solve one coding problem', icon: Code2 },
                  { title: 'Academics', task: 'Revise one subject topic', icon: GraduationCap },
                ].map((task) => {
                  const Icon = task.icon
                  return (
                    <div key={task.title} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                      <Icon className="mb-3 text-cyan-400" size={20} />
                      <p className="text-sm font-semibold">{task.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{task.task}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        )}

        {/* Daily Log */}
        {activePage === 'Daily Log' && <DailyLog />}

        {/* Learning Tracker */}
        {activePage === 'Learning' && <Learning />}

        {/* Placeholder pages */}
        {(activePage === 'Academics' || activePage === 'Achievements') && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">{activePage}</h2>
            <p className="mt-2 text-sm text-slate-400">
              This section is coming soon.
            </p>
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-slate-600">
          Memory Progress Tracker · Built with React, TypeScript & Tailwind CSS
        </footer>

      </main>
    </div>
  )
}

export default App

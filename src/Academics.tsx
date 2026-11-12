
import { useEffect, useState } from 'react'
import { Plus, Trash2, GraduationCap, BookOpen } from 'lucide-react'

type Subject = {
  id: string
  name: string
  code: string
  credits: number
  marks: number
  gradePoint: number
}

const STORAGE_KEY = 'mpt-academic-subjects'

function Academics() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [credits, setCredits] = useState('3')
  const [marks, setMarks] = useState('')
  const [gradePoint, setGradePoint] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects))
  }, [subjects])

  function addSubject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      code: code.trim(),
      credits: Number(credits),
      marks: Number(marks),
      gradePoint: Number(gradePoint),
    }

    setSubjects(previous => [...previous, newSubject])

    setName('')
    setCode('')
    setCredits('3')
    setMarks('')
    setGradePoint('')
  }

  function deleteSubject(id: string) {
    setSubjects(previous => previous.filter(subject => subject.id !== id))
  }

  const totalCredits = subjects.reduce(
    (sum, subject) => sum + subject.credits, 0
  )

  const sgpa = totalCredits
    ? subjects.reduce(
        (sum, subject) => sum + subject.credits * subject.gradePoint, 0
      ) / totalCredits
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Academics Tracker</h2>
        <p className="mt-1 text-sm text-slate-400">
          Manage subjects, marks, credits and semester performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <BookOpen className="mb-3 text-cyan-400" size={22} />
          <p className="text-sm text-slate-400">Total subjects</p>
          <p className="mt-2 text-3xl font-bold">{subjects.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <GraduationCap className="mb-3 text-violet-400" size={22} />
          <p className="text-sm text-slate-400">Total credits</p>
          <p className="mt-2 text-3xl font-bold">{totalCredits}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <GraduationCap className="mb-3 text-emerald-400" size={22} />
          <p className="text-sm text-slate-400">Estimated SGPA</p>
          <p className="mt-2 text-3xl font-bold">{sgpa.toFixed(2)}</p>
        </div>
      </div>

      <form
        onSubmit={addSubject}
        className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
      >
        <h3 className="font-semibold">Add a subject</h3>

        <label className="block text-sm text-slate-300">
          Subject name
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Data Structures"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          />
        </label>

        <label className="block text-sm text-slate-300">
          Subject code
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="e.g. CS301"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm text-slate-300">
            Credits
            <input
              type="number"
              min="1"
              max="20"
              step="1"
              value={credits}
              onChange={e => setCredits(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Marks (%)
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={marks}
              onChange={e => setMarks(e.target.value)}
              required
              placeholder="e.g. 85"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Grade point
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={gradePoint}
              onChange={e => setGradePoint(e.target.value)}
              required
              placeholder="e.g. 9"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add subject
        </button>
      </form>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="mb-5 font-semibold">Subject list</h3>

        {subjects.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No subjects added yet. Add your first subject above.
          </p>
        ) : (
          <div className="space-y-3">
            {subjects.map(subject => (
              <div
                key={subject.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div>
                  <p className="font-medium">{subject.name}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {subject.code || 'No code'} · {subject.credits} credits
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Marks: {subject.marks}% · Grade point: {subject.gradePoint}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteSubject(subject.id)}
                  aria-label={`Delete ${subject.name}`}
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

export default Academics

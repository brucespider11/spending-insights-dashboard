import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { useTheme, type ColorMode } from '@/context/ThemeContext'

function CrashTest() {
  const [crash, setCrash] = useState(false)
  // Throwing during render (not in the handler) is what ErrorBoundary catches
  if (crash) throw new Error('CrashTest: intentional render error — ErrorBoundary is working.')
  return (
    <button
      onClick={() => setCrash(true)}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-500/40 text-rose-600 dark:text-rose-400 text-sm font-medium hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
      <Zap size={14} />
      Trigger crash
    </button>
  )
}

const MODES: {
  key: ColorMode
  label: string
  preview: React.ReactNode
}[] = [
  {
    key: 'dark',
    label: 'Dark',
    preview: (
      <div className="w-full h-full rounded-lg bg-[#0F0E1A] flex flex-col gap-2 p-3">
        <div className="w-2/3 h-2.5 rounded-sm bg-white/10" />
        <div className="w-full h-3 rounded-sm bg-white/5" />
        <div className="w-full h-3 rounded-sm bg-white/5" />
        <div className="w-1/2 h-3 rounded-sm bg-white/5" />
      </div>
    ),
  },
  {
    key: 'light',
    label: 'Light',
    preview: (
      <div className="w-full h-full rounded-lg bg-[#F4F5F7] flex flex-col gap-2 p-3">
        <div className="w-2/3 h-2.5 rounded-sm bg-black/10" />
        <div className="w-full h-3 rounded-sm bg-black/5" />
        <div className="w-full h-3 rounded-sm bg-black/5" />
        <div className="w-1/2 h-3 rounded-sm bg-black/5" />
      </div>
    ),
  },
]

export default function SettingsPage() {
  const { colorMode, setColorMode } = useTheme()

  return (
    <div className="space-y-6 max-w-[800px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600">
        <span className="hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors">
          Settings
        </span>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
      </nav>

      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      {/* Color mode card */}
      <div className="card p-6 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">Color mode</h2>
          <p className="text-sm text-gray-400 dark:text-gray-600 mt-0.5">
            Choose how the interface looks
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm">
          {MODES.map(({ key, label, preview }) => {
            const selected = colorMode === key
            return (
              <button
                key={key}
                onClick={() => setColorMode(key)}
                className={`
                  group relative flex flex-col gap-3 p-3 rounded-2xl text-left
                  border-2 transition-all duration-150
                  ${
                    selected
                      ? 'border-brand-600 dark:border-brand-500 bg-brand-50/50 dark:bg-brand-500/10'
                      : 'border-gray-200 dark:border-[#2D2C44] bg-gray-50 dark:bg-white/[0.03] hover:border-gray-300 dark:hover:border-[#3D3C54]'
                  }
                `}>
                {/* Preview thumbnail */}
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                  {preview}
                </div>

                {/* Label row */}
                <div className="flex items-center gap-2">
                  {/* Checkmark or empty circle */}
                  <span
                    className={`
                      w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                      ${
                        selected
                          ? 'bg-brand-600 dark:bg-brand-500'
                          : 'border-2 border-gray-300 dark:border-[#3D3C54]'
                      }
                    `}>
                    {selected && <Check size={11} strokeWidth={3} className="text-white" />}
                  </span>
                  <span
                    className={`text-sm font-semibold ${selected ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                    {label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Developer tools */}
      <div className="card p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Developer tools
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-600 mt-0.5">
            Test the error boundary — click the button below to trigger a deliberate crash and
            verify the recovery UI appears.
          </p>
        </div>
        <CrashTest />
      </div>
    </div>
  )
}

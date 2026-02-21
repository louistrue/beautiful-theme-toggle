import { useEffect, useRef, useState } from 'react'
import { ThemeToggle } from 'beautiful-theme-toggle'

function App() {
  const toggleRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (!toggleRef.current) return

    const toggle = new ThemeToggle({
      element: toggleRef.current,
      initialState: 'system',
      onChange: (state) => {
        document.documentElement.classList.toggle('dark', state === 'dark')
        setTheme(state)
      },
    })

    setTheme(toggle.getTheme())
    return () => toggle.destroy()
  }, [])

  return (
    <main style={{ display: 'grid', gap: 16, justifyItems: 'center', paddingTop: 48 }}>
      <h1>beautiful-theme-toggle smoke test</h1>
      <div style={{ width: 220 }} ref={toggleRef} />
      <p>Current theme: {theme}</p>
    </main>
  )
}

export default App

import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function App() {
  const [healthStatus, setHealthStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_URL}/api/health`)
      setHealthStatus(response.data)
    } catch (err) {
      setError(err.message)
      setHealthStatus(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏥 Aplicación de Salud</h1>
        <p>Frontend desplegado en Vercel</p>
      </header>

      <main className="app-main">
        <div className="health-check">
          <h2>Estado del Backend</h2>
          <button onClick={checkHealth} disabled={loading}>
            {loading ? 'Verificando...' : 'Verificar Conexión'}
          </button>

          {healthStatus && (
            <div className="status success">
              <p><strong>Estado:</strong> {healthStatus.status}</p>
              <p><strong>Mensaje:</strong> {healthStatus.message}</p>
            </div>
          )}

          {error && (
            <div className="status error">
              <p><strong>Error:</strong> {error}</p>
              <p>Verifica que el backend esté corriendo en: {API_URL}</p>
            </div>
          )}
        </div>

        <div className="info">
          <h3>Información del Deployment</h3>
          <ul>
            <li><strong>Frontend:</strong> Vercel</li>
            <li><strong>Backend:</strong> Railway</li>
            <li><strong>API URL:</strong> {API_URL}</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App


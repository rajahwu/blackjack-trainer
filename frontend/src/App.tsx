import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import TrainingGuidePage from './pages/TrainingGuidePage'
import EvaluationPage from './pages/EvaluationPage'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-blue-600 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
        <Link to="/guide">Training Guide</Link>
        <Link to="/evaluation">Evaluation</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/guide" element={<TrainingGuidePage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
      </Routes>
    </div>
  )
}

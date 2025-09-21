import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './pages/Home/Home'
import { CreateStory } from './pages/Create/CreateStory'
import { StoryProvider } from './store/StoryContext' 
import { Archive } from './pages/Archive/Archive'

function App() {
  return (
    <StoryProvider>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateStory />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
    </StoryProvider>
  )
}

export default App

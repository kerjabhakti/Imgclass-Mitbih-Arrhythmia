import Landing from "./pages/Landing"
import Result from "./pages/Result"
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index exact element={<Landing />} />
        <Route path="result" exact element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

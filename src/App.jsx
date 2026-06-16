import { Desktop } from "./components/Desktop";
import { TaskBar } from "./components/TaskBar"

function App() {
  return (
    <div className="bg-os-bg os-grid-bg h-screen w-screen overflow-hidden relative select-none">
      
      <Desktop />

      <TaskBar />
    </div>
  )
}

export default App;

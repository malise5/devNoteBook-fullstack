
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesList from "./pages/NotesList";
import NoteDetails from "./pages/NoteDetails";
import NoteForm from "./pages/NoteForm";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<NotesList />} />
              <Route path="/notes/:id" element={<NoteDetails />} />
              <Route path="/new" element={<NoteForm />} />
              <Route path="/edit/:id" element={<NoteForm isEdit={true} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

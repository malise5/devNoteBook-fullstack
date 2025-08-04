
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesList from "./pages/NotesList";
import NoteDetails from "./pages/NoteDetails";
import NoteForm from "./pages/NoteForm";
import RightSidebar from "./components/RightSidebar";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen w-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1 h-full w-full">
            <main className="flex-1 h-full min-h-0 w-full">
              <Routes>
                <Route path="/" element={<NotesList />} />
                <Route path="/notes/:id" element={<NoteDetails />} />
                <Route path="/new" element={<NoteForm />} />
                <Route path="/edit/:id" element={<NoteForm isEdit={true} />} />
              </Routes>
            </main>
            <RightSidebar />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

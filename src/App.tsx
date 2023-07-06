import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import SignUp from "./components/SignUp";

function App() {
  return (
    <HomeLayout>
      <main className="flex flex-col p-1 w-full h-2/3 bg-cyan-600">
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </main>
    </HomeLayout>
  );
}

export default App;

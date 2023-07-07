import { Route, Routes } from "react-router-dom";

import HomeLayout from "./layouts/HomeLayout";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { ProtectedRoute } from "./layouts/ProtectedLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <HomeLayout>
      <main className="flex flex-col flex-grow p-3 w-full max-h-[80svh] bg-cyan-600">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </HomeLayout>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div className="bg-indigo-100">
      <Header />
      <main className="min-h-screen">
        <div className="max-w-3xl m-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default RootLayout

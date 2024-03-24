import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-center bg-indigo-900 p-4">
      <div className="flex items-center justify-between w-full max-w-lg">
        <span className="text-white text-xl font-semibold leading-snug">GUS URL Shortener</span>
        <nav className="">
          <NavLink to="/" className="text-white hover:text-indigo-200 mx-2">Home</NavLink>
        </nav>
      </div>
    </header>
  )
}

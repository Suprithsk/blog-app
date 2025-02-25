import { useNavigate } from "react-router-dom"
const Header = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/signup')
  }
  const handleHomeClick = () => {
    navigate('/')
  }
  return (
    <header className="sticky top-0 w-full md:py-6 md:px-20 py-6 px-10 bg-amber-50 z-10 flex justify-between items-center border-b-2 ">
        <h1 className="cursor-pointer text-2xl font-semibold" onClick={handleHomeClick}>Medium</h1>
        <button className="rounded-full text-sm bg-slate-950 text-white px-4 py-2" onClick={handleClick}>Get Started</button>
    </header>
  )
}

export default Header
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  const clickHandler = () => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/home')
    } else {
      navigate('/signin')
    }
    
  }
  return (
    <section className='relative flex justify-between items-center py-16 pl-8 bg-amber-50 h-[85vh] md:pl-20'>
        <div className="flex-1 font-bigShoulders">
            <h1 className="text-8xl font-semibold">Human</h1>
            <br />
            <h1 className="text-8xl font-semibold">Stories & Ideas</h1>
            <h2 className="font-poppins mt-6">A place to read, write, and deepen your understanding</h2>
            <button className="rounded-full text-lg bg-slate-950 text-white px-6 py-2 font-poppins mt-6" onClick={clickHandler}>Start reading</button>
        </div>
    </section>
  )
}

export default Hero
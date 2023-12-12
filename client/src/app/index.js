import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { ThemeProvider } from '../contexts/ThemeProvider'


const App = () => {

    const [ userEvents, setUserEvents ] = useState([])

    return (
        <ThemeProvider>
            <Navbar />
            <Outlet context={{userEvents, setUserEvents}}/>
            <Footer />
        </ThemeProvider>
    )
}

export default App
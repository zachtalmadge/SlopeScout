import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { ThemeProvider } from '../contexts/ThemeProvider'


const App = () => {
    return (
        <ThemeProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </ThemeProvider>
    )
}

export default App
import App from './app'
import Home from './pages/Home'
import AllResorts from './pages/AllResorts/AllResorts'
import ResortDetails from './pages/ResortDetails'
import Bookmarks from './pages/Bookmarks/Bookmarks'
import MyEvents from './pages/MyEvents/MyEvents'
import SearchPage from './pages/SearchPage/SearchPage'
import ErrorComponent from './pages/ErrorComponent'

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorComponent />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/allResorts',
                element: <AllResorts />
            },
            {
                path: '/resort/:id',
                element: <ResortDetails />
            },
            {
                path: '/bookmarks',
                element: <Bookmarks />
            },
            {
                path: '/createEvent'
            },
            {
                path: '/myEvents',
                element: <MyEvents />
            },
            {
                path: '/search',
                element: <SearchPage />
            },
            {
                path: '/error',
                element: <ErrorComponent/>
            }
        ]
    }
]

export default routes
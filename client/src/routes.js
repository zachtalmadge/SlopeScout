import App from './app'
import Home from './pages/Home'
import AllResorts from './pages/AllResorts/AllResorts'
import Bookmarks from './pages/Bookmarks/Bookmarks'
import Events from './pages/Events/Events'
import MyEvents from './pages/MyEvents/MyEvents'
import SearchPage from './pages/SearchPage/SearchPage'

const routes = [
    {
        path: '/',
        element: <App />,
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
                path: '/resort/:id'
            },
            {
                path: '/events',
                element: <Events />
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
            }
        ]
    }
]

export default routes
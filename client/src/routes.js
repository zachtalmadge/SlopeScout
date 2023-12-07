import App from './app'
import Home from './pages/Home'

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
                path: '/allResorts'
            },
            {
                path: '/events'
            },
            {
                path: '/resort/:id'
            },
            {
                path: '/createEvent'
            },
            {
                path: '/search'
            }
        ]
    }
]

export default routes
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import Root from './routes/root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/test/:coinId', element: <Test /> }
    ]
  }
])
function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App

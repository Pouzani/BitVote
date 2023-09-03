import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '/', element: <Home /> },
      { path: '/test', element: <Test /> }
    ]
  }
])
function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App

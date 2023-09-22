import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import Root from './routes/root'
import Detail from './pages/Detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/test', element: <Test /> },
      { path: '/detail/:coinId', element: <Detail />}
    ]
  }
])
function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App

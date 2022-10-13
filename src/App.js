import { Routes, Route } from 'react-router-dom';
// COMPONENTS
import Layout from './components/Layout';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import RequireAuth from './features/auth/RequireAuth';
import PersistentLogin from './features/auth/PersistentLogin';
import TodoMain from './features/todos/TodoMain';

const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Layout />}>
        {/* Public Routes */}
        <Route index path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />

        {/* Private Routes */}
        <Route element={<PersistentLogin />}>
          <Route element={<RequireAuth />}>
            <Route index element={<TodoMain />} />
          </Route>
        </Route>
      </Route>
    </Routes >
  );
}

export default App;

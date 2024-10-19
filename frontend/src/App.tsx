import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Register from './features/User/Register';
import Login from './features/User/Login';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Photos from './features/Photos/Photos';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import PhotoForm from './features/Photos/components/PhotoForm/PhotoForm';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/User/userSlice';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Photos />} />
          <Route
            path="/photos/new"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <PhotoForm />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;

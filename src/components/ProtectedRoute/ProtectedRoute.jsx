import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { ROUTE } from '../../utils/constants';

export const ProtectedRoute = ({ children }) => {
  const currentUser = useContext(UserContext);
  const isAuthorized = currentUser.isAuth();

  return isAuthorized ? children : (<Navigate to={ROUTE.SIGNIN} />);
};

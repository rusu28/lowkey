import { Outlet, useLocation, Navigate } from 'react-router';
import { useLaunch } from '../context/LaunchContext';
import { Home } from './Home';

const publicPreLaunchPaths = ["/news", "/signin", "/signup", "/contact", "/terms", "/privacy", "/unsubscribe/email", "/resetpassword"];

export function LaunchGate() {
  const { canAccessFullSite } = useLaunch();
  const location = useLocation();

  // Check if current path is allowed before launch
  const isPublicPath = publicPreLaunchPaths.some(path =>
    location.pathname === path || location.pathname.startsWith(path + '/')
  );

  // If on index route and site is launched, show Home
  if (location.pathname === '/' && canAccessFullSite) {
    return <Home />;
  }

  // If site is not launched and trying to access non-public path
  if (!canAccessFullSite && !isPublicPath && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

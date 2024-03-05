import { FC, lazy, Suspense, useContext } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AuthProvider, { AuthContext } from "./context/auth-context/AuthContext";
const NavigationComp = lazy(() => import("./components/NavigationComp"));
const Main = lazy(() => import("./components/Main"));
const Auth = lazy(() => import("./components/Auth"));
const Events = lazy(() => import("./components/events/Events"));
const Bookings = lazy(() => import("./components/bookings/Bookings"));
const NotFound = lazy(() => import("./components/NotFound"));
const App: FC = (): JSX.Element => {
  const { authDetail } = useContext(AuthContext);
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <HashRouter>
        <AuthProvider>
          <div className="wrapper">
            <NavigationComp />
            <main>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/events" element={<Events />} />
                <Route path="/bookings" element={<Bookings />} />
                {!!authDetail?.token && (
                  <Route path="/bookings" element={<Bookings />} />
                )}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </HashRouter>
    </Suspense>
  );
};
export default App;

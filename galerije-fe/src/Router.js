import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import Register from "./app/pages/RegisterPage";
import Register from "./app/pages/RegisterPage";
import Login from "./app/pages/LoginPage";
// import Galleries from "./pages/Galleries";
// import GalleryPage from "./pages/GalleryPage";
import { useSelector } from "react-redux";
// import { selectIsAuthenticated, selectActiveUser } from '../src/store/auth/selector';
import { selectIsAuthenticated, selectActiveUser } from "./app/store/auth";
// import CreateGalleryPage from "./pages/CreateGalleryPage";
import { useDispatch } from "react-redux";
// import { getActiveUser } from "./store/auth/slice";
import { getActiveUser } from "./app/store/auth";
import { useEffect } from "react";
import Gallery from "./app/pages/GalleryPage";
import Galleries from "./app/pages/Galleries";
import GalleriesPages from "./app/pages/Galleries";


export default function Router() {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getActiveUser());
        }
    }, [dispatch, isAuthenticated]);

    const PrivateRoute = ({ children, ...rest }) => {
        const isAuthenticated = useSelector(selectIsAuthenticated);

        return (
            <Route {...rest}>
                {isAuthenticated ? children : <Redirect to="/login" />}
            </Route>
        )
    }
    const GuestRoute = ({ children, ...rest }) => {
        const isAuthenticated = !!useSelector(selectIsAuthenticated);
        return (
            <Route {...rest}>
                {!isAuthenticated ? children : <Redirect to="/" />}
            </Route>
        )
    }

    return <Switch>
        <Route exact path='/'>
            <Redirect to='/galleries'></Redirect>
        </Route>
        {/* <Route exact path="/galleries/:id">
            <Gallery/>
        </Route> */}
        <Route path='/galleries' exact>
            <GalleriesPages />
        </Route>
        <GuestRoute path='/login' exact>
            <Login />
        </GuestRoute>
        <GuestRoute path='/register' exact>
            <Register />
        </GuestRoute>
        <PrivateRoute exact path='/galleries/:id' >
            <Gallery />
        </PrivateRoute>
        {/* <PrivateRoute path='/create' exact>
            <CreateGalleryPage />
        </PrivateRoute> */}
        {/* <PrivateRoute exact path="/my-galleries">
            <Galleries selfId={isAuthenticated ? (activeUser?.id) : null} />
        </PrivateRoute> */}
        {/* <PrivateRoute exact path ="/edit-gallery/:id">
            <CreateGalleryPage/>
        </PrivateRoute> */}
    </Switch>
}
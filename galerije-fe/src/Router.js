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
import RegisterPage from "./app/pages/RegisterPage"
import LoginPage from "./app/pages/LoginPage"
import  { SingleAuthor } from "./app/pages/SingleAuthor";
import GalleryPage from "./app/pages/GalleryPage";
import CreateGalleryPage from "./app/pages/CreateGalleryPage";
import MyGalleryPage from "./app/pages/MyGalleryPage";


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
    <PrivateRoute exact path="/authors/:id">
        <SingleAuthor/>
    </PrivateRoute>
    <Route path='/galleries' exact>
        <Galleries />
    </Route>
    <GuestRoute path='/login' exact>
        <LoginPage />
    </GuestRoute>
    <GuestRoute path='/register' exact>
        <RegisterPage />
    </GuestRoute>
    <PrivateRoute exact path='/galleries/:id' >
        <GalleryPage />
    </PrivateRoute>
    <PrivateRoute path='/create' exact>
        <CreateGalleryPage />
    </PrivateRoute>
    <PrivateRoute exact path="/my-galleries">
        <MyGalleryPage selfId={isAuthenticated ? (activeUser?.id) : null} />
    </PrivateRoute>
    <PrivateRoute exact path ="/edit-gallery/:id">
        <CreateGalleryPage/>
    </PrivateRoute>
</Switch>

}
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

// core components
import Admin from "layouts/Admin.js";
import Login from "./views/Login/Login";

import { login } from './Redux/actions';
import { useDispatch } from "react-redux";
import { loginUser } from "Controllers/userController";

export default function App() {

    const logedinUser = useSelector((state) => state.StaticData.logedinUser);
    const dispatch = useDispatch();
    const [isLogenIn, setIsLogenIn] = useState(false);

    useEffect(() => {
        checkLogin();
    }, []);

    async function checkLogin() {
        const logedUser = localStorage.getItem('rememberMe');
        if (logedUser) {
            var userData = JSON.parse(localStorage.getItem('rememberMe'));
            var username = userData.email
            var password = userData.password
            await loginUser({
                username,
                password
            }).then(data => {
                setIsLogenIn(true)
                dispatch(login(data));
            }).catch(e => {

            });

        }
    }


    return (

        <div>
            {isLogenIn ?
                < Switch >
                    < Route path="/admin" component={Admin} />
                    <Redirect from="/" to="/admin/dashboard" />
                </Switch >
                :
                <Login login={setIsLogenIn}></Login>
            }
        </div >

    );
}



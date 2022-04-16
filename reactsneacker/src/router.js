import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import Header from "./layout/Header"
import Favourite from "./pages/Favourite";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import ForgetPage from "./pages/ForgetPage";
import ConfirmPage from "./pages/ConfirmPage";
import OrdersPage from "./pages/OrdersPage";


const router = (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/activate/:uid/:token' element={<LoginPage/>}/>
            <Route exact path='/signup' element={<SignUp />}/>
            <Route exact path='/favourite' element={<Favourite/>}/>
            <Route exact path='/profile' element={<ProfilePage />} />
            <Route exact path='/fogetpass' element={<ForgetPage />} />
            <Route exact path='/orders' element={<OrdersPage />} />
            <Route exact path='/confirm/password/:token/:uid' element={<ConfirmPage />} />
        </Routes>
    </BrowserRouter>
)

export default router
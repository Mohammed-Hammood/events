import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from 'routes';
import HomePage from './home';
import Error404 from './404-error';

export default function Pages() {
    
    return (
        <Routes>
            <Route path={AppRoutes.homePage} element={<HomePage />} />
            <Route path={AppRoutes.all } element={<Error404 />} />
        </Routes>
    );
}

import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import MyBuildings from '../customer/MyBuildings/MyBuildings';
import OneBuilding from '../customer/MyBuildings/OneBuilding';
import MyTasks from '../MyTasks';
import TasksForBuilding from '../TaskTable/TasksForBuilding';
import CreateTaskProvider from '../../providers/CreateTaskProvider';
import OneTask from '../OneTask/OneTask';
import Start from '../Start';
import CreateBuilding from '../customer/MyBuildings/CreateBuilding';
import { useGlobal } from '../../providers/GlobalProvider';
import MyAccount from '../MyAccount';

const LoggedInContent = () => {

    const { userRole } = useGlobal()

    return (
        <Routes>
            <Route exact path='/minabyggnader' element={
                <MyBuildings/>
            }/>
            <Route path='/byggnad' element={
                <CreateTaskProvider>
                    <OneBuilding/>
                </CreateTaskProvider>
            }/>
            {userRole === 'customer' &&
                <Route path='/nybyggnad' element={
                    <CreateBuilding />
                }/>
            }
            <Route path='/minauppgifter' element={
                <MyTasks />}
            />
            <Route path='/uppgift' element={
                <OneTask />
            }/>
            <Route exact path='/' element={
                <Start/>
            }/>
            <Route exact path='/mittkonto' element={
                <MyAccount/>
            }/>
            <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
    )
};

export default LoggedInContent;

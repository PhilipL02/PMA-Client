import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import MyBuildings from '../customer/MyBuildings/MyBuildings';
import OneBuilding from '../customer/MyBuildings/OneBuilding';
import MyTasks from '../MyTasks';
import TasksForBuilding from '../TaskTable/TasksForBuilding';
import CreateTaskProvider from '../../providers/CreateTaskProvider';
import OneTask from '../OneTask';
import Start from '../Start';

const CustomerRoutes = ({ selectedBuilding, setSelectedBuilding }) => {
    return (
        <Routes>
            <Route exact path='/minabyggnader' element={
                <MyBuildings 
                    setSelectedBuilding={setSelectedBuilding}
                />
            }/>
            <Route path='/byggnad' element={
                <CreateTaskProvider>
                    <OneBuilding 
                        selectedBuilding={selectedBuilding} 
                    />
                </CreateTaskProvider>
            }/>
            {/* <Route path='/uppgifter' element={
                <TasksForBuilding 
                    building={selectedBuilding} 
                />}
            /> */}
            <Route path='/minauppgifter' element={
                <MyTasks />}
            />
            <Route path='/uppgift' element={
                <OneTask />
            }/>
            <Route exact path='/' element={
                <Start/>
            }/>
            <Route exact path='/mittkonto' element={"Mitt konto"}/>
            <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
    )
};

export default CustomerRoutes;

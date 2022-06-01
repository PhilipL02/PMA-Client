import React, { createContext, useContext, useState, useEffect } from 'react';

import { useGlobal } from './GlobalProvider'

const contextAdmin = createContext();

const AdminProvider = ({ children }) => {

    const { phetch } = useGlobal()

    const [users, setUsers] = useState()
    const [adminUsers, setAdminUsers] = useState()
    const [customerUsers, setCustomerUsers] = useState()
    const [buildings, setBuildings] = useState()

    useEffect(() => {
        getCustomerUsers()
        getBuildings()
    }, [])

    async function getCustomerUsers() {
        let response = await phetch('/users/customers/get')
        setCustomerUsers(response.data)
    }

    async function getAllUsers() {
        let response = await phetch('/users/get')
        setUsers(response.data.filter(v => v.role !== "admin"))
    }

    async function getBuildings() {
        let response = await phetch('/buildings/get/all')
        console.log(response.data)
        setBuildings(response.data)
    }

    function userDeleted(userID) {
        setBuildings(v => v?.filter(b => b.userID !== userID))
        setCustomerUsers(v => v?.filter(user => user._id !== userID))
        if(!users) return
        setUsers(v => v?.filter(user => user._id !== userID))
    }

    return(
        <contextAdmin.Provider value={{ users, adminUsers, customerUsers, buildings, getAllUsers, userDeleted }}>
            {children}
        </contextAdmin.Provider>
    )
}

export const useAdmin = () => useContext(contextAdmin);

export default AdminProvider;

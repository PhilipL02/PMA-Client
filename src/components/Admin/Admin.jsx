import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import AdminTableAccordion from './AdminAccordion'
import AdminTableAccordionRow from './AdminTableAccordionRow'
import { useAdmin } from '../../providers/AdminProvider'
import { useGlobal } from '../../providers/GlobalProvider'
import AdminAccordionProvider from '../../providers/AdminAccordionProvider'
import { ROLES } from '../../utils/constants'

const getUserByID = (users, id) => {
    return users?.find(user => user._id === id)
}

function getYYYY_MM_DD(date) {
    if(!date) return
    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth() + 1
    const day = new Date(date).getDate()
    
    const YYYY = year
    const MM = month.toString().length === 2 ? month : `0${month}`
    const DD = day.toString().length === 2 ? day : `0${day}`
    return `${YYYY}-${MM}-${DD}`
}

const Admin = ({ logOut }) => {

    const { phetch } = useGlobal()
    const { users, buildings, customerUsers, getAllUsers, userDeleted } = useAdmin()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [showAllUsersInTable, setShowAllUsersInTable] = useState(false)
    const [tableUsers, setTableUsers] = useState()
    const [tableBuildings, setTableBuildings] = useState()
    
    const [selectedUserToDelete, setSelectedUserToDelete] = useState()

    useEffect(() => {
        if(!(buildings && customerUsers)) return
        setTableBuildings(buildings.map(building => {return {_id: building._id, createdAt: getYYYY_MM_DD(building.createdAt), buildingName: building.buildingName, owner: getUserByID(customerUsers, building.userID)?.name, membersAmount: building.members.length}}))
    }, [buildings, customerUsers])

    async function handleGenerateCustomerCodeSubmit(e) {
        e.preventDefault()
        const email = e.target.email.value
        let response = await phetch('/users/code/create', {
            method: 'POST',
            body: {
                email
            }
        })
        console.log(response)
    }

    function handleDeleteUserClick(userID) {
        setSelectedUserToDelete(userID)
    }

    async function handleDeleteUserSubmit({password}) {
        let response = await phetch('/users/delete', {
            method: 'POST',
            body: {
                userID: selectedUserToDelete,
                password
            }
        })
        console.log(response)
        if(response?.success) {
            userDeleted(selectedUserToDelete)
            setSelectedUserToDelete(undefined)
        }
    } 

    function handleShowAllUsers() {
        if(!users) getAllUsers()
        setShowAllUsersInTable(true)
    }

    useEffect(() => {
        if(!customerUsers) return
        if(!showAllUsersInTable) setTableUsers(customerUsers.map(user => {return {_id: user._id, firstName: user.firstName, lastName: user.lastName, role: ROLES[user.role], email: user.email}}))
        if(!users) return
        if(showAllUsersInTable) setTableUsers(users.map(user => {return {_id: user._id, firstName: user.firstName, lastName: user.lastName, role: ROLES[user.role], email: user.email}}))
    }, [showAllUsersInTable, customerUsers, users])

    return (
        <div className='admin'>
            <button onClick={logOut}>Logga ut</button>
            {tableUsers &&
                <div className='tableContainer'>
                    <h2>Användare</h2>
                    {showAllUsersInTable ? <button onClick={() => setShowAllUsersInTable(false)}>Visa endast kunder</button> : <button onClick={handleShowAllUsers}>Visa alla användare</button>}
                    <AdminAccordionProvider>
                        <AdminTableAccordion keys={["ID", "Förnamn", "Efternamn", "Roll", "E-post"]}>
                            {tableUsers?.map((user, i) => (
                                <AdminTableAccordionRow
                                    key={i}
                                    id={user._id}
                                    row={user}
                                    valueKeys={['_id', 'firstName', 'lastName', 'role', 'email']}
                                    accordionDetails={
                                        <>
                                            <button>Ändra</button>
                                            <button onClick={() => handleDeleteUserClick(user._id)}>Ta bort</button>
                                        </>
                                    }
                                />
                            ))}    
                        </AdminTableAccordion>
                    </AdminAccordionProvider>
                </div>
            }
            {(tableBuildings && tableUsers) &&
                <div className='tableContainer'>
                    <h2>Byggnader</h2>
                    <AdminAccordionProvider>
                        <AdminTableAccordion keys={["Skapades", "Namn", "Ägare", "Antal medlemmar"]}>
                            {tableBuildings?.map((building, i) => (
                                <AdminTableAccordionRow
                                    key={i}
                                    id={building._id}
                                    row={building}
                                    valueKeys={['createdAt', 'buildingName', 'owner', 'membersAmount']}
                                    accordionDetails={
                                        <>
                                         
                                        </>
                                    }
                                />
                            ))}    
                        </AdminTableAccordion>
                    </AdminAccordionProvider>
                </div>
            }
            <h3>Generera kundkod</h3>
            <form onSubmit={handleGenerateCustomerCodeSubmit}>
                <label htmlFor="email">E-post</label>
                <input type="email" id="email" name='email'/>
                <input type="submit" value="Skicka"/>
            </form>
            {selectedUserToDelete && 
                <div className='popUp' onClick={() => setSelectedUserToDelete(undefined)}>
                    <div className='popUpInner' onClick={e => e.stopPropagation()}>
                        <h3>Ta bort användare</h3>
                        <form onSubmit={handleSubmit(handleDeleteUserSubmit)}>
                            <label hidden htmlFor='password'>Lösenord</label>
                            <input type="password" id='password' {...register("password", { required: true })} placeholder="Lösenord"/>
                            <input type="submit" value="Ta bort" />
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Admin
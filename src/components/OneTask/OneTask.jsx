import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import TaskContent from './TaskContent';
import { useData } from '../../providers/DataProvider';
import { useGlobal } from '../../providers/GlobalProvider';
import { clsx } from '../../utils/utils';

import { ReactComponent as HouseIcon } from '../../assets/svg/House.svg'
import { ReactComponent as Cross } from '../../assets/svg/Cross.svg'


const OneTask = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const { phetch, userID } = useGlobal()
    const { myTasks, ownedTasks, buildings, getMyTasks, idleTasks } = useData()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [task, setTask] = useState()
    const [building, setBuilding] = useState()
    const [isBuildingOwner, setBuildingOwner] = useState(false)
    const [newComment, setNewComment] = useState()
    
    const [isEditTaskSelected, setEditTaskSelected] = useState(false)
    const [isDeleteTaskSelected, setDeleteTaskSelected] = useState(false)

    useEffect(() => {
        if(!(myTasks && ownedTasks && idleTasks && location.search)) return
        const taskWithMatchingID = myTasks?.find(t => t._id === new URLSearchParams(location.search).get('id')) ?? ownedTasks?.find(t => t._id === new URLSearchParams(location.search).get('id')) ?? idleTasks?.find(t => t._id === new URLSearchParams(location.search).get('id'))
        if(!taskWithMatchingID) return setTask(false)
        setTask(taskWithMatchingID)
    }, [myTasks, ownedTasks, idleTasks, location])

    useEffect(() => {
        if(!(task && buildings)) return
        const buildingWithMatchingID = buildings.filter(b => b._id === task.buildingID)[0]
        setBuilding(buildingWithMatchingID)
    }, [buildings, task])

    useEffect(() => {
        if(!building) return
        setBuildingOwner(building.userID === userID)
    }, [building])

    async function sendComment(e) {
        e.preventDefault()
        if(!newComment) return
        let response = await phetch('/tasks/comment/add', {
            method: 'POST',
            body: {
                taskID: task._id,
                comment: newComment
            }
        })
        console.log(response)
        if(response?.success) {
            getMyTasks()
            setNewComment(undefined)
        }
        e.target.reset()
    }

    async function handleRemoveComment(id) {
        let response = await phetch('/tasks/comment/remove', {
            method: 'POST',
            body: {
                taskID: task._id,
                commentID: id
            }
        })
        console.log(response)
        if(response?.success) {
            getMyTasks()
        }
    }

    async function handleDeleteTask() {
        let response = await phetch('/tasks/delete', {
            method: 'POST',
            body: {
                taskID: task._id,
                buildingID: building._id
            }
        })
        console.log(response)
        if(response?.success) {
            navigate(`/byggnad?id=${building._id}`)
            getMyTasks()
        }
    }

    async function handleEditTaskSubmit({taskName, priority}) {
        console.log(priority)
        let response = await phetch('/tasks/update', {
            method: 'POST',
            body: {
                taskID: task._id,
                buildingID: building._id,
                taskName,
                priority,
            }
        })
        console.log(response)
        if(response?.success) {
            getMyTasks()
        }
    }

    return (
        <>
            {task === false && "Uppgiften hittades inte"}
            {(task && building) && 
                <div className={clsx(['oneTask', [task.status]])}>
                    <div className='header'>
                        <div className='taskName'>
                            <h2>{task.taskName}</h2>
                        </div>
                        <div className='taskBuilding'>
                            <div className='building' onClick={() => navigate(`/byggnad?id=${building._id}`)}>
                                <HouseIcon/>{building.buildingName}
                            </div>
                        </div>
                    </div>
                    {isBuildingOwner &&
                        <div className='ownerOptions'>
                            <button onClick={() => setEditTaskSelected(true)}>Ändra uppgift</button>
                            <button onClick={() => setDeleteTaskSelected(true)}>Ta bort uppgift</button>
                        </div>
                    }
                    <TaskContent task={task} isBuildingOwner={isBuildingOwner} />
                    <div className='commentsContainer'>
                        {task.comments?.length ?
                            <div className='comments'>
                                {task.comments.map(c => {
                                    if(c.userID === userID) return ( <div className='ownComment' key={c.id}><p className='user'>{c.name}</p><p className='comment'>{c.text}</p>{/*<p className='time'>6/2-2020 (1 dag sedan)</p>*/}<button onClick={() => handleRemoveComment(c.id)}>Ta bort</button></div> )
                                    else return ( <div className='otherComment' key={c.id}><p className='user'>{c.name}</p><p className='comment'>{c.text}</p>{/*<p className='time'>6/2-2020 (1 dag sedan)</p>*/}</div> )
                                })}
                            </div>
                            : null
                        }
                        <div className='newComment'>
                            <form onSubmit={sendComment} style={{width: '100%', display: 'flex'}}>
                                <label htmlFor="newComment" hidden>Ny kommentar</label>
                                <input type='text' id="newComment" style={{flex: 1, fontSize: "0.9rem", padding: "0.5rem"}} onChange={e => setNewComment(e.target.value)}/>
                                <input type="submit" value="Skicka"/>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {isEditTaskSelected &&
                <div className='taskPopup' onClick={() => setEditTaskSelected(false)}>
                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                        <h1>Ändra uppgift</h1>
                        <Cross className="closeCross" onClick={() => setEditTaskSelected(false)}/>
                        <form className='editTaskForm' onSubmit={handleSubmit(handleEditTaskSubmit)}>
                            <label htmlFor="taskName">Namn</label>
                            <input type="text" id="taskName" {...register("taskName", { required: true, value: task.taskName })}/>
                            <label htmlFor="priority">Prioritet</label>
                            <select id="priority" {...register("priority", { required: true, value: task.priority })}>
                                <option value="low">Låg</option>
                                <option value="high">Hög</option>
                            </select>
                            {/* <label htmlFor=""></label>
                            <input type="text" id=""/> */}
                            <input type="submit" value="Spara" />
                        </form>
                    </div>
                </div>
            }
            {isDeleteTaskSelected &&
                <div className='taskPopup' onClick={() => setDeleteTaskSelected(false)}>
                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                        <h1>Ta bort uppgift</h1>
                        <Cross className="closeCross" onClick={() => setDeleteTaskSelected(false)}/>
                        <p>Är du säker på att du vill ta bort uppgiften?</p>
                        <div className='buttons'>
                            <button onClick={() => (setDeleteTaskSelected(false), handleDeleteTask())}>Ja</button>
                            <button onClick={() => setDeleteTaskSelected(false)}>Avbryt</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OneTask;

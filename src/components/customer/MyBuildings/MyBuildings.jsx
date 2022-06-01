import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useData } from '../../../providers/DataProvider';
import { useGlobal } from '../../../providers/GlobalProvider';
import { clsx } from '../../../utils/utils'

import OneMyBuildings from './OneMyBuildings';

const MyBuildings = ({ setSelectedBuilding }) => {

    const navigate = useNavigate()

    const { phetch, userRole } = useGlobal()
    const { buildings, getBuildings, ownedBuildings, memberBuildings } = useData()

    const [buildingCode, setBuildingCode] = useState()
    const [isBuildingCodeWrong, setBuildingCodeWrong] = useState()

    function selectBuilding(building) {
        // setSelectedBuilding(building)
        navigate(`/byggnad?id=${building._id}`)
    }

    async function joinBuilding(e) {
        e.preventDefault()
        let response = await phetch('/buildings/join', {
            method: 'POST',
            body: {
                code: buildingCode,
            }
        })
        console.log(response)
        if(response?.success) {
            getBuildings()
            setBuildingCode(undefined)
            e.target.reset()
        }
        else if(response && !response.success) setBuildingCodeWrong(true)
    }

    useEffect(() => {
        if(!buildingCode) setBuildingCodeWrong(false)
    }, [buildingCode])

    return (
        <div className='myBuildings'>
            <h2>Mina byggnader</h2>
            <div className='ownedBuildings'>
                <div className='groupHeader'>
                    <h3>Ägda</h3>
                    {userRole === "customer" && <button className='btnNavigateToNewBuilding' onClick={() => navigate(`/nybyggnad`)}>Lägg till byggnad</button>}
                </div> 
                {ownedBuildings?.length ?
                    <div className='buildings'>
                        {ownedBuildings.map(b => (
                            <OneMyBuildings key={b._id} building={b} selectBuilding={selectBuilding}/>
                        ))}
                    </div>
                    : <p className='noFound'>Inga ägda byggnader</p>
                }
            </div>
            <div className='memberBuildings'>
                <div className='groupHeader'>
                    <h3>Medlem</h3>
                    <form className={clsx({error: isBuildingCodeWrong && buildingCode})}  onSubmit={e => (joinBuilding(e), setBuildingCodeWrong(false))}>
                        <label htmlFor="buildingCode" hidden>Inbjudningskod</label>
                        <input type='text' id='buildingCode' placeholder='Inbjudningskod' onChange={e => (setBuildingCode(e.target.value), setBuildingCodeWrong(false))}/>
                        <input type="submit" value="Gå med" disabled={!buildingCode}/>
                    </form>
                </div> 
                {memberBuildings?.length ?
                    <div className='buildings'>
                        {memberBuildings.map(b => (
                            <OneMyBuildings key={b._id} building={b} selectBuilding={selectBuilding}/>
                        ))}
                    </div>
                    : <p className='noFound'>Inte medlem i någon byggnad</p>
                }
            </div>
        </div>
    )
};

export default MyBuildings;

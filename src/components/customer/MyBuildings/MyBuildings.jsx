import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useData } from '../../../providers/DataProvider';

import OneMyBuildings from './OneMyBuildings';

const MyBuildings = ({ setSelectedBuilding }) => {

    const navigate = useNavigate()

    const { buildings } = useData()

    function selectBuilding(building) {
        setSelectedBuilding(building)
        // navigate(`/uppgifter?id=${building._id}`)
        navigate(`/byggnad?id=${building._id}`)
    }

    return (
        <>
            {buildings && 
                <>
                    <div className='myBuildings'>
                        {buildings.map(b => (
                            <OneMyBuildings key={b._id} building={b} selectBuilding={selectBuilding}/>
                        ))}
                    </div>
                </>
            }
        </>
    )
};

export default MyBuildings;

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';
import { clsx } from '../../../utils/utils';

import { ReactComponent as RightArrow } from '../../../assets/svg/RightArrowShort.svg';
import { ReactComponent as LeftArrow } from '../../../assets/svg/LeftArrowShort.svg';

const CreateBuilding = () => {

    const navigate = useNavigate()

    const { phetch } = useGlobal()
    const { getBuildings } = useData()

    const [viewNumber, setViewNumber] = useState(1)
    const [hasClickedContinue, setHasClickedContinue] = useState()
    const [shouldInputMoreInfo, setInputMoreInfo] = useState()
    const [moreInfoData, setMoreInfoData] = useState({
        address: undefined,
    })

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm();

    async function handleCreateBuilding({ buildingName, type, description }) {
        // setTimeout(async () => {
            let response = await phetch('/buildings/create', {
                method: 'POST',
                body: {
                    buildingName: buildingName.trim(),
                    type: type.trim(),
                    description: description.trim(),
                    ...Object.entries(moreInfoData).reduce((p, [k, v]) => 
                        (p[k] = v?.trim(), p)
                        ,{})
                }
            })
            console.log(response)
            if(response?.success) {
                navigate('/minabyggnader')
                getBuildings()
            }
        // }, 1000)
    }

    function changeViewNumber(changeValue) {
        setViewNumber(v => (v + changeValue > 3 ? 1 : v + changeValue < 1 ? 3 : v + changeValue))
    }

    return (
        <>
            <div className='createBuilding'>
                <div className='header'>
                    <h2>Lägg till byggnad</h2>
                </div>
                <form onSubmit={handleSubmit(handleCreateBuilding)} className={clsx({onContinue: hasClickedContinue})}>
                    <div className='main'>
                        <div className='views'>
                            <div className={clsx(['view', {center: viewNumber === 1, left: viewNumber > 1, right: viewNumber < 1}])}>
                                <label htmlFor='textInput1'>Namn</label>
                                <input autoComplete="off" id="textInput1" type="text" name="buildingName" {...register("buildingName", { required: true })} tabIndex="-1"/>
                            </div>
                            <div className={clsx(['view', {center: viewNumber === 2, left: viewNumber > 2, right: viewNumber < 2}])}>
                                <label htmlFor='textInput2'>Typ</label>
                                <input autoComplete="off" id="textInput2" type="text" name="type" {...register("type", { required: true })} tabIndex="-1"/>
                            </div>
                            <div className={clsx(['view', {center: viewNumber === 3, left: viewNumber > 3, right: viewNumber < 3}])}>
                                <label htmlFor='textInput3'>Beskrivning</label>
                                <textarea id="textInput3" name="description" {...register("description", { required: true })} rows="1" tabIndex="-1"/>
                            </div>
                        </div>
                        <div className='buttons'>
                            <div className='arrowLeft' onClick={e => (e.preventDefault(), changeViewNumber(-1))}>
                                <LeftArrow/>
                            </div>
                            <span className={clsx(['viewNumberCircle', {valid: watch('buildingName')?.trim(), active: viewNumber === 1}])}  onClick={e => (e.preventDefault(), setViewNumber(1))}></span>
                            <span className={clsx(['viewNumberCircle', {valid: watch('type')?.trim(), active: viewNumber === 2}])} onClick={e => (e.preventDefault(), setViewNumber(2))}></span>
                            <span className={clsx(['viewNumberCircle', {valid: watch('description')?.trim(), active: viewNumber === 3}])} onClick={e => (e.preventDefault(), setViewNumber(3))}></span>
                            <div className='arrowRight' disabled={viewNumber >= 3} onClick={e => (e.preventDefault(), changeViewNumber(1))}>
                                <RightArrow/>
                            </div>
                        </div>
                        <div style={{alignSelf: 'center', borderTop: '1px solid #404F66', paddingTop: '0.3rem', fontSize: '0.825rem', marginTop: '0.3rem', userSelect: 'none'}}>
                            Fyll i Namn, Typ och Beskrivning om byggnaden för att kunna gå vidare
                        </div>
                        <div className='btnNextContainer'>
                            <button disabled={!(watch('buildingName') && watch('type') && watch('description'))} onClick={e => (e.preventDefault(), setHasClickedContinue(true))} className={clsx(['btnNext', {show: (watch('buildingName') && watch('type') && watch('description'))}])}>Gå vidare</button>
                        </div>
                    </div>
                    <div className='overview'>
                        <h3>Översikt</h3>
                        <div className='group'>
                            <p>Namn</p>
                            <p>{watch('buildingName')?.trim()}</p>
                        </div>
                        <div className='group'>
                            <p>Typ</p>
                            <p>{watch('type')?.trim()}</p>
                        </div>
                        <div className='group'>
                            <p>Beskrivning</p>
                            <p>{watch('description')?.trim()}</p>
                        </div>
                        {hasClickedContinue && 
                            <div className='continueContent'>
                                <button className='btnGoBack' onClick={e => (e.preventDefault(), setHasClickedContinue(false))}>Ångra</button>
                                <div className='inputMoreInfoInner'>
                                    <label htmlFor='address'>Adress</label>
                                    <input id='address' type='text' onChange={e => setMoreInfoData(v => ({...v, address: e.target.value}))}/>
                                    <br/>
                                </div>
                                {/* <p>Vill du fylla i mer information om byggnaden?</p>
                                <button onClick={e => (e.preventDefault(), setInputMoreInfo(true))}>Ja</button>
                                <hr/> */}
                                <input disabled={!(watch('buildingName') && watch('type') && watch('description'))} type="submit" value="Spara byggnad"/>
                            </div>
                        }
                    </div>
                </form>  
            </div>
            {/* {shouldInputMoreInfo &&
                <div className='inputMoreInfo'>
                    <div className='inputMoreInfoInner'>
                        <button onClick={e => (e.preventDefault(), setInputMoreInfo(false))}>Avbryt</button>
                        <hr/>
                        <label htmlFor='address'>Adress</label>
                        <input id='address' type='text' onChange={e => setMoreInfoData(v => ({...v, address: e.target.value}))}/>
                        <hr/>
                        <button onClick={handleSubmit(handleCreateBuilding)}>Spara byggnad</button>
                    </div>
                </div>
            } */}
        </>
    )
};

export default CreateBuilding;

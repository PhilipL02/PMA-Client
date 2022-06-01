import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';
import { clsx } from '../../../utils/utils';

import { ReactComponent as RightArrow } from '../../../assets/svg/RightArrowShort.svg';
import { ReactComponent as LeftArrow } from '../../../assets/svg/LeftArrowShort.svg';

import styles from './CreateBuilding.module.scss';

const CreateBuilding = () => {

    const navigate = useNavigate()

    const { phetch } = useGlobal()
    const { getBuildings } = useData()

    const [viewNumber, setViewNumber] = useState(1)
    const [hasClickedContinue, setHasClickedContinue] = useState()
    const [moreInfoData, setMoreInfoData] = useState({
        address: undefined,
        place: undefined,
        zipCode: undefined,
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
        <div className={styles.createBuilding}>
            <div className={styles.header}>
                <h2>Lägg till byggnad</h2>
            </div>
            <div className={clsx([styles.main, {[styles.onContinue]: hasClickedContinue}])}>
                <form className={styles.requiredInfoForm} onSubmit={handleSubmit(handleCreateBuilding)}>
                <div className={styles.views}>
                    <div className={clsx([styles.view, {[styles.center]: viewNumber === 1, [styles.left]: viewNumber > 1, [styles.right]: viewNumber < 1}])}>
                        <label htmlFor='textInput1'>Namn</label>
                        <input autoComplete="off" id="textInput1" type="text" name="buildingName" {...register("buildingName", { required: true })} tabIndex="-1"/>
                    </div>
                    <div className={clsx([styles.view, {[styles.center]: viewNumber === 2, [styles.left]: viewNumber > 2, [styles.right]: viewNumber < 2}])}>
                        <label htmlFor='textInput2'>Typ</label>
                        <input autoComplete="off" id="textInput2" type="text" name="type" {...register("type", { required: true })} tabIndex="-1"/>
                    </div>
                    <div className={clsx([styles.view, {[styles.center]: viewNumber === 3, [styles.left]: viewNumber > 3, [styles.right]: viewNumber < 3}])}>
                        <label htmlFor='textInput3'>Beskrivning</label>
                        <textarea id="textInput3" name="description" {...register("description", { required: true })} rows="1" tabIndex="-1"/>
                    </div>
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.arrowLeft} onClick={e => changeViewNumber(-1)}>
                            <LeftArrow/>
                        </div>
                        <span className={clsx([styles.viewNumberCircle, {[styles.valid]: watch('buildingName')?.trim(), [styles.active]: viewNumber === 1}])}  onClick={e => setViewNumber(1)}></span>
                        <span className={clsx([styles.viewNumberCircle, {[styles.valid]: watch('type')?.trim(), [styles.active]: viewNumber === 2}])} onClick={e => setViewNumber(2)}></span>
                        <span className={clsx([styles.viewNumberCircle, {[styles.valid]: watch('description')?.trim(), [styles.active]: viewNumber === 3}])} onClick={e => setViewNumber(3)}></span>
                        <div className={styles.arrowRight} onClick={e => changeViewNumber(1)}>
                            <RightArrow/>
                        </div>
                    </div>
                    <div style={{alignSelf: 'center', borderTop: '1px solid #404F66', paddingTop: '0.3rem', fontSize: '0.8rem', maxWidth: '90%', textAlign: 'center', margin: 'auto', marginTop: '0.3rem', userSelect: 'none'}}>
                        Fyll i Namn, Typ och Beskrivning om byggnaden för att kunna gå vidare
                    </div>
                    <div className={styles.btnNextContainer}>
                        <button disabled={!(watch('buildingName') && watch('type') && watch('description'))} onClick={e => (e.preventDefault(), setHasClickedContinue(true))} className={clsx([styles.btnNext, {[styles.show]: (watch('buildingName') && watch('type') && watch('description'))}])}>Gå vidare</button>
                    </div>
                </form>
                <div className={styles.overview}>
                    <div className={styles.group}>
                        <p>Namn</p>
                        <p>{watch('buildingName')?.trim()}</p>
                    </div>
                    <div className={styles.group}>
                        <p>Typ</p>
                        <p>{watch('type')?.trim()}</p>
                    </div>
                    <div className={styles.group}>
                        <p>Beskrivning</p>
                        <p>{watch('description')?.trim()}</p>
                    </div>
                    {hasClickedContinue && 
                        <div className={styles.continueContent}>
                            <button className={styles.btnGoBack} onClick={e => (e.preventDefault(), setHasClickedContinue(false))}>Gå tillbaka</button>
                            <h4 style={{margin: 'auto', width: '80%', padding: '0.25rem'}}>Följande fält är valfria</h4>
                            <p style={{margin: 'auto', marginBottom: '0.75rem', width: '80%', padding: '0.2rem', fontSize: '0.85rem', borderBottom: '1px solid black'}}>Denna information kan läggas till senare</p>
                            <form className={styles.optionalInfoForm} onSubmit={handleSubmit(handleCreateBuilding)}>
                                <div className={styles.labelInputContainer}>
                                    <label htmlFor='address'>Adress</label>
                                    <input id='address' type='text' onChange={e => setMoreInfoData(v => ({...v, address: e.target.value}))}/>
                                </div>
                                <div className={styles.labelInputContainer}>
                                    <label htmlFor='place'>Ort</label>
                                    <input id='place' type='text' onChange={e => setMoreInfoData(v => ({...v, place: e.target.value}))}/>
                                </div>
                                <div className={styles.labelInputContainer}>
                                    <label htmlFor='zipCode'>Postnummer</label>
                                    <input id='zipCode' type='text' onChange={e => setMoreInfoData(v => ({...v, zipCode: e.target.value}))}/>
                                </div>
                                <input disabled={!(watch('buildingName') && watch('type') && watch('description'))} type="submit" value="Spara byggnad"/>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateBuilding
import { useEffect, useState } from 'react'

export const getMedia = (query) => window.matchMedia(query)

const useMedia = (query, defaultValue)  => {

    const [state, setState] = useState(defaultValue ?? (() => getMedia(query).matches))

    useEffect(()=>{
        let mounted = true
        const media = getMedia(query)
        const onChange = () => mounted && setState(media.matches)
        media.addListener(onChange)
        return () => {
            mounted = false
            media.removeListener(onChange)
        }
    },[query])
    
    return state
}

export default useMedia

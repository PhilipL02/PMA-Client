import { useMemo, useState } from 'react'

const useInteger = (initialValue=0) => {
    const [ is, setIs ] = useState(parseInt(initialValue))

    const methods = useMemo(() => ({
        set: (value=is) => setIs(parseInt(value)),
        increase: (value=1) => setIs(current=>parseInt(current+value)),
        decrease: (value=1) => setIs(current=>parseInt(current-value)),
        multiply: (value=1) => setIs(current=>parseInt(current*value)),
        divide: (value=1) => setIs(current=>parseInt(current/value))
    }), [])

    return [ is, methods ]
}

export default useInteger

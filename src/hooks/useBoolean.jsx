import { useMemo, useState } from 'react'

const useBoolean = (initialValue) => {
    const [ is, setIs ] = useState(!!initialValue)

    const methods = useMemo(() => ({
        set: value => setIs(!!value),
        toggle: () => setIs(v => !v),
        on: () => setIs(true),
        off: () => setIs(false),
    }), [])

    return [ is, methods ]
}

export default useBoolean

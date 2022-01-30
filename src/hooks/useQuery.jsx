import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
    const params = new URLSearchParams(useLocation().search)
    const to = useNavigate()

    return {
        params,
        push: () => to('?'+params)
    }
};

export default useQuery

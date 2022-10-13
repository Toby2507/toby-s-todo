import { useState } from "react"
import { useDispatch } from "react-redux"
import { setFilter } from "./todoFilterSlice"

const mobile = 'flex items-center space-x-4'
const desktop = 'hidden items-center space-x-4 md:flex'
const activeClass = 'filter-btn active capitalize text-base text-brightBlue font-bold'
const inactiveClass = 'filter-btn capitalize text-base text-lightTextLight font-bold hover:text-lightTextDark dark:text-darkFilterText dark:hover:text-darkFilterHover'

const FilterBtns = ({ isMobile }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState('all')
    const handleButtons = value => {
        dispatch(setFilter(value))
        setActive(value)
    }

    return (
        <div className={isMobile ? mobile : desktop}>
            <button onClick={() => handleButtons('all')} className={active === 'all' ? activeClass : inactiveClass}>all</button>
            <button onClick={() => handleButtons('active')} className={active === 'active' ? activeClass : inactiveClass}>active</button>
            <button onClick={() => handleButtons('inactive')} className={active === 'inactive' ? activeClass : inactiveClass}>completed</button>
        </div>
    )
}

export default FilterBtns
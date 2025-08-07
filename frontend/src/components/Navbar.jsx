import React, { useState } from 'react'
import "../styles/Navbar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import SegmentEditor from './SegmentEditor';

function Navbar({ handleSegmentSubmit }) {
    const [showFilterModal, setShowFilterModal] = useState(false)

    return (
        <>
            <div className='navbar'>
                <h1>ConvertCart</h1>
                <GiHamburgerMenu className='icon' title='Add Filters' onClick={() => { setShowFilterModal(!showFilterModal) }} color='white' />
            </div>
            {
                showFilterModal && <SegmentEditor onSubmit={handleSegmentSubmit} />
            }
        </>
    )
}

export default Navbar
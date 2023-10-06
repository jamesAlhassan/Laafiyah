// Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';
import { BsFillCaretRightFill, BsFillPeopleFill, BsFillCalendar2DayFill, Bs123 } from "react-icons/bs";
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaFolder } from 'react-icons/fa';

const Sidebar = () => {

    const [selectedOption, setSelectedOption] = useState('Dashboard');
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    }

    return (
        <div className={`side-bar-container ${expanded ? 'expanded' : ''}`}>
            <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
                <div className="open-menu" onClick={toggleSidebar}>
                    <BsFillCaretRightFill className='open-menu-icon"'/>
                </div>

                <div className={`menu-item ${selectedOption === 'Appointment' ? 'active' : ''}`}>
                    <AiFillPlusCircle className='menu-icon' />
                    <span className="menu-label">Label 1</span>
                </div>

                <div className="menu-item">
                    <FaFolder className='menu-icon'/>
                    <span className="menu-label">Label 2</span>
                </div>

                <div className="menu-item">
                    <BsFillPeopleFill className='menu-icon'/>
                    <span className="menu-label">Label 3</span>
                </div>

                <div className="menu-item">
                    <BsFillCalendar2DayFill className='menu-icon'/>
                    <span className="menu-label">Label 4</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

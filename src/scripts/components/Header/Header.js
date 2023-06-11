import React, {useEffect, useRef} from 'react';
import './Header.css';
import ProgressPanel from '../progresspanel/progresspanel.view';
import { useSelector, useDispatch } from 'react-redux';
import { globalMessageShow } from '../../stateManagement/actions/progress.panel.actions';
import { headerLang } from './lang';
import { mainLang } from '../Main/lang';
import { progressPanel } from '../Main/lang';
import {Link, useNavigate} from 'react-router-dom';
import { clearStorage, getStorage, setStorage } from '../../Storage/Storage';

const Header = (props) => {

    // Initializing navigate route!
    let navigate = useNavigate();
    
    // Global state management!
    const jobTracker = useSelector(state => state.jobTracker);
    const dispatch = useDispatch();

    // Height calculation handler for the element!
    const headerRef = useRef(null);

    // Options mapping with the header lang file
    const options = headerLang;

    // Handle selection!
    function handleSelect(data){
        // Handle the selection in the local storage for the persistant!
        setStorage(mainLang.currentDirectory, data);
        // Send the data to the parent container!
        props.select(data);
    }

    // Handle universal logout!
    function handleLogout(){
        // Clear off the entire local storage!
        clearStorage();
        // Navigate to the login route!
        navigate("/", {replace: true});
    }
    
    // Get progress panel position!
    function getProgressPanelPos(){
      return headerRef.current.offsetWidth / 3;
    }

    // Constructor!
    useEffect(() => {
        props.header(headerRef.current.offsetHeight);
    }, [])

    return (
        <div class="header" ref = {headerRef}>
            <div className = "header-left">
                {
                    options.map((item, key) => {
                        return(
                            <a className = "brew-header-title" onClick = {() => handleSelect(item)}>
                                {item}
                            </a>
                        )
                    })
                }
            </div>
            
            <div className = "header-right">
                <Link to = {'/'} className = "brew-header-title" onClick={() => handleLogout()}>{mainLang.logout}</Link>
            </div>
            
            { /* Progress panel when jobTracker state gets true */ }
            {jobTracker && (
              <ProgressPanel message = {progressPanel.runningAutomation} position = {getProgressPanelPos()} />
            )}
            
        </div>
    )
}

export default Header
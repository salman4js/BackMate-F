import React, {useState, useEffect} from 'react';
import'./workspace.css';
import SidePanel from '../SidePanel/SidePanel';
import WorkPanel from '../WorkPanel/WorkPanel';

const WorkSpace = (props) => {

  // Handle content for the workpanel!
  const [content, setContent] = useState();

  // Handle the file content to the editor!
  function handleContent(data){
    setContent(data);
  }

  return (
    <div className = "brew-container">
        <SidePanel fileContent = {(data) => handleContent(data)}/>
        <WorkPanel content = {content} />
    </div>
  )
}

export default WorkSpace
import React, { useState, useEffect } from 'react';
import { workLang } from '../WorkSpace/lang';
import { setStorage, getStorage } from '../../../Storage/Storage';
import './SidePanel.css';
import FileItems from './src/FileItems';
// Importing the node 'fs' and 'pathModule' module.
const fs = window.require('fs');
const pathModule = window.require('path');


const SidePanel = (props) => {

  // Get the current path of the working directory!;
  if(getStorage("wd") == null || undefined){
    setStorage("wd",process.cwd());
  }
  var wd = getStorage("wd");

  // Files and Folders state handler!
  const [data, setData] = useState([]);

  // Handle the data in the directory!
  function getData(path) {
    const data = fs.readdirSync(path)
      .map(file => {
        const stats = fs.statSync(pathModule.join(path, file))
        return {
          name: file,
          directory: stats.isDirectory()
        }
      })
      .sort((a, b) => {
        if (a.directory === b.directory) {
          return a.name.localeCompare(b.name)
        }
        return a.directory ? -1 : 1
      })

    setData(data);
  }

  // Resize side panel on command!
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);

  const initial = (e) => {

    let resizable = document.getElementById('Resizable');

    setInitialPos(e.clientX);
    setInitialSize(resizable.offsetWidth);

  }

  const resize = (e) => {

    let resizable = document.getElementById('Resizable');

    resizable.style.width = `${parseInt(initialSize) + parseInt(e.clientX - initialPos)}px`;

  }

  // Root Directory!
  function rootDirectory(path){
    setStorage("wd", path)
  }

  // Handle folders navigation!
  function handleNavigation(names){
    // Assigning the new path to data state to handle navigation!
    const newPath = pathModule.join(wd, names);
    getData(newPath);
    // Change the working directory everytime the path changes!
    rootDirectory(newPath);
  }

  // Handle Folders back operation!
  function handleBack(){
    console.log("Back Operation is triggered!");
    const newPath = pathModule.dirname(wd);
    getData(newPath);
    // Change the working directory everytime the path changes!
    rootDirectory(newPath);
  }

  // Constructor - Get all the files and folders in working directory before the component renders!
  useEffect(() => {
    // Getting the data's from the path directory!
    getData(wd);
  }, [])

  return (
    <div className='Block'>
      <div id='Resizable' className="workspace">
        <div className="brew-title-workspace title-header">
          <span className="title-header-span">
            {workLang.explorer}
          </span>
        </div>
        <div className="hr">

        </div>
        <div className="files">
          {
            data.map((item, key) => {
              return (
                <FileItems name={item.name} isDirectory={item.directory} navigation = {(data) => handleNavigation(data)} />
              )
            })
          }
        </div>
        <div className = "footer">
          <div className = "brew-title-workspace title-header">
            <span className = "title-header-span" onClick={() => handleBack()}>
              {workLang.back}
            </span>
          </div>
        </div>
      </div>
      <div id='Draggable'
        draggable='true'
        onDragStart={initial}
        onDrag={resize}
      >
      </div>
    </div>
  )

}

export default SidePanel;
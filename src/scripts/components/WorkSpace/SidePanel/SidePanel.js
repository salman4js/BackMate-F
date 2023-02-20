import React, { useState, useEffect, useRef } from 'react';
import { workLang } from '../WorkSpace/lang';
import { setStorage, getStorage } from '../../../Storage/Storage';
import FooterBtn from '../FooterBtn/FooterBtn'
import './SidePanel.css';
import FileItems from './src/FileItems';
// Importing the node 'fs' and 'pathModule' module.
const fs = window.require('fs');
const pathModule = window.require('path');


const SidePanel = (props) => {

  // References to calculate the code editor height!
  const sideRef = useRef(null);
  const workSpaceRef = useRef(null);

  // Get the current path of the working directory!;
  if (getStorage("wd") == null || undefined) {
    setStorage("wd", process.cwd());
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

  // Root Directory!
  function rootDirectory(path) {
    setStorage("wd", path)
  }

  // Handle folders navigation!
  function handleNavigation(names) {
    // Assigning the new path to data state to handle navigation!
    const newPath = pathModule.join(wd, names);
    getData(newPath);
    // Change the working directory everytime the path changes!
    rootDirectory(newPath);
  }

  // Handle Folders back operation!
  function handleBack() {
    const newPath = pathModule.dirname(wd);
    getData(newPath);
    // Change the working directory everytime the path changes!
    rootDirectory(newPath);
  }

  // Handle open file operation!
  function openFile(data) {
    const fileContent = fs.readFileSync(pathModule.join(wd, data)).toString();
    props.fileContent(fileContent);
  }

  // Update height for the code editor!
  function updateHeight(data){
    props.height(workSpaceRef, sideRef, data);
  }

  // Constructor - Get all the files and folders in working directory before the component renders!
  useEffect(() => {
    // Getting the data's from the path directory!
    getData(wd);
  }, [])

  return (
    <div className = "sidepanel-container">
      <div className="wrapper">
      <div className = "workspace-title" ref = {workSpaceRef}>
        <span className = "explorer">
          {workLang.explorer}
        </span>
        <span className = "new-folder">
          New
        </span>
        <span className = "new-file">
          New 2
        </span>
      </div>
        <div className="sidebar" ref = {sideRef}>
        
          <div className="files">
            {
              data.map((item, key) => {
                return (
                  <FileItems name={item.name} isDirectory={item.directory} navigation={(data) => handleNavigation(data)}
                    openFile={(data) => openFile(data)}
                  />
                )
              })
            }
          </div>
          <FooterBtn workName = {workLang.back} handleAction = {() => handleBack()} footerHeight = {(data) => updateHeight(data)} />
        </div>
      </div>
    </div>
  )

}

export default SidePanel;
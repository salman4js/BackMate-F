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
  function updateHeight(data) {
    props.height(workSpaceRef, sideRef, data);
  }

  // Handle folder creation!
  function folderCreation(){
    console.log("Create folder has been clicked!");
  }

  // Handle file creation!
  function fileCreation(){
    console.log("Create file has been clicked!");
  }

  // Constructor - Get all the files and folders in working directory before the component renders!
  useEffect(() => {
    // Getting the data's from the path directory!
    getData(wd);
  }, [])

  return (
    <div className="sidepanel-container">
      <div className="wrapper">
        <div className="workspace-title" ref={workSpaceRef}>
          <span className="explorer">
            {workLang.explorer}
          </span>
          <span className="new-folder" onClick={() => folderCreation()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
              <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
              <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </span>
          <span className="new-file" onClick={() => fileCreation()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
          </span>
        </div>
        <div className="sidebar" ref={sideRef}>

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
          <FooterBtn workName={workLang.back} handleAction={() => handleBack()} footerHeight={(data) => updateHeight(data)} />
        </div>
      </div>
    </div>
  )

}

export default SidePanel;
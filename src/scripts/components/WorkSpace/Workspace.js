import React, { useState, useEffect, useLayoutEffect } from 'react';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
// Importing the node 'fs' and 'pathModule' module.
const fs = window.require('fs');
const pathModule = window.require('path')


const Workspace = () => {

  // Get the current path of the working directory!;
  var wd = process.cwd();

  // Files and Folders state handler!
  const [data, setData] = useState([]);

  // Handle the data in the directory!
  function getData() {
    const data = fs.readdirSync(wd)
    .map(file => {
      const stats = fs.statSync(pathModule.join(wd, file))
      return{
        name: file,
        directory: stats.isDirectory()
      }
    })
    .sort((a,b) => {
      if(a.directory === b.directory){
        return a.name.localeCompare(b.name)
      }
      return a.directory ? -1 : 1
    })

    return data;
  }

  // Constructor - Get all the files and folders in working directory before the component renders!
  useLayoutEffect(() => {
    // Assigning the object value to the data state!
    setData(getData())
  }, [])

  return (
    <div>
      {
        data.map((item,key) => {
          return(
            <a>
              {item.name} - {item.directory === true ? "True" : "False"}
            </a>
          )
        })
      }
    </div>
  )

}

export default Workspace;
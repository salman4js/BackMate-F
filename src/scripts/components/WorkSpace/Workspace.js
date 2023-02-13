import React, { useState, useEffect, useLayoutEffect } from 'react';
// Importing the node 'fs' module.
const fs = window.require('fs');


const Workspace = () => {

  // Get the current path of the working directory!;
  var wd = process.cwd();

  // Files and Folders state handler!
  const [data, setData] = useState([]);

  // Constructor - Get all the files and folders in working directory before the component renders!
  useLayoutEffect(() => {
    fs.readdir(wd, (err, files) => {
      files.forEach(file => {
        setData(oldValue => [...oldValue, file])
      })
    })
  }, [])

  return (
    <div>
      {
        data
      }
    </div>
  )

}

export default Workspace;
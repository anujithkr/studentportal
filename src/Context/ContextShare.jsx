import React, { createContext, useState } from 'react'

// creacte a context

export const AddProjectResponseContext = createContext();
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

function ContextShare({ children }) {
  
  // children is a pre defined propes used to share data between all components
  // create a state that state is we are sharing between components

  const [addProjectResponse, setaddProjectResponse] = useState({})
  const [editProjectResponse, setEditProjectResponse] = useState({})
  const [isAuthToken , SetIsAuthToken] = useState(false)
  return (
    <>
      <AddProjectResponseContext.Provider value={{ addProjectResponse, setaddProjectResponse }}>

        <editProjectResponseContext.Provider  value={{ editProjectResponse, setEditProjectResponse }}>
          <isAuthTokenContext.Provider value={{isAuthToken , SetIsAuthToken}}>
          {children}
          </isAuthTokenContext.Provider>
        </editProjectResponseContext.Provider>


      </AddProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare
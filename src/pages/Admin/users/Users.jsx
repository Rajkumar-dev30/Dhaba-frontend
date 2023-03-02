import React from 'react'
import "./users.scss"
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'

const Users = () => {
  return (
<div className="user-alignments"> 
    <div className="left">
      <Sidebar/>
    </div>
    <div className="right">
      <div className="top-user">
        <Navbar type="users"/>
      </div>
      <div className="bottom-user">
        <h1>Users Content</h1>
      </div>
    </div>
    </div>  )
}

export default Users
import axios from 'axios';
import {React,useState,useEffect} from 'react'

const DashboardData = () => {

    const[userData, setUserData] = useState('')

    const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

    const getUsers = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.get("https://kingsdhabaserver.onrender.com/admin/allusers",config)
            setUserData(response.data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getUsers()
    });

  return (
    <div>
        {userData}
    </div>
  )
}

export default DashboardData
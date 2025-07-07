import React,{useState} from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import Topbar from '../components/Layout/Topbar'
import UserForm from '../CreateUser/UserForm'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from '../firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, uploadBytesResumable,  ref as storageRef } from 'firebase/storage'
import StaffForm from '../CreateUser/StaffForm'
import * as XLSX from 'xlsx';
const CreateStaff = () => {
    const navigate = useNavigate("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   const [role, setRole] = useState("")
    const [contact, setContact] = useState("")
 
    const handleCreateUser = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
         const user = userCredential.user;
               await setDoc(doc(db, "users",user.uid ), {
                  name:name,
                  email:email,
                  password:password,
                  contact:contact,
                  companyName:"",
                  gstNo:"",
                  gstDocument:"",
                  agreement:"",
                  otherDoc:"",
                  insuranceType:"",
                  companyAddress:"", 
                  role:role,
                  partnerType:"",
                  walletBalance:"",
                  service:"logistics",
                  uid:user.uid,
                  rateList:""
               })   
               navigate("/users")
        }).catch((err)=>{
         console.log(err)
        })
    }
 
  return (
    <div className='bg-gray-100 flex '>
    <Sidebar />
    <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col ' >
    <Topbar />
      
        <StaffForm name={name} setName={setName}
   
        handleCreateUser={handleCreateUser}
        
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        role={role} setRole={setRole}
        contact={contact} setContact={setContact}
         />
    </div>
</div>
  )
}

export default CreateStaff
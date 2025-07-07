import React, { useState } from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import Topbar from '../components/Layout/Topbar'
import UserForm from '../CreateUser/UserForm'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from '../firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const CreateUser = () => {
  const navigate = useNavigate("")
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [contact, setContact] = useState("")
  const handleCreateUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          password: password,
          contact: contact,
          role: role,
          service: "Different Clothing",
          uid: user.uid,
        })
        toast.success("User Created")
        navigate("/users")
      }).catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='bg-gray-100 flex '>
      <Sidebar />
      <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
        <Topbar />

        <UserForm setRole={setRole} role={role} name={name} setName={setName}
          email={email} setEmail={setEmail} handleCreateUser={handleCreateUser}
          password={password} setPassword={setPassword}
          contact={contact} setContact={setContact}
        />
      </div>
    </div>
  )
}

export default CreateUser
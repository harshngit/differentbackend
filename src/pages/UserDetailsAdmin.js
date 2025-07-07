import React,{useState,useEffect} from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'

import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useParams } from 'react-router-dom'
import UserDetailsArea from '../CreateUser/UserDetailsArea'
import emailjs from "@emailjs/browser";
const UserDetailsAdmin = () => {
    const {id} = useParams()
    const [profile, setProfile] = useState({})
    const [billAmount, setBillAmount] = useState(0)
    const fetchUser = () =>{
        onSnapshot(doc(db, "users", id), (doc) => {
           const data = doc.data()
           setProfile(data)
           setBillAmount(data?.billAmount)
           });
   }
   const updateBillAmount = async () =>{
    await updateDoc(doc(db, "users", id), {
        billAmount: billAmount
     })   
   }
   const sendBillDueEmail =  () =>{
    emailjs.init("dnrFfmJPSD_LmYGIf")
    const SERVICE_ID = "service_lm6wf94"
    const TEMPLATE_ID = "template_jtxt516"
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    to_email:profile?.email,
    from_email:"grclogistics6@gmail.com",
    to_name:profile?.name,
    amount: profile?.billAmount
    }).then((result) => {
        alert("Email Sent")
    }).catch((err) => {
        alert("Error Occured:"+err.message)
    });
    
   }
   useEffect(() => {
    fetchUser()
   }, [id])
  return (
    <div className='bg-gray-100 flex '>
     <Sidebar />
    <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
    <Topbar />
      
        <UserDetailsArea sendBillDueEmail={sendBillDueEmail} billAmount={billAmount} updateBillAmount={updateBillAmount} setBillAmount={setBillAmount} profile={profile} />
    </div>
    </div>
  )
}

export default UserDetailsAdmin
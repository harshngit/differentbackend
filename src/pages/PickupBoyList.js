import React, { useEffect, useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../firebase.config'
import PickupListing from '../components/CreateDeliveryOrder.js/PickupListing'

const PickupBoyList = () => {
    const [pickupList, setPickupList] = useState([])
    const { error, loading, isAuthenticated,users,userProfile } = useSelector(
        (state) => state.user
      );
    const fetchPickupList = async () =>{
        const q = query(collection(db, "pickupLocation"),where("pickupPerson","==",users),where("pickupStatus", "==", "pickingUp"))  
       await onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data()
            setPickupList((prev)=>[...prev,{
                id:doc.id,
                ...doc.data()
               }])
          
         });
        });
       
      }
      console.log(pickupList)
      useEffect(() => {
        fetchPickupList()
      }, [])
      
  return (
    <div>
        <Topbar />
        <PickupListing fetchPickupList={fetchPickupList} pickupList={pickupList} />
    </div>
  )
}

export default PickupBoyList
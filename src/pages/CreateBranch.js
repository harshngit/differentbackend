import React, { useEffect, useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import CreateBranchList from '../components/Branch/CreateBranchList'
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useSelector } from 'react-redux'
import BranchList from '../components/Branch/BranchList'

const CreateBranch = () => {
    const { error, loading, isAuthenticated,users,userProfile } = useSelector(
        (state) => state.user
      );
    const [brandInfo, setBrandInfo] = useState({
        location:"",
        name:"",
        city:"",
        state:"",
        pincode:"",
        branchManager:"",
        phoneNumber:""
    })
    const [branchList, setBranchList] = useState([])
    const deleteWarehouse = async (id) =>{
        await deleteDoc(doc(db, "branchLogistics", id))
        window.location.reload()
    }
    const handleBrachAdd = () =>{
        if(brandInfo?.name.length===0){
            alert("Please enter the Pin Code")
        }
        else if(brandInfo.city.length===0){
            alert("Please enter the City name")
        }
        else if(brandInfo.state.length===0){
            alert("Please enter the State name")
        }
       
        else if(brandInfo.location.length===0){
            alert("Please enter the Address")
        }
        else if(brandInfo.branchManager.length===0){
            alert("Please enter the Branch Manager name")
        }
        else if(brandInfo.phoneNumber.length===0){
            alert("Please enter the Phone Number")
        }
       
        else{
            addDoc(collection(db, "branchLogistics"),
            {
             locationName:brandInfo?.name,
             pinCode:brandInfo?.pincode,
             city:brandInfo.city,
             state:brandInfo.state,
             country:"india",
             address:brandInfo.location,
             phone: brandInfo.phoneNumber,
            branchManager:brandInfo.branchManager,
             userUid:userProfile?.uid
          }).then(()=>{
            setBrandInfo({
                location:"",
                name:"",
                city:"",
                state:"",
                pincode:"",
                branchManager:"",
                phoneNumber:""
            })
           
            })
        }
    }
    const fetchBranch = async () =>{
        const q = query(collection(db, "branchLogistics")) 
        const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
          setBranchList((prev)=>[...prev,{
              id:doc.id,
              ...doc.data()
             }])
          
         });
    }
    useEffect(() => {
     fetchBranch()
    }, [])
    
  return (
    <div className='bg-gray-100 flex '>
      <Sidebar />
    <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
    <Topbar />
      
        <div className='col-span-4 mx-12 my-8 bg-white rounded-lg px-12 py-6'>
   <CreateBranchList brandInfo={brandInfo} setBrandInfo={setBrandInfo} handleBrachAdd={handleBrachAdd}  />
   <BranchList branchList={branchList} setBranchList={setBranchList} />
   </div>
    </div>
    </div>
  )
}

export default CreateBranch
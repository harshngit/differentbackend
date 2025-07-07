import React, { useState, useEffect } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import PickupForm from '../components/RequestPickup/PickupForm'
import PickupPage from '../components/RequestPickup/PickupPage'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useSelector } from 'react-redux'
import UpdateRequestModal from '../components/RequestPickup/UpdateRequestModal'

const RequestPickup = () => {
  const [pickupData, setPickupData] = useState({

    packages: "",
    date: "",
    time: "",

  })
  const [status, setStatus] = useState("")
  const [pickupId, setPickupId] = useState("")
  const [warehouseLocation, setWarehouseLocation] = useState({})
  const [requestId, setRequestId] = useState("")
  const [updateModal, setUpdateModal] = useState(false)
  const handleUpdateModal = () => {
    setUpdateModal(!updateModal)
  }
  const [warehouseList, setWarehouseList] = useState([])
  const [deliveryBoys, setDeliveryBoys] = useState([])
  const [deliveryBoy, setDeliveryBoy] = useState({})
  const { error, loading, isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  );
  const [pickupList, setPickupList] = useState([])
  const handlePickup = () => {
    const date = new Date()
    addDoc(collection(db, "pickupLocation"),
      {
        requestId: "GRCR" + date.getFullYear() + (pickupList.length + 1),
        location: warehouseLocation,
        packages: pickupData.packages,
        date: pickupData.date,
        time: pickupData.time,
        user: users,
        userName: userProfile?.name
      }).then(() => {
        setPickupData({
          location: "",
          packages: "",
          date: "",
          time: ""
        })
        setWarehouseLocation({})
        window.location.reload();
      })
  }
  const handleUpdateRequest = () => {
    const repairRef = doc(db, "pickupLocation", pickupId);
    if (status !== "pickingUp") {

      updateDoc(repairRef, {
        pickupStatus: status
      });
      handleUpdateModal()
    }
    else {
      updateDoc(repairRef, {
        pickupStatus: status,
        pickupBoy: deliveryBoy,
        pickupPerson: deliveryBoy.id,
        deliveryBoyStatus: "incomplete"
      });
      handleUpdateModal()
    }

  }
  const fetchPickupList = async () => {
    if (userProfile?.role === "admin") {
      const q = query(collection(db, "pickupLocation"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPickupList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])

      });
    }
    else {
      const q = query(collection(db, "pickupLocation"), where("user", "==", users))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPickupList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])

      });
    }

  }
  const fetchPickupDetails = async () => {
    const q = query(collection(db, "pickupLocation"), where("requestId", "==", requestId))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setStatus(doc.data().pickupStatus)

    });
  }
  const fetchWarehouse = async () => {
    if (userProfile?.role === "admin") {
      const q = query(collection(db, "warehouse"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setWarehouseList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])

      });
    }

    else {
      const q = query(collection(db, "warehouse"), where("userUid", "==", users))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setWarehouseList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])

      });
    }
  }
  const fetchDeliveryBoy = async () => {
    const q = query(collection(db, "users"), where("role", "==", "Delivery Boy"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDeliveryBoys((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])

    });
  }

  const deletePickup = async (id) => {
    await deleteDoc(doc(db, "pickupLocation", id))
    window.location.reload()
  }
  useEffect(() => {
    fetchPickupList();
    fetchWarehouse()
    fetchDeliveryBoy()

  }, [])

  return (
    <div className='bg-gray-100 flex '>
      <UpdateRequestModal deliveryBoy={deliveryBoy} setDeliveryBoy={setDeliveryBoy} deliveryBoys={deliveryBoys} setDeliveryBoys={setDeliveryBoys} status={status} setStatus={setStatus} updateModal={updateModal} setUpdateModal={setUpdateModal} handleUpdateModal={handleUpdateModal} handleUpdateRequest={handleUpdateRequest} />
      <Sidebar />
      <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
        <Topbar />

        <PickupPage deletePickup={deletePickup} requestId={requestId} setRequestId={setRequestId} pickupId={pickupId} setPickupId={setPickupId} handleUpdateModal={handleUpdateModal} warehouseList={warehouseList} warehouseLocation={warehouseLocation} setWarehouseLocation={setWarehouseLocation} pickupData={pickupData} setPickupData={setPickupData} handlePickup={handlePickup} pickupList={pickupList} />

      </div>
    </div>
  )
}

export default RequestPickup
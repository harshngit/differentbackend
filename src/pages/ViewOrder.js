import React, { useEffect, useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import { useParams } from 'react-router-dom'
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db, storage } from '../firebase.config'
import ViewOrderDetails from '../components/ViewOrder/ViewOrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { generateToken } from '../actions/shippingActions'
import axios from 'axios'
import UpdateStatusModal from '../components/ViewOrder/UpdateStatusModal'
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"

const ViewOrder = () => {
  const { id } = useParams()
  const [orderDetail, setOrderDetail] = useState(null)
  const [deliveryBoys, setDeliveryBoys] = useState([])
  const [deliveryBoy, setDeliveryBoy] = useState({})
  const [orderActivity, setOrderActivity] = useState([])
  const [updateModal, setUpdateModal] = useState(false)
  const [loadingPod, setLoadingPod] = useState(false)
  const [manualStatus, setManualStatus] = useState({
    status: "",
    remark: "",
    location: "",
  })

  const { shippingToken } = useSelector((state) => state.shippingToken)
  // const dispatch = useDispatch()

  const handleUpdateModal = () => {
    setUpdateModal(!updateModal)
  }

  // ✅ Fetch Order Detail
  useEffect(() => {
    if (!id) return

    const unsub = onSnapshot(doc(db, "Order", id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setOrderDetail(data)
        setOrderActivity(data?.orderActivity || [])
        console.log("Fetched Order:", data)
      } else {
        console.warn("No such document exists in 'Order' collection with id:", id)
      }
    }, (error) => {
      console.error("Error fetching order:", error)
    })

    return () => unsub()
  }, [id])

  // // ✅ Fetch Delivery Boys
  // const fetchDeliveryBoys = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("role", "==", "Delivery Boy"))
  //     const querySnapshot = await getDocs(q)
  //     const boys = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //     setDeliveryBoys(boys)
  //   } catch (error) {
  //     console.error("Error fetching delivery boys:", error)
  //   }
  // }

  // useEffect(() => {
  //   fetchDeliveryBoys()
  // }, [])

  // // ✅ Generate Forwarding Number
  // const generateForwardingNumber = () => {
  //   dispatch(generateToken())
  //   if (!shippingToken?.jwt || !orderDetail?.job_id) return

  //   const date = new Date()
  //   const newActivity = {
  //     status: "In-Transit",
  //     remark: "Order has been Shipped to Partner",
  //     location: "GRC, Bhiwandi",
  //     time: date
  //   }

  //   axios.get(`https://btob.api.delhivery.com/v3/manifest?job_id=${orderDetail.job_id}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${shippingToken.jwt}`
  //     }
  //   }).then((response) => {
  //     const data = response?.data?.status?.value
  //     if (!data) return

  //     const repairRef = doc(db, "Order", id)
  //     updateDoc(repairRef, {
  //       orderStatus: "in-transit",
  //       forwardingNumber: data.lrnum,
  //       deliveryWaybill: data.waybills,
  //       deliveryMasterWaybill: data.master_waybill,
  //       orderActivity: [...orderActivity, newActivity]
  //     })

  //     console.log("Forwarding number generated and order updated:", data.lrnum)
  //   }).catch((error) => {
  //     alert("Error: " + error.message)
  //   })
  // }

  // // ✅ Manual Status Update
  // const handleManulOrder = () => {
  //   const { status, remark, location } = manualStatus
  //   if (!status || !remark || !location) {
  //     alert("Please fill all status, remark, and location")
  //     return
  //   }

  //   const date = new Date()
  //   const newActivity = {
  //     status,
  //     remark,
  //     location,
  //     time: date
  //   }

  //   const repairRef = doc(db, "Order", id)
  //   const updates = {
  //     orderStatus: status,
  //     orderActivity: [...orderActivity, newActivity]
  //   }

  //   if (status === "delivering") {
  //     updates.deliveryBoyDetails = deliveryBoy
  //     updates.deliveryBoyId = deliveryBoy?.id
  //   }

  //   updateDoc(repairRef, updates)
  //   handleUpdateModal()
  // }

  // // ✅ Delivery Status
  // const handleDeliveryStatus = () => {
  //   dispatch(generateToken())

  //   if (!shippingToken?.jwt || !orderDetail?.forwardingNumber) return

  //   axios.get(`https://btob.api.delhivery.com/v3/track/${orderDetail.forwardingNumber}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${shippingToken.jwt}`
  //     }
  //   }).then((response) => {
  //     const date = new Date()
  //     const data = response?.data?.data?.wbns?.[0]
  //     if (!data) return

  //     const newActivity = {
  //       status: data.status,
  //       remark: data.scan_remark,
  //       location: data.location,
  //       time: date
  //     }

  //     const repairRef = doc(db, "Order", id)

  //     if (data.status === "DELIVERED") {
  //       updateDoc(repairRef, {
  //         orderStatus: "delivered",
  //         orderActivity: [...orderActivity, newActivity]
  //       })

  //       // ✅ Get POD
  //       axios.get(`https://btob.api.delhivery.com/v3/document/${orderDetail.forwardingNumber}?doc_type=LM_POD`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${shippingToken.jwt}`
  //         }
  //       }).then(res => {
  //         updateDoc(repairRef, { pod: res?.data?.data?.[0] })
  //       })
  //     } else {
  //       updateDoc(repairRef, {
  //         orderActivity: [...orderActivity, newActivity]
  //       })
  //     }

  //   }).catch((error) => {
  //     alert("Error: " + error.message)
  //   })
  // }

  // // ✅ Upload POD
  // const addPOD = (e) => {
  //   e.preventDefault()
  //   setLoadingPod(true)

  //   const file = e.target[0]?.files[0]
  //   if (!file) return alert("No file selected")

  //   const storeRef = storageRef(storage, `files/${file.name}`)
  //   const uploadTask = uploadBytesResumable(storeRef, file)

  //   uploadTask.on("state_changed",
  //     () => { },
  //     (error) => {
  //       alert("Upload error: " + error.message)
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         updateDoc(doc(db, "Order", id), { pod: downloadURL })
  //         setLoadingPod(false)
  //         window.location.reload()
  //       })
  //     }
  //   )
  // }

  return (
    <div className='bg-gray-100 flex'>
      <UpdateStatusModal
        deliveryBoy={deliveryBoy}
        setDeliveryBoy={setDeliveryBoy}
        deliveryBoys={deliveryBoys}
        setDeliveryBoys={setDeliveryBoys}
        // handleDeliveryStatus={handleDeliveryStatus}
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        handleUpdateModal={handleUpdateModal}
        manualStatus={manualStatus}
        setManualStatus={setManualStatus}
      // handleManulOrder={handleManulOrder}
      />

      <Sidebar />
      <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col'>
        <Topbar />
        {orderDetail ? (
          <ViewOrderDetails
            loadingPod={loadingPod}
            id={id}
            // addPOD={addPOD}
            // handleUpdateModal={handleUpdateModal}
            // generateForwardingNumber={generateForwardingNumber}
            orderDetails={orderDetail}
          />
        ) : (
          <div className='p-6 text-center'>Loading order...</div>
        )}
      </div>
    </div>
  )
}

export default ViewOrder

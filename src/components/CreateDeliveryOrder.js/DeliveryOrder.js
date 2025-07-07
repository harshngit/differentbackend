import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Radio } from '@material-tailwind/react'
import AutocompleteUser from '../ManageWarehouse/AutocompleteUser'
import { PencilIcon } from '@heroicons/react/24/outline'
import AutocompleteInput from '../CreateOrder/AutocompleteInput'
import { pinCodeList } from '../../data/pinCodeData'
import toast, { Toaster } from 'react-hot-toast'
import ShippingLabel from './ShippingLabel'

const DeliveryOrder = () => {
  const dispatch = useDispatch()
  const [base64Value, setBase64Value] = useState("");
  const navigate = useNavigate()
  const { isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  )
  const [lrDetails, setLrDetails] = useState("manual")
  const [showLabel, setShowLabel] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [user, setUser] = useState({})
  const [userList, setUserList] = useState([])
  const [lrNumber, setLrNumber] = useState("")
  const [orderID, setOrderID] = useState("")
  const [orderList, setorderList] = useState([])
  const [dropLocation, setDropLocation] = useState({
    address: "",
    zip: "",
    consignee: "",
    city: "",
    region: "",
    phone: ""
  })
  const [pickupZone, setPickupZone] = useState("")

  const [warehouseList, setWarehouseList] = useState([])
  const [pickupLocation, setPickupLocation] = useState({})
  const fetchWarehouse = async () => {
    const q = query(collection(db, "warehouse"), where("userUid", "==", user.uid))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setWarehouseList((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])

    });


  }


  const fetchUsers = async () => {
    const q = query(collection(db, "users"), where("service", "==", "logistics"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserList((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])

    });
  }
  const fetchOrderList = async () => {
    const q = query(collection(db, "logisticOrder"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setorderList((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])

    });
  }
  const getCityandState = (pin) => {
    pinCodeList.map((zip) => {
      if (zip.Pin === Number(pin)) {
        setDropLocation({ ...dropLocation, city: zip.FacilityCity, region: zip.FacilityState, zip: pin })

      }
    })
  }
  const handleCreateOrder = async () => {
    if (lrDetails === "manual" && lrNumber.length === 0) {
      toast.error("Please enter LR Number")
      return
    }
    else if (Object.keys(user).length === 0) {
      toast.error("Please enter Client Name")
      return
    }
    else if (Object.keys(pickupLocation).length === 0) {
      toast.error("Please enter Warehouse Location")
      return
    }
    else if (orderID.length === 0) {
      toast.error("Please enter Order ID")
      return
    }
    else if (dropLocation.consignee.length === 0 || dropLocation.address.length === 0 || dropLocation.zip.length === 0 || dropLocation.region.length === 0 || dropLocation.city.length === 0 || dropLocation.phone.length === 0) {
      toast.error("Please enter All Delivery Details")
      return
    }
    else {
      const date = new Date()
      const data = {
        ident: "",
        createdAt: date,
        pickup_location: pickupLocation,
        dropoff_location: dropLocation,
        return_address: dropLocation,
        d_mode: "Prepaid",
        purchaseCharge: 0,
        salesCharge: 0,
        orderStatus: "preCreated",
        payment_mode: "Prepaid",
        rov_insurance: user?.insuranceType,
        invoices: [],
        weight: "",
        suborders: [],
        dimensions: [],
        consignee_gst_tin: "",
        seller_gst_tin: "",
        cb: {},
        orderID: orderID,
        lrno: (lrDetails === "automatic") ? String(date.getFullYear()) + String((date.getMonth() <= 9 ? "0" + date.getMonth() : date.getMonth())) + String((date.getDate() <= 9 ? "0" + date.getDate() : date.getDate())) + String((Number(orderList.length) + 1)) : lrNumber,
        totalLength: "",
        totalWidth: "",
        totalHeight: "",
        masterAWB: "",
        uid: user?.uid,
        userName: user?.name,
        orderActivity: [{
          status: "Order Pre-created",
          remark: "Order has been Pre-created",
          location: "",
          time: date
        }]
      }
      await setDoc(doc(db, "logisticOrder", (lrDetails === "automatic") ? String(date.getFullYear()) + String((date.getMonth() <= 9 ? "0" + date.getMonth() : date.getMonth())) + String((date.getDate() <= 9 ? "0" + date.getDate() : date.getDate())) + String((Number(orderList.length) + 1)) : lrNumber), data).then(() => {
        setShowLabel(true)
      })

    }
  }
  console.log(lrDetails)

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      fetchWarehouse()
      fetchOrderList()
    }

    fetchUsers()
  }, [user])

  return (
    <>
      {!showLabel && <div className='py-4 bg-white' >
        <Toaster />
        <h3 className='text-center text-[1.5rem] font-[GilroyBold]' >Create New Order</h3>
        <div className='my-6 mx-[20px]' >
          <div className=''  >
            <h4 className='font-[GilroyMedium]' >LR Details</h4>
            <div className='ml-[-10px]' >
              <Radio defaultChecked={true} onChange={(e) => setLrDetails(e.target.value)} value="manual" name='type' label="Manual" />
              <Radio onChange={(e) => setLrDetails(e.target.value)} value="automatic" name='type' label="Automatic" />
            </div>
            <div className='w-full my-2' >
              <Input value={lrNumber} onChange={(e) => setLrNumber(e.target.value)} disabled={lrDetails === "automatic" ? true : false} label='Enter LR No' />
            </div>
          </div>
          <div className='my-6' >
            <h4 className='font-[GilroyMedium]' >Shipment Details</h4>

            <div className='flex-wrap gap-3 flex items-center justify-start  my-2' >
              <div className='w-[350px]' >
                {Object.keys(user).length === 0 ? <AutocompleteUser selected={user} setSelected={setUser} placeholder="Enter Client Name" data={userList} /> : <div>
                  <div className=' flex items-center justify-end' >
                    <PencilIcon className='w-[25px] cursor-pointer' onClick={() => setUser({})} />
                  </div>
                  <h3 className='text-[.8rem]' >{user.name}, {user.email}</h3>
                  <h3 className='text-[.8rem]' >{user.companyName}</h3>

                </div>}
              </div>
              <div className='w-[350px]' >
                {Object.keys(pickupLocation).length === 0 ? <AutocompleteInput selected={pickupLocation} setSelected={setPickupLocation} placeholder="Enter Pickup Location" data={warehouseList} /> : <div>
                  <div className=' flex items-center justify-end' >
                    <PencilIcon className='w-[25px] cursor-pointer' onClick={() => setPickupLocation({})} />
                  </div>
                  <h3 className='text-[.8rem]' >{pickupLocation?.pickupName?.name}, {pickupLocation.pinCode}</h3>
                  <h3 className='text-[.8rem]' >{pickupLocation.address}, {pickupLocation.city}, {pickupLocation.state}</h3>

                </div>}
              </div>


              <div className='w-[350px]'>
                <Input value={orderID} onChange={(e) => setOrderID(e.target.value)} label='Enter Order ID' />
              </div>
              <div className='w-[350px]'>
                <Input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} label='No of Boxes' />
              </div>

            </div>
          </div>
          <h4 className='font-[GilroyMedium]' >Delivery Details</h4>
          <div className='flex items-center flex-wrap my-3 justify-start gap-4' >

            <div className='w-full'>
              <Input value={dropLocation.consignee} onChange={(e) => setDropLocation({ ...dropLocation, consignee: e.target.value })} label='Consignee' />
            </div>
            <div className='w-full'>
              <Input type='number' value={dropLocation.phone} onChange={(e) => setDropLocation({ ...dropLocation, phone: e.target.value })} label='Contact No' />
            </div>
            <div className='w-full'>
              <Input value={dropLocation.address} onChange={(e) => setDropLocation({ ...dropLocation, address: e.target.value })} label='Address' />
            </div>
            <div className='w-full'>
              <Input value={dropLocation.zip} onChange={(e) => {
                setDropLocation({ ...dropLocation, zip: e.target.value })
                getCityandState(e.target.value)
              }} label='Pincode' />
            </div>
            <div className='w-full'>
              <Input value={dropLocation.city} onChange={(e) => setDropLocation({ ...dropLocation, city: e.target.value })} label='City' />
            </div>
            <div className='w-full'>
              <Input value={dropLocation.region} onChange={(e) => setDropLocation({ ...dropLocation, region: e.target.value })} label='State' />
            </div>

          </div>
          <div className='' >
            <Button onClick={handleCreateOrder} className='w-full' >Book</Button>
          </div>
        </div>
      </div>}
      <div>
        {
          showLabel &&
          <ShippingLabel quantity={quantity} lrNumber={lrNumber} pickupLocation={pickupLocation} dropLocation={dropLocation} />

        }
      </div>
    </>
  )
}

export default DeliveryOrder
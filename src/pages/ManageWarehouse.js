import React, { useState, useEffect } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import WarehouseTable from '../components/ManageWarehouse/WarehouseTable'
import WarehouseArea from '../components/ManageWarehouse/WarehouseArea'
import CreateWarehouse from '../components/ManageWarehouse/CreateWarehouse'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { setUserId } from 'firebase/analytics'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
const ManageWarehouse = () => {

    const [warehouseModal, setWarehouseModal] = useState(false)
    const [warehouseList, setWarehouseList] = useState([])
    const [userList, setuserList] = useState([])
    const { error, loading, isAuthenticated, users, userProfile } = useSelector(
        (state) => state.user
    );

    const handleWarehouseModal = () => {
        setWarehouseModal(!warehouseModal)
    }
    const deleteWarehouse = async (id) => {
        await deleteDoc(doc(db, "warehouse", id))
        window.location.reload()
    }
    const [pickupName, setPickupName] = useState({})
    const [warehouseData, setWarehouseData] = useState({

        pinCode: "",
        city: "",
        state: "",
        country: "",
        address: "",
        personName: "",
        email: "",
        phone: "",
        slot: ""
    })
    const handleWarehouse = () => {
        if (Object.keys(pickupName).length === 0) {
            alert("Please enter the PickUp Name")
        }
        else if (warehouseData.pinCode.length === 0) {
            alert("Please enter the Pin Code")
        }
        else if (warehouseData.city.length === 0) {
            alert("Please enter the City name")
        }
        else if (warehouseData.state.length === 0) {
            alert("Please enter the State name")
        }
        else if (warehouseData.country.length === 0) {
            alert("Please enter the Country name")
        }
        else if (warehouseData.address.length === 0) {
            alert("Please enter the Address")
        }
        else if (warehouseData.personName.length === 0) {
            alert("Please enter the Person name")
        }
        else if (warehouseData.email.length === 0) {
            alert("Please enter the Person name")
        }
        else if (warehouseData.phone.length === 0) {
            alert("Please enter the Phone Number")
        }
        else if (warehouseData.slot.length === 0) {
            alert("Please enter the Slot")
        }
        else {
            addDoc(collection(db, "warehouse"),
                {
                    pickupName: pickupName,
                    pinCode: warehouseData.pinCode,
                    city: warehouseData.city,
                    state: warehouseData.state,
                    country: warehouseData.country,
                    address: warehouseData.address,
                    personName: warehouseData.personName,
                    email: warehouseData.email,
                    phone: warehouseData.phone,
                    slot: warehouseData.slot,
                    userUid: pickupName?.uid
                }).then(() => {
                    setWarehouseData({

                        pinCode: "",
                        city: "",
                        state: "",
                        country: "",
                        address: "",
                        personName: "",
                        email: "",
                        phone: "",
                        slot: ""
                    })
                    setPickupName({})
                    setWarehouseModal(!warehouseModal)
                })
        }

    }

    const fetchWarehouse = async () => {
        const q = query(collection(db, "warehouse"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setWarehouseList((prev) => [...prev, {
                id: doc.id,
                ...doc.data()
            }])

        });
    }
    const fetchUsers = async () => {
        const q = query(collection(db, "users"), where("service", "==", "logistics"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setuserList((prev) => [...prev, {
                id: doc.id,
                ...doc.data()
            }])

        });
    }

    useEffect(() => {
        fetchWarehouse()
        fetchUsers()
    }, [])



    console.log(userList)
    return (
        <div className='bg-gray-100 flex '>
            {/* <EditWarehouse userList={userList} pickupName={pickupName} setPickupName={setPickupName} UpdateWarehouse={UpdateWarehouse} warehouseData={warehouseData} setWarehouseData={setWarehouseData} editWarehouse={editWarehouse} handleeditWarehouseModal={handleeditWarehouseModal} setEditWarehouse={setEditWarehouse} /> */}
            <CreateWarehouse userList={userList} pickupName={pickupName} setPickupName={setPickupName} handleWarehouse={handleWarehouse} warehouseData={warehouseData} setWarehouseData={setWarehouseData} warehouseModal={warehouseModal} handleWarehouseModal={handleWarehouseModal} setWarehouseModal={setWarehouseModal} />
            <Sidebar />
            <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
                <Topbar />

                <WarehouseArea deleteWarehouse={deleteWarehouse} userList={userList} pickupName={pickupName} setPickupName={setPickupName} warehouseList={warehouseList} warehouseModal={warehouseModal} handleWarehouseModal={handleWarehouseModal} setWarehouseModal={setWarehouseModal} />
            </div>
        </div>
    )
}

export default ManageWarehouse
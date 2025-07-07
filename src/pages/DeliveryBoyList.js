import React, { useEffect, useState } from 'react'
import Topbar from "../components/Layout/Topbar"
import DeliveryListing from '../components/CreateDeliveryOrder.js/DeliveryListing'
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useSelector } from 'react-redux'
import UpdateDeliveryModal from '../components/CreateDeliveryOrder.js/UpdateDeliveryModal'
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import { storage } from "../firebase.config";
import imageCompression from "browser-image-compression";
const DeliveryBoyList = () => {
  const [pickupList, setPickupList] = useState([])
  const { error, loading, isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  );
  const [updateModal, setUpdateModal] = useState(false)
  const [deliveryId, setDeliveryId] = useState("")
  const [lrNumberdata, setLrNumberdata] = useState([])
  const [lrNumberdil, setLrNumberdil] = useState("")
  const [lrNumber, setLrNumber] = useState("")
  const [orderDetail, setOrderDetail] = useState({})
  const [dilveryBoyStatusDetails, setdilveryBoyStatusDetails] = useState({})
  const [deliveryBoyList, setDeliveryBoyList] = useState([])
  const [orderList, setOrderList] = useState([])
  const [orderActivity, setOrderActivity] = useState([])
  const [status, setStatus] = useState("")
  const [pod, setPod] = useState("")
  const [reason, setReason] = useState("")
  const [loadingPod, setloadingPod] = useState(false)
  const [progress, setProgress] = useState(0);
  const [deliveryBoyStatus, setDeliveryBoyStatus] = useState("")
  const handleUpdateStatus = (id) => {
    const repairRef = doc(db, "logisticOrder", deliveryId);
    const date = new Date()
    updateDoc(repairRef, {
      orderStatus: status,
      pod: pod,
      orderActivity: [...orderActivity, {
        status: status,
        remark: (status === "Undelivered") ? reason : "Order Has been Delivered",
        location: (status === "Undelivered") ? "Check Remark" : "Delivery Location",
        time: date
      }],

    });


  }
  /** ✅ Update delivery boy status */
  const handleDeliveryBoyStatus = async () => {

    try {
      const q = query(
        collection(db, "DeliveryBoyData"),
        where("user.name", "==", userProfile?.name),
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log(`No delivery boy found with name: ${userProfile?.name}`);
        return;
      }

      querySnapshot.forEach(async (docSnapshot) => {
        const deliveryRef = doc(db, "DeliveryBoyData", docSnapshot.id);
        await updateDoc(deliveryRef, {
          deliveryBoyStatus: status === "Undelivered" ? `Undelivered (${reason})` : "Complete",
        });
      });

      console.log(`Delivery boy status updated successfully for: ${userProfile?.name}`);
    } catch (error) {
      console.error("Error updating delivery boy status:", error);
    }
  };

  const handleUpdateModal = () => {
    setUpdateModal(!updateModal)
  }


  console.log(deliveryId)

  const fetchOrderDetails = (id) => {
    onSnapshot(doc(db, "logisticOrder", id), (doc) => {
      const data = doc.data()
      setOrderDetail(data)
      setOrderActivity(data?.orderActivity)
    });
  }

  const compressImage = async (file) => {
    const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
    return await imageCompression(file, options);
  };
  const addPOD = async (e) => {
    e.preventDefault();
    setloadingPod(true);
    setProgress(0);

    const file = e.target[0]?.files[0]
    if (!file) {
      alert("Please select a file.");
      setloadingPod(false);
      return;
    }

    // Compress image if needed
    if (file.type.startsWith("image/")) {
      file = await compressImage(file);
    }

    const storeRef = storageRef(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storeRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
        setloadingPod(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPod(downloadURL);
          setloadingPod(false);
        });
      }
    );
  };


  const fetchDilveryData = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure time is ignored for comparison

    const q = query(
      collection(db, "DeliveryBoyData"),
      where("user.name", "==", userProfile?.name),
    );

    const querySnapshot = await getDocs(q);

    const newOrders = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAtDate = data.createdAt.toDate();
      createdAtDate.setHours(0, 0, 0, 0); // Normalize time for comparison

      if (createdAtDate.getTime() === today.getTime()) {
        newOrders.push({
          id: doc.id,
          ...data,
        });
      }
    });

    // Update state
    setDeliveryBoyList(newOrders);

  }
  console.log(deliveryBoyList)
  // console.log(deliveryBoyList)
  const fetchPickupList = async () => {
    const q = query(collection(db, "logisticOrder"), where("deliveryBoyId", "==", users), where("orderStatus", "==", "delivering"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPickupList((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])

    });
  }
  // console.log(pickupList)
  const extractLrNumbers = () => {
    const numbers = deliveryBoyList
      .flatMap((deliveryBoy) => deliveryBoy.lrNumber) // Flatten all lrNumbers
      .filter(Boolean); // Remove undefined or null values
    setLrNumberdata(numbers);
  };
  const fetchOrderList = async () => {
    if (lrNumberdata.length === 0) {
      console.log("No lrNumbers available to fetch orders.");
      return;
    }

    try {
      const fetchPromises = lrNumberdata.map(async (lrNumber) => {
        try {
          const q = query(collection(db, "logisticOrder"), where("lrno", "==", lrNumber), where("orderStatus", "==", "Out for Delivery"));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.log(`No documents found for lrno: ${lrNumber}`);
            return [];
          }

          // Map each document to an order object
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error(`Error fetching orders for lrno: ${lrNumber}`, error);
          return [];
        }
      });

      // Wait for all promises and flatten the results
      const results = await Promise.all(fetchPromises);
      const orders = results.flat();

      // Update the order list state
      setOrderList(orders);
    } catch (error) {
      console.error("Error in fetchOrderList:", error);
    }
  };
  console.log(lrNumberdata)
  console.log(orderList)
  useEffect(() => {
    extractLrNumbers();
  }, [deliveryBoyList]);
  useEffect(() => {
    fetchOrderList();
  }, [lrNumberdata]);
  useEffect(() => {
    fetchPickupList()
    fetchDilveryData()
    // fetchOrderList()
  }, [])
  return (
    <div>
      <UpdateDeliveryModal loadingPod={loadingPod} setloadingPod={setloadingPod} setReason={setReason} reason={reason} addPOD={addPOD} pod={pod} status={status} setStatus={setStatus} handleUpdateStatus={handleUpdateStatus} updateModal={updateModal} handleUpdateModal={handleUpdateModal} setUpdateModal={setUpdateModal} handleDeliveryBoyStatus={handleDeliveryBoyStatus} />
      <Topbar />
      <DeliveryListing orderList={orderList} deliveryBoyList={deliveryBoyList} deliveryId={deliveryId} setDeliveryId={setDeliveryId} fetchOrderDetails={fetchOrderDetails} handleUpdateModal={handleUpdateModal} pickupList={pickupList} />
    </div>
  )
}

export default DeliveryBoyList
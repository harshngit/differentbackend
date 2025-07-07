import React, { useState, useEffect } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import CreateOrderPage from '../components/CreateOrder/CreateOrderPage'
import { addDoc, collection, doc, getDocs, query, runTransaction, setDoc, updateDoc, where } from 'firebase/firestore'
import { db, storage } from '../firebase.config'
import { uploadBytesResumable, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { pinCodeList } from "../data/pinCodeData"
import { locationPricing } from '../data/LocationPricing'
import ConfirmationModal from '../components/CreateOrder/ConfirmationModal'
import { useDispatch, useSelector } from 'react-redux'
import { saveOrder } from '../actions/orderAction'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
const CreateOrder = () => {
  // const [step, setStep] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, loading } = useSelector(
    (state) => state.order
  )
  const { isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  )
  const [confirmModal, setConfirmModal] = useState(false)
  const [invoiceList, setInvoiceList] = useState([])
  const [warehouseList, setWarehouseList] = useState([])
  const [pickupLocation, setPickupLocation] = useState({})
  const [salesInsuranceCharge, setSalesInsuranceCharge] = useState(0)
  const [user, setUser] = useState({})
  const [dimension, setDimension] = useState([])
  const [lrDetails, setLrDetails] = useState("manual")
  const [lrNumber, setLrNumber] = useState("")
  const [orderID, setOrderID] = useState("")
  console.log(lrNumber)
  const [pickupZone, setPickupZone] = useState("")
  const [deliveryZone, setDeliveryZone] = useState("")
  const [baseAmount, setBaseAmount] = useState(0)
  const [userList, setUserList] = useState([])
  const [orderList, setOrderList] = useState([])
  const [totalbox, setTotalbox] = useState("")
  const [actualdate, setActualdate] = useState("")
  const [salesCharge, setSalesCharge] = useState(0)
  const [dimentionData, setDimentionData] = useState({
    p_name: "",
    p_qty: "",
    p_price: "",
    p_size: "",
  })
  const [volumetricWeight, setVolumetricWeight] = useState(0)
  const handleConfirmModal = () => {
    setConfirmModal(!confirmModal)
  }
  const [subOrders, setSubOrders] = useState([])
  const [subOrder, setSubOrder] = useState({
    ident: "",
    count: "",
    description: "",


  })
  const [dropLocation, setDropLocation] = useState({
    address: "",
    zip: "",
    consignee: "",
    city: "",
    region: "",
    phone: "",
    companyName: ""
  })
  const [mode, setMode] = useState("")
  const [invoiceDetail, setInvoiceDetail] = useState({
    ident: "",
    n_value: 0,
    ewaybill: ""
  })
  const [customerName, setCustomerName] = useState("")
  const [amount, setAmount] = useState(null)
  const [purchaseFuel, setPurchaseFuel] = useState(0)
  const [totalHeight, setTotalHeight] = useState(0)
  const [totalBoxQty, setTotalBoxQty] = useState(0)
  const [totalWidth, setTotalWidth] = useState(0)
  const [totalLength, setTotalLength] = useState(0)
  const [weight, setWeight] = useState(null)
  const [consigneeGST, setConsigneeGST] = useState("")
  const [salesTotalCharge, setSalesTotalCharge] = useState(0)
  const [sellerGST, setSellerGST] = useState("")
  const [invoiceDocument, setInvoiceDocument] = useState("")
  const [supportDocument, setSupportDocument] = useState("")
  const [totalChargeableWeight, setTotalChargeableWeight] = useState(0)
  const [productlist, setproductlist] = useState({})
  const [totalqty, settotalqty] = useState(0)
  const [totalwidth, setTotalwidth] = useState(0)
  const [totalheight, settotalheight] = useState(0)
  const [loadingOrder, setLoadingOrder] = useState(false)
  const handleDimensionData = () => {

    // const totalQauntity = totalqty + Number(dimentionData.qty)
    // settotalqty(totalQauntity)

    // setTotalLength(totalLength + Number(dimentionData.length))
    // settotalheight(totalheight + Number(dimentionData.height))
    // setTotalWidth(totalwidth + Number(dimentionData.width))

    setDimension([...dimension, {
      p_name: dimentionData.p_name,
      p_price: dimentionData.p_price,
      p_qty: dimentionData.p_qty,
      p_size: dimentionData.p_size

    }])
    // const chargableWeight = ((dimentionData.length * dimentionData.width * dimentionData.height) / 4500) * dimentionData.qty
    // setTotalChargeableWeight(() => (totalChargeableWeight + Number(chargableWeight)))
    // setSubOrders([
    //   ...subOrders, {
    //     ident: lrNumber + Number(dimension.length) + 1,
    //     count: Number(dimentionData.qty),
    //     description: dimentionData.name,
    //   }
    // ])

    setDimentionData({
      p_name: "",
      p_qty: "",
      p_price: "",
      p_size: "",
    })
  }
  const removeDimesion = (name) => {
    const index = dimension.findIndex((item) => item.name === name);
    if (index !== -1) {
      const newVariations = [...dimension];
      newVariations.splice(index, 1);
      setDimension(newVariations);
    }
  }

  const handleActualdelivery = () => {
    const matchingPin = pinCodeList.find(
      (pinItem) =>
        pinItem.Pin === dropLocation.zip &&
        (pinItem.FacilityCity === "Mumbai" ||
          pinItem.FacilityCity === "Thane" ||
          pinItem.FacilityCity === "Greater Thane")
    );

    if (matchingPin) {
      console.log("aniket bhadwa");
      const nextDay = new Date(); // Assuming createdAt is a valid date
      nextDay.setDate(nextDay.getDate() + 1);
      setActualdate(nextDay);
    }
  };

  const handleShippingDetails = () => {


    // if (weight === null) {
    //   alert("Enter Total Weight")
    // }
    // else if (orderID.length === 0) {
    //   alert("Please enter Order ID")
    // }
    // else if (dimension.length === 0) {
    //   alert("Please enter Dimension")
    // }

    // else {
    //   const date = new Date()
    //   if (Object.keys(pickupLocation).length !== 0) {
    //     pinCodeList.map((zip) => {
    //       if (zip.Pin === Number(pickupLocation.pinCode)) {
    //         setPickupZone(zip.Zone)
    //       }
    //     })
    //   }
    //   if (dimension.length !== 0) {
    //     let Length = 0
    //     let Width = 0
    //     let Height = 0
    //     dimension.map((item) => {
    //       Length = Length + (Number(item.length) * item.count)
    //       Width = Width + (Number(item.width) * item.count)
    //       Height = Height + (Number(item.height) * item.count)
    //     })
    //     setTotalHeight(Height)
    //     setTotalWidth(Width)
    //     setTotalLength(Length)
    //   }
    //   if (orderList?.length !== 0 && lrDetails === "automatic") {
    //     setLrNumber(String(date.getFullYear()) + String((date.getMonth() <= 9 ? "0" + date.getMonth() : date.getMonth())) + String((date.getDate() <= 9 ? "0" + date.getDate() : date.getDate())) + String((Number(orderList.length) + 1)))
    //   }
    //   // setStep(2)
    // }
  }
  const addInvoice = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storeRef = storageRef(storage, `invoice/${file.name}`);
    const uploadTask = uploadBytesResumable(storeRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {

      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInvoiceDocument(downloadURL)
          console.log(downloadURL)
        });
      }
    );
  }
  const addSupport = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storeRef = storageRef(storage, `invoice/${file.name}`);
    const uploadTask = uploadBytesResumable(storeRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {

      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setSupportDocument(downloadURL)
          console.log(downloadURL)
        });
      }
    );
  }
  const handleDeliveryInformation = () => {
    // if (dropLocation.consignee.length === 0 || dropLocation.address.length === 0 || dropLocation.zip.length === 0 || dropLocation.region.length === 0 || dropLocation.city.length === 0 || dropLocation.phone.length === 0) {
    //   toast.error("Please enter All Delivery Details")
    // }
    // else {
    //   pinCodeList.map((zip) => {
    //     if (zip.Pin === Number(dropLocation.zip)) {
    //       setDeliveryZone(zip.Zone)
    //     }
    //   })
    //   // setStep(3)
    // }
  }
  const handleBookOrder = () => {
    // if (invoiceDetail?.collectionType === "COD" && invoiceDetail?.amountCollection?.length === 0) {
    //   toast.error("Please add Amount to Collect ")
    // }
    // else if (invoiceList?.length === 0) {
    //   toast.error("Please Add Invoice  ")
    // }
    // else {


    //   if (pickupZone.length !== 0 && deliveryZone.length !== 0) {
    //     handleConfirmModal()
    //     locationPricing.map((location) => {
    //       if (location.locationOne === pickupZone && location.locationTwo === deliveryZone) {
    //         setBaseAmount(location.charge)
    //       }
    //     })
    //     if (user?.rateList?.length !== 0) {
    //       user?.rateList?.map((item) => {
    //         if (item?.deliveryLocation === Number(dropLocation.zip) && item?.fromLocation === Number(pickupLocation.pinCode)) {
    //           setSalesCharge((((totalHeight * totalWidth * totalLength) / 4500) * item?.rate) + ((((totalHeight * totalWidth * totalLength) / 4500) * item?.rate) * (item?.fuel / 100)) + item?.lrCharge + item?.fmCost + item?.greenTax + item?.handling + item?.oda)
    //           if (user?.insuranceType === "owner risk") {
    //             setSalesInsuranceCharge(item?.rovOWER)
    //           }
    //           else {
    //             const rateCarrier = (((totalHeight * totalWidth * totalLength) / 4500) * item?.rate) * (item?.fuel / 100)
    //             if (rateCarrier > item?.minRovValue) {
    //               setSalesInsuranceCharge(Math.round(rateCarrier))
    //             }
    //             else {
    //               setSalesInsuranceCharge(item?.minRovValue)
    //             }
    //           }
    //         }
    //       })
    //     }

    //   }
    // }


  }
  console.log(totalChargeableWeight)
  const handleConfirmOrder = async () => {
    if (loadingOrder) return;
    setLoadingOrder(true);

    const date = new Date();

    if (!dimension?.length) {
      toast.error("Please enter Dimension");
      setLoadingOrder(false);
      return;
    }

    if (!dropLocation?.address || !dropLocation?.zip || !dropLocation?.region || !dropLocation?.city || !dropLocation?.phone) {
      toast.error("Please enter All Delivery Details");
      setLoadingOrder(false);
      return;
    }

    if (invoiceDetail?.collectionType === "COD" && !invoiceDetail?.amountCollection?.length) {
      toast.error("Please add Amount to Collect");
      setLoadingOrder(false);
      return;
    }

    if (!invoiceList?.length) {
      toast.error("Please Add Invoice");
      setLoadingOrder(false);
      return;
    }

    let pickupZone = "";
    let deliveryZone = "";

    const pickupMatch = pinCodeList.find(zip => zip.Pin === Number(pickupLocation?.pinCode));
    const dropMatch = pinCodeList.find(zip => zip.Pin === Number(dropLocation?.zip));

    if (pickupMatch) pickupZone = pickupMatch.Zone;
    if (dropMatch) deliveryZone = dropMatch.Zone;

    let totalLength = 0, totalWidth = 0, totalHeight = 0;
    dimension.forEach(item => {
      totalLength += Number(item.length) * item.count;
      totalWidth += Number(item.width) * item.count;
      totalHeight += Number(item.height) * item.count;
    });

    const volumetricWeight = (totalLength * totalWidth * totalHeight) / 4500;

    let baseAmt = 0, fuelAmt = 0, finalSalesCharge = 0, insuranceCharge = 0;

    const locationMatch = locationPricing.find(
      loc => loc.locationOne === pickupZone && loc.locationTwo === deliveryZone
    );
    if (locationMatch) baseAmt = locationMatch.charge;

    const rateListMatch = user?.rateList?.find(
      r => r.deliveryLocation === Number(dropLocation.zip) && r.fromLocation === Number(pickupLocation.pinCode)
    );

    if (rateListMatch) {
      const base = volumetricWeight * rateListMatch.rate;
      fuelAmt = base * (rateListMatch.fuel / 100);
      finalSalesCharge = base + fuelAmt + rateListMatch.lrCharge + rateListMatch.fmCost + rateListMatch.greenTax + rateListMatch.handling + rateListMatch.oda;

      if (user.insuranceType === "owner risk") {
        insuranceCharge = rateListMatch.rovOWER;
      } else {
        const insurance = Math.round(fuelAmt);
        insuranceCharge = insurance > rateListMatch.minRovValue ? insurance : rateListMatch.minRovValue;
      }
    }

    let actualDeliveryDate = null;
    const fastCity = ["Mumbai", "Thane", "Greater Thane"];
    const pinMatch = pinCodeList.find(pin => Number(pin.Pin) === Number(dropLocation.zip) && fastCity.includes(pin.FacilityCity?.trim()));
    if (pinMatch) {
      actualDeliveryDate = new Date();
      actualDeliveryDate.setDate(actualDeliveryDate.getDate() + 1);
    }

    let generatedLrNo = lrNumber;
    if (lrDetails === "automatic") {
      const getNextLRNumber = async () => {
        const now = new Date();
        const dateKey = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const counterRef = doc(db, "counters", dateKey);

        const count = await runTransaction(db, async (transaction) => {
          const docSnap = await transaction.get(counterRef);
          const currentCount = docSnap.exists() ? docSnap.data().count : 0;
          const newCount = currentCount + 1;
          transaction.set(counterRef, { count: newCount });
          return newCount;
        });

        return `${dateKey}${String(count).padStart(3, '0')}`;
      };

      try {
        generatedLrNo = await getNextLRNumber(db);
      } catch (err) {
        console.error("Failed to generate LR No:", err);
        toast.error("LR number generation failed");
        setLoadingOrder(false);
        return;
      }
    }

    // ✅ Save Order to Firestore
    try {
      await setDoc(doc(db, "Order", orderID), {
        ident: "",
        createdAt: date,
        customerName,
        dropoff_location: dropLocation,
        return_address: dropLocation,
        orderStatus: "new",
        invoices: invoiceList,
        dimensions: dimension,
        OrderID: orderID,
        orderActivity: [
          {
            status: "Order Created",
            remark: "Order has been Created",
            location: "",
            time: date,
          },
        ],
      });

      toast.success("Order saved successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order save error:", err);
      toast.error("Failed to save order.");
    } finally {
      setLoadingOrder(false);
    }
  };





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
  console.log(user, warehouseList)
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
  console.log(pickupZone, deliveryZone, baseAmount, amount)
  console.log(totalHeight, totalLength, totalWidth, volumetricWeight)
  const fetchOrders = async () => {
    const q = query(collection(db, "logisticOrder"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setOrderList((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])


    });
  }
  console.log(lrNumber)
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      fetchWarehouse()
    }
    // fetchOrders()
    fetchUsers()
  }, [user]);

  console.log(salesCharge)
  console.log(lrNumber)

  return (
    <>
      <div className='bg-gray-100 flex '>

        <Toaster />
        <Sidebar />
        <ConfirmationModal confirmModal={confirmModal} handleConfirmOrder={handleConfirmOrder} handleConfirmModal={handleConfirmModal} />
        <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >

          <Topbar />
          <CreateOrderPage
            customerName={customerName}
            setCustomerName={setCustomerName}
            loadingOrder={loadingOrder}
            loading={loading}
            totalbox={totalbox}
            setTotalbox={setTotalbox}
            invoiceList={invoiceList}
            setInvoiceList={setInvoiceList}
            userList={userList}
            setUserList={setUserList}
            user={user}
            setUser={setUser}
            handleBookOrder={handleBookOrder}
            handleConfirmOrder={handleConfirmOrder}
            handleDeliveryInformation={handleDeliveryInformation}
            addInvoice={addInvoice}
            addSupport={addSupport}
            supportDocument={supportDocument}
            invoiceDocument={invoiceDocument}
            invoiceDetail={invoiceDetail}
            setInvoiceDetail={setInvoiceDetail}
            warehouseList={warehouseList}
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            handleShippingDetails={handleShippingDetails}
            removeDimesion={removeDimesion}
            handleDimensionData={handleDimensionData}
            dimentionData={dimentionData}
            setDimentionData={setDimentionData}
            setDimension={setDimension}
            dimension={dimension}
            subOrders={subOrders}
            setSubOrders={setSubOrders}
            dropLocation={dropLocation}
            setDropLocation={setDropLocation}
            mode={mode}
            setMode={setMode}
            amount={amount}
            setAmount={setAmount}
            weight={weight}
            setWeight={setWeight}
            consigneeGST={consigneeGST}
            setConsigneeGST={setConsigneeGST}
            sellerGST={sellerGST}
            setSellerGST={setSellerGST}

            lrNumber={lrNumber}
            setLrNumber={setLrNumber}
            orderID={orderID}
            orderList={orderList}
            setOrderID={setOrderID}
            lrDetails={lrDetails}
            setLrDetails={setLrDetails}
          // step={step} setStep={setStep} 

          />
        </div>
      </div>
    </>
  )
}

export default CreateOrder
// KEEP ALL YOUR EXISTING IMPORTS
import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import ConfirmationModal from '../components/CreateOrder/ConfirmationModal'
import Topbar from '../components/Layout/Topbar'
import { collection, doc, getDocs, onSnapshot, query, runTransaction, updateDoc, where } from 'firebase/firestore'
import { db, storage } from '../firebase.config'
import { uploadBytesResumable, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { pinCodeList } from "../data/pinCodeData"
import { locationPricing } from '../data/LocationPricing'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import EditOrderPage from '../components/EditOrder/EditOrderPage'
import { useSelector } from 'react-redux'

const EditOrder = () => {
  const navigate = useNavigate()
  const { id } = useParams()
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
  const [lrDetails, setLrDetails] = useState("automatic")
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

  const handleConfirmModal = () => setConfirmModal(!confirmModal)

  const handleDimensionData = () => {
    setDimension([...dimension, {
      name: dimentionData.name,
      qty: Number(dimentionData.qty),
      length: Number(dimentionData.length),
      width: Number(dimentionData.width),
      height: Number(dimentionData.height)
    }])
    setSubOrders([
      ...subOrders, {
        ident: "GRC" + (dimension.length + 1),
        count: Number(dimentionData.qty),
        description: dimentionData.name,
      }
    ])
    setDimentionData({ name: "", qty: "", length: "", width: "", height: "" })
  }

  const removeDimesion = (name) => {
    setDimension(dimension.filter((item) => item.name !== name))
  }

  const addInvoice = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storeRef = storageRef(storage, `invoice/${file.name}`);
    const uploadTask = uploadBytesResumable(storeRef, file);
    uploadTask.on("state_changed", null, alert, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(setInvoiceDocument);
    });
  }

  const addSupport = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storeRef = storageRef(storage, `invoice/${file.name}`);
    const uploadTask = uploadBytesResumable(storeRef, file);
    uploadTask.on("state_changed", null, alert, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(setSupportDocument);
    });
  }

  const handleConfirmOrder = async () => {
    const volumetricWeightCalc = (totalHeight * totalWidth * totalLength) / 4500;
    const totalAmount = volumetricWeightCalc * baseAmount;
    const fuelCharge = totalAmount * 0.2;
    const totalSales = salesCharge + salesInsuranceCharge;
    setVolumetricWeight(volumetricWeightCalc)
    setAmount(totalAmount)
    setPurchaseFuel(fuelCharge)
    setSalesTotalCharge(totalSales)

    if (!weight) return toast.error("Enter Total Weight");
    if (!orderID) return toast.error("Please enter Order ID");
    if (!dimension.length) return toast.error("Please enter Dimension");

    pinCodeList.forEach((zip) => {
      if (zip.Pin === Number(pickupLocation.pinCode)) setPickupZone(zip.Zone)
      if (zip.Pin === Number(dropLocation.zip)) setDeliveryZone(zip.Zone)
    })

    let Length = 0, Width = 0, Height = 0;
    dimension.forEach((item) => {
      Length += item.length * item.qty;
      Width += item.width * item.qty;
      Height += item.height * item.qty;
    });
    setTotalLength(Length);
    setTotalWidth(Width);
    setTotalHeight(Height);

    if (
      !dropLocation.consignee || !dropLocation.address || !dropLocation.zip ||
      !dropLocation.region || !dropLocation.city || !dropLocation.phone
    ) return toast.error("Please enter All Delivery Details");

    if (invoiceDetail.collectionType === "COD" && !invoiceDetail.amountCollection)
      return toast.error("Please add Amount to Collect");

    if (invoiceDetail.amount >= 50000 && (!invoiceDetail.ewaybill || !invoiceDetail.invoiceNo))
      return toast.error("Please Add Invoice Details");

    if (!pickupZone || !deliveryZone) return;

    locationPricing.forEach((location) => {
      if (location.locationOne === pickupZone && location.locationTwo === deliveryZone) {
        setBaseAmount(location.charge);
      }
    })

    user?.rateList?.forEach((item) => {
      if (item.deliveryLocation === Number(dropLocation.zip) && item.fromLocation === Number(pickupLocation.pinCode)) {
        const volumetric = (Length * Width * Height) / 4500;
        const base = volumetric * item.rate;
        const fuel = base * (item.fuel / 100);
        setSalesCharge(base + fuel + item.lrCharge + item.fmCost + item.greenTax + item.handling + item.oda);

        const insurance = user?.insuranceType === "owner risk"
          ? item.rovOWER
          : Math.max(Math.round(fuel), item.minRovValue);

        setSalesInsuranceCharge(insurance);
      }
    })
    const date = new Date();

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

    try {
      const orderRef = doc(db, "Order", id);
      await updateDoc(orderRef, {
        ident: "",
        createdAt: date,
        updateDate: date,
        customerName,
        dropoff_location: dropLocation,
        return_address: dropLocation,
        orderStatus: "new",
        invoices: invoiceList,
        dimensions: dimension,
        OrderID: generatedLrNo,
        orderActivity: [
          {
            status: "Order Created",
            remark: "Order has been Created",
            location: "",
            time: date,
          },
        ],
      });
      toast.success("Order updated successfully");
      navigate("/orders");
    } catch (error) {
      toast.error("Error updating order");
      console.error(error);
    }
  }

  const getUserFromID = async (uid) => {
    onSnapshot(doc(db, "users", uid), (docSnap) => {
      setUser(docSnap.data());
    });
  }

  const fetchOrderDetail = () => {
    const orderRef = doc(db, "Order", id);
    onSnapshot(orderRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        setPickupLocation(data?.pickup_location || {});
        setDropLocation(data?.dropoff_location || {});
        setLrNumber(data?.OrderID || ""); // generatedLrNo
        setOrderID(data?.orderID || "");
        setDimension(data?.dimensions || []);
        setInvoiceList(data?.invoices || []);
        setCustomerName(data?.customerName || "");
      } else {
        console.warn("No such order found!");
      }
    });
  };


  const fetchUsers = async () => {
    const q = query(collection(db, "users"), where("service", "==", "logistics"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => setUserList((prev) => [...prev, { id: doc.id, ...doc.data() }]));
  }

  const fetchWarehouse = async () => {
    const q = query(collection(db, "warehouse"), where("userUid", "==", user.uid))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => setWarehouseList((prev) => [...prev, { id: doc.id, ...doc.data() }]));
  }

  useEffect(() => {
    if (Object.keys(user).length !== 0) fetchWarehouse();
    fetchOrderDetail();
    fetchUsers();
  }, [user, id]);

  return (
    <div className='bg-gray-100 flex '>
      <Toaster />
      <Sidebar />
      <ConfirmationModal confirmModal={confirmModal} handleBookOrder={handleConfirmOrder} handleConfirmModal={handleConfirmModal} />
      <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col '  >
        <Topbar />
        <EditOrderPage
          id={id}
          setCustomerName={setCustomerName}
          customerName={customerName}
          invoiceList={invoiceList}
          handleConfirmOrder={handleConfirmOrder}
          setInvoiceList={setInvoiceList}
          userList={userList}
          setUserList={setUserList}
          user={user}
          setUser={setUser}
          handleBookOrder={handleConfirmOrder}
          handleDeliveryInformation={() => { }}
          addInvoice={addInvoice}
          addSupport={addSupport}
          supportDocument={supportDocument}
          invoiceDocument={invoiceDocument}
          invoiceDetail={invoiceDetail}
          setInvoiceDetail={setInvoiceDetail}
          warehouseList={warehouseList}
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          handleShippingDetails={() => { }}
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
          setOrderID={setOrderID}
          lrDetails={lrDetails}
          setLrDetails={setLrDetails}
        />
      </div>
    </div>
  )
}

export default EditOrder

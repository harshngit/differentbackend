import React, { useState, useEffect } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import Orders from '../components/Orders/Orders'
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where, query as firebaseQuery } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useDispatch, useSelector } from 'react-redux'
import { generateToken } from '../actions/shippingActions'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { limit, startAfter, Timestamp } from "@firebase/firestore";
import { pinCodeList } from '../data/pinCodeData'
const OrderList = () => {
  const [orderList, setOrderList] = useState([])
  const [filteredOrderList, setFilteredOrderList] = useState([])
  const [branchInfo, setBranchInfo] = useState({})

  const { isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  )
  const [delhiveryOrders, setDelhiveryOrders] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [hub, setHub] = useState("")
  const [branchList, setBranchList] = useState([])
  const [partnerModal, setPartnerModal] = useState(false)
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange;
  const [csvOrders, setCsvOrders] = useState([])
  const [actualdate, setActualdate] = useState("")
  const [partner, setPartner] = useState("")
  // const [, set] = useState(second)
  const [loadingOrder, setLoadingOrder] = useState("")
  const [user, setuser] = useState({})
  const handleDateSelect = (ranges) => {
    console.log(ranges)
  }
  const [forwardNumber, setForwardNumber] = useState("")
  const [userlist, setUserlist] = useState([])
  const [order, setOrder] = useState({})
  const [orderID, setOrderID] = useState("")
  const [orderActivity, setOrderActivity] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [forwardnoModal, setForwardnoModal] = useState(false)
  const { shippingToken } = useSelector(
    (state) => state.shippingToken
  );
  const dispatch = useDispatch()
  const handlePartnerModal = () => {
    setPartnerModal(!partnerModal)
  }
  const handleForwardnoModal = () => {
    setForwardnoModal(!forwardnoModal)
    setPartnerModal(!partnerModal)
  }
  const deleteOrder = async (id) => {
    await deleteDoc(doc(db, "Order", id))
    window.location.reload()
  }
  const getBoxes = (data) => {

    let totalBoxes = 0
    data?.dimensions?.map((d) => {
      totalBoxes = Number(totalBoxes) + Number(d?.count)

    })
    return totalBoxes
    console.log(totalBoxes)


  }

  console.log(orderList)
  const fetchAdminOrders = async (loadMore = false) => {
    setLoadingOrder(true);
    setLoadingMore(loadMore);

    if (!loadMore) {
      setOrderList([]);
      setFilteredOrderList([]);
      setCsvOrders([]);
      setLastVisibleDoc(null);
    }

    let lastDoc = loadMore ? lastVisibleDoc : null;

    if (activeTab === "delivered") {
      console.log(loadingOrder);

      let q;
      if (lastDoc) {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "delivered"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(5)
        );
      } else {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "delivered"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
      }

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      const newOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lr: data?.lrno,
          bookingDate: data?.createdAt?.toDate().toLocaleString("en-GB"),
          client: data?.userName,
          expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
          actualWeight: Number(data?.weight) / 1000,
          chargableWeight: Math.ceil(data?.totalChargeableWeight),
          boxes: getBoxes(data),
          forwardingNumber: data?.forwardingNumber,
          consigneecity: data?.dropoff_location?.city,
          consigneecitystate: data?.dropoff_location?.region,
          consigneeName: data?.dropoff_location?.companyName,
          originPincode: data?.pickup_location?.pinCode,
          consigneePincode: data?.dropoff_location?.zip,
        };
      });

      setOrderList((prev) => [...prev, ...newOrders]);
      setFilteredOrderList((prev) => [...prev, ...newOrders]);
      setCsvOrders((prev) => [...prev, ...newOrders].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));

      setLoadingOrder(false);
      setLoadingMore(false);
    }

    else if (activeTab === "in-transit") {
      console.log(loadingOrder);

      let q;
      if (lastDoc) {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "in-transit"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(5)
        );
      } else {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "in-transit"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
      }

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      const newOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lr: data?.lrno,
          bookingDate: data?.createdAt?.toDate().toLocaleString("en-GB"),
          client: data?.userName,
          expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
          actualWeight: Number(data?.weight) / 1000,
          chargableWeight: Math.ceil(data?.totalChargeableWeight),
          boxes: getBoxes(data),
          forwardingNumber: data?.forwardingNumber,
          consigneecity: data?.dropoff_location?.city,
          consigneecitystate: data?.dropoff_location?.region,
          consigneeName: data?.dropoff_location?.companyName,
          originPincode: data?.pickup_location?.pinCode,
          consigneePincode: data?.dropoff_location?.zip,
        };
      });

      setOrderList((prev) => [...prev, ...newOrders]);
      setFilteredOrderList((prev) => [...prev, ...newOrders]);
      setCsvOrders((prev) => [...prev, ...newOrders].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));

      setLoadingOrder(false);
      setLoadingMore(false);

    }
    else if (activeTab === "pickedUp") {
      console.log(loadingOrder);

      let q;
      if (lastDoc) {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "pickedUp"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(5)
        );
      } else {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "pickedUp"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
      }

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      const newOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lr: data?.lrno,
          bookingDate: data?.createdAt?.toDate().toLocaleString("en-GB"),
          client: data?.userName,
          expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
          actualWeight: Number(data?.weight) / 1000,
          chargableWeight: Math.ceil(data?.totalChargeableWeight),
          boxes: getBoxes(data),
          forwardingNumber: data?.forwardingNumber,
          consigneecity: data?.dropoff_location?.city,
          consigneecitystate: data?.dropoff_location?.region,
          consigneeName: data?.dropoff_location?.companyName,
          originPincode: data?.pickup_location?.pinCode,
          consigneePincode: data?.dropoff_location?.zip,
        };
      });

      setOrderList((prev) => [...prev, ...newOrders]);
      setFilteredOrderList((prev) => [...prev, ...newOrders]);
      setCsvOrders((prev) => [...prev, ...newOrders].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));

      setLoadingOrder(false);
      setLoadingMore(false);
    }
    else if (activeTab === "new") {

      console.log(loadingOrder);

      let q;
      if (lastDoc) {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "new"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(5)
        );
      } else {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "new"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
      }

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      const newOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lr: data?.lrno,
          bookingDate: data?.createdAt?.toDate().toLocaleString("en-GB"),
          client: data?.userName,
          expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
          actualWeight: Number(data?.weight) / 1000,
          chargableWeight: Math.ceil(data?.totalChargeableWeight),
          boxes: getBoxes(data),
          forwardingNumber: data?.forwardingNumber,
          consigneecity: data?.dropoff_location?.city,
          consigneecitystate: data?.dropoff_location?.region,
          consigneeName: data?.dropoff_location?.companyName,
          originPincode: data?.pickup_location?.pinCode,
          consigneePincode: data?.dropoff_location?.zip,
        };
      });

      setOrderList((prev) => [...prev, ...newOrders]);
      setFilteredOrderList((prev) => [...prev, ...newOrders]);
      setCsvOrders((prev) => [...prev, ...newOrders].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));

      setLoadingOrder(false);
      setLoadingMore(false);
    }
    else if (activeTab === "preCreated") {
      console.log(loadingOrder);

      let q;
      if (lastDoc) {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "preCreated"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(5)
        );
      } else {
        q = query(
          collection(db, "Order"),
          where("orderStatus", "==", "preCreated"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
      }

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      const newOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lr: data?.lrno,
          bookingDate: data?.createdAt?.toDate().toLocaleString("en-GB"),
          client: data?.userName,
          expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
          actualWeight: Number(data?.weight) / 1000,
          chargableWeight: Math.ceil(data?.totalChargeableWeight),
          boxes: getBoxes(data),
          forwardingNumber: data?.forwardingNumber,
          consigneecity: data?.dropoff_location?.city,
          consigneecitystate: data?.dropoff_location?.region,
          consigneeName: data?.dropoff_location?.companyName,
          originPincode: data?.pickup_location?.pinCode,
          consigneePincode: data?.dropoff_location?.zip,
        };
      });

      setOrderList((prev) => [...prev, ...newOrders]);
      setFilteredOrderList((prev) => [...prev, ...newOrders]);
      setCsvOrders((prev) => [...prev, ...newOrders].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));

      setLoadingOrder(false);
      setLoadingMore(false);
    }
    else {
      console.log(loadingOrder);

      let q;
      if (lastDoc) {
        q = query(
          collection(db, "Order"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(5)
        );
      } else {
        q = query(
          collection(db, "Order"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
      }

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLastVisibleDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      const newOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lr: data?.lrno,
          bookingDate: data?.createdAt?.toDate().toLocaleString("en-GB"),
          client: data?.userName,
          expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
          actualWeight: Number(data?.weight) / 1000,
          chargableWeight: Math.ceil(data?.totalChargeableWeight),
          boxes: getBoxes(data),
          forwardingNumber: data?.forwardingNumber,
          consigneecity: data?.dropoff_location?.city,
          consigneecitystate: data?.dropoff_location?.region,
          consigneeName: data?.dropoff_location?.companyName,
          originPincode: data?.pickup_location?.pinCode,
          consigneePincode: data?.dropoff_location?.zip,
        };
      });

      setOrderList((prev) => [...prev, ...newOrders]);
      setFilteredOrderList((prev) => [...prev, ...newOrders]);
      setCsvOrders((prev) => [...prev, ...newOrders].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));

      setLoadingOrder(false);
      setLoadingMore(false);


    }

  }
  const fetchOrders = async () => {
    setOrderList([])
    setFilteredOrderList([])
    setLoadingOrder(true)
    if (activeTab === "delivered") {
      const q = query(collection(db, "Order"), where("uid", "==", users), where("orderStatus", "==", "delivered"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        setOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setFilteredOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setLoadingOrder(false)
        setCsvOrders((prev) => {
          const newOrder = {
            lr: data?.lrno,
            bookingDate: data?.createdAt?.toDate().toLocaleDateString('en-GB') + data?.createdAt?.toDate().toLocaleTimeString(),
            client: data?.userName,
            expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
            forwardingNumber: data?.forwardingNumber,
            consigneecity: data?.dropoff_location?.city,
            consigneecitystate: data?.dropoff_location?.region,
            consigneeName: data?.dropoff_location?.companyName,
            originPincode: data?.pickup_location?.pinCode,
            consigneePincode: data?.dropoff_location?.zip,
            actualWeight: Number(data?.weight) / 1000,
            chargableWeight: Math.ceil(data?.totalChargeableWeight),
            boxes: getBoxes(data),
            status: data?.orderStatus
          };

          return [...prev, newOrder].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
      });
    }
    else if (activeTab === "in-transit") {
      const q = query(collection(db, "Order"), where("uid", "==", users), where("orderStatus", "==", "in-transit"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        setOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setFilteredOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setLoadingOrder(false)
        setCsvOrders((prev) => {
          const newOrder = {
            lr: data?.lrno,
            bookingDate: data?.createdAt?.toDate().toLocaleDateString('en-GB') + data?.createdAt?.toDate().toLocaleTimeString(),
            client: data?.userName,
            expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
            forwardingNumber: data?.forwardingNumber,
            consigneecity: data?.dropoff_location?.city,
            consigneecitystate: data?.dropoff_location?.region,
            consigneeName: data?.dropoff_location?.companyName,
            originPincode: data?.pickup_location?.pinCode,
            consigneePincode: data?.dropoff_location?.zip,
            actualWeight: Number(data?.weight) / 1000,
            chargableWeight: Math.ceil(data?.totalChargeableWeight),
            boxes: getBoxes(data),
            status: data?.orderStatus
          };

          return [...prev, newOrder].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
      });
    }
    else if (activeTab === "pickedUp") {
      const q = query(collection(db, "Order"), where("uid", "==", users), where("orderStatus", "==", "pickedUp"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        setOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setFilteredOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setLoadingOrder(false)
        setCsvOrders((prev) => {
          const newOrder = {
            lr: data?.lrno,
            bookingDate: data?.createdAt?.toDate().toLocaleDateString('en-GB') + data?.createdAt?.toDate().toLocaleTimeString(),
            client: data?.userName,
            expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
            forwardingNumber: data?.forwardingNumber,
            consigneecity: data?.dropoff_location?.city,
            consigneecitystate: data?.dropoff_location?.region,
            consigneeName: data?.dropoff_location?.companyName,
            originPincode: data?.pickup_location?.pinCode,
            consigneePincode: data?.dropoff_location?.zip,
            actualWeight: Number(data?.weight) / 1000,
            chargableWeight: Math.ceil(data?.totalChargeableWeight),
            boxes: getBoxes(data),
            status: data?.orderStatus
          };

          return [...prev, newOrder].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
      });
    }
    else if (activeTab === "new") {
      const q = query(collection(db, "Order"), where("uid", "==", users), where("orderStatus", "==", "new"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        setOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setFilteredOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setLoadingOrder(false)
        setCsvOrders((prev) => {
          const newOrder = {
            lr: data?.lrno,
            createdAt: data?.createdAt?.toDate().toLocaleDateString('en-GB') + data?.createdAt?.toDate().toLocaleTimeString(),
            client: data?.userName,
            expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
            forwardingNumber: data?.forwardingNumber,
            consigneecity: data?.dropoff_location?.city,
            consigneecitystate: data?.dropoff_location?.region,
            consigneeName: data?.dropoff_location?.companyName,
            originPincode: data?.pickup_location?.pinCode,
            consigneePincode: data?.dropoff_location?.zip,
            actualWeight: Number(data?.weight) / 1000,
            chargableWeight: Math.ceil(data?.totalChargeableWeight),
            boxes: getBoxes(data),
            status: data?.orderStatus
          };

          return [...prev, newOrder].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
      });
    } else if (activeTab === "preCreated") {
      const q = query(collection(db, "Order"), where("uid", "==", users), where("orderStatus", "==", "preCreated"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        setOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setFilteredOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setLoadingOrder(false)
        setCsvOrders((prev) => {
          const newOrder = {
            lr: data?.lrno,
            bookingDate: data?.createdAt?.toDate().toLocaleDateString('en-GB') + data?.createdAt?.toDate().toLocaleTimeString(),
            client: data?.userName,
            expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
            forwardingNumber: data?.forwardingNumber,
            consigneecity: data?.dropoff_location?.city,
            consigneecitystate: data?.dropoff_location?.region,
            consigneeName: data?.dropoff_location?.companyName,
            originPincode: data?.pickup_location?.pinCode,
            consigneePincode: data?.dropoff_location?.zip,
            actualWeight: Number(data?.weight) / 1000,
            chargableWeight: Math.ceil(data?.totalChargeableWeight),
            boxes: getBoxes(data),
            status: data?.orderStatus
          };

          return [...prev, newOrder].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
      });
    }
    else {
      const q = query(collection(db, "Order"), where("uid", "==", users), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        setOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setFilteredOrderList((prev) => [...prev, {
          id: doc.id,
          ...doc.data()
        }])
        setLoadingOrder(false)
        setCsvOrders((prev) => {
          const newOrder = {
            lr: data?.lrno,
            bookingDate: data?.createdAt?.toDate().toLocaleDateString('en-GB') + data?.createdAt?.toDate().toLocaleTimeString(),
            client: data?.userName,
            expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
            forwardingNumber: data?.forwardingNumber,
            consigneecity: data?.dropoff_location?.city,
            consigneecitystate: data?.dropoff_location?.region,
            consigneeName: data?.dropoff_location?.companyName,
            originPincode: data?.pickup_location?.pinCode,
            consigneePincode: data?.dropoff_location?.zip,
            actualWeight: Number(data?.weight) / 1000,
            chargableWeight: Math.ceil(data?.totalChargeableWeight),
            boxes: getBoxes(data),
            status: data?.orderStatus
          };

          return [...prev, newOrder].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
      });
    }
  }
  const fetchBranch = async (city) => {
    const q = query(collection(db, "branchLogistics"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBranchList((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])

    });
  }

  const fetchOrder = async (id) => {
    const docRef = doc(db, "Order", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data()
      setOrder(docSnap.data())

      pinCodeList.map((pin) => {

        if (Number(pin.Pin) === Number(data?.pickup_location?.pinCode)) {
          console.log(data?.pickup_location?.pinCode, pin.Pin)
          console.log("hii")
          setHub(pin.hub)
        }
      })



    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  const filterBySearch = (event) => {
    const query = event.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredOrderList(orderList);
    } else {
      const updatedList = orderList.filter((item) =>
        item?.lrno?.toLowerCase().includes(query)
      );
      setFilteredOrderList(updatedList);
    }

    // ✅ Reset pagination so filtered results appear on the first page
    setCurrentPage(0);
    setItemOffset(0);
  };

  const filterBySearchClient = async (event) => {
    const query = event.target.value.trim().toLowerCase();
    setSearchQuery(query);

    let updatedList;

    if (!query) {
      updatedList = orderList; // Reset to full list when search is cleared
    } else {
      updatedList = orderList.filter((item) =>
        item?.userName?.toLowerCase().includes(query)
      );
    }

    // ✅ Update filtered order list & CSV data
    setFilteredOrderList(updatedList);
    setCsvOrders(updatedList.map((data) => ({
      lr: data?.lrno,
      createdAt: data?.createdAt?.toDate().toLocaleDateString('en-GB') + data?.createdAt?.toDate().toLocaleTimeString(),
      client: data?.userName,
      expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
      forwardingNumber: data?.forwardingNumber,
      consigneecity: data?.dropoff_location?.city,
      consigneecitystate: data?.dropoff_location?.region,
      consigneeName: data?.dropoff_location?.companyName,
      originPincode: data?.pickup_location?.pinCode,
      consigneePincode: data?.dropoff_location?.zip,
      actualWeight: Number(data?.weight) / 1000,
      chargableWeight: Math.ceil(data?.totalChargeableWeight),
      boxes: getBoxes(data),
      status: data?.orderStatus
    })));

    // ✅ Reset pagination so filtered results appear on the first page
    setCurrentPage(0);
    setItemOffset(0);

  };




  const handleDeliveryShipping = () => {

    const date = new Date()

    setOrderActivity()
    dispatch(generateToken())
    fetchOrder(orderID)

    console.log(order?.pickup_location?.pickupName?.companyName)
    if (shippingToken?.jwt?.length !== 0 && Object.keys(order).length !== 0 && order?.pickup_location?.pickupName?.companyName !== undefined) {
      var data = JSON.stringify({
        "ident": "",
        "pickup_location": order?.pickup_location?.pickupName?.companyName,
        "dropoff_location": order?.dropoff_location,
        "return_address": {
          "address": order?.pickup_location?.address,
          "zip": order?.pickup_location?.pinCode,
          "name": order?.pickup_location?.pinCode,
          "city": order?.pickup_location?.city,
          "region": order?.pickup_location?.state,
          "phone": order?.pickup_location?.personName
        },
        "d_mode": "Prepaid",
        "amount": 0.0,
        "rov_insurance": true,
        "invoices": order?.invoices,
        "weight": Number(order?.weight),
        "suborders": order?.suborders,

        "dimensions": order?.dimensions,
        "consignee_gst_tin": order?.consignee_gst_tin,
        "seller_gst_tin": order?.seller_gst_tin,
        "cb": {},


      });
      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://btob.api.delhivery.com/v3/manifest',
        headers: {
          'Content-Type': 'application/json',

          'Authorization': 'Bearer ' + shippingToken?.jwt
        },
        data: data
      };
      axios(config)
        .then(function (response) {
          setPartnerModal(false)
          toast.success('Order Shipped Succesfully')
          const repairRef = doc(db, "Order", orderID);

          // Set the "capital" field of the city 'DC'
          updateDoc(repairRef, {
            orderStatus: "pickedUp",
            job_id: response?.data?.job_id,
            orderActivity: [...orderActivity, {
              status: "Picked Up",
              remark: "Order has been Pickedup",
              location: "GRC Bhiwandi",
              time: date
            }]
          });
        }).catch((err) => {
          toast.error("Order Has an Error")
        })
    }
  }


  const fetchByDate = async () => {
    setOrderList([])
    setFilteredOrderList([])
    setCsvOrders([])
    const q = query(collection(db, "Order"), where("createdAt", ">=", Timestamp.fromDate(startDate)), where("createdAt", "<=", Timestamp.fromDate(endDate)), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      setOrderList((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])
      setFilteredOrderList((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])
      setCsvOrders((prev) => {
        const newOrder = {
          lr: data?.lrno,
          createdAt: data?.createdAt?.toDate().toLocaleDateString('en-GB') + data?.createdAt?.toDate().toLocaleTimeString(),
          client: data?.userName,
          expecteddate: data?.deliveryactualdate?.toDate().toLocaleDateString('en-GB') + data?.deliveryactualdate?.toDate().toLocaleTimeString(),
          forwardingNumber: data?.forwardingNumber,
          consigneecity: data?.dropoff_location?.city,
          consigneecitystate: data?.dropoff_location?.region,
          consigneeName: data?.dropoff_location?.companyName,
          originPincode: data?.pickup_location?.pinCode,
          consigneePincode: data?.dropoff_location?.zip,
          actualWeight: Number(data?.weight) / 1000,
          chargableWeight: Math.ceil(data?.totalChargeableWeight),
          boxes: getBoxes(data),
          status: data?.orderStatus
        };

        return [...prev, newOrder].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      });
    });
  }
  const clearDate = () => {
    setDateRange([null, null])
    if (userProfile?.role === "admin") {
      fetchAdminOrders()
    }
    else {
      fetchOrders()
    }
  }
  const handleOwnShipping = () => {
    const date = new Date()
    fetchOrder(orderID)
    console.log(order)
    const repairRef = doc(db, "Order", orderID);
    console.log(hub)
    if (Object.keys(order).length !== 0) {
      console.log("hii")
      updateDoc(repairRef, {

        orderStatus: "pickedUp",
        forwardingNumber: order?.lrno,
        orderActivity: [...orderActivity, {
          status: "Picked Up",
          remark: "Order has been Pickedup",
          location: "GRC Bhiwandi",
          time: date
        }]
      }).then(res => {
        handlePartnerModal()
      }).catch(err => {
        console.log(err.message)
      })
    }

  }



  const orderChangeStatus = async () => {
    const q = query(collection(db, "Order"), where)
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data()




    });
  }

  const fetchUsers = async () => {
    const q = query(collection(db, "users"), where("service", "==", "logistics"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserlist((prev) => [...prev, {
        id: doc.id,
        ...doc.data()
      }])

    });
  }
  console.log(userlist)
  console.log(orderList)

  useEffect(() => {
    if (userProfile?.role === "admin") {
      fetchAdminOrders()
      fetchBranch()
    }
    else {
      fetchOrders()
    }
    fetchUsers()
    orderChangeStatus()

  }, [activeTab, userProfile])
  useEffect(() => {
    // const intervalCall = setInterval(() => {
    //   handleDeliveryStatus();
    // }, 3000);
    // return () => {
    //   // clean up
    //   clearInterval(intervalCall);
    // };


  }, [])



  return (
    <>
      <div className='bg-gray-100 flex ' >
        <Toaster />
        {/* <ForwardNoModal orderActivity={orderActivity} handleForwardnoModal={handleForwardnoModal} forwardnoModal={forwardnoModal} setForwardnoModal={setForwardnoModal} orderID={orderID} /> */}
        {/* <ChoosePartner orderID={orderID} orderActivity={orderActivity} partner={partner} setForwardNumber={setForwardNumber} forwardNumber={forwardNumber} setPartner={setPartner} handleForwardnoModal={handleForwardnoModal} branchList={branchList} branchInfo={branchInfo} setBranchInfo={setBranchInfo} handleOwnShipping={handleOwnShipping} handleDeliveryShipping={handleDeliveryShipping} partnerModal={partnerModal} setPartnerModal={setPartnerModal} handlePartnerModal={handlePartnerModal} /> */}
        <Sidebar />

        <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
          <Topbar />
          <Orders fetchAdminOrders={fetchAdminOrders} loadingMore={loadingMore} setFilteredOrderList={setFilteredOrderList} filterBySearchClient={filterBySearchClient} user={user} setuser={setuser} userlist={userlist} setUserlist={setUserlist} setItemOffset={setItemOffset} setCurrentPage={setCurrentPage} currentPage={currentPage} searchQuery={searchQuery} csvOrders={csvOrders} loadingOrder={loadingOrder} clearDate={clearDate} fetchByDate={fetchByDate} dateRange={dateRange} setDateRange={setDateRange} startDate={startDate} endDate={endDate} deleteOrder={deleteOrder} filteredOrderList={filteredOrderList} filterBySearch={filterBySearch} setOrderID={setOrderID} handlePartnerModal={handlePartnerModal} activeTab={activeTab} setActiveTab={setActiveTab} orderList={orderList} />
        </div>
      </div>

    </>
  )
}

export default OrderList
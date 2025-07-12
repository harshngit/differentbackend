import React, { useEffect, useState } from 'react';
import Topbar from '../components/Layout/Topbar';
import { Sidebar } from '../components/Layout/Sidebar';
import { useSelector } from 'react-redux';
import AnalysisBox from '../components/Home/AnalysisBox';
import Charts from '../components/Home/Charts'; // You can use this for both or split if needed
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, users, userProfile } = useSelector((state) => state.user);

  const [totalOrderList, setTotalOrderList] = useState([]);
  const [orderInTransitList, setOrderInTransitList] = useState([]);
  const [newOrderlist, setNewOrderlist] = useState([]);
  const [fulfilledList, setfulfilledList] = useState([]);
  const [orderDeliveryList, setOrderDeliveryList] = useState([]);
  const [dailySalesData, setDailySalesData] = useState({});

  const fetchOrderList = async () => {
    const q = query(collection(db, "Order"));
    const querySnapshot = await getDocs(q);

    const orderCountsByDate = {};
    const orders = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate?.();
      if (!createdAt) return;

      const dateKey = format(createdAt, "MMM d");
      orderCountsByDate[dateKey] = (orderCountsByDate[dateKey] || 0) + 1;

      orders.push({ id: doc.id, ...data });
    });

    setTotalOrderList(orders);
    setDailySalesData(orderCountsByDate);
  };

  const fetchOrderinTransitList = async () => {
    const q = query(collection(db, "Order"), where("orderStatus", "==", "in-transit"));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    setOrderInTransitList(result);
  };

  const fetchOrderDilveryList = async () => {
    const q = query(collection(db, "logisticOrder"), where("orderStatus", "==", "delivered"));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    setOrderDeliveryList(result);
  };

  const fetchNewOrder = async () => {
    const q = query(collection(db, "Order"), where("orderStatus", "==", "New"));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    setNewOrderlist(result);
  };

  const fetchfulfilledOrder = async () => {
    const q = query(collection(db, "Order"), where("orderStatus", "==", "FulFilled"));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    setfulfilledList(result);
  };

  useEffect(() => {
    fetchOrderList();
    fetchOrderinTransitList();
    fetchOrderDilveryList();
    fetchNewOrder();
    fetchfulfilledOrder();
  }, []);

  const dailySalesChartData = {
    labels: Object.keys(dailySalesData),
    datasets: [
      {
        label: 'Daily Sales',
        data: Object.values(dailySalesData),
        fill: false,
        tension: 0.3,
        borderColor: '#000',
        backgroundColor: '#ccc',
        pointRadius: 5,
      },
    ],
  };

  const orderDistributionChartData = {
    labels: ["Total Orders", "In Transit", "Delivered"],
    datasets: [
      {
        label: 'Order Distribution',
        data: [totalOrderList.length, orderInTransitList.length, orderDeliveryList.length],
        backgroundColor: ['#000000', '#ccc', '#808080'],
        borderColor: ['#000000', '#ccc', '#808080'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='bg-gray-100 flex h-[100vh] overflow-y-scroll'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Topbar />
        <div className='px-[1%] pt-[5%] pb-[5%] rounded-lg shadow-md m-5 w-[96%] text-white bg-gradient-to-r from-black via-gray-800 to-gray-500'>
          <div className='flex flex-col justify-start items-start'>
            {/* Title */}
            <div className='ml-10 mt-5 font-semibold font-[GilroyBold] text-xl'>
              Welcome To Different Clothing Dashboard
            </div>

            {/* Description */}
            <p className='ml-10 mt-2 w-[50%] text-md font-[GilroyMedium]'>
              Manage your orders seamlessly, track delivery status, and create new orders with ease.
              Stay updated with real-time data and ensure smooth operations for your clothing business.
            </p>

            {/* Button to Create Order */}
            <Link to={"/create-product"}>
              <button className='ml-10 mt-4 px-6 py-2 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-all'>
                Create Product
              </button>
            </Link>
          </div>
        </div>


        <AnalysisBox
          fulfilledList={fulfilledList}
          newOrderlist={newOrderlist}
          totalOrderList={totalOrderList}
          orderInTransitList={orderInTransitList}
          orderDeliveryList={orderDeliveryList}
        />

        <div className='grid grid-cols-12 mt-[15%] mb-5 ml-7 gap-10'>
          {/* Line Chart - Daily Sales */}
          <div className='col-span-6'>
            <h2 className='font-bold text-lg mb-2'>📈 Daily Sales</h2>
            <Charts chartData={dailySalesChartData} type="line" />
          </div>

          {/* Bar Chart - Distribution */}
          <div className='col-span-6'>
            <h2 className='font-bold text-lg mb-2'>📊 Order Status Distribution</h2>
            <Charts chartData={orderDistributionChartData} type="pie" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

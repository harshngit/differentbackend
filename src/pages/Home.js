import React, { useEffect, useState } from 'react';
import Topbar from '../components/Layout/Topbar';
import { Sidebar } from '../components/Layout/Sidebar';
import { useSelector } from 'react-redux';
import AnalysisBox from '../components/Home/AnalysisBox';
import Charts from '../components/Home/Charts';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase.config';
import {
  format,
  addDays,
  subDays,
  isSameDay,
  differenceInCalendarDays,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {
  const { isAuthenticated, users, userProfile } = useSelector((state) => state.user);

  const [totalOrderList, setTotalOrderList] = useState([]);
  const [orderInTransitList, setOrderInTransitList] = useState([]);
  const [newOrderlist, setNewOrderlist] = useState([]);
  const [fulfilledList, setfulfilledList] = useState([]);
  const [orderDeliveryList, setOrderDeliveryList] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [weeklySalesData, setWeeklySalesData] = useState({});

  // Get current week range (Mon–Sun)
  const getCurrentWeekRange = () => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    return [start, end];
  };

  const fetchOrderList = async () => {
    const q = query(collection(db, 'Order'));
    const querySnapshot = await getDocs(q);
    const orders = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.createdAt?.toDate) {
        orders.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        });
      }
    });

    setTotalOrderList(orders);
  };

  const calculateSales = (orders, rangeStart, rangeEnd) => {
    if (!rangeStart || !rangeEnd) return;

    const sales = {};
    for (let i = 0; i < 7; i++) {
      const day = addDays(rangeStart, i);
      const label = format(day, 'MMM d');
      sales[label] = 0;
    }

    orders.forEach((order) => {
      const orderDate = order.createdAt;
      if (orderDate >= rangeStart && orderDate <= rangeEnd) {
        const label = format(orderDate, 'MMM d');
        if (sales[label] !== undefined) {
          const invoiceValue = order.invoices?.[0]?.n_value ?? 0;
          sales[label] += invoiceValue;
        }
      }
    });

    setWeeklySalesData(sales);
  };

  const fetchOrderinTransitList = async () => {
    const q = query(collection(db, 'Order'));
    const snapshot = await getDocs(q);
    const result = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.orderStatus === 'in-transit') {
        result.push({ id: doc.id, ...data });
      }
    });
    setOrderInTransitList(result);
  };

  const fetchOrderDilveryList = async () => {
    const q = query(collection(db, 'logisticOrder'));
    const snapshot = await getDocs(q);
    const result = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.orderStatus === 'delivered') {
        result.push({ id: doc.id, ...data });
      }
    });
    setOrderDeliveryList(result);
  };

  const fetchNewOrder = async () => {
    const q = query(collection(db, 'Order'));
    const snapshot = await getDocs(q);
    const result = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.orderStatus === 'New') {
        result.push({ id: doc.id, ...data });
      }
    });
    setNewOrderlist(result);
  };

  const fetchfulfilledOrder = async () => {
    const q = query(collection(db, 'Order'));
    const snapshot = await getDocs(q);
    const result = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.orderStatus === 'FulFilled') {
        result.push({ id: doc.id, ...data });
      }
    });
    setfulfilledList(result);
  };

  // Set default week on mount
  useEffect(() => {
    const [start, end] = getCurrentWeekRange();
    setDateRange([start, end]);
  }, []);

  useEffect(() => {
    fetchOrderList();
    fetchOrderinTransitList();
    fetchOrderDilveryList();
    fetchNewOrder();
    fetchfulfilledOrder();
  }, []);

  useEffect(() => {
    if (startDate && endDate && differenceInCalendarDays(endDate, startDate) === 6) {
      calculateSales(totalOrderList, startDate, endDate);
    }
  }, [startDate, endDate, totalOrderList]);

  const dailySalesChartData = {
    labels: Object.keys(weeklySalesData),
    datasets: [
      {
        label: `Sales from ${startDate ? format(startDate, 'MMM d') : ''} to ${endDate ? format(endDate, 'MMM d') : ''}`,
        data: Object.values(weeklySalesData),
        fill: false,
        tension: 0.3,
        borderColor: '#000',
        backgroundColor: '#ccc',
        pointRadius: 3,
      },
    ],
  };

  const orderDistributionChartData = {
    labels: ['Total Orders', 'In Transit', 'Delivered'],
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
    <div className='bg-gray-100 flex'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Topbar />
        <div className='h-[100vh] overflow-y-scroll'>
          <div className='px-[1%] pt-[2%] pb-[2%] rounded-lg shadow-md m-5 w-[96%] text-white bg-gradient-to-r from-black via-gray-800 to-gray-500'>
            <div className='flex flex-col justify-start items-start'>
              <div className='ml-10 mt-5 font-semibold font-[GilroyBold] text-xl'>
                Welcome To Different Clothing Dashboard
              </div>
              <p className='ml-10 mt-2 w-[50%] text-md font-[GilroyMedium]'>
                Manage your orders seamlessly, track delivery status, and create new orders with ease.
                Stay updated with real-time data and ensure smooth operations for your clothing business.
              </p>
              <Link to={'/create-product'}>
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

          <div className='ml-7 mt-[0%] mb-5'>
            <label className='font-semibold mr-3'>Select 7-day Range: </label>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                const [start, end] = update;
                if (start && end && differenceInCalendarDays(end, start) === 6) {
                  setDateRange(update);
                } else if (start && !end) {
                  setDateRange([start, null]);
                }
              }}
              maxDate={subDays(new Date(), 1)}
              minDate={new Date('2025-07-01')}
              className='px-3 py-2 border border-gray-300 rounded-md'
              placeholderText='Pick 7-day week'
            />
          </div>

          <div className='grid grid-cols-12 mb-5 ml-7 gap-10'>
            <div className='col-span-6'>
              <h2 className='font-bold text-lg mb-2'>📈 Weekly Sales</h2>
              <Charts chartData={dailySalesChartData} type='line' />
            </div>
            <div className='col-span-6'>
              <h2 className='font-bold text-lg mb-2'>📊 Order Status Distribution</h2>
              <Charts chartData={orderDistributionChartData} type='pie' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

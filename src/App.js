
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import OrderList from './pages/OrderList';
import CreateOrder from './pages/CreateOrder';
import RequestPickup from './pages/RequestPickup';
import RateCalculator from './pages/RateCalculator';
import CheckServicibility from './pages/CheckServicibility';
import ManageWarehouse from './pages/ManageWarehouse';
import Success from './pages/Success';
import CreateUser from './pages/CreateUser';
import Users from './pages/Users';
import Login from './pages/Login';
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
import { loadUser } from './actions/userActions';
import EditUser from './pages/EditUser';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import ViewOrder from './pages/ViewOrder';
import UserDetailsAdmin from './pages/UserDetailsAdmin';
import CreateInvoice from './pages/CreateInvoice';
import CreateStaff from './pages/CreateStaff';
import CreateDeliveryOrder from './pages/CreateDeliveryOrder';
import PickupBoyList from './pages/PickupBoyList';
import DeliveryBoyList from './pages/DeliveryBoyList';
import EditOrder from './pages/EditOrder';
import DigitalLR from './pages/DigitalLR';
import CreateBranch from './pages/CreateBranch';
import ShippinglabelAdmin from './pages/ShippinglabelAdmin';
import ManageDelivery from './pages/ManageDelivery';
import DeliveryBoyDataList from './pages/DeliveryBoyDataList';
import EditWarehouse from './pages/EditWarehouse';
import CreateProduct from './pages/CreateProduct';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import ViewProductsDetails from './pages/ViewProductsDetails';
import Collection from './pages/Collection';
import ManageInventory from './pages/ManageInventory';
import CreateCoupon from './pages/CreateCoupon';
import CreateGiftCard from './pages/CreateGiftCard';
import GiftCard from './pages/GiftCard';
function App() {
  const { error, loading, isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && !userProfile) {
      dispatch(loadUser(users));
    }
    if (!isAuthenticated) {
      navigate("/login")
    }

  }, [isAuthenticated])
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/orders" element={<OrderList />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route exact path="/manageinventory" element={<ManageInventory />} />
        <Route exact path="/productdetails/:id" element={<ViewProductsDetails />} />
        <Route exact path="/manageDelivery" element={<ManageDelivery />} />
        <Route exact path="/DeliveryBoyDataList" element={<DeliveryBoyDataList />} />
        <Route exact path="/orderDetails/shippinglabel/:id" element={<ShippinglabelAdmin />} />
        <Route exact path="/createBranch" element={<CreateBranch />} />
        <Route exact path="/orderDetails/:id" element={<ViewOrder />} />
        <Route exact path="/orderDetails/waybill/:id" element={<DigitalLR />} />
        <Route exact path="/editorder/:id" element={<EditOrder />} />
        <Route exact path="/editproduct/:id" element={<EditProduct />} />
        <Route exact path="/editwarehouse/:id" element={<EditWarehouse />} />
        <Route exact path="/create-order" element={<CreateOrder />} />
        <Route exact path="/create-product" element={<CreateProduct />} />
        <Route exact path="/createDelivery" element={<CreateDeliveryOrder />} />
        <Route exact path="/createcoupon" element={<CreateCoupon />} />
        <Route exact path="/pickupList" element={<PickupBoyList />} />
        <Route exact path="/deliveryList" element={<DeliveryBoyList />} />
        <Route exact path="/request-pickup" element={<RequestPickup />} />
        <Route exact path="/rate-calculator" element={<RateCalculator />} />
        <Route exact path="/servicibility" element={<CheckServicibility />} />
        <Route exact path="/warehouse" element={<ManageWarehouse />} />
        <Route exact path="/create-user" element={<CreateUser />} />
        <Route exact path="/create-staff" element={<CreateStaff />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/users/:id" element={<EditUser />} />
        <Route exact path="/user/:id" element={<UserDetailsAdmin />} />
        <Route exact path="/create-giftcard" element={<CreateGiftCard />} />
        <Route exact path="/giftcards" element={<GiftCard />} />
        {/* <Route exact path="/success" element={<Success />} /> */}
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/updateProfile" element={<UpdateProfile />} />
        <Route exact path="/create-invoice" element={<CreateInvoice />} />
        <Route exact path="*" element={<Success />} />
        <Route exact path="/collection" element={<Collection />} />
      </Routes>
    </div>
  );
}

export default App;

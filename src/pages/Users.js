import React, { useState, useEffect } from 'react';
import Topbar from '../components/Layout/Topbar';
import { Sidebar } from '../components/Layout/Sidebar';
import UserList from '../CreateUser/UserList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [activeTab, setActiveTab] = useState("admin");

  const fetchUsers = async () => {
    try {
      let role = activeTab; // "admin", "staff", "customer"

      const q = query(
        collection(db, "users"),
        where("role", "==", role)
      );

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserList(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  return (
    <div className='bg-gray-100 flex'>
      <Sidebar />
      <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col'>
        <Topbar />
        <UserList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userList={userList}
        />
      </div>
    </div>
  );
};

export default Users;

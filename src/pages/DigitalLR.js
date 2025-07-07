import React, { useEffect, useState } from 'react'
import ShipperCopy from '../components/DigitalLR/ShipperCopy'
import { useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.config'
import LMCopy from '../components/DigitalLR/LMCopy'
import AccountsCopy from '../components/DigitalLR/AccountsCopy'
import RecieverCopy from '../components/DigitalLR/RecieverCopy'

const DigitalLR = () => {
  const { id } = useParams()
  const [orderDetail, setOrderDetail] = useState({})
  const fetchOrderDetail = () => {

    onSnapshot(doc(db, "logisticOrder", id), (doc) => {
      const data = doc.data()
      setOrderDetail(data)

    });
  }
  useEffect(() => {
    fetchOrderDetail()
  }, [id])

  return (
    <div className='flex mt-6 items-center justify-center flex-col'>
      <ShipperCopy orderDetail={orderDetail} id={id} />
      <LMCopy orderDetail={orderDetail} id={id} />
      <RecieverCopy orderDetail={orderDetail} id={id} />
    </div>
  )
}

export default DigitalLR
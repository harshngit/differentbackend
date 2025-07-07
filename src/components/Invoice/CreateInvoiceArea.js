import { useContext, useEffect, useState } from "react";
import ClientDetails from "./ClientDetails";
import Dates from "./Dates";
import Footer from "./Footer";
import Header from "./InvoiceHeader";
import MainDetails from "./MainDetails";
import Notes from "./Notes";
import Table from "./Table";
import TableForm from "./TableForm";
import ReactToPrint from "react-to-print";

import { State } from "../../context/stateContext"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import AutocompleteUser from "../ManageWarehouse/AutocompleteUser";
import { PencilIcon } from "@heroicons/react/24/outline";

function CreateInvoice() {
  const {
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    bankName,
    setBankName,
    bankAccount,
    setBankAccount,
    website,
    setWebsite,
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    componentRef,
    clientData,
    setClientData
  } = useContext(State);
  const [userList, setUserList] = useState("")
  const fetchUsers = async () =>{
    const q = query(collection(db, "users"), where("service","==","logistics")) 
      const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
        setUserList((prev)=>[...prev,{
            id:doc.id,
            ...doc.data()
           }])
        
       });
  }
  console.log(userList)
  useEffect(() => {
    fetchUsers()
  }, [])
  
  return (
    <>
      <main
        className="m-5 p-5 col-span-4   xl:grid grid-cols-2 gap-10 xl:items-start"
        style={{
          maxWidth: "1920px",
          margin: "auto",
        }}
      >
        <section>
          <div className="bg-white p-5 rounded shadow">
            <div className="flex flex-col justify-center">
              <article className="md:grid grid-cols-2 gap-10 md:mt-16">
                <div className="flex flex-col">
                  <label htmlFor="clientName">Enter your client's name</label>
                  { Object.keys(clientData).length === 0  && userList?.length !==0 ?  <AutocompleteUser selected={clientData} setSelected={setClientData} placeholder="Enter Client Name" data={userList} /> : <div>
       <div className=' flex items-center justify-end' >
       <PencilIcon className='w-[25px] cursor-pointer' onClick={()=>setClientData({})} />
       </div>
        <h3 className='text-[.8rem]' >{clientData.name}, {clientData.email}</h3>
        <h3 className='text-[.8rem]' >{clientData.companyName}</h3>

       </div>}
                </div>

               
              </article>

              <article className="md:grid grid-cols-3 gap-10">
                <div className="flex flex-col">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    id="invoiceNumber"
                    placeholder="Invoice Number"
                    autoComplete="off"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <input
                    type="date"
                    name="invoiceDate"
                    id="invoiceDate"
                    placeholder="Invoice Date"
                    autoComplete="off"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    placeholder="Invoice Date"
                    autoComplete="off"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </article>

              {/* This is our table form */}
              <article>
                <TableForm />
              </article>

              <label htmlFor="notes">Additional Notes</label>
              <textarea
                name="notes"
                id="notes"
                cols="30"
                rows="10"
                placeholder="Additional notes to the client"
                maxLength={500}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
       
        </section>

        {/* Invoice Preview */}
        <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Download
              </button>
            )}
            content={() => componentRef.current}
          />
          <div ref={componentRef} className="p-5">
            <Header />

            <MainDetails />

            <ClientDetails />

            <Dates />

            <Table />

            <Notes />

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default CreateInvoice;
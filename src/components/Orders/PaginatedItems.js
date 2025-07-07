import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const PaginatedItems = ({ itemsPerPage, filteredOrderList, showAdd, setShowAdd, setOrderID, handlePartnerModal, userProfile, deleteOrder, loadingOrder, setLoadingOrder, search, searchQuery, currentPage, setCurrentPage, orderList, fetchAdminOrders, loadingMore }) => {
  // console.log(search)
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  // Determine which order list to use based on search query
  const displayedOrders = searchQuery ? filteredOrderList : orderList;

  // Calculate the range of items to display based on current page
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = displayedOrders.slice(itemOffset, endOffset);

  // Calculate the total number of pages
  const pageCount = Math.ceil(displayedOrders.length / itemsPerPage);


  // Invoke when user click to request another page.

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % displayedOrders.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  // const fetchMoreOrders = async () => {
  //   setLoadingMore(true);
  //   try {
  //     const response = await fetch(`/api/orders?offset=${orderList.length}&limit=200`);
  //     const newOrders = await response.json();

  //     if (newOrders.length > 0) {
  //       currentItems((prevOrders) => [...prevOrders, ...newOrders]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching more orders:", error);
  //   }
  //   setLoadingMore(false);
  // };
  return (
    <>

      {loadingOrder ? (
        <div>Loading</div>
      ) : (
        currentItems?.map((item) => (
          <div className={`bg-white border-b-[1px]  border-gray-300 py-4 px-8 grid  gap-6 grid-flow-row grid-cols-2  items-center justify-start lg:grid-cols-5 `}>
            <Link to={`/orderDetails/${item?.OrderID}`} > <p className='col-span-1 text-[0.8rem] underline hover:text-blue-400 font-[GilroyMedium]' >{item.OrderID}</p></Link>
            {/* <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.orderID}</p> */}
            <div className='col-span-1 ' >
              <p className='text-[0.7rem] font-[GilroyMedium]' >{item?.createdAt?.toDate().toDateString()}</p>
              <p className='text-[0.7rem] font-[GilroyMedium]' >{item?.createdAt?.toDate().toLocaleTimeString()}</p>
            </div>
            <p className='col-span-1 text-[0.7rem] font-[GilroyMedium]' >{item?.customerName}</p>
            {/* {showAdd === item?.lrno ? (
              <p className='col-span-1 relative text-[0.7rem] font-[GilroyMedium]' >
                <p onClick={() => setShowAdd('')} className='border-[1px] cursor-pointer absolute  right-[2px] flex items-center justify-center px-2  border-red-500 text-red-500 w-[20px] h-[20px] rounded-full' >X</p>
                <br />
                <span className='text-[0.6rem]' >{item?.dropoff_location?.address}</span>

              </p>) : <p className='cursor-pointer text-[0.7rem] text-blue-400' onClick={(e) => setShowAdd(item?.lrno)}>{item?.dropoff_location?.consignee}</p>} */}
            {/* <p className='col-span-1 text-[0.7rem] font-[GilroyMedium]' >{item?.pickup_location?.city},{item?.pickup_location?.state}</p>
            <p className='col-span-1 text-[0.7rem] font-[GilroyMedium]' >{item?.dropoff_location?.city},<br />{item?.dropoff_location?.region}</p> */}

            <p className='col-span-1 uppercase text-[0.7rem] font-[GilroyMedium]' >{item?.orderStatus}</p>
            <div className='flex items-start justify-start ' >
              {item?.orderStatus === "new" && <Button onClick={() => {
                setOrderID(item?.id)
                handlePartnerModal()
              }} className='col-span-1 text-[.7rem] font-[GilroyMedium]' >Ship Now</Button>}
              {/* {userProfile?.role === "admin" && <div onClick={() => {
                deleteOrder(item?.id)
              }} className='col-span-1 text-red-600 cursor-pointer w-[3rem] mx-2 font-[GilroyMedium]' ><TrashIcon /></div>} */}
              {/* {item?.orderStatus === "pickedUp" && <Button  onClick={()=>{
            setOrderID(item?.id)
                handlePartnerModal()
            }} className='col-span-1 text-[.7rem] font-[GilroyMedium]' >View Invoice</Button>} */}
              {item?.orderStatus === "delivered" && <a className='bg-black text-[0.7rem] py-2 px-5 font-[GilroyMedium] rounded-lg text-white' target='_blank' href={item?.pod} download={item?.pod}>View & Download POD</a>}
            </div>
          </div>
        ))
      )
      }
      <div className='flex justify-between items-center mb-5'>
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="›"
            previousLabel="‹"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            forcePage={currentPage} // Ensures correct page selection
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName="flex items-center justify-end gap-3 mt-5"
            pageClassName="px-3 py-2 rounded-md text-black transition-all hover:bg-[#FFB200] hover:text-black"
            pageLinkClassName="text-sm font-medium"
            previousClassName="px-3 py-2 bg-[#000] text-white rounded-md cursor-pointer hover:bg-[#FFB200] hover:text-black transition-all"
            previousLinkClassName="text-base font-semibold"
            nextClassName="px-3 py-2 bg-black text-white rounded-md cursor-pointer hover:bg-[#FFB200] hover:text-black transition-all"
            nextLinkClassName="text-base font-semibold"
            activeClassName="bg-[#FFB200] text-black font-bold rounded-md px-4 py-2 shadow-lg"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
        <div>
          {currentPage === pageCount - 1 && orderList?.length >= 5 && (
            <div className="flex justify-center items-center ">
              <Button
                onClick={() => fetchAdminOrders(true)}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PaginatedItems
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { Select } from "antd";

// Action
import { getOrdersByUserIdAction } from '../../store/actions/user/apiRequest.action';
import { useEffect, useState } from "react";

const OrderHistory = () => {
  const storageUser = JSON.parse(sessionStorage.getItem('user'));
  const dispatch = useDispatch();
  const { orderByUserId } = useSelector(reduxData => reduxData.orderReducer);
  const { userById } = useSelector(reduxData => reduxData.userReducer);
  const { pending, listOrderByUser, isError } = orderByUserId;

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 6;

  if (storageUser) {
    let params = new URLSearchParams({
      page,
      limit,
    })

    useEffect(() => {
      dispatch(getOrdersByUserIdAction(storageUser.token, storageUser.user._id, params.toString()));
    }, [page])
  }

  const handleChangeStatus = (value) => {
    let params = new URLSearchParams({
      page,
      limit,
      status: value
    })

    dispatch(getOrdersByUserIdAction(storageUser.token, storageUser.user._id, params.toString()));
  }

  return (
    <div className='flex-[3] border rounded-lg pt-4'>
      {/* Title */}
      <div className='flex justify-between items-center px-6 mb-4'>
        <h2 className='font-medium text-xl'>Recent Order History</h2>
        <div className="flex items-center gap-3">
          <p>Status:</p>
          <Select
            style={{
              width: 120,
            }}
            defaultValue={''}
            onChange={(value) => handleChangeStatus(value)}
            options={[
              {
                value: '',
                label: 'All',
              },
              {
                value: 'Pending',
                label: 'Pending',
              },
              {
                value: 'Processing',
                label: 'Processing',
              },
              {
                value: 'Delivered',
                label: 'Delivered',
              },
            ]}
          />

        </div>
      </div>

      {/* Table */}
      <div className='grid grid-cols-5 bg-[#F2F2F2] px-6 py-3'>
        <h4 className='font-medium text-xs text-gray-700'>DATE</h4>
        <h4 className='font-medium text-xs text-gray-700 col-span-2'>TOTAL</h4>
        <h4 className='font-medium text-xs text-gray-700'>STATUS</h4>
      </div>

      {/* Render List Order by User */}
      {
        listOrderByUser && listOrderByUser.data?.length > 0 &&
        listOrderByUser.data?.map((order, index) => (
          <div key={order._id} className='grid grid-cols-5 px-6 py-3'>
            <p className='text-sm text-gray-800'>
              {order.dateOrdered.slice(0, 10)}
            </p>
            <p className='text-sm text-gray-800 col-span-2'>
              <span className='font-medium'>
                ${order.totalPrice.toFixed(2)}
              </span> ({order.orderItems.length} Products)
            </p>
            <p className='text-sm text-gray-800'>{order.status}</p>
            <Link
              className="text-[#00B207] font-medium text-sm"
              to={`/account/order-history/${order._id}`}
            >
              View Details
            </Link>
          </div>
        ))
      }
      <div className="flex justify-center my-4">
        <Pagination
          count={Math.ceil(listOrderByUser && listOrderByUser.count / limit)}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
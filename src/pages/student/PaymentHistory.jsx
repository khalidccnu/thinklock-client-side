import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import { PaidBalanceContext } from "../../providers/PaidBalanceProvider.jsx";

const PaymentHistory = () => {
  const { loading, userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [, setFetchAll] = useContext(PaidBalanceContext);

  const {
    isLoading,
    data: orders,
    refetch,
  } = useQuery({
    queryKey: [userInfo, "orders.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/${userInfo.uid}/orders`),
  });

  useEffect(
    (_) => {
      if (orders) {
        setFetchAll((prev) => {
          return { ...prev, orRefetch: refetch };
        });
      }
    },
    [orders]
  );

  return !isLoading ? (
    orders.data.length ? (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>TrxID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.data.map((order, idx) => {
              return (
                <tr key={order._id}>
                  <th>{++idx}</th>
                  <td>{order._id}</td>
                  <td>{order.trxID}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="alert max-w-sm mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>You did not make any payment yet!</span>
      </div>
    )
  ) : null;
};

export default PaymentHistory;

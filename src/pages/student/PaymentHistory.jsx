import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";

const PaymentHistory = () => {
  const { loading, userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders, refetch } = useQuery({
    queryKey: [userInfo, "orders.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/${userInfo.uid}/orders`),
  });

  return (
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
          {orders?.data.map((order, idx) => {
            return (
              <tr>
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
  );
};

export default PaymentHistory;

import React, { Fragment, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import { PaidBalanceContext } from "../../providers/PaidBalanceProvider.jsx";

const StripeModal = ({ isSMOpen, setSMOpen, paidBalance, paidRefetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [fetchAll] = useContext(PaidBalanceContext);
  const location = useLocation();

  const handleOrder = (_) => {
    axiosSecure
      .post(`/create-payment-intent`, { paidBalance })
      .then(async (clientSecret) => {
        const card = elements.getElement(CardElement);

        const { error: cpmError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card,
          });

        if (cpmError) {
          toast.error(cpmError.message);
          return false;
        }

        const { error: ccpError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret.data, {
            payment_method: {
              card: card,
              billing_details: {
                name: userInfo.displayName,
                email: userInfo.email,
              },
            },
          });

        if (ccpError) {
          toast.error(ccpError.message);
          return false;
        }

        if (paymentIntent.status === "succeeded") {
          axiosSecure
            .post(`/student/${userInfo.uid}/orders`, {
              trxID: paymentIntent.id,
              ct_key: userInfo.uid,
              date: new Date(),
            })
            .then((_) => {
              setSMOpen(false);
              toast.success("Payment has been successfully completed!");

              axiosSecure(`/student/${userInfo.uid}/booked-courses`).then(
                (response) => {
                  axiosSecure
                    .put(
                      `/student/${userInfo.uid}/courses`,
                      response.data.courses
                    )
                    .then((_) =>
                      axiosSecure
                        .delete(`/student/${userInfo.uid}/booked-courses`)
                        .then((_) => {
                          paidRefetch();

                          if (location.pathname.includes("/booked-course"))
                            fetchAll.bcRefetch();
                          else if (
                            location.pathname.includes("/enrolled-course")
                          )
                            fetchAll.ecRefetch();
                          else if (
                            location.pathname.includes("/payment-history")
                          )
                            fetchAll.orRefetch();
                        })
                    );
                }
              );
            });
        }
      });
  };

  return (
    <Transition appear show={isSMOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={(_) => setSMOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex justify-center items-center min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white w-80 p-6 rounded-2xl shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-gray-900 font-semibold leading-6"
                >
                  Payment
                </Dialog.Title>
                <div className="mt-5">
                  <CardElement />
                </div>
                <div className="mt-4 space-x-3">
                  <button
                    type="button"
                    className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium space-x-1"
                    onClick={handleOrder}
                    disabled={!stripe || !elements}
                  >
                    <span>Pay</span>
                    <span>{paidBalance}$</span>
                  </button>
                  <button
                    type="button"
                    className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium"
                    onClick={(_) => setSMOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StripeModal;

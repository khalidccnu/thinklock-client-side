import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";

const ApproveCourseModal = ({
  isACMOpen,
  setACMOpen,
  refetch,
  actionCourse,
}) => {
  const axiosSecure = useAxiosSecure();

  const handleApprove = (id) => {
    setACMOpen(false);

    axiosSecure
      .put(`/admin/courses/${id}`, { status: "approved", feedback: null })
      .then((_) => {
        toast.success("Course has been successfully approved!");
        refetch();
      })
      .catch((_) => toast.error("Something went wrong!"));
  };

  return (
    <Transition appear show={isACMOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={(_) => setACMOpen(false)}
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
              <Dialog.Panel className="bg-white max-w-md p-6 rounded-2xl shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-gray-900 font-semibold leading-6"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {actionCourse.name} will be approved!
                  </p>
                </div>
                <div className="mt-4 space-x-3">
                  <button
                    type="button"
                    className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium"
                    onClick={(_) => handleApprove(actionCourse.id)}
                  >
                    Sure!
                  </button>
                  <button
                    type="button"
                    className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium"
                    onClick={(_) => setACMOpen(false)}
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

export default ApproveCourseModal;

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const FeedbackModal = ({ isFMOpen, setFMOpen, feedback }) => {
  return (
    <Transition appear show={isFMOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={(_) => setFMOpen(false)}
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
              <Dialog.Panel className="bg-white w-72 p-6 rounded-2xl shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-gray-900 font-semibold leading-6"
                >
                  Sorry!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{feedback}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-xs text-blue-900 font-medium"
                    onClick={(_) => setFMOpen(false)}
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

export default FeedbackModal;

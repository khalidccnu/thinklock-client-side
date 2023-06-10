import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";

const DenyCourseModal = ({ isDCMOpen, setDCMOpen, refetch, actionCourse }) => {
  const [nextPhase, setNextPhase] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const handleDeny = (data) => {
    setDCMOpen(false);

    axiosSecure
      .put(`/admin/courses/${actionCourse.id}`, { status: "denied", ...data })
      .then((_) => {
        toast.success("Course has been successfully denied!");
        refetch();
        reset();
      })
      .catch((_) => toast.error("Something went wrong!"));
  };

  useEffect(
    (_) => {
      !isDCMOpen ? setTimeout((_) => setNextPhase(false), 300) : null;
    },
    [isDCMOpen]
  );

  return (
    <Transition appear show={isDCMOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={(_) => setDCMOpen(false)}
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
                  {!nextPhase ? "Are you sure?" : "Why are you denied?"}
                </Dialog.Title>
                <div className="mt-2">
                  {!nextPhase ? (
                    <>
                      <p className="text-sm text-gray-500">
                        {actionCourse.name} will be denied!
                      </p>
                      <div className="mt-4 space-x-3">
                        <button
                          type="button"
                          className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium"
                          onClick={(_) => setNextPhase(true)}
                        >
                          Sure!
                        </button>
                        <button
                          type="button"
                          className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium"
                          onClick={(_) => setDCMOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <form
                      className="form-control w-80"
                      onSubmit={handleSubmit(handleDeny)}
                    >
                      <textarea
                        rows="5"
                        placeholder="Write Something..."
                        className="textarea textarea-sm textarea-bordered rounded-md focus:outline-0 resize-none"
                        {...register("feedback", { required: true })}
                      ></textarea>
                      {errors.feedback && (
                        <small className="text-red-500 mt-1">
                          Feedback is required!
                        </small>
                      )}
                      <div className="mt-4 space-x-3">
                        <button
                          type="submit"
                          className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium"
                        >
                          Deny!
                        </button>
                        <button
                          type="button"
                          className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm text-blue-900 font-medium"
                          onClick={(_) => setDCMOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DenyCourseModal;

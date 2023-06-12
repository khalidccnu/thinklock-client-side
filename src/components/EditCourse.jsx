import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IKContext, IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import useAuth from "../hooks/useAuth.js";
import useAxiosSecure from "../hooks/useAxiosSecure.js";

const EditCourse = ({ courseID, refetchCourses }) => {
  const { loading, userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [image, setImage] = useState(null);
  const { register, handleSubmit } = useForm();

  const { data: course, refetch } = useQuery({
    queryKey: [userInfo.uid, "course.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/${userInfo.uid}/courses/${courseID}`),
  });

  const ikSuccess = (response) => setImage(response);

  const onSubmit = (data) => {
    const { name, seat, price } = data;

    if (name === "" || seat === "" || price === "" || !image) {
      toast.error("All fields are required!");
      return false;
    } else if (isNaN(seat) || isNaN(price)) {
      toast.error("Field should be number!");
      return false;
    }

    const course = {
      name,
      seat: +seat,
      price: +price,
      image: image.url,
    };

    axiosSecure
      .put(`/${userInfo.uid}/courses/${courseID}`, course)
      .then((_) => {
        toast.success("Course has been successfully updated!");
        refetch();
        refetchCourses();
      })
      .catch((_) => toast.error("Something went wrong!"));
  };

  return (
    <div>
      <form
        className="form-control max-w-sm sm:w-fit mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-full rounded overflow-hidden">
            <img src={course?.data.image} alt="" />
          </div>
          <div className="col-span-full">
            <label
              className="label label-text pl-0 pt-0 pb-0.5 font-bold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue={course?.data.name}
              className="input input-sm input-bordered w-full bg-white text-gray-700 rounded focus:outline-none"
              {...register("name")}
            />
          </div>
          <div className="col-span-full sm:col-span-1">
            <label
              className="label label-text pl-0 pt-0 pb-0.5 font-bold text-gray-700"
              htmlFor="seat"
            >
              Total Seat
            </label>
            <input
              type="text"
              id="seat"
              defaultValue={course?.data.seat}
              className="input input-sm input-bordered w-full bg-white text-gray-700 rounded focus:outline-none"
              {...register("seat")}
            />
          </div>
          <div className="col-span-full sm:col-span-1">
            <label
              className="label label-text pl-0 pt-0 pb-0.5 font-bold text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              defaultValue={course?.data.price}
              className="input input-sm input-bordered w-full bg-white text-gray-700 rounded focus:outline-none"
              {...register("price")}
            />
          </div>
          <div className="col-span-full">
            <IKContext
              publicKey={import.meta.env.VITE_IK_PL_KEY}
              urlEndpoint={`https://ik.imagekit.io/${
                import.meta.env.VITE_IK_ID
              }`}
              authenticationEndpoint={`${import.meta.env.VITE_API_URL}/ik`}
            >
              <span className="label label-text pl-0 pt-0 pb-0.5 font-bold text-gray-700">
                Image
              </span>
              <IKUpload
                id="image"
                className="hidden"
                folder={"/thinklock/courses"}
                onSuccess={ikSuccess}
              />
              <div className="input input-sm input-bordered rounded bg-white text-gray-700">
                <label
                  className="flex justify-center px-3 py-2 leading-tight cursor-pointer space-x-1"
                  htmlFor="image"
                >
                  {image ? (
                    image.name.substring(0, image.name.lastIndexOf("_"))
                  ) : (
                    <>
                      <span>Change</span>
                      <FaUpload />
                    </>
                  )}
                </label>
              </div>
            </IKContext>
          </div>
          <button
            type="submit"
            className="col-span-full btn btn-sm bg-pink-600 hover:bg-transparent text-white hover:text-pink-600 !border-pink-600 rounded normal-case"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;

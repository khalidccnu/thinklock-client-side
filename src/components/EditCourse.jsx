import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
    queryFn: (_) =>
      axiosSecure(`/instructor/${userInfo.uid}/courses/${courseID}`),
  });

  const onSubmit = async (data) => {
    const { name, seat, price } = data;

    if (name === "" || seat === "" || price === "" || !image) {
      toast.error("All fields are required!");
      return false;
    } else if (isNaN(seat) || isNaN(price)) {
      toast.error("Field should be number!");
      return false;
    }

    const formData = new FormData();
    formData.append("courseImg", image);

    const courseImg = await axiosSecure.post(`/new-course/upload-ci`, formData);

    const course = {
      name,
      seat: +seat,
      price: +price,
      image: courseImg.data.url,
    };

    axiosSecure
      .put(`/instructor/${userInfo.uid}/courses/${courseID}`, course)
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
              className="label label-text pl-0 pt-0 pb-0.5 font-bold text-white"
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
              className="label label-text pl-0 pt-0 pb-0.5 font-bold text-white"
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
              className="label label-text pl-0 pt-0 pb-0.5 font-bold text-white"
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
            <div className="input input-sm input-bordered rounded bg-white text-gray-700">
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImage(e.currentTarget.files[0])}
              />
              <label
                htmlFor="image"
                className="flex justify-center px-3 py-2 leading-tight cursor-pointer space-x-1"
              >
                {image ? (
                  image.name.substring(0, image.name.lastIndexOf("."))
                ) : (
                  <>
                    <span>Change Course Photo</span>
                    <FaUpload />
                  </>
                )}
              </label>
            </div>
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

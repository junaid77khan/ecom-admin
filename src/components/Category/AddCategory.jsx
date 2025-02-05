import { useState, useEffect } from "react";
import upload_area from "../../../public/image.png";
import { Toaster, toast } from "sonner";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Spinner = () => (
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
  </div>
);

const AddCategory = () => {
  const [image, setImage] = useState(null);
  const token = JSON.parse(localStorage.getItem("Access Token"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    description: "",
    image: image,
  });

  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        let expiry = JSON.parse(localStorage.getItem("accessToken"));
        if (expiry && new Date().getTime() < expiry) {
          setUserStatus(true);
        } else {
          setUserStatus(false);
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setUserStatus(false);
        navigate("/");
      }
    };

    checkUserStatus();
  }, []);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("name", categoryDetails.name);
    formData.append("description", categoryDetails.description);
    formData.append("image", image);

    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/category/add-category`,
        {
          method: "POST",
          body: formData,
          mode: 'cors',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      let data = await response.json();

      if (data.data?.error && data.data?.error?.trim() !== "") {
        toast.error(`${data.data?.error}`);
        return;
      }

      toast.success("Category added successfully!");
        setCategoryDetails({
          name: "",
          description: "",
          image: null,
        });
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative md:ml-64 ">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded-lg bg-orange-50 py-10 ">
          <div className="mx-auto p-8  w-full bg-white px-4 lg:px-10 rounded-lg py-10 shadow-md border border-gray-200 ">
            <div className="text-start ">
              <div className="rounded-t  mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-slate-700 text-xl font-bold">
                    Add Category
                  </h6>
                </div>
              </div>
            </div>

            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Category Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={categoryDetails.name}
                        onChange={handleChange}
                        className="border-2 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-slate-300" />

                <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Description
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor=""
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        value={categoryDetails.description}
                        onChange={handleChange}
                        required
                        className="border-2 px-3  placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        rows="4"
                      ></textarea>
                    </div>
                    <div>
                      <input
                        type="file"
                        id={`file-input`}
                        hidden
                        onChange={(e) => handleImage(e)}
                      />
                      <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        className="h-36 w-36 rounded-lg my-3"
                        alt=""
                      />
                      <label
                        htmlFor={`file-input`}
                        className="cursor-pointer  bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      >
                        Image
                      </label>
                    </div>
                  </div>
                </div>
        
          </form>
        </div>
        <div className="mt-2 py-10  border-t w-full flex flex-wrap justify-center items-center border-blueGray-200 text-center">
                <button
                  type="submit"
                  className="mt-5 font-semibold bg-orange-500 px-4 text-gray-100 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none relative"
                  disabled={loading} 
                  onClick={handleSubmit}
                >
                  {loading && <Spinner />}
                  <span className={` ${loading ? 'invisible' : 'visible'}`}>Add Category</span>
                </button>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddCategory;

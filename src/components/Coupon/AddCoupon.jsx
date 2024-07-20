import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Spinner = () => (
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
  </div>
);

const AddCoupon = () => {
  const [loading, setLoading] = useState(false);
  const[couponIdError, setCouponIdError] = useState("EMPTY");
  const[discountValueError, setDiscountValueError] = useState("EMPTY");
  const navigate = useNavigate();
  const [couponsDetails, setCouponsDetails] = useState({
    couponId: "",
    discountValue: 0,
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
                  navigate("/")
              }
          } catch (error) {
              console.error('Error checking user status:', error);
              setUserStatus(false);
              navigate("/")
          }
      };

      checkUserStatus();
  }, []);

  const handleChange = (e) => {
    setCouponsDetails({
      ...couponsDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const couponId = couponsDetails.couponId
    const discountValue = couponsDetails.discountValue

    try {
        setCouponIdError("EMPTY")
        setDiscountValueError("EMPTY")
      let response = await fetch(
        `http://localhost:8000/api/v1/coupon/add-coupon/${couponId}/${discountValue}`,
        {
          method: "GET",
        }
      );

      let data = await response.json();

      if (data.success) {
        toast.success("Coupon added successfully!")
        setCouponsDetails({
            couponId: "",
            discountValue: 0
        })
      } else {
        if(data.data.couponIdError) {
            setCouponIdError(data.data.couponIdError)
        }
        if(data.data.discountValueError) {
            setDiscountValueError(data.data.discountValueError)
        }
        toast.error("Failed to add coupon. Please try again.");
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
        
      setLoading(false);
    }
  };

  return (
    <div className="relative md:ml-64 ">
      <div className="px-4 md:px-10 mx-auto w-full">
     <div className="w-full px-4 mt-4 ">
      <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded-lg bg-orange-50 border-0">
        <div className="rounded-t mt-6 bg-orange-50 mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Add Coupon
            </h6>
  
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Coupon Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Coupon Id
                  </label>
                  <input
                    type="text"
                    name="couponId"
                    value={couponsDetails.couponId}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                  <h1 className={`text-red-500 text-xs ${couponIdError !== 'EMPTY' ? 'visible' : 'invisible'} `}>{couponIdError}</h1>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Discount Value
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor=""
                  >
                    Discount Value
                  </label>
                  <input
                      type="text"
                      name="discountValue"
                      value={couponsDetails.discountValue}
                      onChange={handleChange}
                      required
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <h1 className={`text-red-500 text-xs ${discountValueError !== 'EMPTY' ? 'visible' : 'invisible'} `}>{discountValueError}</h1>
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
                  <span className={` ${loading ? 'invisible' : 'visible'}`}>Add Coupon</span>
                </button>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default AddCoupon;

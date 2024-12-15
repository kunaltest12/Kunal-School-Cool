// import React from "react";

// const License = () => {
//   return (
//     <div className="text-left flex items-center justify-center p-12">
//       <div className="mx-auto w-full">
//         <div className="bg-white overflow-hidden shadow rounded-lg border">
//           <div className="px-4 py-5 sm:px-6">
//             <div>
//               <label
//                 for="first_name"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Content of License and Accreditation
//               </label>
//               <textarea
//                 id="message"
//                 rows="4"
//                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Write your text here..."
//               ></textarea>
//             </div>
//           </div>
//         </div>
//         <button
//           type="button"
//           className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//         >
//           Update
//         </button>
//       </div>
//     </div>
//   );
// };

// export default License;

import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../../ctx/UserContextProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_APIURL;

const License = () => {
  const { showAboutus, setShowAboutus, getAboutus } = useContext(UserContext);
  useEffect(() => {
    getAboutus();
  }, []);
  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedLicense = [...showAboutus];
    updatedLicense[index] = { ...updatedLicense[index], license: value };
    setShowAboutus(updatedLicense);
  };
  const handleSubmit = async (aboutusId, license) => {
    const emptyFields = showAboutus.filter(
      (aboutus) => aboutus.license.trim() === ""
    );
    if (emptyFields.length > 0) {
      toast.error("Cannot empty this field to update.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      try {
        const updatedLicenseData = {
          license: license,
          updateDate: new Date(),
        };

        const response = await axios.put(
          `${apiUrl}api/aboutus/updateAboutus/${aboutusId}`,
          updatedLicenseData
        );

        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        getAboutus();
      } catch (error) {
        toast.error("Cannot update. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
      }
    }
  };
  return (
    <div className="text-left flex items-center justify-center p-12">
      {showAboutus.map((aboutus, index) => (
        <div className="mx-auto w-full" key={aboutus._id}>
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Content of License and Accreditation{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  rows="12"
                  key={aboutus._id}
                  value={aboutus.license}
                  onChange={(e) => handleChange(e, index)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your text here..."
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => handleSubmit(aboutus._id, aboutus.license)}
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default License;

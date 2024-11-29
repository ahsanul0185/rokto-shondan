import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import RegistrationSuccessModal from "./RegistrationSuccessModal";
import { DonorContext } from "../contexts/DonorContext";

const Register = () => {
  const navigate = useNavigate();

  const { backendURL } = useContext(DonorContext);

  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordMatched, setPasswordMatched] = useState(true);
  const [passMatchError, setPassMatchError] = useState("");
  const [registerError, setRegisterError] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: { firstName: "", lastName: "" },
    phone: "",
    email: "",
    donorType: "blood",
    bloodGroup: "",
    lastDonated: { dayLastD: "", monthLastD: "", yearLastD: "" },
    district: "",
    upazilla: "",
    address: "",
    gender: "male",
    birthDate: { birthDay: "", birthMonth: "", birthYear: "" },
    password: "",
    confirmPassword: "",
  });

  const onChangeInputField = (e) => {
    const fieldName = e.target.name;

    setRegisterError({});

    if (fieldName === "firstName") {
      setFormData((prev) => ({
        ...prev,
        ["fullName"]: { ...formData.fullName, ["firstName"]: e.target.value },
      }));
    } else if (fieldName === "lastName") {
      setFormData((prev) => ({
        ...prev,
        ["fullName"]: { ...formData.fullName, ["lastName"]: e.target.value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
    }
  };

  // Fetching all the districts
  const getAllDistricts = async () => {
    const data = await axios.get("https://bdapis.com/api/v1.2/districts");
    setDistricts(data.data.data);
  };

  const handleSelectDistrict = async (e) => {
    const selectedDistrict = e.target.value;
    const upazillaData = await axios.get(
      `https://bdapis.com/api/v1.2/district/${selectedDistrict}`
    );
    setFormData((prev) => ({ ...prev, ["district"]: e.target.value }));
    setUpazillas(upazillaData.data.data[0].upazillas);
  };

  const handleConfirmPassMatch = (e, fieldName) => {
    if (formData.password === "") {
      setPassMatchError("");
    }
    if (
      e.target.value === formData.password ||
      e.target.value === formData.confirmPassword
    ) {
      setPasswordMatched(true);
      setPassMatchError("");
    } else {
      setPasswordMatched(false);

      if (fieldName === "passfield") {
        if (!formData.confirmPassword) {
          setPassMatchError("");
        } else {
          setPassMatchError("Password didn't match.");
        }
      } else {
        setPassMatchError("Password didn't match.");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      ["lastDonated"]: `${
        formData.lastDonated.dayLastD
      } ${formData.lastDonated.monthLastD.slice(0, 3)}, ${
        formData.lastDonated.yearLastD
      }`,
      ["birthDate"]: `${
        formData.birthDate.birthDay
      } ${formData.birthDate.birthMonth.slice(0, 3)}, ${
        formData.birthDate.birthYear
      }`,
      ["fullName"]:
        formData.fullName.firstName + " " + formData.fullName.lastName,
      ["phone"]: "+88" + formData.phone,
    };

    if (passwordMatched) {
      try {
        await axios.post(
          backendURL+"/api/donors/register",
          finalFormData
        );
        setShowSuccessModal(true);
      } catch (error) {
        const errMsg = error.response.data.message;

        console.log(error.response);

        if (errMsg.split(" ").includes("password")) {
          setRegisterError((prev) => ({
            ["password"]: error.response.data.message,
          }));
        }
        if (errMsg.split(" ").includes("phone")) {
          setRegisterError((prev) => ({
            ["phone"]: error.response.data.message,
          }));
        }
        if (errMsg.split(" ").includes("email")) {
          setRegisterError((prev) => ({
            ["email"]: error.response.data.message,
          }));
        }
        if (errMsg.split(" ").includes("user")) {
          setRegisterError((prev) => ({
            ["name"]: error.response.data.message,
          }));
        }
      }
    }

    passwordMatched && console.log("Submitted Data : ", finalFormData);
  };

  useEffect(() => {
    getAllDistricts();
  }, []);

  return (
    <>
      <div className="section-padding mt-32 lg:w-3/4">
        <div className="bg-gradient-to-r from-primary to-[#b32446] py-7 px-6">
          <h1 className="text-2xl text-white font-bold">Register As Donor</h1>
        </div>

        <form className="my-10 pl-1" onSubmit={handleFormSubmit}>
          {/* Full Name */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <label
              htmlFor="FullName"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Full Name <span>:</span>
            </label>
            <div
              id="FullName"
              className="flex gap-4 flex-grow w-full md:w-auto"
            >
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={onChangeInputField}
                value={formData.fullName.firstName}
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary w-full"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={onChangeInputField}
                value={formData.fullName.lastName}
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary w-full"
                required
              />
            </div>
          </div>

          {/* Phone  */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="Phone"
              className="w-32 md:w-48 font-medium flex justify-between"
            >
              Phone Number <span>:</span>{" "}
            </label>
            <div className="w-full md:w-auto md:flex-grow">
              <input
                type="number"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={onChangeInputField}
                className="p-3 border-2 border-gray-300 w-full rounded-md focus:outline-none focus:border-primary"
                required
              />
              {registerError.phone && (
                <span className="text-red-600 block">
                  {registerError.phone}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="Email"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Email <span>:</span>{" "}
            </label>
            <div className="flex-grow w-full md:w-auto">
              <input
                type="email"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={onChangeInputField}
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary w-full"
                required
              />
              {registerError.email && (
                <span className="text-red-600 block">
                  {registerError.email}
                </span>
              )}
            </div>
          </div>

          {/* Donor Type */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="donorType"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Donor Type <span>:</span>{" "}
            </label>
            <select
              name="donorType"
              onChange={onChangeInputField}
              value={formData.donorType}
              className="p-3 w-full md:w-auto border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
              required
            >
              <option value="blood">Blood</option>
              <option value="platelet">Platelet</option>
            </select>
          </div>

          {/* Blood Group */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="bloodGroup"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Blood Group <span>:</span>{" "}
            </label>
            <select
              name="bloodGroup"
              onChange={onChangeInputField}
              value={formData.bloodGroup}
              className="p-3 w-full md:w-auto border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
              required
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Last Donated */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="lastDonated"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Last Donated <span>:</span>{" "}
            </label>

            <div className="flex-grow flex gap-2 w-full md:w-auto">
              {/* Day */}
              <select
                name="day"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ["lastDonated"]: {
                      ...formData.lastDonated,
                      ["dayLastD"]: e.target.value,
                    },
                  }))
                }
                defaultValue=""
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
                required
              >
                <option value="" disabled>
                  Day
                </option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Month */}
              <select
                name="month"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ["lastDonated"]: {
                      ...formData.lastDonated,
                      ["monthLastD"]: e.target.value,
                    },
                  }))
                }
                defaultValue=""
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
                required
              >
                <option value="" disabled>
                  Month
                </option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index + 1} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              {/* Year */}
              <select
                name="year"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ["lastDonated"]: {
                      ...formData.lastDonated,
                      ["yearLastD"]: e.target.value,
                    },
                  }))
                }
                defaultValue=""
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
                required
              >
                <option value="" disabled>
                  Year
                </option>
                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* District */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="Email"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              District <span>:</span>{" "}
            </label>

            <select
              name="district"
              className="p-3 border-2 w-full md:w-auto border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
              onChange={handleSelectDistrict}
              // value={formData.district}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select District
              </option>
              {districts.map((district, idx) => (
                <option key={district.district} value={district.district}>
                  {district.district}
                </option>
              ))}
            </select>
          </div>

          {/* Upazilla */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="Email"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Upazilla <span>:</span>{" "}
            </label>

            <select
              name="upazilla"
              className="p-3 w-full md:w-auto border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
              disabled={formData.district ? false : true}
              onChange={onChangeInputField}
              // value={formData.upazilla}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Upazilla
              </option>
              {upazillas.map((upazilla, idx) => (
                <option key={upazilla} value={upazilla}>
                  {upazilla}
                </option>
              ))}
            </select>
          </div>

          {/* Address  */}
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="address"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Address <span>:</span>{" "}
            </label>
            <textarea
              className="p-3 w-full md:w-auto border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
              name="address"
              onChange={onChangeInputField}
            ></textarea>
          </div>

          {/* Gender  */}
          <div className="flex flex-row items-start md:items-start justify-start my-6 gap-2 md:gap-4">
            <label
              htmlFor="address"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Gender <span>:</span>{" "}
            </label>

            <div className="flex gap-5 flex-row">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  defaultChecked
                  onChange={onChangeInputField}
                  className="w-4 h-4 text-primary outline-none"
                  required
                />
                <span className="text-gray-700">Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={onChangeInputField}
                  className="w-4 h-4 text-primary outline-none"
                  required
                />
                <span className="text-gray-700">Female</span>
              </label>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="birthDate"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Date of Birth <span>:</span>{" "}
            </label>

            <div className="flex-grow flex gap-2 w-full md:w-auto">
              {/* Day */}
              <select
                name="birthday"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ["birthDate"]: {
                      ...formData.birthDate,
                      ["birthDay"]: e.target.value,
                    },
                  }))
                }
                defaultValue=""
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
                required
              >
                <option value="" disabled>
                  Day
                </option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Month */}
              <select
                name="month"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ["birthDate"]: {
                      ...formData.birthDate,
                      ["birthMonth"]: e.target.value,
                    },
                  }))
                }
                defaultValue=""
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
                required
              >
                <option value="" disabled>
                  Month
                </option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index + 1} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              {/* Year */}
              <select
                name="year"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ["birthDate"]: {
                      ...formData.birthDate,
                      ["birthYear"]: e.target.value,
                    },
                  }))
                }
                defaultValue=""
                className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
                required
              >
                <option value="" disabled>
                  Year
                </option>
                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Passoword */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="password"
              className="w-28 md:w-48 font-medium flex justify-between"
            >
              Password <span>:</span>{" "}
            </label>
            <div className="relative flex-grow w-full md:w-auto">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter a password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  onChangeInputField(e);
                  handleConfirmPassMatch(e, "passfield");
                }}
                className="p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary"
                required
              />
              <div
                className="absolute right-5 text-gray-500 top-1/2 -translate-y-1/2 select-none cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
              </div>
            </div>
          </div>

          {/* Confirm Passoword */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-6 gap-2 md:gap-4">
            <label
              htmlFor="password"
              className="w-36 md:w-48 font-medium flex justify-between"
            >
              Confirm Password <span>:</span>{" "}
            </label>
            <div className="relative flex-grow w-full md:w-auto">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter a password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => {
                  onChangeInputField(e);
                  handleConfirmPassMatch(e);
                }}
                className="p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary"
                required
              />

              <div
                className="absolute right-5 text-gray-500 top-1/2 -translate-y-1/2 select-none cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
              </div>
              {passMatchError && (
                <span className="text-red-600 absolute left-0 -bottom-7">
                  {passMatchError}
                </span>
              )}
              {registerError.password && (
                <span className="text-red-600 left-0 -bottom-20 absolute">
                  {registerError.password}
                </span>
              )}
            </div>
          </div>

          <div className="text-right  md:py-10 pb-20">
            <button
              type="submit"
              className="px-4 py-2 w-full sm:w-auto bg-gradient-to-r from-primary to-[#b32446] rounded-md text-white font-semibold"
            >
              Register
            </button>
            <p className="mt-6 text-start">
              Already have an account?{" "}
              <a href="/login" className="underline text-primary">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Registraion successfull modal */}
      {showSuccessModal && (
        <RegistrationSuccessModal setShowSuccessModal={setShowSuccessModal} />
      )}
    </>
  );
};

export default Register;

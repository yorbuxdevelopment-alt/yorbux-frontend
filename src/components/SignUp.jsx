import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slice/authActions'; // Updated path
import {
  User, Phone, Lock, EyeOff, Eye
} from 'lucide-react';

const schema = yup.object().shape({
  prefix: yup.string().required('Prefix is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  mobile: yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits').required('Mobile number is required'),
  password: yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth); // Redux state se loading aur error
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      prefix: 'Prefer not to say'
    }
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // API call for registration
    try {
      await dispatch(registerUser({
        name: `${data.firstName} ${data.lastName}`, // Combine first and last name for API
        email: data.email,
        phone: data.mobile, // Map mobile to phone
        password: data.password,
      })).unwrap();
      navigate('/signin'); // Successful registration ke baad sign-in page par redirect karein
    } catch (err) {
      console.error("Registration Error:", err);
      // Redux error state automatically update ho jayega authSlice mein
    }
  };

  const handleNext = async () => {
    const isStep1Valid = await trigger(['prefix', 'firstName', 'lastName', 'email', 'mobile']);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6f9] flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-[700px] rounded-lg shadow-lg border border-gray-200 p-8 md:p-12">
        
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-4">
             <img src="/logo/yor-bux-primary-logo.png" alt="Yorbux" className="h-20 mx-auto" />
          </div>
          <h1 className="text-[#1a1a1a] text-2xl font-bold mb-1">Join YorBux</h1>
          <p className="text-gray-500 text-sm">Make the most of your professional life</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              {/* Step 1 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-8">
                {/* Prefix */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Prefix <span className="text-red-500">*</span></label>
                  <select {...register('prefix')} className={`w-full border ${errors.prefix ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 text-sm bg-[#fafafa] focus:ring-1 focus:ring-blue-500 outline-none`}>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                  {errors.prefix && <p className="text-red-500 text-xs mt-1">{errors.prefix.message}</p>}
                </div>

                {/* First Name */}
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">First name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" {...register('firstName')} className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                {/* Last name */}
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Last name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" {...register('lastName')} className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>

                {/* Email */}
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                    <input type="email" {...register('email')} className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Mobile */}
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Mobile (10 Digits) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="tel" {...register('mobile')} className={`w-full border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                </div>
              </div>

              {/* Step 1 Buttons */}
              <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => navigate('/signin')} className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-md font-bold text-sm tracking-wider uppercase transition-colors shadow-sm">
                  Back
                </button>
                <button type="button" onClick={handleNext} className="w-full bg-[#2d6fb4] hover:bg-[#245a92] text-white py-3 rounded-md font-bold text-sm tracking-wider uppercase transition-colors shadow-md shadow-blue-500/20">
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Step 2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mb-8">
                {/* Password */}
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Password (6 or more) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type={showPassword ? "text" : "password"} {...register('password')} className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 pr-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
                    {showPassword ? (
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} onClick={() => setShowPassword(true)} />
                    )}
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type={showConfirmPassword ? "text" : "password"} {...register('confirmPassword')} className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 pr-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
                    {showConfirmPassword ? (
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                      <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} onClick={() => setShowConfirmPassword(true)} />
                    )}
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Terms */}
                <div className="col-span-1 md:col-span-2">
                  <div className={`flex items-start gap-2 ${errors.terms ? 'mb-1' : ''}`}>
                    <input type="checkbox" {...register('terms')} className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <p className="text-[13px] text-gray-600">
                      You agree to the YorBux <span className="text-[#2d6fb4] cursor-pointer font-medium hover:underline">User Agreement</span>, <span className="text-[#2d6fb4] cursor-pointer font-medium hover:underline">Privacy Policy</span>, and <span className="text-[#2d6fb4] cursor-pointer font-medium hover:underline">Cookie Policy</span>.
                    </p>
                  </div>
                  {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}
                </div>
              </div>

              {/* Step 2 Buttons */}
              <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => setStep(1)} className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-md font-bold text-sm tracking-wider uppercase transition-colors shadow-sm">
                  Previous
                </button>
                <button type="submit" disabled={loading} className="w-full bg-[#2d6fb4] hover:bg-[#245a92] text-white py-3 rounded-md font-bold text-sm tracking-wider uppercase transition-colors shadow-md shadow-blue-500/20 disabled:opacity-70">
                  Sign Up
                </button>
              </div>
            </>
          )}
        </form>

        {/* Footer Links */}
        <div className="text-right space-y-2">
          <p className="text-[13px] text-gray-600">Already on YorBux? <Link to="/signin" className="text-[#2d6fb4] font-bold cursor-pointer hover:underline">Sign in</Link></p>
          <p className="text-[13px] text-gray-600 font-medium">Click here to learn more about <span className="text-[#2d6fb4] font-bold cursor-pointer hover:underline">YorBux</span></p>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
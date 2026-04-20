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
    resolver: yupResolver(schema)
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
    const isStep1Valid = await trigger(['firstName', 'lastName', 'email', 'mobile']);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center font-sans">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-6 md:py-8">
        <div className="bg-bg-surface w-full max-w-[700px] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-sm border border-border-ui/50">
          
          {/* Logo & Header */}
          <div className="text-center mb-5 md:mb-6">
            <div className="flex justify-center items-center gap-2 mb-3 md:mb-4">
               <img src="/logo/yor-bux-primary-logo.png" alt="Yorbux" className="h-12 md:h-14 mx-auto" />
            </div>
            <h1 className="text-text-main text-2xl md:text-[32px] font-bold mb-1 md:mb-2">Join YorBux</h1>
            <p className="text-text-sec text-sm md:text-[16px]">Make the most of your professional life</p>
          </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              {/* Step 1 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-4 mb-5 md:mb-6">
                {/* First Name */}
                <div className="col-span-1">
                    <label className="block text-[13px] font-bold text-text-main mb-1">First name <span className="text-red-500">*</span></label>
                  <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                      <input type="text" {...register('firstName')} className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-border-ui'} rounded-xl p-2.5 pl-10 bg-bg-surface text-text-main text-sm focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue outline-none transition-all`} />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                {/* Last name */}
                <div className="col-span-1">
                    <label className="block text-[13px] font-bold text-text-main mb-1">Last name <span className="text-red-500">*</span></label>
                  <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                      <input type="text" {...register('lastName')} className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-border-ui'} rounded-xl p-2.5 pl-10 bg-bg-surface text-text-main text-sm focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue outline-none transition-all`} />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>

                {/* Email */}
                <div className="col-span-1">
                    <label className="block text-[13px] font-bold text-text-main mb-1">Email <span className="text-red-500">*</span></label>
                  <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec font-bold">@</span>
                      <input type="email" {...register('email')} className={`w-full border ${errors.email ? 'border-red-500' : 'border-border-ui'} rounded-xl p-2.5 pl-10 bg-bg-surface text-text-main text-sm focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue outline-none transition-all`} />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Mobile */}
                <div className="col-span-1">
                    <label className="block text-[13px] font-bold text-text-main mb-1">Mobile (10 Digits) <span className="text-red-500">*</span></label>
                  <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                      <input type="tel" {...register('mobile')} className={`w-full border ${errors.mobile ? 'border-red-500' : 'border-border-ui'} rounded-xl p-2.5 pl-10 bg-bg-surface text-text-main text-sm focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue outline-none transition-all`} />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                </div>
              </div>

              {/* Step 1 Buttons */}
                <div className="flex gap-4 mb-5 md:mb-6">
                  <button type="button" onClick={() => navigate('/signin')} className="w-full bg-bg-surface border border-border-ui hover:bg-bg-page text-text-main py-2.5 md:py-3 rounded-2xl font-bold text-[15px] md:text-[16px] transition-all">
                  Back
                </button>
                  <button type="button" onClick={handleNext} className="w-full bg-action-blue hover:opacity-90 text-white py-2.5 md:py-3 rounded-2xl font-bold text-[15px] md:text-[16px] shadow-lg shadow-action-blue/20 transition-all">
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Step 2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-4 mb-5 md:mb-6">
                {/* Password */}
                <div className="col-span-1">
                    <label className="block text-[13px] font-bold text-text-main mb-1">Password (6 or more) <span className="text-red-500">*</span></label>
                  <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                      <input type={showPassword ? "text" : "password"} {...register('password')} className={`w-full border ${errors.password ? 'border-red-500' : 'border-border-ui'} rounded-xl p-2.5 pl-10 pr-10 bg-bg-surface text-text-main text-sm focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue outline-none transition-all`} />
                    {showPassword ? (
                        <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer hover:text-text-main" size={18} onClick={() => setShowPassword(false)} />
                    ) : (
                        <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer hover:text-text-main" size={18} onClick={() => setShowPassword(true)} />
                    )}
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="col-span-1">
                    <label className="block text-[13px] font-bold text-text-main mb-1">Confirm Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" size={18} />
                      <input type={showConfirmPassword ? "text" : "password"} {...register('confirmPassword')} className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-border-ui'} rounded-xl p-2.5 pl-10 pr-10 bg-bg-surface text-text-main text-sm focus:ring-2 focus:ring-action-blue/20 focus:border-action-blue outline-none transition-all`} />
                    {showConfirmPassword ? (
                        <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer hover:text-text-main" size={18} onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                        <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec cursor-pointer hover:text-text-main" size={18} onClick={() => setShowConfirmPassword(true)} />
                    )}
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Terms */}
                <div className="col-span-1 md:col-span-2">
                    <div className={`flex items-start gap-2 md:gap-3 ${errors.terms ? 'mb-1' : ''}`}>
                      <input type="checkbox" {...register('terms')} className="mt-1 w-4 h-4 rounded border-border-ui text-action-blue focus:ring-action-blue shrink-0" />
                      <p className="text-[12px] md:text-[13px] text-text-sec leading-tight">
                        You agree to the YorBux <span className="text-action-blue cursor-pointer font-bold hover:underline">User Agreement</span>, <span className="text-action-blue cursor-pointer font-bold hover:underline">Privacy Policy</span>, and <span className="text-action-blue cursor-pointer font-bold hover:underline">Cookie Policy</span>.
                    </p>
                  </div>
                  {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}
                </div>
              </div>

              {/* Step 2 Buttons */}
                <div className="flex gap-4 mb-5 md:mb-6">
                  <button type="button" onClick={() => setStep(1)} className="w-full bg-bg-surface border border-border-ui hover:bg-bg-page text-text-main py-2.5 md:py-3 rounded-2xl font-bold text-[15px] md:text-[16px] transition-all">
                  Previous
                </button>
                  <button type="submit" disabled={loading} className="w-full bg-action-blue hover:opacity-90 text-white py-2.5 md:py-3 rounded-2xl font-bold text-[15px] md:text-[16px] shadow-lg shadow-action-blue/20 transition-all disabled:opacity-70">
                  Sign Up
                </button>
              </div>
            </>
          )}
        </form>

        {/* Footer Links */}
          <div className="text-center md:text-right space-y-1.5 md:space-y-2 mt-2 md:mt-0">
          <p className="text-[13px] text-text-sec">Already on YorBux? <Link to="/signin" className="text-action-blue font-bold cursor-pointer hover:underline">Sign in</Link></p>
          <p className="text-[13px] text-text-sec font-medium">Click here to learn more about <span className="text-action-blue font-bold cursor-pointer hover:underline">YorBux</span></p>
        </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
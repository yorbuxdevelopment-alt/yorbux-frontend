import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  User, Phone, Lock, EyeOff, Code, Map, MapPin, Check 
} from 'lucide-react';

const schema = yup.object().shape({
  prefix: yup.string().required('Prefix is required'),
  firstName: yup.string().required('First name is required'),
  middleName: yup.string(),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  mobile: yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits').required('Mobile number is required'),
  password: yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  referralCode: yup.string().required('Referral Code is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  location: yup.string().required('Location is required'),
  joiningFor: yup.string().notOneOf(['Select Joining For'], 'Please select a reason').required('Please select a reason'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      prefix: 'Prefer not to say',
      joiningFor: 'Select Joining For'
    }
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // API call for registration goes here
  };

  return (
    <div className="min-h-screen bg-[#f3f6f9] flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-[950px] rounded-lg shadow-lg border border-gray-200 p-8 md:p-12">
        
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-4">
             <img src="/logo/yor-bux-primary-logo.png" alt="Yorbux" className="h-20 mx-auto" />
          </div>
          <h1 className="text-[#1a1a1a] text-2xl font-bold mb-1">Join YorBux</h1>
          <p className="text-gray-500 text-sm">Make the most of your professional life</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-6 mb-8">
          
            {/* Prefix */}
            <div className="col-span-1">
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

            {/* Middle Name */}
            <div className="col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">Middle name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" {...register('middleName')} className="w-full border border-gray-300 rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
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
            <div className="col-span-1 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                <input type="email" {...register('email')} className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Mobile */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">Mobile (10 Digits) <span className="text-red-500">*</span></label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="tel" {...register('mobile')} className={`w-full border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
              </div>
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
            </div>

            {/* Password */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">Password (6 or more) <span className="text-red-500">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" size={18} {...register('password')} className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
                <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" size={18} {...register('confirmPassword')} className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
                <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Referral Code */}
            <div className="col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">Referral Code <span className="text-red-500">*</span></label>
              <div className="relative">
                <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" {...register('referralCode')} className={`w-full border ${errors.referralCode ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] text-sm focus:ring-1 focus:ring-blue-500 outline-none`} />
              </div>
              {errors.referralCode && <p className="text-red-500 text-xs mt-1">{errors.referralCode.message}</p>}
            </div>

            {/* Country */}
            <div className="col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">Country <span className="text-red-500">*</span></label>
              <div className="relative">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select {...register('country')} className={`w-full border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] appearance-none text-sm focus:ring-1 focus:ring-blue-500 outline-none`}>
                  <option value=""></option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="India">India</option>
                </select>
              </div>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
            </div>

            {/* State */}
            <div className="col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select {...register('state')} className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] appearance-none text-sm focus:ring-1 focus:ring-blue-500 outline-none`}>
                  <option value=""></option>
                  <option value="California">California</option>
                  <option value="London">London</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>

            {/* Location */}
            <div className="col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select {...register('location')} className={`w-full border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] appearance-none text-sm focus:ring-1 focus:ring-blue-500 outline-none`}>
                  <option value=""></option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Central">Central</option>
                  <option value="New Delhi">New Delhi</option>
                </select>
              </div>
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>
          </div>

          {/* Joining For */}
          <div className="mb-6 max-w-[300px]">
            <label className="block text-[13px] font-bold text-gray-700 mb-1">Joining YorBux For <span className="text-red-500">*</span></label>
            <div className="relative">
              <Check className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select {...register('joiningFor')} className={`w-full border ${errors.joiningFor ? 'border-red-500' : 'border-gray-300'} rounded-md p-2.5 pl-10 bg-[#fafafa] appearance-none text-sm focus:ring-1 focus:ring-blue-500 outline-none`}>
                <option value="Select Joining For">Select Joining For</option>
                <option value="Networking">Networking</option>
                <option value="Job Search">Job Search</option>
              </select>
            </div>
            {errors.joiningFor && <p className="text-red-500 text-xs mt-1">{errors.joiningFor.message}</p>}
          </div>

          {/* Terms */}
          <div className={`flex items-start gap-2 ${errors.terms ? 'mb-1' : 'mb-8'}`}>
            <input type="checkbox" {...register('terms')} className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <p className="text-[13px] text-gray-600">
              You agree to the YorBux <span className="text-[#2d6fb4] cursor-pointer font-medium hover:underline">User Agreement</span>, <span className="text-[#2d6fb4] cursor-pointer font-medium hover:underline">Privacy Policy</span>, and <span className="text-[#2d6fb4] cursor-pointer font-medium hover:underline">Cookie Policy</span>.
            </p>
          </div>
          {errors.terms && <p className="text-red-500 text-xs mb-6">{errors.terms.message}</p>}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-[#2d6fb4] hover:bg-[#245a92] text-white py-3 rounded-md font-bold text-sm tracking-wider uppercase transition-colors mb-6 shadow-md shadow-blue-500/20">
            AGREE & JOIN
          </button>
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
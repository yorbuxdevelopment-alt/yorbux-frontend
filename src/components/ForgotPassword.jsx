import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
      
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
        <button style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem', fontSize: '0.875rem', color: '#6B7280', border: '1px solid #E5E7EB', borderRadius: '0.5rem', padding: '0.375rem 0.75rem', backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
          <span>English (UK)</span>
          <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
        </button>
      </div>

      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
        <div style={{ width: '2rem', height: '2rem', backgroundColor: '#2563EB', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="fa-solid fa-check" style={{ color: 'white', fontSize: '0.75rem' }}></i>
        </div>
        <span style={{ fontWeight: 'bold', color: '#1F2937', fontSize: '1.125rem' }}>Meetmax</span>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
        <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', width: '100%', maxWidth: '32rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1E293B', marginBottom: '0.5rem' }}>Forgot Password?</h1>
            <p style={{ color: '#6B7280' }}>Enter your details to receive a reset link</p>
          </div>

          <form action="#" style={{ display: 'flex', flexDirection: 'column', rowGap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', top: '0', bottom: '0', left: '0', paddingLeft: '1rem', display: 'flex', alignItems: 'center', color: '#9CA3AF' }}>
                <i className="fa-solid fa-at"></i>
              </span>
              <input type="email" style={{ color: '#1F2937', backgroundColor: '#F9FAFB', width: '100%', paddingLeft: '2.75rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem', outline: 'none', transition: 'all 150ms' }} placeholder="Your Email" />
            </div>

            <button type="submit" style={{ width: '100%', backgroundColor: '#2563EB', color: 'white', fontWeight: '600', padding: '1rem 0', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', transition: 'all 150ms' }}>
              Send
            </button>
          </form>
        </div>

        <Link to="/" style={{ marginTop: '2rem', color: '#2563EB', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fa-solid fa-arrow-left-long"></i>
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

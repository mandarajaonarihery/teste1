"use client"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
const PayrollAdminLogin = () => {
  const [formData, setFormData] = useState({
    username: 'jaoninasissiethephanie@gmail.com',
    password: '123456*'
  });
    const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est obligatoire";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    return newErrors;
  };

  const handleDemoFill = () => {
    setFormData({
      username: 'jaoninasissiethephanie@gmail.com',
      password: '123456*'
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    //   alert('Connexion réussie ! (simulation)');
      console.log('Connexion tentée avec:', formData);

      // ✅ Redirection vers /admin après connexion
      navigate("/admin/dashboard");
    }, 2000);
  };

  // Simple SVG icons as components
  const UserIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  );

  const AnimatedSVG = () => (
    <div className="relative">
      <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
        {/* Background circle */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="url(#gradient1)"
          className="animate-pulse"
        />
        
        {/* Floating elements */}
        <g className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <circle cx="80" cy="100" r="8" fill="#3B82F6" opacity="0.7" />
        </g>
        <g className="animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <circle cx="220" cy="120" r="6" fill="#1E40AF" opacity="0.8" />
        </g>
        <g className="animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
          <circle cx="100" cy="220" r="5" fill="#60A5FA" opacity="0.6" />
        </g>
        
        {/* Central icon - Calculator/Payroll */}
        <g transform="translate(125, 125)">
          <rect
            x="0"
            y="0"
            width="50"
            height="50"
            rx="8"
            fill="white"
            stroke="#3B82F6"
            strokeWidth="2"
            className="animate-pulse"
          />
          
          {/* Calculator buttons */}
          <circle cx="12.5" cy="12.5" r="2" fill="#3B82F6" />
          <circle cx="25" cy="12.5" r="2" fill="#3B82F6" />
          <circle cx="37.5" cy="12.5" r="2" fill="#3B82F6" />
          
          <circle cx="12.5" cy="25" r="2" fill="#1E40AF" />
          <circle cx="25" cy="25" r="2" fill="#1E40AF" />
          <circle cx="37.5" cy="25" r="2" fill="#1E40AF" />
          
          <circle cx="12.5" cy="37.5" r="2" fill="#60A5FA" />
          <circle cx="25" cy="37.5" r="2" fill="#60A5FA" />
          <circle cx="37.5" cy="37.5" r="2" fill="#60A5FA" />
        </g>
        
        {/* Rotating rings */}
        <circle
          cx="150"
          cy="150"
          r="120"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="10 10"
          opacity="0.3"
          className="animate-spin"
          style={{ animationDuration: '20s' }}
        />
        
        <circle
          cx="150"
          cy="150"
          r="100"
          fill="none"
          stroke="#1E40AF"
          strokeWidth="1"
          strokeDasharray="5 5"
          opacity="0.4"
          className="animate-spin"
          style={{ animationDuration: '15s', animationDirection: 'reverse' }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Floating money symbols */}
      <div className="absolute top-8 left-8 text-blue-500 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
        €
      </div>
      <div className="absolute top-12 right-12 text-blue-600 text-xl animate-bounce" style={{ animationDelay: '1.5s' }}>
        %
      </div>
      <div className="absolute bottom-16 left-16 text-blue-400 text-lg animate-bounce" style={{ animationDelay: '2.5s' }}>
        $
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex">
      {/* Left side - SVG Animation */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="text-center">
          <AnimatedSVG />
          <h2 className="mt-8 text-2xl font-bold text-blue-900">
            Gestion de Paie
          </h2>
          <p className="mt-2 text-blue-700">
            Solution professionnelle complète
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <UserIcon />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Connexion Administrateur
              </h1>
              <p className="text-gray-600 mt-2">
                Accédez à votre espace de gestion
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom d'utilisateur <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors text-gray-900 placeholder-gray-500 ${
                      errors.username 
                        ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Ex: jaoninasissiethephanie@gmail.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.username && (
                  <div className="mt-2 flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600 font-medium">{errors.username}</p>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors text-gray-900 placeholder-gray-500 ${
                      errors.password 
                        ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Ex: 123456*"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <div className="mt-2 flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600 font-medium">{errors.password}</p>
                  </div>
                )}
              </div>

              {/* Demo Button */}
              <div className="text-center mb-4">
                <button
                  type="button"
                  onClick={handleDemoFill}
                  disabled={isLoading}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
                >
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>

              {/* Footer Links */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              © 2025 Système de Gestion de Paie. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollAdminLogin;
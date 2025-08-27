// components/ui/SnackbarContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(null);

  const showSnackbar = useCallback((message, type = "success") => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 3000); // auto-hide 3s
  }, []);

  const getIcon = () => {
    switch (snackbar?.type) {
      case "success":
        return <CheckCircle className="text-green-600" size={20} />;
      case "error":
        return <XCircle className="text-red-600" size={20} />;
      case "warning":
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case "info":
        return <Info className="text-blue-600" size={20} />;
      default:
        return null;
    }
  };

  const getTextColor = () => {
    switch (snackbar?.type) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {snackbar && (
      <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-white shadow-lg border rounded-lg px-4 py-3 animate-fade-in">

          {getIcon()}
          <span className={`text-sm font-medium ${getTextColor()}`}>
            {snackbar.message}
          </span>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

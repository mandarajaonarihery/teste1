// components/ui/Loading.jsx
import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({ text = "Chargement..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className="animate-spin text-blue-600" size={32} />
      <p className="mt-2 text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Loading;

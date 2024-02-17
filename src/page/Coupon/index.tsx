import * as React from 'react';
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  let navigate = useNavigate()
  return (
    <div>
      <a onClick={() => navigate("/settingPage")}>Setting</a>

      <a>Product</a>
    </div>
  );
};

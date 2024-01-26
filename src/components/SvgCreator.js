import React, { useState, useEffect } from "react";

const SVGComponent = ({ width, height, color }) => {
  const [additionalItem, setAdditionalItem] = useState(null);

  useEffect(() => {
    // You can perform any logic here when props change
    console.log("SVGComponent updated with props:", { width, height, color });
  }, [width, height, color]);

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <rect width={width} height={height} fill={color} onClick={()=>console.log('rect 1')} />
      <text  fontSize={18} color="white">AAA</text>
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="blue"  onClick={()=>console.log('rect 2')} />
      {additionalItem && additionalItem}
    </svg>
  );
};

export default SVGComponent;

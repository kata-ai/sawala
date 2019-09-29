import React from 'react';

const SvgClose = (props: any) => (
  <svg width={16} height={16} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.414 8l6.293-6.293A.999.999 0 1014.293.293L8 6.586 1.707.293A.999.999 0 10.293 1.707L6.586 8 .293 14.293a.999.999 0 101.414 1.414L8 9.414l6.293 6.293a.997.997 0 001.414 0 .999.999 0 000-1.414L9.414 8z"
      fill="#676B6D"
    />
  </svg>
);

export default SvgClose;

import React from 'react';

const SvgTicks = (props: any) => (
  <svg width={16} height={10} fill="none" {...props}>
    <path
      d="M12.086 1.045L11.124 0 6.798 4.701l.962 1.045 4.326-4.701zM14.97 0L7.76 7.91 4.876 4.776l-.962 1.045L7.76 10 16 1.045 14.97 0zM0 5.82L3.845 10l.962-1.045L.96 4.776 0 5.821z"
      fill="#676B6D"
    />
  </svg>
);

export default SvgTicks;

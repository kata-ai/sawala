import React from 'react';

const SvgImage = (props: any) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 22H4c-1.1 0-2-.9-2-2v-3.546l7.092-6.206L22 18.546V20c0 1.1-.9 2-2 2zM4 2h16c1.1 0 2 .9 2 2v12.168L9.541 8.159a.997.997 0 00-1.2.089L2 13.796V4c0-1.1.9-2 2-2zm16-2H4C1.794 0 0 1.794 0 4v16c0 2.206 1.794 4 4 4h16c2.206 0 4-1.794 4-4V4c0-2.206-1.794-4-4-4z"
      fill="#949A9D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 6c.551 0 1 .449 1 1 0 .551-.449 1-1 1-.551 0-1-.449-1-1 0-.551.449-1 1-1zm0 4c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3z"
      fill="#949A9D"
    />
  </svg>
);

export default SvgImage;

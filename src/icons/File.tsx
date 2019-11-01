import React from 'react';

const SvgFile = (props: any) => (
  <svg width={24} height={24} fill="#949A9D" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 0H4C1.794 0 0 1.794 0 4v16c0 2.206 1.794 4 4 4h16c2.206 0 4-1.794 4-4V4c0-2.206-1.794-4-4-4zm0 2c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h16z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 7h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zM17 9H7c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zM17 13H7c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zM13 17H7c-.55 0-1 .45-1 1s.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1z"
    />
  </svg>
);

export default SvgFile;

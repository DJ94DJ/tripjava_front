// NumSvg.js
import React from "react";

export const Num1PinSvg = ({ color }) => (
  <svg
    className={`pin-svg day num1 ${color}`}
    version="1.1"
    id="pin_day1"
    x="0px"
    y="0px"
    viewBox="-2 -2 27 27"
    overflow="visible"
  >
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.8" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <rect class="pin-bg" x="4" y="4" width="16" height="16" filter="url(#f1)" />
    <rect class="pin-bg" x="5" y="5" width="15" height="15" />

    <path
      className={`pin-logo ${color}`}
      d="M12,17h2V7h-4v2h2V17z M5,21c-0.5,0-1-0.2-1.4-0.6S3,19.5,3,19V5c0-0.5,0.2-1,0.6-1.4S4.5,3,5,3h14c0.6,0,1,0.2,1.4,0.6  S21,4.4,21,5v14c0,0.5-0.2,1-0.6,1.4S19.6,21,19,21H5z M5,19h14V5H5V19z M5,5v14V5z"
    />
  </svg>
);

export const Num2PinSvg = ({ color }) => (
  <svg
    className={`pin-svg day num2 ${color}`}
    version="1.1"
    id="pin_day2"
    x="0px"
    y="0px"
    viewBox="-2 -2 27 27"
    overflow="visible"
  >
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.8" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <rect class="pin-bg" x="4" y="4" width="16" height="16" filter="url(#f1)" />
    <rect class="pin-bg" x="5" y="5" width="15" height="15" />

    <path
      className={`pin-logo ${color}`}
      d="M9,17h6v-2h-4v-2h2c0.6,0,1-0.2,1.4-0.6S15,11.6,15,11V9c0-0.6-0.2-1-0.6-1.4C14,7.2,13.6,7,13,7H9v2h4v2h-2  c-0.6,0-1,0.2-1.4,0.6C9.2,12,9,12.4,9,13V17z M5,21c-0.5,0-1-0.2-1.4-0.6S3,19.5,3,19V5c0-0.5,0.2-1,0.6-1.4S4.5,3,5,3h14  c0.6,0,1,0.2,1.4,0.6S21,4.4,21,5v14c0,0.5-0.2,1-0.6,1.4S19.6,21,19,21H5z M5,19h14V5H5V19z M5,5v14V5z"
    />
  </svg>
);

export const Num3PinSvg = ({ color }) => (
  <svg
    className={`pin-svg day num3 ${color}`}
    version="1.1"
    id="pin_day3"
    x="0px"
    y="0px"
    viewBox="-2 -2 27 27"
    overflow="visible"
  >
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.8" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <rect class="pin-bg" x="4" y="4" width="16" height="16" filter="url(#f1)" />
    <rect class="pin-bg" x="5" y="5" width="15" height="15" />

    <path
      className={`pin-logo ${color}`}
      d="M9,17h4c0.6,0,1-0.2,1.4-0.6S15,15.6,15,15v-1.5c0-0.4-0.1-0.8-0.4-1.1c-0.3-0.3-0.6-0.4-1.1-0.4c0.4,0,0.8-0.1,1.1-0.4  s0.4-0.6,0.4-1.1V9c0-0.6-0.2-1-0.6-1.4C14,7.2,13.6,7,13,7H9v2h4v2h-2v2h2v2H9V17z M5,21c-0.5,0-1-0.2-1.4-0.6S3,19.5,3,19V5  c0-0.5,0.2-1,0.6-1.4S4.5,3,5,3h14c0.6,0,1,0.2,1.4,0.6S21,4.4,21,5v14c0,0.5-0.2,1-0.6,1.4S19.6,21,19,21H5z M5,19h14V5H5V19z M5,5  v14V5z"
    />
  </svg>
);

export const Num4PinSvg = ({ color }) => (
  <svg
    className={`pin-svg day num4 ${color}`}
    version="1.1"
    id="pin_day4"
    x="0px"
    y="0px"
    viewBox="-2 -2 27 27"
    overflow="visible"
  >
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.8" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <rect class="pin-bg" x="4" y="4" width="16" height="16" filter="url(#f1)" />
    <rect class="pin-bg" x="5" y="5" width="15" height="15" />

    <path
      className={`pin-logo ${color}`}
      d="M13,17h2V7h-2v4h-2V7H9v6h4V17z M5,21c-0.5,0-1-0.2-1.4-0.6S3,19.5,3,19V5c0-0.5,0.2-1,0.6-1.4S4.5,3,5,3h14  c0.6,0,1,0.2,1.4,0.6S21,4.4,21,5v14c0,0.5-0.2,1-0.6,1.4S19.6,21,19,21H5z M5,19h14V5H5V19z M5,5v14V5z"
    />
  </svg>
);

export const Num5PinSvg = ({ color }) => (
  <svg
    className={`pin-svg day num5 ${color}`}
    version="1.1"
    id="pin_day5"
    x="0px"
    y="0px"
    viewBox="-2 -2 27 27"
    overflow="visible"
  >
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.8" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <rect class="pin-bg" x="4" y="4" width="16" height="16" filter="url(#f1)" />
    <rect class="pin-bg" x="5" y="5" width="15" height="15" />

    <path
      className={`pin-logo ${color}`}
      d="M9,17h4c0.6,0,1-0.2,1.4-0.6S15,15.6,15,15v-2c0-0.6-0.2-1-0.6-1.4C14,11.2,13.6,11,13,11h-2V9h4V7H9v6h4v2H9V17z M5,21  c-0.5,0-1-0.2-1.4-0.6S3,19.5,3,19V5c0-0.5,0.2-1,0.6-1.4S4.5,3,5,3h14c0.6,0,1,0.2,1.4,0.6S21,4.4,21,5v14c0,0.5-0.2,1-0.6,1.4  S19.6,21,19,21H5z M5,19h14V5H5V19z M5,5v14V5z"
    />
  </svg>
);

export const Num6PinSvg = ({ color }) => (
  <svg
    className={`pin-svg day num6 ${color}`}
    version="1.1"
    id="pin_day6"
    x="0px"
    y="0px"
    viewBox="-2 -2 27 27"
    overflow="visible"
  >
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.8" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <rect class="pin-bg" x="4" y="4" width="16" height="16" filter="url(#f1)" />
    <rect class="pin-bg" x="5" y="5" width="15" height="15" />

    <path
      className={`pin-logo ${color}`}
      d="M11,17h2c0.6,0,1-0.2,1.4-0.6S15,15.6,15,15v-2c0-0.6-0.2-1-0.6-1.4C14,11.2,13.6,11,13,11h-2V9h3V7h-3  c-0.6,0-1,0.2-1.4,0.6C9.2,8,9,8.4,9,9v6c0,0.6,0.2,1,0.6,1.4S10.4,17,11,17z M11,13h2v2h-2V13z M5,21c-0.5,0-1-0.2-1.4-0.6  S3,19.5,3,19V5c0-0.5,0.2-1,0.6-1.4S4.5,3,5,3h14c0.6,0,1,0.2,1.4,0.6S21,4.4,21,5v14c0,0.5-0.2,1-0.6,1.4S19.6,21,19,21H5z M5,19  h14V5H5V19z M5,5v14V5z"
    />
  </svg>
);

export const Num7PinSvg = ({ color }) => (
  <svg
    className={`pin-svg day num7 ${color}`}
    version="1.1"
    id="pin_day7"
    x="0px"
    y="0px"
    viewBox="-2 -2 27 27"
    overflow="visible"
  >
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.8" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <rect class="pin-bg" x="4" y="4" width="16" height="16" filter="url(#f1)" />
    <rect class="pin-bg" x="5" y="5" width="15" height="15" />

    <path
      className={`pin-logo ${color}`}
      d="M5,21c-0.5,0-1-0.2-1.4-0.6S3,19.5,3,19V5c0-0.5,0.2-1,0.6-1.4S4.5,3,5,3h14c0.6,0,1,0.2,1.4,0.6S21,4.4,21,5v14  c0,0.5-0.2,1-0.6,1.4S19.6,21,19,21H5z M5,19h14V5H5V19z"
    />
    <path
      className={`pin-logo ${color}`}
      d="M14.4,7.6C14,7.2,13.5,7,13,7h-1.4H11H9v2v2.1h2.1V9H13v2v2v0.9V14v1v2h2v-2v-1.1V9C15,8.5,14.8,8,14.4,7.6z"
    />
  </svg>
);

export const Num8PinSvg = ({ color }) => (
  <svg
    className={`pin-svg day num8 ${color}`}
    version="1.1"
    id="pin_day8"
    x="0px"
    y="0px"
    viewBox="-2 -2 27 27"
    overflow="visible"
  >
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.8" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <rect class="pin-bg" x="4" y="4" width="16" height="16" filter="url(#f1)" />
    <rect class="pin-bg" x="5" y="5" width="15" height="15" />

    <path
      className={`pin-logo ${color}`}
      d="M5,21c-0.5,0-1-0.2-1.4-0.6S3,19.5,3,19V5c0-0.5,0.2-1,0.6-1.4S4.5,3,5,3h14c0.6,0,1,0.2,1.4,0.6S21,4.4,21,5v14  c0,0.5-0.2,1-0.6,1.4S19.6,21,19,21H5z M5,19h14V5H5V19z"
    />
    <path
      className={`pin-logo ${color}`}
      d="M14.4,7.6C14,7.2,13.5,7,13,7h-2c-0.5,0-1,0.2-1.4,0.6S9,8.5,9,9v2v4c0,0.5,0.2,1,0.6,1.4S10.5,17,11,17h2  c0.5,0,1-0.2,1.4-0.6S15,15.5,15,15v-2V9C15,8.5,14.8,8,14.4,7.6z M13,15h-2v-2h2V15z M11,11V9h2v2H11z"
    />
  </svg>
);

// PinSvg.js
import React from "react";

export const HomePinSvg = () => (
  <svg
    className="pin-svg home"
    version="1.1"
    id="pin_home"
    x="0px"
    y="0px"
    viewBox="-3 0 38 64"
  >
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.5" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.8" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <path
      className="pin-bg"
      d="M32.2,16.1C32.2,7.2,25,0,16.1,0S0,7.2,0,16.1c0,6.5,3.9,12.1,9.4,14.6L12,43.1l4,18.8l4-18.8l2.6-12.4  C28.3,28.2,32.2,22.6,32.2,16.1z"
      filter="url(#shadow)"
    />
    <path
      className="pin-logo"
      d="M10.1,23.1h3v-6h6v6h3v-9l-6-4.5l-6,4.5V23.1z M8.1,25.1v-12l8-6l8,6v12h-7v-6h-2v6H8.1z"
    />
  </svg>
);

export const MealPinSvg = () => (
  <svg
    className="pin-svg meal"
    version="1.1"
    id="pin_meal"
    x="0px"
    y="0px"
    viewBox="-3 0 38 64"
  >
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.5" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <path
      className="pin-bg"
      d="M32.2,16.1C32.2,7.2,25,0,16.1,0S0,7.2,0,16.1c0,6.5,3.9,12.1,9.4,14.6L12,43.1l4,18.8l4-18.8l2.6-12.4  C28.3,28.2,32.2,22.6,32.2,16.1z"
      filter="url(#shadow)"
    />
    <path
      className="pin-logo"
      d="M10.6,26.1V17c-0.8-0.2-1.6-0.7-2.1-1.4S7.6,14,7.6,13.1v-7h2v7h1v-7h2v7h1v-7h2v7c0,0.9-0.3,1.8-0.9,2.4  c-0.6,0.7-1.3,1.2-2.1,1.4V26h-2V26.1z M20.6,26.1v-8h-3v-7c0-1.4,0.5-2.6,1.5-3.5c1-1,2.2-1.5,3.5-1.5v20H20.6z"
    />
  </svg>
);
export const PlacePinSvg = () => (
  <svg
    className="pin-svg place"
    version="1.1"
    id="pin_place"
    x="0px"
    y="0px"
    viewBox="-3 0 38 64"
  >
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="0.5" dy="3" result="offsetblur" />
        <feFlood floodColor="black" floodOpacity="0.7" result="color" />
        <feComposite in2="offsetblur" operator="in" result="shadow" />
        <feComposite in2="shadow" operator="over" in="SourceGraphic" />
      </filter>
    </defs>
    <path
      className="pin-bg"
      d="M32.2,16.1C32.2,7.2,25,0,16.1,0S0,7.2,0,16.1c0,6.5,3.9,12.1,9.4,14.6L12,43.1l4,18.8l4-18.8l2.6-12.4  C28.3,28.2,32.2,22.6,32.2,16.1z"
      filter="url(#shadow)"
    />
    <path
      className="pin-logo"
      d="M15.8,25.6c-1.4,0-2.7-0.3-3.9-0.8s-2.3-1.2-3.2-2.1c-0.9-0.9-1.6-2-2.1-3.2c-0.5-1.2-0.8-2.5-0.8-3.9s0.3-2.7,0.8-3.9  s1.2-2.3,2.1-3.2c0.9-0.9,2-1.6,3.2-2.1s2.5-0.8,3.9-0.8c2.4,0,4.6,0.8,6.4,2.3c1.8,1.5,3,3.4,3.4,5.7h-2.1  c-0.3-1.2-0.9-2.3-1.7-3.3s-1.8-1.7-3-2.2v0.4c0,0.6-0.2,1-0.6,1.4c-0.4,0.4-0.9,0.6-1.4,0.6h-2v2c0,0.3-0.1,0.5-0.3,0.7  c-0.2,0.2-0.4,0.3-0.7,0.3h-2v2h2v3h-1L8,13.8c0,0.3-0.1,0.6-0.1,0.9c0,0.3-0.1,0.6-0.1,0.9c0,2.2,0.8,4.1,2.3,5.6  c1.5,1.6,3.4,2.4,5.7,2.4V25.6z M24.9,25.1l-3.2-3.2c-0.3,0.2-0.7,0.4-1.1,0.5c-0.4,0.1-0.8,0.2-1.3,0.2c-1.2,0-2.3-0.4-3.2-1.3  s-1.3-1.9-1.3-3.2s0.4-2.3,1.3-3.2s1.9-1.3,3.2-1.3s2.3,0.4,3.2,1.3s1.3,1.9,1.3,3.2c0,0.5-0.1,0.9-0.2,1.3  c-0.1,0.4-0.3,0.8-0.5,1.1l3.2,3.2L24.9,25.1z M19.3,20.6c0.7,0,1.3-0.2,1.8-0.7c0.5-0.5,0.7-1.1,0.7-1.8s-0.2-1.3-0.7-1.8  c-0.5-0.5-1.1-0.7-1.8-0.7c-0.7,0-1.3,0.2-1.8,0.7c-0.5,0.5-0.7,1.1-0.7,1.8s0.2,1.3,0.7,1.8S18.6,20.6,19.3,20.6z"
    />
  </svg>
);

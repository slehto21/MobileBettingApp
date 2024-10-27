import * as React from "react"
import Svg, { Path } from "react-native-svg"

const VirtualSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M234.6 10c-6.7 2.1-10.6 8.5-10.6 17.4 0 5.3-.1 5.5-3.2 6.1-1.8.4-7.2 2.5-12 4.8l-8.8 4-4.9-4.6c-5.6-5.2-10-6.5-15.8-4.6-4.6 1.5-29.4 25.4-32.4 31.1-3.1 6-2 12.4 2.9 18 1.4 1.7-1.5 1.8-60.5 1.8-71 0-69.2-.2-77.3 7.9-8.7 8.7-8-4-8 155.1s-.7 146.4 8 155.1c8.2 8.2 4.2 7.9 95.2 7.9H187v47h-20.2c-11.2 0-22.1.5-24.2 1-6.3 1.4-11.8 5.9-14.8 11.9-2.6 5-2.8 6.4-2.8 17.3 0 10.5.2 12 2 13.8 2 2 3.3 2 129 2s127 0 129-2c1.8-1.8 2-3.3 2-13.8 0-10.9-.2-12.3-2.7-17.3-3.1-6-8.6-10.5-14.9-11.9-2.1-.5-13-1-24.1-1H325v-47h79.8c91 0 87 .3 95.2-7.9 8.7-8.7 8 4 8-155.1s.7-146.4-8-155.1c-8.1-8.1-6.3-7.9-77.3-7.9-59 0-61.9-.1-60.5-1.8 5.4-6.1 6.1-12.8 1.9-19.3-4.6-7.2-27-28.4-31.4-29.9-5.8-1.8-10.2-.5-15.8 4.7l-4.9 4.6-8.8-4c-4.8-2.3-10.1-4.4-11.8-4.7-3.1-.7-3.2-.8-3.6-7.6-.4-7.4-1.9-10.5-7.2-14.4-2.5-1.9-4.3-2.1-22.9-2.3-11.1-.1-21.5.2-23.1.7zm40.2 12.2c.7.7 1.2 4.4 1.2 9.4 0 5.6.4 8.5 1.3 9.3.8.6 4.9 2.2 9.3 3.7 4.3 1.4 12 4.6 17.1 7.1l9.2 4.6 3.9-2.6c2.1-1.5 5.3-4.3 7.2-6.2 1.9-1.9 3.8-3.5 4.4-3.5 1.5 0 26.6 25.3 26.6 26.9 0 .8-2.7 4.2-6 7.7-3.3 3.4-6 6.7-6 7.2s2 4.9 4.5 9.8 5.5 12 6.7 15.9c3.3 11.4 3.5 11.5 13.1 11.5 5.1 0 8.8.5 9.5 1.2.8.8 1.2 6.4 1.2 18.8s-.4 18-1.2 18.8c-.7.7-4.2 1.2-8.8 1.2-4.6 0-8.3.5-9.2 1.2-.9.7-3 5.5-4.7 10.6-1.7 5.1-4.9 12.9-7.2 17.2-3.8 7.5-3.9 8-2.5 10.7.8 1.5 3.5 4.8 6 7.3 2.5 2.4 4.6 4.9 4.6 5.4 0 1.7-25.3 26.6-27 26.6-.9 0-4-2.5-7-5.5-3.7-3.7-6.2-5.5-7.9-5.5-1.4 0-5.9 1.8-10.1 3.9-4.1 2.1-11.3 5.1-16 6.5-4.7 1.5-9.1 3.4-9.7 4.3-.8 1-1.3 4.8-1.3 9.3 0 4.6-.5 8.1-1.2 8.8-1.7 1.7-35.9 1.7-37.6 0-.7-.7-1.2-4.2-1.2-8.8 0-4.5-.5-8.3-1.2-9.3-.7-.9-5.1-2.8-9.8-4.3-4.7-1.4-11.9-4.4-16-6.5-4.2-2.1-8.7-3.9-10.1-3.9-1.7 0-4.2 1.8-7.9 5.5-3 3-6.1 5.5-7 5.5-1.8 0-27-24.9-27-26.8 0-.7 2.7-4.2 6-7.7s6-6.8 6-7.1c0-.4-2-4.6-4.4-9.3-2.4-4.7-5.6-12.4-7-17.1-1.5-4.7-3.4-9.1-4.3-9.8-1-.7-4.8-1.2-9.3-1.2-4.6 0-8.1-.5-8.8-1.2-1.7-1.7-1.7-35.9 0-37.6.7-.7 4.4-1.2 9.4-1.2 5.3 0 8.5-.4 9.2-1.3.5-.6 2.4-5.4 4.1-10.6 1.7-5.1 4.9-12.7 7.1-16.9 2.2-4.1 4-7.9 4-8.5 0-.5-2.7-3.7-6-7.1-3.3-3.5-6-6.9-6-7.7 0-1.6 25.1-26.9 26.6-26.9.6 0 3 2.1 5.4 4.6 2.5 2.5 5.8 5.2 7.4 6.1 2.8 1.5 3.2 1.4 12-3 5-2.6 12.7-5.8 17-7.2 4.4-1.4 8.5-3 9.3-3.6.9-.8 1.3-3.7 1.3-9.3 0-5 .5-8.7 1.2-9.4 1.7-1.7 35.9-1.7 37.6 0zM150 96.9c0 .5-1.1 3.7-2.4 7.2l-2.4 6.4-55.7.5c-53.6.5-55.7.6-57.1 2.4-1.2 1.7-1.4 21.6-1.4 133.8C31 377.7 31 379 33 381s3.3 2 222.8 2h220.8l2.2-2 2.2-2.1V115.3l-2.1-1.9c-2-1.8-4.8-1.9-57.1-2.4l-54.9-.5-2.9-7.3-2.8-7.2 62.8.2c61.8.3 62.9.3 65.7 2.4 1.5 1.1 3.6 3.6 4.6 5.5 1.6 3.2 1.7 11.7 1.5 144.1-.3 140.5-.3 140.7-2.4 143.5-1.1 1.5-3.6 3.6-5.5 4.5-3.2 1.7-16.3 1.8-231.9 1.8s-228.7-.1-231.9-1.8c-1.9-.9-4.4-3-5.5-4.5l-2.1-2.8V105.1l2.1-2.8c4.8-6.5 2.5-6.3 70.2-6.3 34.5 0 61.2.4 61.2.9zm-28 45.8c0 17.6.2 20.1 2 23.8 2.6 5.4 7 7.9 14.9 8.5l6.3.5 2.8 7.5c1.5 4.1 3.7 9.4 4.9 11.8l2.2 4.4-4.5 4.8c-7.8 8.3-7.3 15.9 1.4 24.5l5 4.9-18.5 18.6-18.5 18.6v40.9l-5 2.8c-5.5 3-10.5 9.7-11.6 15.4-2.6 13.7 8.4 26.7 22.5 26.6 23.5-.3 30.8-31.6 9.9-42.4L132 312v-36.5l16.7-16.7 16.7-16.7 5.6 5.4c8.9 8.4 16.2 8.7 24.7 1.1 4.8-4.4 4.9-4.4 7.8-2.8 1.7.9 6.8 3 11.5 4.8l8.5 3.2.6 6.4c1 11.9 6.5 16.8 18.8 16.8h7.1v35l-3.2 1.3c-1.8.8-5 3.2-7.1 5.3-8 8.2-8.4 20.7-1 29.3 11 13 29.7 10.8 37.5-4.4 2.6-5 2.8-13.6.4-18.6-2.2-4.7-7.3-9.8-11.3-11.6L262 312v-35h7.1c12.3 0 17.8-4.9 18.8-16.8l.6-6.4 4.5-1.5c2.5-.8 7.7-3 11.7-4.8l7.1-3.3 2.9 3c1.5 1.6 4.5 3.8 6.5 4.9 7.2 3.7 13.5 2 20.8-5.5l4.4-4.6 16.8 16.7 16.8 16.8V312l-3.7 1.9c-16.6 8.5-16.5 31.7.1 40.3 9.4 4.8 22.2 1.5 28.3-7.5 7.6-11.3 4.2-25.9-7.7-32.4l-5-2.8v-40.9l-18.4-18.5-18.5-18.6 5.4-5.7c8.3-8.9 8.6-15.6.9-23.8l-4.4-4.7 3.1-6.9c1.8-3.8 3.9-9.2 4.9-11.9l1.7-5 6.4-.5c7.9-.6 12.3-3.1 14.9-8.5 1.8-3.7 2-6.2 2-23.8V123h79v248H43V123h79v19.7zM133.3 327c7.1 7.9-.4 19.8-10.7 16.9-4-1.1-7.6-5.7-7.6-9.7 0-3.7 2.9-8.3 6.3-9.8 4.4-1.9 8.7-1 12 2.6zm127.2-2.4c6.8 3.2 8 11.7 2.4 17-8.1 7.7-21.2-1.8-16.4-12 1.5-3.2 6.2-6.5 9.3-6.6.8 0 2.9.7 4.7 1.6zm130-.2c3.6 1.5 6.5 5.9 6.5 9.8 0 4-3.6 8.6-7.6 9.7-9.8 2.7-17.5-8.4-11.3-16.3 3.6-4.5 7-5.4 12.4-3.2zm-168.9 89.4c6 10.3 17 18.6 27.8 20.9 7.5 1.5 15.6.4 23-3.4 5.7-2.9 15.1-12 18.1-17.6l2-3.7H313v47H199v-47h20.5l2.1 3.8zm55.5-1.9c-3.2 5.8-13.3 11.3-21.1 11.3-7.8 0-17.9-5.5-21.1-11.3-.9-1.8-.2-1.9 21.1-1.9s22 .1 21.1 1.9zm91.4 58.5c4.6 2 6.5 6.1 6.5 14.1v6.5H137v-6.5c0-7.9 1.9-12.1 6.3-14 4.8-2.1 220.2-2.2 225.2-.1z" />
    <Path d="M236 64.1c-16.2 4.2-32.1 14.2-42.6 26.8-6.7 8-13.7 21.8-16.5 32.6-2.7 10.2-3 27.8-.5 37.8 7.3 30.4 30.8 53.9 61.2 61.3 9.2 2.3 27.6 2.3 36.8 0 20.4-4.9 37.7-16.9 49-34 9.9-14.9 13.9-28.2 13.8-46.1-.1-37.1-25.5-69.4-61.6-78.5-10.8-2.7-29.1-2.7-39.6.1zM273.8 76c24.7 6.9 43.3 25.9 49.8 51 2.2 8.4 2.2 23.3 0 32.5-4.7 19.6-18.8 37.1-37.1 46-10.3 5.1-18.3 6.9-30.5 6.9s-20.2-1.8-30.5-6.9c-18.1-8.8-31.8-25.7-37.1-45.5-2.2-8.4-2.2-24.2 0-33.3 5.8-24.4 25.8-44.5 50.6-51.1 8.5-2.3 26-2 34.8.4z" />
    <Path d="M224.8 92.7c-.8 1-7.6 12.6-15.2 25.7-10.1 17.8-13.5 24.5-13 26 1.3 4.1 26.6 47.2 29 49.3 2.5 2.3 2.9 2.3 30.4 2.3s27.9 0 30.3-2.3c2.5-2.2 27.8-45.2 29.1-49.3.5-1.5-2.7-7.9-12.5-25-7.2-12.6-14-24.1-15.1-25.7l-1.9-2.7h-29.8c-27.1 0-29.9.2-31.3 1.7zm62.7 24c4.3 7.6 8.8 15.3 9.8 17l1.9 3.3h-39.9l-9.3-16.3c-5.1-8.9-9.5-16.5-9.7-17-.2-.4 8.5-.7 19.4-.7h19.9l7.9 13.7zm-48.1 9.6 9.7 16.9-9.8 16.9c-5.4 9.3-10 16.9-10.3 16.9-.3-.1-4.8-7.7-10.1-16.9l-9.6-16.9 4.5-7.9c10.3-18 15.4-26.4 15.6-26.1.2.1 4.7 7.9 10 17.1zm59.6 23.1c0 .2-4.4 7.9-9.8 17.2l-9.8 16.9-19.7.3c-10.8.1-19.7-.1-19.7-.4 0-.4 4.4-8.2 9.8-17.5l9.7-16.9h19.8c10.8 0 19.7.2 19.7.4z" />
  </Svg>
)
export default VirtualSvg;
import * as React from "react"
import Svg, { Path } from "react-native-svg"

const BaseballSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xlmSpace="preserve"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M239.5 22c-45.5 3.3-88 19.3-125.5 47.2-12.2 9.1-35.7 32.6-44.8 44.8-24.7 33.1-39.2 67.9-45.3 108.5-2.4 16.2-2.9 46-1 61 8.7 67.3 43 124.9 97.9 164.2 29.6 21.2 66.6 35.6 104.7 40.9 16.2 2.2 44.1 2.2 61-.1 50.5-6.6 95.6-28.5 132.4-64 38.5-37.2 62.6-85.1 69.7-138.5 2.2-16.4 2.2-44.5 0-60.5-9.7-70.5-48.8-131-109.1-169-10.3-6.5-26.8-14.6-40.2-19.9-28.5-11.1-67.9-16.9-99.8-14.6zm2.4 26.2c0 6-2.2 20.4-3.2 21.4-.3.4-5.8-.7-12-2.5-6.3-1.7-12.4-3.1-13.5-3.1-5.9 0-10.2 4.8-10.2 11.6 0 5.8 3.4 8.1 18 12.1 6.8 1.9 12.6 3.5 12.7 3.7 1.1 1.1-12.8 34.6-14.3 34.6-.5 0-6.3-3.2-13-7-12.9-7.5-17.2-8.5-21.8-5.5-5.1 3.4-5.8 12.2-1.3 16.2 1.2 1.1 7.5 5 14 8.7l11.8 6.8-1.7 2.7c-2.4 3.7-11.7 15.9-15.3 20.1l-3 3.5-10.3-10.1c-5.7-5.6-11.3-10.7-12.5-11.3-6.4-3.3-14 1.1-15 8.7l-.6 4.2 11.2 11.3c6.1 6.2 11.1 11.8 11.1 12.4 0 1.4-7.6 7.9-18.4 15.8-9.2 6.8-7.6 7.5-16.3-7.8-6.2-10.9-8.7-13.2-14.6-13.2-3.1 0-4.5.7-6.8 3.3-4.6 5.1-4 8.5 3.6 21.8 3.6 6.2 6.5 11.7 6.5 12.2 0 1.2-13.8 7.5-25.6 11.8l-9.1 3.3-3.3-12.2c-1.8-6.7-4-13.9-4.8-16-1.6-4.2-5.4-6.7-10.3-6.7-4 0-9.9 5.6-9.9 9.5 0 1.5 1.6 8.7 3.6 16.1 2 7.4 3.4 13.7 3.1 14-.8.9-18.5 3.4-23.5 3.4h-4.3l.7-5.3c3.5-29.8 9.3-50.3 20.9-74.2 27.7-57.1 80.1-99.2 142-113.8 9.3-2.2 27.4-5.2 33.8-5.6 1.4-.1 1.7.8 1.6 5.1zm48.6-2.6c21.5 3.6 39.4 9.3 59.2 18.9 55.6 27 97.7 78.7 112.7 138.4 3.1 12.2 5.3 25.2 6.2 36.3l.7 8.6-6.9.7c-3.8.4-11.3 1.3-16.7 2.2-5.4.8-10 1.3-10.2 1.1-.2-.2-2-6.6-4-14.3-2-7.7-4.4-15.4-5.2-17.2-2.9-6.2-11.7-7.7-16.3-2.8-4 4.2-4 6.9.1 22.5 2.1 8 3.9 15.3 3.9 16.2 0 1.2-2.3 2.4-8.2 4.4-4.6 1.4-13.4 4.9-19.6 7.7-6.2 2.7-11.4 4.8-11.6 4.6-.1-.2-3.7-6.5-8-13.9-9.1-16-11.9-19-17.7-19-3.1 0-4.7.7-7 2.9-5 5-4.2 8.4 5.6 25.6 4.7 8.2 8.5 15.2 8.4 15.5 0 .3-3.8 3.1-8.5 6.4-4.6 3.2-11.6 8.6-15.5 11.8l-7.1 6-12.2-12.1C302 285.7 299.9 284 297.1 284c-6.8 0-11 4.2-11.1 10.9 0 4.3.3 4.7 11.5 16.1 6.3 6.4 11.5 12.1 11.5 12.6 0 .6-1.2 2.1-2.6 3.5-1.9 1.8-18.8 23.4-20 25.7-.1.2-6.5-3.3-14.1-7.7-8.2-4.8-15.1-8.1-16.7-8.1-6.2 0-10.5 4.4-10.6 10.8 0 5.7 1.5 7.1 17.3 16.1 7 4 12.7 7.4 12.7 7.5 0 .2-2.2 5.1-5 11-2.7 5.8-6.4 14.7-8.1 19.6-1.7 5-3.4 9-3.8 9-.3 0-7.3-1.8-15.6-4-8.2-2.2-16.4-4-18.2-4-9.2 0-13.1 14.1-5.2 18.9 1.6 1 9.6 3.5 17.7 5.6 8.1 2.1 15 4.1 15.4 4.4.4.3-.2 5.8-1.2 12.1s-2.2 14.6-2.5 18.4l-.7 6.9-8.6-.7c-26.4-2.1-52.1-9.1-76.7-21.1-22.3-10.8-38.8-22.7-57.1-40.9-18.2-18.3-30.1-34.8-40.9-57.1-12-24.6-19-50.3-21.1-76.7l-.7-8.6 6.9-.7c3.8-.4 11.3-1.3 16.8-2.2 5.4-.8 10.2-1.1 10.6-.6.3.4 2.1 6.4 3.9 13.3 3.9 14.7 4.2 15.5 8.1 17.5 4.3 2.2 8.4 1.9 11.8-1 4.7-3.9 4.8-6.7.7-22-2-7.5-3.5-13.8-3.3-14 .2-.2 4.4-1.8 9.3-3.6 5-1.7 13.5-5.1 19-7.6 5.5-2.4 10.5-4.7 11.1-4.9.6-.3 4.6 5.6 8.8 13.1 7.9 13.8 10.5 16.5 15.8 16.5 4.1 0 8.6-3.6 9.9-7.9 1.3-4.5 1.1-4.9-9.4-23.1-3-5.2-5.3-9.8-5.1-10.2.2-.3 4.1-3.2 8.6-6.4 4.4-3.1 11.5-8.6 15.6-12.2l7.4-6.5 10.8 10.8c10.3 10.2 11 10.8 15 10.8 4.8 0 9.5-3.8 10.5-8.4 1-4.4-1.7-8.6-12-18.9l-9.4-9.4 4.8-5.5c4.7-5.5 16.3-20.8 17.9-23.8.7-1.2 3.1-.1 13.2 5.8 14.4 8.3 18.1 9.1 23 4.4 3.8-3.6 4.6-7.5 2.5-11.9-1.4-2.9-4-4.9-14.1-10.7-6.8-3.9-12.4-7.4-12.4-7.9 0-.4 1.7-4.6 3.9-9.2 2.1-4.6 5.5-13.3 7.6-19.4 2.1-6 4-11.1 4.1-11.3.2-.2 7.4 1.6 16.1 3.9 15.2 4 16 4.1 19.5 2.7 7-2.9 8.7-11.6 3.3-16.9-1.9-1.9-6.1-3.5-16.9-6.3-7.9-2.1-14.9-4.1-15.5-4.5-.9-.5-.8-3.1.3-10.1.8-5.2 1.7-12.5 2.1-16.3l.7-6.9 8.6.7c4.8.4 12.8 1.4 17.7 2.2zm177.9 229.6c-3.5 29.9-9.3 50.4-20.9 74.3-20.9 43.1-56.7 78.6-100 99.1-22.7 10.8-43.3 16.4-72.2 19.8l-5.3.7v-4.6c0-7.1 3.1-25.6 4.4-26.1.6-.2 6.2.9 12.4 2.5 6.1 1.6 12.2 2.7 13.4 2.4 3.4-.8 7.5-5.1 8.2-8.5.7-3.5-1.5-8.7-4.4-10.6-1.6-1-22.7-7.2-24.5-7.2-.8 0 4.9-15 9.5-24.8 2.4-5 4.7-9.2 5.3-9.2.5 0 5.8 2.7 11.6 6.1 5.8 3.4 12.3 6.4 14.3 6.6 3.3.5 4.2.1 7.3-3 2.8-2.8 3.5-4.3 3.5-7.4 0-5.5-1.9-7.5-12.8-13.7-15-8.5-14.2-6.9-7.4-16.1 3.2-4.4 7.7-10 10-12.5l4.1-4.5 9.3 9.3c5.4 5.3 10.6 9.6 12.3 10 7.1 2 13.5-2.8 13.5-10.1 0-3.7-.7-4.7-10.1-14.2l-10-10.3 7.3-5.9c9-7.3 19.6-14.8 20.2-14.2.2.2 2.7 4.6 5.6 9.7 6.1 10.7 8.7 13.2 14 13.2 4.6 0 8.5-2.9 10-7.5 1.3-3.9.4-6.2-7-19.3l-4.2-7.2 7.7-3.6c10.4-4.8 26.3-10.5 26.8-9.6.3.4 1.7 5.5 3.2 11.4 1.5 5.9 3.6 12.1 4.6 13.7 3.5 5.9 13.2 5.8 17.3 0 2.3-3.3 2-7.9-1.4-19.8-1.6-5.8-2.8-10.7-2.6-10.9.9-.8 16.4-3 21.9-3.1l5.8-.1-.7 5.2z" />
  </Svg>
)

export default BaseballSvg;
/** @format */

import Masonry from 'react-masonry-css';
import PinComponent from './PinComponent';

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakPointObj}>
      {pins?.map((item) => (
        <PinComponent key={item._id} pin={item} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;

/** @format */

import { urlFor, client } from '../client';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser } from '../utils/fetchUser';

const PinComponent = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();

  const user = fetchUser();
  const alreadySaved = !!pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(pin.image).width(250).url()}
          className="rounded-lg w-full"
          alt="user-pin"
        />
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${pin.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl outline-none hover:shadow-md"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl outline-none hover:shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin._id);
                  }}
                >
                  {savingPost ? 'Saving post' : 'Save'}
                </button>
              )}
            </div>
            <div className="flex justify-between gap-2 w-full items-center">
              {pin.destination && (
                <a
                  href={pin.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination.length > 16
                    ? `${pin.destination.slice(8, 15)}...`
                    : pin.destination.slice(8)}
                </a>
              )}
              {pin.postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  className="bg-white p-2 opacity-70 hover:opacity-100 font-bold text-base rounded-3xl outline-none hover:shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin._id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${pin.postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={pin.postedBy?.image}
          alt="..."
        />
        <p className="font-semibold capitalize">{pin.postedBy?.username}</p>
      </Link>
    </div>
  );
};

export default PinComponent;

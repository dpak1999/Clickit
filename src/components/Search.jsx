/** @format */

import { useEffect, useState } from 'react';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../utils/data';

const Search = ({ searchterm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchterm) {
      setLoading(true);
      const query = searchQuery(searchterm.toLowerCase());
      client.fetch(query).then((data) => {
        console.log(data);
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchterm]);

  return (
    <div>
      {loading && (
        <Spinner message="Hang tight while we search & bring your posts" />
      )}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchterm !== '' && !loading && (
        <div className="mt-10 text-center">No posts found</div>
      )}
    </div>
  );
};

export default Search;

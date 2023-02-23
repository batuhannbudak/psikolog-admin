import { useState } from 'react';

import PsikologService from '../services/layers/PsikologService';

const useFetch = offset => {
  const [isLoading, setIsLoading] = useState(false);
  const [psikologs, setPsikologs] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = async (withPagination = false, filters = {}) => {
    let params;

    try {
      if (withPagination) {
        params = {
          ...filters,
          offset: offset,
          limit: 10
        };
      } else {
        params = {
          ...filters,
          offset: 0,
          limit: 10
        };
        setPsikologs([]);
        setHasMore(false);
      }
      setIsLoading(true);

      const res = await PsikologService.getPsikologList(params);

      if (withPagination) {
        setPsikologs(prevPsikologs => {
          return [...prevPsikologs, ...res.data[0]];
        });
      } else {
        setPsikologs(res.data[0]);
      }

      if (res.data) {
        setHasMore(res.data[0].length === 10);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return {
    isLoading, psikologs, hasMore, fetchData
  };
};

export default useFetch;

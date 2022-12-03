import { AxiosPromise, CancelToken } from 'axios';
import { FetchResponse } from './types';
import { Home } from '../home/types';
import { apiInstance } from './instance';

interface SDK {
  fetchHomes: (params: { search?: string; cancelToken?: CancelToken }) => AxiosPromise<FetchResponse<Home>>;
}

function createSDK(): SDK {
  function fetchHomes({ search, cancelToken }: { search?: string; cancelToken?: CancelToken }) {
    return apiInstance.get<FetchResponse<Home>>('/production/test-get-listings', {
      cancelToken: cancelToken,
      params: { query: search }
    });
  }

  return {
    fetchHomes: fetchHomes
  };
}

export const sdk = createSDK();

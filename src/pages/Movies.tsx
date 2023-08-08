import React from 'react';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { fetchMovies } from '../fetch/fetchMovies';
import { AxiosError } from 'axios';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const Movies = () => {
  const {
    data: movies,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
  Movies,
  AxiosError,
  Movies
  >({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    select: (data) => {
      return data.pages.map((pageData) => pageData.results).flat();
    },
  });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });
  // const { data, isError, isLoading} = useQuery(['movie'], fetchMovies)
  // console.log(data)
  return (
    <div>
      <h2>Movies</h2>
      <ul style={{ border: '1px solid' }}>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div
      // ref={ref}
      />
    </div>
  );
};

export default Movies;

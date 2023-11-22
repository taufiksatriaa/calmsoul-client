import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/todos/todos";
const Videos = () => {
  const { todos, loading, error } = useSelector((state) => state.todosSlice);
  const dispatch = useDispatch();
  // console.log(todos.videos);
  useEffect(() => {
    dispatch(fetchAsync());
  }, []);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <>
      <section className="min-h-screen">
        <div className="flex flex-col items-center mt-10">
          <h1 className="relative mb-4 text-3xl font-black leading-tight text-[#4D77B4] sm:text-6xl xl:mb-8 bg-gradient-to-tl from-blue-400 to-neutral-400 bg-clip-text text-transparent ">
            Why do we meditate?
          </h1>
          <video
            width="600"
            height="450"
            controls
            autoPlay
            className="shadow-sm"
          >
            <source src="https://i.imgur.com/o61nEsB.mp4" type="video/mp4" />
          </video>
          {todos.videos?.map((video, id) => {
            return <MovieCard key={id} detail={video} />;
          })}
        </div>
      </section>
    </>
  );
};
export default Videos;

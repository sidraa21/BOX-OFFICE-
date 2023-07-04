import { useQuery } from "@tanstack/react-query";
import { useStarredShows } from "../lib/useStarredShows";
import { getShowByIds } from "../api/tvmaze";
import ShowGrid from "../components/shows/ShowGrid";
const Starred = () => {
  const [starredShowsIds] = useStarredShows();
  const { data: starredShows, error: starredShowsError} = useQuery({
    queryKey: ['starred', starredShowsIds],
    queryFn:  () => getShowByIds(starredShowsIds).then(result => result.map(show => ({show})) ),
      refetchOnWindowFocus: false,
    });
    console.log({starredShows}) ;
    // ⬇️ disabled as long as the filter is empty
  if(starredShows?.length === 0){
    return <div>No shows were starred</div>
  }
  if(starredShows && starredShows.length > 0) {
    return <ShowGrid shows={starredShows} />
  }
  if(starredShowsError) {
    return <div>Error occurred : {starredShowsError.message}</div>
  }

  return <div>Shows are loading</div>;
};

export default Starred;

import { useQuery } from "@tanstack/react-query";
import { useStarredShows } from "../lib/useStarredShows";
import { getShowByIds } from "../api/tvmaze";
import ShowGrid from "../components/shows/ShowGrid";
import { TextCenter } from "../components/common/TextCenter";

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
    return <TextCenter>No shows were starred</TextCenter>
  }
  if(starredShows && starredShows.length > 0) {
    return <ShowGrid shows={starredShows} />
  }
  if(starredShowsError) {
    return <TextCenter>Error occurred : {starredShowsError.message}</TextCenter>
  }

  return <TextCenter>Shows are loading</TextCenter>;
};

export default Starred;

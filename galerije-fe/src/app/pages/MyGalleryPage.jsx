import { useDispatch, useSelector } from "react-redux";
import { selectGalleries } from "../store/galleries";
import { getGalleries, getGallery } from "../store/galleries/slice";
import { selectSearchTerm } from "../store/galleries";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import GalleryComponent from "../components/GalleryRow";

export default function MyGalleryPage({ selfId } = null) {
  const dispatch = useDispatch();
  const galleries = useSelector(selectGalleries);
  const term = useSelector(selectSearchTerm);

  useEffect(() => {
    dispatch(getGalleries({ page: 1, term: null, userId: selfId }));
  }, [selfId, dispatch]);

  function handlePaginate(page) {
    dispatch(getGalleries({ page: page, term: term, userId: selfId }));
  }

  return (
    <div className="center-galleries">
      {galleries?.data.length ? (
        <div>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <ul className="list-group w-50">
              {galleries.data
                .filter((g) => g.user_id == selfId)
                .map((gallery) => (
                  <li className="list-group-item my-3" key={gallery.id}>
                    <GalleryComponent key={gallery.id} gallery={gallery} />
                  </li>
                ))}
            </ul>
          </div>
          {galleries.current_page !== galleries.last_page && (
            <Button
              variant="outline-dark"
              onClick={() => handlePaginate(galleries.current_page + 1)}
            >
              Load more
            </Button>
          )}
        </div>
      ) : (
        <div>No search results found.</div>
      )}
    </div>
  );
}
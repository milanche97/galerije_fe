import { useDispatch, useSelector } from "react-redux";
import { getGalleries, setSearchTerm } from "../store/galleries/slice";
// import { selectSearchTerm, selectSearchUserId, } from "../store/galleries/selector";
import { selectSearchTerm, selectSearchUserId } from "../store/galleries";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function Search() {
  const dispatch = useDispatch();

  const term = useSelector(selectSearchTerm);

  const userId = useSelector(selectSearchUserId);

  function handleChangeSearchTerm(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  function handleSearch() {
    dispatch(getGalleries({ page: 1, term: term, userId: userId }));
  }

  return (
    <Col sm={4}>
      <Form.Control
        className="px-3 my-0"
        type="text"
        onChange={handleChangeSearchTerm}
        placeholder="Search..."
      />
      <Button variant="outline-primary" onClick={handleSearch}>
        Search
      </Button>
    </Col>
  );
}



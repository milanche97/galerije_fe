import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGallery,
  deleteGallery,
  createComment,
  deleteComment,
} from "../store/galleries/slice";
import { selectGallery } from "../store/galleries";
import useFormattedDate from "../hooks/UseFormatedDate";
// import { selectIsAuthenticated, selectActiveUser } from "../store/auth/selector";
import { selectIsAuthenticated, selectActiveUser } from "../store/auth";
import { format } from "date-fns";
import { Carousel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function Gallery() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gallery = useSelector(selectGallery);
  const formattedDate = useFormattedDate(
    gallery ? gallery.created_at : "",
    "dd-MM-yyyy HH:mm"
  );
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const history = useHistory();
  const [newComment, setNewComment] = useState({ body: "" });

  useEffect(() => {
    dispatch(getGallery(id));
  }, [id, dispatch]);

  const handleContentChange = (e) => {
    setNewComment({ ...newComment, body: e.target.value });
  };

  const handleAddNewComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ body: newComment, galleryId: id }));
    setNewComment({ body: "" });
  };

  const handleDeleteComment = (id) => {
    const response = prompt(
      "Do you want to delete your comment? If so, type 'yes' "
    );
    if (response !== "yes") {
      return;
    }
    dispatch(deleteComment(id));
    history.push("/galleries");
  };

  const handleDeleteGallery = () => {
    const response = prompt(
      "Do you want to delete your gallery? If so, type 'yes' "
    );
    if (response !== "yes") {
      return;
    }
    dispatch(deleteGallery(id));
    history.push("/my-galleries");
  };

  return (
    <div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          border: "solid",
          margin: "5px",
          fontSize: "10px",
          boxSizing: "border-box",
        //   height: "10px"
        }}
      >
        {gallery ? (
          <>
            <h1 style={{ padding: "10px" }}>{gallery?.title}</h1>

            <h3 style={{ padding: "5px", color: "dark" }}>
              By:{" "}
              <Link
                to={`/authors/${gallery?.user?.id}`}
                style={{ color: "info" }}
              >
                {gallery?.user?.first_name} {gallery?.user?.last_name}
              </Link>
            </h3>

            {formattedDate === "unknown" ? (
              <div style={{ padding: "20px" }}>Unknown date</div>
            ) : (
              <div style={{ padding: "20px" }}>Created at: {formattedDate}</div>
            )}

            <div>
              <Carousel>
                {gallery.images && gallery.images.length
                  ? gallery.images.map((image, index) => (
                      <Carousel.Item key={image.id} interval={7000}>
                        <a
                          key={index}
                          rel="noreferrer"
                          target="_blank"
                          href={image.url}
                        >
                          <img
                            className="d-block w-100"
                            height="500"
                            key={image.id}
                            src={image.url}
                            alt="Gallery carousel element"
                          />
                        </a>
                      </Carousel.Item>
                    ))
                  : "No images found"}
              </Carousel>
            </div>
            <div>
              {gallery && gallery.description ? (
                <h3>
                  <p>{gallery.description}</p>
                </h3>
              ) : (
                <p>No Descripton</p>
              )}
            </div>
            {activeUser && activeUser.id === gallery.user_id ? (
              <Link to={`/edit-gallery/${gallery.id}`}>Edit Gallery</Link>
            ) : (
              <></>
            )}
            {activeUser && activeUser.id === gallery.user_id ? (
              <Button variant="outline-danger" onClick={handleDeleteGallery}>Delete Gallery</Button>     

            ) : (
              <></>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "start",
          alignItems: "center",
          border: "solid",
          margin: "5px",
        }}
      >
        {gallery && gallery.comments ? (
          <>
            {gallery.comments.length ? <h4>Comments</h4> : <h4>No Comments</h4>}
            <ul style={{ listStyleType: "none" }}>
              {gallery.comments.map((comment) => (
                <li key={comment.id} id={`comment${comment.id}`}>
                  <div>
                    {comment.user.first_name} {comment.user.last_name}
                  </div>
                  <div>
                    {format(new Date(comment.created_at), "dd-MM-yyyy HH:mm")}
                  </div>
                  <p>{comment.body}</p>
                  {activeUser && activeUser.id === comment.user.id ? (
                    <Button
                      variant="outline-dark"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete Comment
                    </Button>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}

        {isAuthenticated && (
          <form
            onSubmit={handleAddNewComment}
            style={{ fontFamily: "sans-serif", fontSize: "12px" }}
          >
            <textarea
              style={{ backgroundColor: "lightblue" }}
              required
              rows="3"
              cols="40"
              onChange={handleContentChange}
              value={newComment.body}
              placeholder="Leave a comment:"
            />
            <br />
            <Button type="submit">Submit</Button>
          </form>
        )}
      </div>
    </div>
  );
}

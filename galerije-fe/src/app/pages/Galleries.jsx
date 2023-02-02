import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectGalleries } from "../store/galleries";
import { useDispatch, useSelector } from "react-redux";
import { getGalleries, setSearchUserId } from "../store/galleries/slice";
import GalleryRow from "../components/GalleryRow";
import Search from "../components/Search";
import { setSearchTerm } from "../store/galleries/slice";
import Button from 'react-bootstrap/Button';

export default function GalleriesPages({selfId} = null) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const galleries = useSelector(selectGalleries);
    const term = useSelector(setSearchTerm);

    useEffect(() => {
        if(selfId){
            dispatch(setSearchUserId(selfId));
            dispatch(getGalleries({page: 1, term: null, userId: selfId}));
        }
        if(id){
            dispatch(setSearchUserId(id));
            dispatch(getGalleries({page: 1, term: null, userId: id}));
        }
        if(!id && !selfId){
            dispatch(setSearchUserId(null));
            dispatch(getGalleries({page: 1, term: null, userId: null}));
        }
    }, [selfId, id, dispatch]);

    function handlePaginate(page) {
        if(selfId){
            dispatch(getGalleries({page: page, term: term, userId: selfId}));
        }
        if(id){
            dispatch(getGalleries({page: page, term: term, userId: id}));
        }
        if(!id && !selfId){
            dispatch(getGalleries({page: page, term: term, userId: null}));
        }
    }

    return (
        <div>
            <h3> Galleries:</h3>
            <Search />
        
            {galleries?.data.length ? (
                <div>
                <ul>
                    {galleries.data.map((gallery) => (
                        <GalleryRow key={gallery.id} gallery={gallery} />
                    ))}
                </ul>
                    
                {galleries.current_page !== galleries.last_page && (
                    <Button variant="outline-dark" onClick={() => handlePaginate(galleries.current_page + 1)}>Load more</Button>
                )}
                </div>
            ) : (
                <div>No search results found.</div>
            )}
        </div>
    ); 
} 

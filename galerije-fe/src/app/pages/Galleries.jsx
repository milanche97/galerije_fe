import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries } from "../store/galleries";
import { getGalleries, setSearchUserId } from "../store/galleries/slice";
import GalleryRow from "../components/GalleryRow";
import Search from "../components/Search";
import { selectSearchTerm } from "../store/galleries";
import Button from 'react-bootstrap/Button';

export default function Galleries({selfId} = null) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const galleries = useSelector(selectGalleries);
    const term = useSelector(selectSearchTerm);

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

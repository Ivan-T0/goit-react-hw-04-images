import React, {  useEffect, useState } from "react";
import Button from "../Button/Button";
import getImages from '../../api/SearchImages'
import Loader from "components/Loader/Loader";
import Modal from '../Modal/Modal'
import cl from './ImageGallery.module.css'


const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

 const ImageGallery=(props)=> {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [ , setErrorMessage] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [showModal, setShowModal] = useState(false);

   

  useEffect(() => {
 

  if (props.query !== "") {
    setImages([]);
    setPage(1);
    setStatus(STATUS.PENDING);
    fetchImages();
  }
  }, [props.query]);
   
   
    const fetchImages = async () => {
    try {
      const response = await getImages({
        searchQuery: props.query,
        page: page,
        per_page: per_page,
      });
      setImages(prevImages => [...prevImages, ...response.hits]);
      setStatus(STATUS.RESOLVED);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error loading images");
    }
  };
   
  

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setStatus(STATUS.PENDING);
    fetchImages();
  };

 
  const handleImageClick = (imageURL) => {
    setModalImageUrl(imageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalImageUrl('');
    setShowModal(false);
  };

  
  
  const showLoadMoreButton = images.length > 0;

  if (status === STATUS.PENDING) {
    return <Loader />;
  }

  return (
    <div>
      {status === STATUS.RESOLVED && (
        <div>
          {images.length > 0 ? (
            <div>
                          <ul className={cl.gallery}>
                {images.map((image) => (
                    <li key={image.id} className={cl.gallery_item}>
                    <img
                      src={image.webformatURL}
                      alt={image.id}
                      width="300"
                      height="250"
                      onClick={() => handleImageClick(image.largeImageURL)}
                    />
                  </li>
                ))}
              </ul>
              {showLoadMoreButton && <Button onSubmit={handleLoadMore} />}
              {showModal && <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />}
            </div>
          ) : (
            <p>No images to display</p>
          )}
        </div>
      )}
    </div>
  );

}

export default ImageGallery
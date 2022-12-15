import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";
import PropTypes from 'prop-types';


export const ImageGallery = ({images, onModalOpen}) => {
    
    return (
    <Gallery>
        {images.map(({id, webformatURL, largeImageURL, tags}) => 
        (<li key={id}><ImageGalleryItem imgSrc={webformatURL} largeImageSrc={largeImageURL} description={tags} onClick={onModalOpen} /></li>))}
    </Gallery>
        
    )
}


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),),
    onModalOpen: PropTypes.func.isRequired,
}
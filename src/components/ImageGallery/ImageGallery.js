import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";


export const ImageGallery = ({images, onModalOpen}) => {
    
    return (
    <Gallery>
        {images.map(({id, webformatURL, largeImageURL, tags}) => 
        (<li key={id}><ImageGalleryItem imgSrc={webformatURL} largeImageSrc={largeImageURL} description={tags} onClick={onModalOpen} /></li>))}
    </Gallery>
        
    )
}
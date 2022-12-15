import { GalleryItem } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({imgSrc, largeImageSrc, description, onClick}) => {
    return (<GalleryItem>
        <a href={largeImageSrc} onClick={onClick}><img src={imgSrc} alt={description}/></a>
    </GalleryItem>)
}

ImageGalleryItem.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    largeImageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
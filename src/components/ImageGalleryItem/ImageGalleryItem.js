import { GalleryItem } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({imgSrc, largeImageSrc, description, onClick}) => {
    return (<GalleryItem>
        <a href={largeImageSrc} onClick={onClick}><img src={imgSrc} alt={description}/></a>
    </GalleryItem>)
}
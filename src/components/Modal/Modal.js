import { ModalImage, Overlay } from "./Modal.styled";
import PropTypes from 'prop-types';

  export const Modal = ({modalImgSrc, description, closeOnClick}) => {

    return (
        <Overlay className={"overlay"} onClick={closeOnClick}>
            <ModalImage  tabIndex={0}>
                <img src={modalImgSrc} alt = {description}/>
            </ModalImage>
        </Overlay>
    )
}

Modal.propTypes = {
    modalImgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    closeOnClick: PropTypes.func.isRequired,
}
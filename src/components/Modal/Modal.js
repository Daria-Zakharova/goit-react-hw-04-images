import { ModalImage, Overlay } from "./Modal.styled";

  export const Modal = ({modalImgSrc, description, onClose}) => {
    return (
        <Overlay className={"overlay"} onClick={onClose}>
            <ModalImage>
                <img src={modalImgSrc} alt = {description}/>
            </ModalImage>
        </Overlay>
    )
}

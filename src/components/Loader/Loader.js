import { BarLoader } from "react-spinners";
import { Overlay } from "components/Modal/Modal.styled";

export const Loader = () => {
    return (
        <Overlay>
            <BarLoader
                color="#3f51b5"
                height={5}
                width={100}
            />
        </Overlay>
    )
}
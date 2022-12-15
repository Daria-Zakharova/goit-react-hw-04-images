import { Button } from "./LoadMoreButton.styled";
import PropTypes from 'prop-types';

export const LoadMoreButton = ({loadOnClick}) => {
    return <Button onClick={loadOnClick}>Load More</Button>
}

LoadMoreButton.propTypes = {
    loadOnClick: PropTypes.func.isRequired,
}
import { SearchWrap, SearchForm } from "./Searchbar.styled";
import {GoSearch} from "react-icons/go";
import PropTypes from 'prop-types';


export const SearchBar = ({onSearch}) => {
    return (
    <SearchWrap>
        <SearchForm onSubmit={onSearch}>
            <button className="search__btn" type = "submit">
                <span className="search__btn-label">Search</span><GoSearch size="24"/>
            </button>
            <input className="search__input" type="text" autoComplete="off"
      autoFocus name="search" placeholder="Search images and photos"/>
        </SearchForm>
    </SearchWrap>)
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
}
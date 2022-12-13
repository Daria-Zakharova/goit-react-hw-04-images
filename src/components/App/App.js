import React, {Component} from "react";
// import { toast, Toaster } from "react-hot-toast";
import { fetchImages } from "utils/fetch-images";
import { bodyScroll } from "utils/toggleScroll";
import { AppEl } from "./App.styled";
import { SearchBar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { LoadMoreButton } from "components/LoadMoreButton/LoadMoreButton";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";

export class App extends Component {
  
  state = {
    query: '',
    images: [],
    page: 1,
    totalPages: 1,
    loading: false,
    modalOpen: false,
    modalImg: null,
  }

  async componentDidUpdate(_, prevState) {
    const {query, page, modalImg} = this.state;

    if(query !== prevState.query || page !== prevState.page) {
      this.setState({loading: true});
      bodyScroll.off();
      const newImages = await(await fetchImages(query, page)).data;
      const pages = await Math.ceil(newImages.totalHits / 12);
      this.setState(prevState => {return {images: [...prevState.images, ...newImages.hits], totalPages: pages, loading: false}});
      bodyScroll.on();
    }
// smooth scroll on next page render
    if(page !== 1 && !modalImg){
      window.scrollBy({
        top: (window.innerHeight - 160),
        behavior: 'smooth',
      });
    }
  }

    setQuery = (e) => {
    e.preventDefault();

    const searchQuery = e.target.elements.search.value;
    this.setState({query: searchQuery, images: [], page: 1});

    e.target.reset();  
  }

  // Налаштування modalImg, щоб скролл відбувався після рендеру сторінки 
  // (але не відбувався при закритті модального вікна)
  loadNextPage = () => {
    this.setState(prevState => {return {page: (prevState.page + 1), modalImg: null}});
  }

  openModal = (e) => {
    e.preventDefault();
    
    const imgLink = e.target.closest('a').href;
    const imgDescription = e.target.alt;
    
    if(!imgLink) {
      return;
    }    
    
    bodyScroll.off();
    this.setState({modalOpen: true, modalImg: {url: imgLink, alt: imgDescription}});
  }

  closeModal = (e) => {
    if(!e.target.classList.contains("overlay")){
      return;
    }

    bodyScroll.on(); 
    this.setState({modalOpen: false})
  };

  render = () => {
    const {images, page, totalPages, modalOpen, modalImg, loading} = this.state;

    return (
      <AppEl disableScroll={modalOpen}>
        <SearchBar onSearch = {this.setQuery}/>
        {images.length > 0 && <ImageGallery images={images} onModalOpen={this.openModal}/>}
        {totalPages > page && <LoadMoreButton loadOnClick={this.loadNextPage}/>}
        {modalOpen && <Modal modalImgSrc = {modalImg.url} description = {modalImg.alt} onClose = {this.closeModal}/>}
        {loading && <Loader/>}
      </AppEl>
    )
  }
}
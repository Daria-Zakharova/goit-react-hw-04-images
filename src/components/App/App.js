import React, {Component} from "react";
import { toast, Toaster } from "react-hot-toast";
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

      const response = await(await fetchImages(query, page)).data;
      const newImages = response.hits;
      const pages = Math.ceil(response.totalHits / 12);

      if (newImages.length === 0) {
        this.setState({loading: false});
        return toast.error("Sorry, there are no images matching your search query. Please try again.");
      }

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...newImages], 
          totalPages: pages, 
          loading: false,
        }
      });
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
    const {query} = this.state;
    const searchQuery = e.target.elements.search.value.trim().toLowerCase();
    
    if(searchQuery !== query){
      this.setState({
        query: searchQuery, 
        images: [], 
        page: 1,
        totalPages: 1,
        modalImg: null,
      });
    }
  }

  // Налаштування modalImg, щоб скролл відбувався після рендеру сторінки 
  // (але не відбувався при закритті модального вікна)
  loadNextPage = () => {
    this.setState(prevState => {
      return {
        page: (prevState.page + 1), 
        modalImg: null}
      });
  }

  openModal = (e) => {
    e.preventDefault();
    
    const imgLink = e.target.closest('a').href;
    const imgDescription = e.target.alt;
    
    if(!imgLink) {
      return;
    }    
    
    bodyScroll.off();
    document.addEventListener('keydown', this.closeModalOnEsc);
    this.setState({modalOpen: true, modalImg: {url: imgLink, alt: imgDescription}});
  }

  closeModal = () => {
    bodyScroll.on();  
    document.removeEventListener('keydown', this.closeModalOnEsc);
    this.setState({modalOpen: false});
  }

  closeModalonClick = (e) => {
    if(!e.target.classList.contains("overlay")){
      return;
    }
    this.closeModal();    
  };

  closeModalOnEsc = (e) => {
    if(e.code === "Escape") {
      this.closeModal();      
    }
  }

  render = () => {
    const {images, page, totalPages, modalOpen, modalImg, loading} = this.state;

    return (
      <AppEl disableScroll={modalOpen}>
        <Toaster position="top-right"/>
        <SearchBar onSearch = {this.setQuery}/>
        {images.length > 0 && <ImageGallery images={images} onModalOpen={this.openModal}/>}
        {totalPages > page && <LoadMoreButton loadOnClick={this.loadNextPage}/>}
        {modalOpen && <Modal modalImgSrc = {modalImg.url} description = {modalImg.alt} closeOnClick = {this.closeModalonClick}/>}
        {loading && <Loader/>}
      </AppEl>
    )
  }
}

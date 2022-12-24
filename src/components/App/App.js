import React, {useEffect, useLayoutEffect, useState} from "react";
import { toast, Toaster } from "react-hot-toast";
import { fetchImages } from "utils/fetch-images";
import { bodyScroll } from "utils/toggleScroll";
import { AppEl } from "./App.styled";
import { SearchBar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { LoadMoreButton } from "components/LoadMoreButton/LoadMoreButton";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      const response = await(await fetchImages(query, page)).data;
      const newImages = response.hits;

      if(newImages.length === 0) {
        setImages([]);
        setPage(1);
        setTotalPages(1);
        setLoading(false);
        
        return toast.error(`Sorry, there are no images matching ${query}. Please try another query.`);
      }

      const pages = Math.ceil(response.totalHits / 12);
      setImages(images => [...images, ...newImages]);
      setTotalPages(pages);
      setLoading(false);
    }
    query && getImages();
  }, [query, page]);

  useLayoutEffect(() => {  
    // smooth scroll on next page render
    if(page !== 1 && !modalImg) {
      window.scrollBy({
        top: (window.innerHeight - 160),
        behavior: 'smooth',
      });
    } 
  });

  const changeQuery = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value.trim().toLowerCase();
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
      setTotalPages(1);
      setModalImg(null);
    }
  }

  // Налаштування modalImg, щоб скролл відбувався після рендеру сторінки 
  // (але не відбувався при закритті модального вікна)
  const loadNextPage = () => {
        setPage(page + 1); 
        setModalImg(null);
  }

  const openModal = e => {
    e.preventDefault();
    
    const imgLink = e.target.closest('a').href;
    const imgDescription = e.target.alt;
    
    if(!imgLink) {
      return;
    }    
    
    bodyScroll.off();
    document.addEventListener('keydown', closeModalOnEsc);
    setModalOpen(true);
    setModalImg({url: imgLink, alt: imgDescription});
  }

  const closeModal = () => {
    bodyScroll.on();  
    document.removeEventListener('keydown', closeModalOnEsc);
    setModalOpen(false);
  }

  function closeModalonClick (e) {
    if(!e.target.classList.contains("overlay")){
      return;
    }
    closeModal();    
  };

  function closeModalOnEsc (e) {
    if(e.code === "Escape") {
      closeModal();      
    }
  }

  return (
    <AppEl disableScroll={modalOpen}>
      <Toaster position="top-right"/>
      <SearchBar onSearch = {changeQuery}/>
      {images.length > 0 && <ImageGallery images={images} onModalOpen={openModal}/>}
      {totalPages > page && <LoadMoreButton loadOnClick={loadNextPage}/>}
      {modalOpen && <Modal modalImgSrc = {modalImg.url} description = {modalImg.alt} closeOnClick = {closeModalonClick}/>}
      {loading && <Loader/>}
    </AppEl>
  )
};
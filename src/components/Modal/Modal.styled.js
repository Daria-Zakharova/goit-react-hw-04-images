import styled from "@emotion/styled";

export const ModalImage = styled.div`
  width: fit-content;

  img {
    max-width: calc(100vw - 24px);
    max-height: calc(100vh - 48px);
  }
  `;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10;
    overflow: hidden;

`;
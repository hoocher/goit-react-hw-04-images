import { styled } from 'styled-components';

export const ULImageGallery = styled('ul')(() => {
  return {
    display: 'grid',
    maxWidth: 'calc(100vw - 48px)',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gridGap: '16px',
    marginTop: '0px',
    marginBottom: '15px',
    padding: '0px',
    listStyle: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
  };
});

export const LIImageGallery = styled('li')(() => {
  return {
    borderRadius: '2px',
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2) 0px 1px 1px 0px rgba(0, 0, 0, 0.14) 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
  };
});

export const ImageGalleryItemImage = styled('img')(() => {
  return {
    width: '100%',
    height: '260px',
    objectFit: 'cover',
    transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': { transform: 'scale(1.03)', cursor: 'zoom-in' },
  };
});

import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  @media(max-width:600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  .gallery-item {
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      display: block;
      aspect-ratio: 4/3;
      object-fit: cover;
      transition: transform .4s, filter .3s;
    }
    &:hover img {
      transform: scale(1.07);
      filter: brightness(1.08);
    }
  }
`

const GalleryGrid = ({ images }) => {
  return (
    <Grid>
      {images.map((src, i) => (
        <div key={i} className="gallery-item">
          <img src={src} alt={`Gallery ${i+1}`} />
        </div>
      ))}
    </Grid>
  )
}

export default GalleryGrid
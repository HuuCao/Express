import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import _ from 'lodash'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ENDPOINT
    : process.env.REACT_APP_API_ENDPOINT_DEV

export default ({ images, width }) => {
  if (!images) {
    return <div></div>
  }
  if (!_.isArray(images)) {
    images = [images]
  }
  if (images.length === 0) {
    return <div></div>
  }
  return (
    <Carousel showThumbs={false} width={width || 150}>
      {images.map((uri, index) => {
        return (
          <div key={'cal-item-' + index}>
            <img
              style={{ minWidth: 50, maxWidth: width || 150 }}
              src={
                typeof uri === 'string'
                  ? uri.includes('http')
                    ? uri
                    : baseUrl + uri
                  : uri.thumbUrl
                  ? uri.thumbUrl
                  : uri.url
              }
            />
          </div>
        )
      })}
    </Carousel>
  )
}

import { useContext, useEffect } from "react"
import { useState } from "react"
import { AuthContext } from './context'
import { getImages } from "./api"

const Images = () => {
  const [images, setImages] = useState([])
  const { auth } = useContext(AuthContext)

  useEffect(
    () => {
      if (auth.accessToken) {
        getImages({ auth })
          .then(response => {
            console.log('GET IMAGES: RESPONSE: ', response)
            setImages(response.data)
          })
          .catch(error => console.log('ERROR: ', error))
      }
    }, 
    [auth.accessToken]
  )


  return (
    <div style={{ marginTop: 20 }}>
      <hr />
      <h1>Images</h1>
      {images && images.map(image => (
        <div key={image.id}>
          <h4>{image.title}</h4>
          <img
            src={`http://127.0.0.1:8000/${image.image}`}
            style={{ width: '80%' }}
          />
        </div>
      ))}
    </div>
  )
}

export default Images
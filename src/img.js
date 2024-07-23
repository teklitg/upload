import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', image);

    axios.post('http://localhost:5000/upload', formData)
      .then((response) => {
        setImageURL(response.data.url);
        fetchImages();
      })
      .catch((err) => console.error(err));
  };

  const fetchImages = () => {
    axios.get('http://localhost:5000/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageURL && <img src={imageURL} alt="Uploaded" style={{ width: '200px' }} />}
      <div>
        {images.map((img) => (
          <img key={img._id} src={img.url} alt="Uploaded" style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageModal from "./ImageModalFNH";
import { useNavigate } from "react-router-dom";
import AdoptButton from "./AdoptButton";

function FriendNeedsHome() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [usergalleryData, setuserGalleryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate('');

  //uploading feild
  const [caption, setCaption] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medhistory, setMedHistory] = useState("");
  const [species, setSpecies] = useState("");
  const [others, setOthers] = useState("");

  

  const handleEditCaption = (event) => {
    setCaption(event.target.value);
  };
  const handleEditBreed = (event) => {
    setBreed(event.target.value);
  };
  const handleEditGender = (event) => {
    setGender(event.target.value);
  };
  const handleEditAge = (event) => {
    setAge(event.target.value);
  };
  const handleEditSpecies = (event) => {
    setSpecies(event.target.value);
  };
  const handleEditOthers = (event) => {
    setOthers(event.target.value);
  };
  const handleEditMedHistory = (event) => {
    const { value } = event.target;
    if (medhistory.includes(value)) {
      // If already selected, remove it from the array
      setMedHistory(medhistory.filter(term => term !== value));
    } else {
      // If not selected, add it to the array
      setMedHistory([...medhistory, value]);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); 
    setSelectedImage(selectedFiles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/gallery");
  
      const sortedImages = response.data.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime(); 
        const timeB = new Date(b.createdAt).getTime(); 
        return timeA - timeB; 
      });
  
      setuserGalleryData(sortedImages.map(image => ({ ...image, isAdoptFormVisible: false })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddToGallery = async () => {
    try {
      const token = localStorage.getItem('token');
      const verified = localStorage.getItem('verified');

      if (!token) {
        alert("You need to log in first, please log in");
        navigate('/login')
        return; 
      }
      if (!verified) {
        alert('Not yet verified, Click Ok to see Verifaction status')
        navigate('/valid')
        return;
      }
      if (!selectedImage || !caption || !breed || !gender || !age || medhistory.length === 0) {
        alert("All fields are required");
        return;
      }
      const formData = new FormData();

      selectedImage.forEach(file => formData.append("images", file));

      formData.append("caption", caption);
      formData.append("breed", breed);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("species", species)
      formData.append("medhistory", medhistory.join(", "));  
      formData.append("others", others)

      await axios.post("http://localhost:8000/api/user/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      alert('Image uploaded successfully');
      window.location.reload();

    } catch (error) {
      console.error("Error uploading:", error);
      console.log("Error response:", error.response); 
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage({ imageUrl });
    setIsModalOpen(true);

    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsModalOpen(false);

    document.body.classList.remove("modal-open");
  };

  return (
    <div className="gallery-main">
    <div className="gallery-container">
        <button onClick={() => setIsFormVisible(!isFormVisible)} className="form-visible">
          {isFormVisible ? "hide pet adoption advocate" : "pet adoption advocate"}
        </button>
        {isFormVisible && ( 
          <div className="form-group">
            <label className='form-group-label'>Maximum of 4 images
            <input className="form-group-input" type="file" accept="images/*" onChange={handleFileChange} multiple required/>
            </label>
            <label className='form-group-label'>Caption:
            <input className="form-group-input" type="text" placeholder="Enter Pet's Name" value={caption} onChange={handleEditCaption} required/>
            </label>
            <label className='form-group-label'>Breed:
            <input className="form-group-input" type="text" placeholder="Enter Breed" value={breed} onChange={handleEditBreed} required/>
            </label>
            <label className='form-group-label'>Species:
            <input className="form-group-input" type="text" placeholder="Type of animal" value={species} onChange={handleEditSpecies} />
            </label>
            <label className='form-group-label'>Select gender:
            <select value={gender} onChange={handleEditGender} required> 
              <option value="" required disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            </label>
            <label className='form-group-label'>Age:
            <input className="form-group-input" type="text" placeholder="Age in months" value={age} onChange={handleEditAge} required/>
            </label>
            <label className='form-group-label'>Medical History:</label>
              <label className='form-group-label'>
                <input className="form-group-input" type="checkbox" value="vaccinated" checked={medhistory.includes("vaccinated")} onChange={handleEditMedHistory}/>
                Vaccinated
              </label>
              <label className='form-group-label'>
                <input className="form-group-input" type="checkbox" value="dewormed" checked={medhistory.includes("dewormed")} onChange={handleEditMedHistory}/>
                Dewormed
              </label>
              <label className='form-group-label'>
                <input className="form-group-input" type="checkbox" value="neutered" checked={medhistory.includes("neutered")} onChange={handleEditMedHistory}/>
                Neutered
              </label>
              <label className='form-group-label'>
                Others:
                <input className="form-group-input" type="text" placeholder="Please specify" value={others} onChange={handleEditOthers}/>
              </label>
            <button onClick={handleAddToGallery} className="add-gallery">Add to Gallery</button>
          </div>
        )}
      </div>
      <div className="uploaded-images">
        {usergalleryData.map(group => (
          <div key={group._id} className="gallery-group">
            <div className="information">
            <p><strong>Posted by:</strong> {group.user_email}</p>
            <p><strong>Pet's Name:</strong> {group.images[0].caption}</p>
            <p><strong>Species:</strong> {group.images[0].species}</p>
            <p><strong>Breed:</strong> {group.images[0].breed}</p>
            <p><strong>Gender:</strong> {group.images[0].gender}</p>
            <p><strong>Age in months:</strong> {group.images[0].age}</p>
            <p><strong>Medical History:</strong> {group.images[0].medhistory} {group.images[0].others}</p>
            <AdoptButton imageUrl={group.images[0].imageUrl} /> 
            </div>
            <div className="images-wrapper">
              {group.images.map((group,index) =>
              <div key={index} className="gallery-image-container">
                <img 
                src={`http://localhost:8000/uploads/${group.imageUrl}`}
                alt={group.caption}
                className="gallery-image"
                onClick={() => openModal(group.imageUrl)}/> 
              </div>
              )}
            </div>
            </div>
        ))}
      </div>
      {isModalOpen && (
        <ImageModal
          imageUrl={`http://localhost:8000/uploads/${selectedImage.imageUrl}`}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default FriendNeedsHome;

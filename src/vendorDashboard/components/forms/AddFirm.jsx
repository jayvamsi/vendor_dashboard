import React,{useState} from 'react'
import {API_URL} from '../../data/apiPath'


const AddFirm = () => {
  const [firmName,setFirmName]=useState("");
  const [area,setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);


  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value))
    }else{
      setCategory([...category,value])
    }
  }

  const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item!==value))
    }else{
      setRegion([...region,value])
    }
  }


  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage)
  }

  const handleFirmSubmit=async(e)=>{
    e.preventDefault();
    try {
      const loginToken=localStorage.getItem('loginToken');
      if(!loginToken){
        console.error("user not authenticated");
      }
      const formData=new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);
      
      category.forEach((value)=>{
        formData.append('category',value)
        
      });
      region.forEach((value)=>{
        formData.append('region',value)
      })
       const response=await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
       });
       const data=await response.json()
       if(response.ok){
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setOffer("");
        setRegion([]);
        setFile(null);
        alert("Restaurant added succesfully");
       }else if(data.message === "vendor can have only one firm"){
        alert("Firm Exists 😊. Only  1 firm can be added")
       }else{
        alert('Failed to add firm')
       }

       console.log("this is firm id:",data.firmId)
       const mango=data.firmId;

       localStorage.setItem('firmId',mango)


    } catch (error) {
      console.error("failed to add restaurant");
    }
  }

  return (
    <div className="firmSection">
        
        <form className="tableForm" onSubmit={handleFirmSubmit} >
            <h3>Add Restaurant</h3>
            <label >Restaurant Name</label>
            <input type='text' name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)} /><br/>

            <label >Area</label>
            <input type='text' name='area' value={area} onChange={(e)=>setArea(e.target.value)}/><br/>
{/*category*/}
             <div className="checkInp">
              <label>Category</label>
                <div className="inputsContainer">
                  <div className="checkboxContainer">
                  <label>Veg</label>
                  <input type='checkbox' checked= {category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
                  </div>
             
                  <div className="checkboxContainer">
                  <label>Non-Veg</label>
                  <input type='checkbox' checked= {category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
                  </div>
                </div>
              </div>


            <label >Offer</label>
            <input type='text' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/><br/>
{/* region*/}
              <div className="checkInp">
              <label>Region</label>
                <div className="inputsContainer">
                  <div className="regBoxContainer">
                  <label>South-Indian</label>
                  <input type='checkbox' checked={region.includes('South-Indian')} value="South-Indian" onChange={handleRegionChange}/>
                  </div>
             
                  <div className="regBoxContainer">
                  <label>North-Indian</label>
                  <input type='checkbox' checked={region.includes('North-Indian')} value="North-Indian" onChange={handleRegionChange}/>
                  </div>

                  <div className="regBoxContainer">
                  <label>Chinese</label>
                  <input type='checkbox'checked={region.includes('Chinese')} value="Chinese" onChange={handleRegionChange}/>
                  </div>

                  <div className="regBoxContainer">
                  <label>Bakery</label>
                  <input type='checkbox'checked={region.includes('Bakery')} value="Bakery" onChange={handleRegionChange}/>
                  </div>
                </div>
              </div>

            

            <label >Image</label>
        <input type='file' onChange={handleImageUpload} required />
        
            <br/>

            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm
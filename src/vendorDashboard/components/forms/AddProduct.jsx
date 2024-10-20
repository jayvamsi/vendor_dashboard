import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName,setProductName]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState([]);
  const [bestSeller,setBestSeller]=useState(false);
  const [image,setImage]=useState(null);
  const [description,setDescription]=useState("");


  const handleBestSeller=(event)=>{
    const value=event.target.value === 'true'
    setBestSeller(value)
  }

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value))
    }else{
      setCategory([...category,value])
    }
  }


  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage)}


  const handleAddProduct=async(e)=>{
    e.preventDefault();
    try {
      const loginToken=localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId')
      if(!loginToken || !firmId){
        console.error("user not defined");
      }
      const formData=new FormData();
      formData.append('productName',productName);
      formData.append('price',price);
      formData.append('description',description);
      formData.append('image',image);
      
      category.forEach((value)=>{
        formData.append('category',value)
        
      });

      const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
          method:'POST',
          
          body:formData
        })
        const data=await response.json()
        if(response.ok){
          alert("Product added Succesfully");
         }
         setProductName("");
          setPrice("");
          setCategory([]);
          setBestSeller(false);
          setDescription("");
          setImage(null);
      
    } catch (error) {
      alert('Failed to add Product');
    }

  }
  
  return (
    <div className="firmSection">
        
    <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label >Product Name</label>
        <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/><br/>

        <label >Price</label>
        <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>

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

        <div className="checkInp">
              <label>BestSeller</label>
                <div className="inputsContainer">
                  <div className="checkboxContainer">
                  <label>Yes</label>
                  <input type='radio' value="true" checked={bestSeller=== true} onChange={handleBestSeller}/>
                  </div>
             
                  <div className="checkboxContainer">
                  <label>No</label>
                  <input type='radio' value="false" checked={bestSeller=== false} onChange={handleBestSeller}/>
                  </div>
                </div>
              </div>

        <label >Description</label>
        <input type='text' value={description}  onChange={(e)=>setDescription(e.target.value)}/><br/>

        <label >Image</label>
        <input type='file' onChange={handleImageUpload} required/><br/>

        <div className="btnSubmit">
            <button type='submit' >Submit</button>
        </div>
    </form>
</div>
  )
}

export default AddProduct
import { React, useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'



function App() {
const [movieName, setMovieName] = useState('');
const [review, setReview] = useState('');
const [movieReviewList, setMovieReviewList] = useState([])
const [newReview, setNewReview] = useState('')
useEffect(()=>{
Axios.get("http://localhost:3001/api/get").then((response)=>{
  setMovieReviewList(response.data)
})
},[])

const submiReview = ()=>{
  Axios.post("http://localhost:3001/api/insert",{

    movieName: movieName,
    movieReview: review
  })
    //display movie add w/o refreshing the page
    setMovieReviewList([
      ...movieReviewList, 
      {movieName: movieName, movieReview: review}
    ])
  }

  function deleteReview(id){
   Axios.delete(`http://localhost:3001/api/delete/${id}`)
  }

  function updateReview(id){
    Axios.put(`http://localhost:3001/api/update/${id}`,{
      id: id,
    movieReview: newReview
    }).then((res)=>console.log(res))
    .catch((err)=>console.log(err))
    
  }
  

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='form'>
        <label>Movie name:</label>
        <input type="text" name="movieName" onChange={(e)=>{
          setMovieName(e.target.value)
        }}/>
        <lable>Review</lable>
        <input type="text" name="review" onChange={(e)=>{
          setReview(e.target.value)
        }}/>
        <button onClick={submiReview} className="btn">Submit</button>
        {movieReviewList.map((val)=>{
          return <div className='card' key={val.id}>
          <p>{val.id}</p><h1>{val.MovieName}</h1>
            <p>{val.movieReview}</p>
            <button onClick={()=>{deleteReview(val.id)}}>Delete</button>
            <input type='text' id='updateinput' onChange={(e)=>{
                  setNewReview(e.target.value)
            }}/>
            <button onClick={()=>updateReview(val.id)}>Update</button>
          </div>
      })}
      </div>
    </div>
  );
}

export default App;
 
import axios from "axios";

//mongodb+srv://CS345:de3s2VTZ5dpXY_K@cluster0-sxmnr.mongodb.net/admin
 // mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest"
 
 
export const getList = () => {
  console.log("fwerfe");
  return axios
    .get("https://intense-stream-11530.herokuapp.com/posts/", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res.data);
      console.log("This is the data");
      var x = JSON.stringify(res.data)
    
      console.log(x)
      return (res.data)
      //return res.data;

    });
  /*.then(data => {
      console.log(data);
    });*/
};

export const addToList = (userName,text,image,date) => {
  
  return axios.post('https://intense-stream-11530.herokuapp.com/posts/',
  {
          name: userName,
          text: text, 
          image: image, 
          date: date,
  }, {
          headers: {
              'Content-Type': "application/json" 
          },
  })
  .then(response => { 
    console.log(response)
  })
  .catch(error => {
      console.log(error.response)
  });
}


export const updateItem = (id,numberLikes,numberDislikes ) => {
  return axios
    .put(
      `https://intense-stream-11530.herokuapp.com/posts/${id}/update`,
      {
        likes: numberLikes,
        dislikes: numberDislikes,
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      console.log(response);
    });
};


export const deleteItem = term => {
  axios
    .delete(`http://localhost:5000/api/task/${term}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};


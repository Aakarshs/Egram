import React, { Component } from "react";
import TopPosters from "./Components/posts.js";
import TopPosts from "./Components/TopPosts";
import FeedTable from "./Components/FeedTable";

import { getList, addToList, updateItem } from "./Api/HttpApi";


const Styles = {
  ButtonBg: { left: 25, bottom: 15, width: 50, height: 50, borderRadius: 100, borderWidth: 0, position: 'relative', marginLeft: "85%", backgroundColor: "#1B99D2" },
  ButtonImage:{ width: 22, height: 18, marginBottom: 2},
  DoneButton:{ backgroundColor: "rgb(18, 106, 156)", color: 'white', borderWidth: 0, padding: 15, paddingLeft: 40, paddingRight: 40, borderRadius: 100 },
  CancelButton:{ backgroundColor: 'rgba(0,0,0,0.2)', color: "white", borderWidth: 0, padding: 15, paddingLeft: 25, paddingRight: 25, margin: 20, borderRadius: 100 },
  ModalBg:{ zIndex: 9, boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)", width: 500, height: 200, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: 25 }
}


class List extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      term: "",
      userName: "",
      editDisabled: false,
      likes: 0,
      dislikes: 0,
      items: [],
      file: null,
      image: '',
      showModal: false,
      showModalImage: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getCurrentDateTime = () => {
    var today = new Date(),
    day = today.getDate(),
    month = today.getMonth(),
    hour = today.getHours(),
    minutes = today.getMinutes();
    var monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
    var dateTime = day + " " + monthNameArray[month] + " " + hour + ":" + minutes;
    return dateTime
  }

  getAll = () => {
    getList().then(data => {
      var arr = []
      for (var i in data) {
        arr.push(i.posts);
      }
      this.setState(
        {
          term: "",
          items: data.posts,
        },
      );
    });
  };


  onUpdate = (e) => {
    this.getAll();
  };

  onChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  onChangeUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  addToDatabase = () => {
    if (this.state.userName == "" || this.state.text == "") {
      alert("Please fill in the username and password")
    }
    else {
      addToList(
        this.state.userName,
        this.state.text,
        this.state.showModalImage,
        this.getCurrentDateTime(),
      )
      alert('Your post has been posted!!');
      this.getAll();
      this.onUpdate();
      this.setState({
        id: "",
        text: "",
        name: "",
        userName: "",
        editDisabled: false,
        likes: 0,
        dislikes: 0,
        items: [],
        file: null,
        image: '',
        showModal: false,
        showModalImage: '',
      });
    }
  }

  updateLikes = (_id, likes, dislikes) => {
    updateItem(_id, likes, dislikes);
    this.getAll();
    this.onUpdate();
  }

  onChangeImage = (event) => {
    this.setState({
      showModalImage: event.target.value
    });
  };
 
  
  render() {
    var myData = [...this.state.items];
    myData.sort((a, b) => b.likes - a.likes);

    var cancel_image = <div style={{ marginLeft: 230, width: 50, borderRadius: 100, boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)", right: 0, height: 50, backgroundColor: "rgba(0,0,0,0.2)", }}>  </div>

    if (this.state.showModalImage != "") {
      var cancel_image =
        <div style={{ display: 'flex' }}>
          <div onClick={() => { this.setState({ showModalImage: "" }) }} style={{ width: 50, top: 100, left: -22, position: "absolute", borderRadius: 100, boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)", right: 0, height: 50, backgroundColor: "red", opacity: 0.8 }}>
            <div style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
              <img style={{ width: 30, height: 30, left: 10, top: 20 }} src={require("./Assets/cancel.png")} />
            </div>
          </div>
        </div>
    }
    else {
      var cancel_image = null;
    }

    var modal = null;
    if (this.state.showModal == false) {
      modal = null
    }
    else {
      modal =
        <div style={Styles.ModalBg}>
          <div>
            <input style={{ width: 400, height: 60, backgroundColor: 'rgba(0,0,0,0.1)', paddingLeft: 20, padding: 10, borderWidth: 0, borderRadius: 100, margin: 20, }} type="text" placeholder={"Put image URL here"} onChange={this.onChangeImage.bind(this)} />
          </div>
          <div>
            <button style={Styles.DoneButton} onClick={() => { this.setState({ showModal: false }); this.forceUpdate(); }}> Done </button>
            <button style={Styles.CancelButton} onClick={() => { this.setState({ showModal: false }) }}> Cancel </button>
          </div>
        </div>
    }

    return (
      <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
        <div style={{marginTop:50}}></div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
          <div>
            <div>
              <img style={{ width: 160, height: 180, }} src={require("./Assets/egram_logo.png")} />
              <div style={{ textAlign: 'center', marginTop: 30, }}>
                Please do not use this web application to share personal information. 
                This is an open source project and we are not liable for 
                any thing that this web application is being used to share.
              </div>
            </div>
          </div>


          <div style={{ marginRight: 50, marginLeft: 50 }}>
            {/*Status Form*/}
            <div style={{ backgroundColor: "white", boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)", padding: 20, borderRadius: 25, margin: 10, }}>
              {/*Display image while submitting form.*/}
              <div>
                <img style={{ maxWidth: "100%", borderRadius: 25, }} src={this.state.showModalImage} />
                {cancel_image}
                <div style={{ marginLeft: 20 }}> {modal} </div>
                <img src={this.state.image} />
              </div>

              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: 'center', alignContent: 'center', justifyContent: 'space-between' }}>
                    <input style={{ backgroundColor: 'rgba(211,211,211,0.2)', border: 0, padding: 20, width: 300, borderRadius: 15, marginBottom: 10 }} type="text" value={this.state.userName || ""} onChange={this.onChangeUserName.bind(this)} placeholder={"Enter your name"} />
                    <div onClick={() => { this.addToDatabase() }} style={{ textAlign: 'center', alignContent: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 20, width: 150, height: 60, borderRadius: 100, borderWidth: 0, backgroundColor: 'rgb(18, 106, 156)', color: 'white' }} >
                      <div style={{ marginTop: 20, }}> Post Now </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(211,211,211,0.2)', height: 150, border: 0, padding: 15, borderRadius: 15 }}>
                    <textarea type="text" id="exampleInputEmail1" value={this.state.text || ""} placeholder={"What do you want to share with your community?!"} resize={null} rows={3} onChange={this.onChange.bind(this)} style={{ width: 500, height: 80, backgroundColor: "rgba(0,0,0,0)", borderWidth: 0, }} />
                    <button style={Styles.ButtonBg} onClick={() => { this.setState({ showModal: true }) }}> <img style={ Styles.ButtonImage } src={require("./Assets/upload_image.png")} /> </button>
                  </div>
                </div>
              </div>
            </div>
            {/*Table for the posts*/}
            <FeedTable data={this.state.items} />
          </div>

          {/*Right Section*/}
          <div style={{ display: 'flex', flexDirection: 'column', }}>
            {/*Top Posts*/}
            <TopPosts data={myData} />
            {/*Top Posters*/}
            <TopPosters data={myData} />
          </div>
        </div>
      </div>
      </div>
        </div>
      </div>
    );
  }
}

export default List;

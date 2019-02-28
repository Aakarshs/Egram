import React, { Component } from "react";
import { getList, addToList, deleteItem, updateItem } from "./ListFunctions";

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
      showModalImage:"",
    };


    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

    this.getAll();
    console.log(this.state.items);
    console.log("fwefergsretgesrgrtgtr");
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
      console.log(data.posts);
      var arr = []
      for (var i in data) {
        arr.push(i.posts);
      }
      console.log(arr);
      this.setState(
        {
          term: "",
          items: data.posts,
        },
        () => {

        }
      );
    });
  };

  onUpdate = e => {
    //e.preventDefault();
    //updateItem(this.state.term, this.state.id).then(() => {
    this.getAll();
    //});
  };


  onChange = event => {
    this.setState({
      text: event.target.value
    });

  };

  onChangeUserName = event => {
    this.setState({
      userName: event.target.value,
    });
    //console.log(this.state.editDisabled);
  };

  addToDatabase() {
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
      });
    }
  }


  updateLikes = (_id, likes, dislikes) => {
    updateItem(_id, likes, dislikes);
    this.getAll();
    this.onUpdate();
  }


  onChangeImage = event => {
    this.setState({
      showModalImage: event.target.value
    });
  };

  test = () => {
    var data = [{
      "id": 110,
      "name": "FIAT",
      "active": true,
      "parentId": "1"
    }, {
      "id": 106,
      "name": "AUDI",
      "active": true,
      "parentId": "1"
    }, {
      "id": 107,
      "name": "BMW",
      "active": true,
      "parentId": "1"
    }, {
      "id": 109,
      "name": "RENAULT",
      "active": true,
      "parentId": "1"
    }];


    data.sort((a, b) => {
      return a.id > b.id;
    });

  }

  render() {
    console.log("??????????????????");
    var myData = [...this.state.items];
    myData.sort((a, b) => b.likes - a.likes);

    var cancel_image = <div style={{marginLeft:230,width:50, borderRadius:100,  boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)",  right:0, height:50, backgroundColor:"rgba(0,0,0,0.2)",}}>  </div>

    if(this.state.showModalImage!=""){
      var cancel_image = <div onClick={()=>{this.setState({showModalImage:""})}} style={{ width:50, top:100, left:-22, position:"absolute", borderRadius:100,  boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)",  right:0, height:50, backgroundColor:"red",}}>  </div>
    }
    else{
      var cancel_image = null;
    }

    console.log(myData)
    console.log("??????????????????");

    var modal = null;
    if (this.state.showModal == false) {
      modal = null
    }
    else {
      modal =
        <div style={{ zIndex: 9, boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)", width: 500, height: 200, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: 25 }}>
          <div>
            
            <input
              style={{ width: 400, height: 60 , backgroundColor:'rgba(0,0,0,0.1)', paddingLeft:20, padding:10, borderWidth:0, borderRadius:100, margin:20,}}
              type="text"
              placeholder={"Put image URL here"}
              onChange={this.onChangeImage.bind(this)}
            />
          </div>
          <div>
            <button
             style={{backgroundColor:"rgb(18, 106, 156)",color:'white', borderWidth:0, padding:15, paddingLeft:40, paddingRight:40, borderRadius:100}}
            onClick={() => {
              this.setState({ showModal: false })
              //console.log(modal);
              this.forceUpdate();
            }}> Done </button>

            <button style={{backgroundColor:'rgba(0,0,0,0.2)',color:"white", borderWidth:0, padding:15, paddingLeft:25, paddingRight:25, margin:20, borderRadius:100}} onClick={() => { this.setState({ showModal: false }) }}> Cancel </button>
          </div>
        </div>
    }

    return (
      <div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
          <div>
            <div>
              <img style={{ width: 160, height: 180, }} src={require("./egram_logo.png")} />
              <div style={{ textAlign: 'center', marginTop: 30, }}>
                Please do not use this web application to share personal information. This is an open source project and we are not liable for any thing that this web application is being used to share.
          </div>
            </div>
          </div>


          <div style={{ marginRight: 50, marginLeft: 50 }}>
            {/*Status Form*/}
            <div
              style={{
                backgroundColor: "white",
                boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)",
                padding: 20,
                borderRadius: 25,
                margin: 10,
              }}>

              <label htmlFor="exampleInputEmail1">
                <img style={{ maxWidth:"100%", borderRadius:25,}} src={this.state.showModalImage} />
            
               {cancel_image}
                <div style={{marginLeft:20}}>
                {modal}
                </div>
                <img src={this.state.image} />
              </label>

              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: 'center', alignContent: 'center', justifyContent: 'space-between' }}>
                    <input
                      style={{ backgroundColor: 'rgba(211,211,211,0.2)', border: 0, padding: 20, width: 300, borderRadius: 15, marginBottom: 10 }}
                      type="text"
                      value={this.state.userName || ""}
                      onChange={this.onChangeUserName.bind(this)}
                      placeholder={"Enter your name"}
                    />
                    <div onClick={() => { this.addToDatabase() }} style={{ textAlign: 'center', alignContent: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 20, width: 150, height: 60, borderRadius: 100, borderWidth: 0, backgroundColor: 'rgb(18, 106, 156)', color: 'white' }} >
                      <div style={{ marginTop: 20, }}>
                        Post Now
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(211,211,211,0.2)', height: 150, border: 0, padding: 15, borderRadius: 15 }}>
                    <textarea
                      type="text"
                      id="exampleInputEmail1"
                      value={this.state.text || ""}
                      placeholder={
                        "What do you want to share with your community?!"
                      }
                      resize={null}
                      rows={3}
                      onChange={this.onChange.bind(this)}
                      style={{ width: 500, height: 80, backgroundColor: "rgba(0,0,0,0)", borderWidth: 0, }}
                    />
                    <button style={{ left: 25, bottom: 15, width: 50, height: 50, borderRadius: 100, borderWidth: 0, position: 'relative', marginLeft: "85%", backgroundColor: "#1B99D2" }} onClick={() => { this.setState({ showModal: true }) }}>
                      <img style={{ width: 22, height: 18, marginBottom: 2 }} src={require("./upload_image.png")} />
                    </button>
                  </div>
                </div>
                <div>
                  {/* <button onClick={this.onUpdate.bind(this)}> Update </button> */}
                </div>
              </div>
            </div>


            {/*Posts*/}
            <div>
              <div style={{ marginLeft: 20, }}>
                <div style={{ fontSize: 30, marginLeft: 20, fontWeight: 300 }}>POSTS</div>
                <tbody>
                  {this.state.items.slice(0).reverse().map((item, index) => (
                    <tr key={index}>
                      <div
                        style={{
                          justifyContent: "center",
                          margin: 20,
                          width: 500,
                          backgroundColor: "white",
                          boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)",
                          borderRadius: 25,
                          paddingBottom: 20,
                        }}>
                        <img style={{ width: "100%", marginBottom: 30, borderTopLeftRadius: 25, borderTopRightRadius: 25, }} src={item.image} />
                        <div style={{ marginLeft: 20 }}>

                          <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
                            <div
                              style={{
                                backgroundColor: "#2BB673",
                                borderRadius: 100,
                                fontSize: 30,
                                textAlign: "center",
                                color: "white",
                                bototm: 0,
                                width: 50,
                                height: 50,
                              }}>
                              {item.name[0]}
                            </div>

                            <div style={{ display: 'flex', justifyContent: "space-between", }}>
                              <div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <td style={{ fontSize: 20, marginLeft: 10, }}>{item.name}</td>
                                  <td style={{ textAlign: 'center', fontSize: 12, marginLeft: 10, padding: 5, paddingRight: 10, paddingLeft: 10, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.1)' }}>{item.date}</td>
                                </div>
                              </div>
                              <div>

                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 110 }}>
                                  <button onClick={() => { this.updateLikes(item._id, item.likes + 1, item.dislikes) }} style={{ color: 'white', backgroundColor: "#A8D0E5", padding: 8, paddingLeft: 20, paddingRight: 20, borderWidth: 0, borderRadius: 100, marginRight: 10 }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                      <img style={{ width: 20, height: 20, marginRight: 5, }} src={require("./like.png")} />
                                      {item.likes}
                                    </div>
                                  </button>
                                  <button onClick={() => { this.updateLikes(item._id, item.likes, item.dislikes + 1) }} style={{ color: 'white', backgroundColor: "#F26C6D", padding: 8, paddingLeft: 20, paddingRight: 20, borderWidth: 0, borderRadius: 100, marginRight: 10 }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                      <img style={{ width: 20, height: 20, marginRight: 5, marginTop: 4 }} src={require("./dislike.png")} />
                                      {item.dislikes}
                                    </div>
                                  </button>
                                </div>

                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <td style={{ margin: 10 }}>{item.text}</td>
                          </div>

                        </div>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', }}>


            {/*Top Posts*/}
            <div>
              <tbody>
                <div style={{ width: 280, height: 360, marginBottom: 20, backgroundColor: '#126A9C', borderRadius: 30, boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)" }}>
                  <div style={{ paddingTop: 30 }}>
                    <div style={{ color: 'white', marginLeft: 20, fontSize: 30 }}>Top Posts</div>
                    {myData.slice(0, 4).map((item, index) => (
                      <tr style={{ width: 100, height: 2, }} key={index}>
                        <div style={{ marginLeft: 20, }}>
                          <div style={{ marginTop: 10, marginBottom: 10, fontSize: 13, color: 'white' }}>
                            {item.text}
                          </div>
                        </div>
                      </tr>
                    ))}
                  </div>
                </div>
              </tbody>
            </div>

            {/*Top Posters*/}
            <div>
              <tbody>
                <div style={{ width: 280, height: 380, marginBottom: 20, backgroundColor: 'white', borderRadius: 30, boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)" }}>
                  <div style={{ paddingTop: 30 }}>
                    <div style={{ color: 'black', marginLeft: 20, fontSize: 30 }}>Top Posts</div>
                    {myData.slice(0, 4).map((item, index) => (
                      <tr style={{ width: 100, height: 2, }} key={index}>
                        <div style={{ marginLeft: 20, }}>
                          <div style={{ marginTop: 10, marginBottom: 10, fontSize: 13, color: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div
                              style={{
                                backgroundColor: "#2BB673",
                                borderRadius: 100,
                                fontSize: 30,
                                textAlign: "center",
                                color: "white",
                                bototm: 0,
                                width: 50,
                                height: 50,
                              }}>
                              {item.name[0]}
                            </div>
                            <div style={{ marginLeft: 10 }}>
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </tr>
                    ))}
                  </div>
                </div>
              </tbody>
            </div>


          </div>

        </div>
      </div>
    );
  }
}

export default List;

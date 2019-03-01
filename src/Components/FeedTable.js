import React, { Component } from "react";

const styles = {
    table: {
        justifyContent: "center",
        margin: 20,
        width: 500,
        backgroundColor: "white",
        boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)",
        borderRadius: 25,
        paddingBottom: 20,
    },

}

class FeedTable extends Component {
    render() {
        return (
            <div>
                <div style={{ marginLeft: 20, }}>
                    <div style={{ fontSize: 30, marginLeft: 20, fontWeight: 300 }}>POSTS</div>
                    <tbody>
                        {this.props.data.slice(0).reverse().map((item, index) => (
                            <tr key={index}>
                                <div style={styles.table}>
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
                                                                <img style={{ width: 20, height: 20, marginRight: 5, }} src={require("../Assets/like.png")} />
                                                                {item.likes}
                                                            </div>
                                                        </button>
                                                        <button onClick={() => { this.updateLikes(item._id, item.likes, item.dislikes + 1) }} style={{ color: 'white', backgroundColor: "#F26C6D", padding: 8, paddingLeft: 20, paddingRight: 20, borderWidth: 0, borderRadius: 100, marginRight: 10 }}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                                                <img style={{ width: 20, height: 20, marginRight: 5, marginTop: 4 }} src={require("../Assets/dislike.png")} />
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
        );
    }
}



export default FeedTable;

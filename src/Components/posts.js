import  React, {Component, StyleSheet } from "react";

class TopPosters extends Component {
    render() {
        return (
            <div>
                <tbody>
                    <div style={{ width: 280, height: 380, marginBottom: 20, backgroundColor: 'white', borderRadius: 30, boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)" }}>
                        <div style={{ paddingTop: 30 }}>
                            <div style={{ color: 'black', marginLeft: 20, fontSize: 30 }}>Top Posts</div>
                            {this.props.data.slice(0, 4).map((item, index) => (
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
        );
    }
}

export default TopPosters;

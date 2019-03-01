import React, { Component } from "react";

class TopPosts extends Component {
    render() {
        return (
            <div>
                <tbody>
                    <div style={{ width: 280, height: 360, marginBottom: 20, backgroundColor: '#126A9C', borderRadius: 30, boxShadow: "-4px 26px 80px -5px rgba(0,0,0,0.1)" }}>
                        <div style={{ paddingTop: 30 }}>
                            <div style={{ color: 'white', marginLeft: 20, fontSize: 30 }}>Top Posts</div>
                            {this.props.data.slice(0, 4).map((item, index) => (
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
        );
    }
}

export default TopPosts;

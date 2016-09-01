'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class RVAItem extends React.Component {
    removeItem() {
        let $item = $(ReactDOM.findDOMNode(this));
        let RVAInstance = this.props.RVAInstance;
        let adId = this.props.item.adId;
        let items = RVAInstance.state.items;
        $.ajax({
            'url': '/j-recently-viewed/' + adId,
            'type': 'DELETE',
            'success': function() {
                //var d = a.parent("li").data("link")
                //  , e = d.substr(d.indexOf("adId=") + 5);
                //a.parent("li").remove(),
            },
            error: function() {
                items.forEach(function(item, index) {
                    if (item.adId === adId) {
                        items.splice(index, 1);

                        $item.fadeOut(function() {
                            RVAInstance.setState({items: items});
                        });
                    }
                });
            }
        });
    }
    render() {
        return (
            <li className="js-hover" data-link={'/v-view-details.html?adId='+this.props.item.adId}>
                <div className="image"><div>
                    <img src={this.props.item.imageUrl === null ? 'http://ca.classistatic.com/static/V/2014.16.10/img/placeholder.gif' : this.props.item.imageUrl}/>
                </div></div>
                <div className="title"><a href={'/v-view-details.html?adId='+this.props.item.adId}>{this.props.item.title}</a></div>
                <div className="price">{this.props.item.price}</div>
                <button className="close-x" title="Remove" data-id="{this.props.item.adId}" onClick={this.removeItem.bind(this)}>Remove</button>
            </li>

        )
    }
}

RVAItem.displayName = 'RVAItem';

export default RVAItem;

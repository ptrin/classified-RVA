'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import RVAItem from './RVAItem';

class RVAModule extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            locale: 'en',
            leftDisabled: false,
            rightDisabled: false
        };
    }
    componentDidMount() {
        this.loadRVA().then(() => {
            this.setWidths();
        });
    }
    loadRVA() {
        var jqXHR = $.get('https://api.myjson.com/bins/2t2ql', function(data) {
            this.setState({
                items: data
            });
        }.bind(this));
        return jqXHR;
    }
    setWidths() {
        this.allItemsWidth = this.getAllItemsWidth();

        this.visibleAreaWidth = $('.recently-viewed .inner').outerWidth();
        console.log( 'allItemsWidth', this.allItemsWidth );
        console.log( 'visibleAreaWidth', this.visibleAreaWidth );
        if (this.visibleAreaWidth > this.allItemsWidth) {
            this.setState({ rightDisabled: true });
        }
        this.setState({ leftDisabled: true });
    }
    getAllItemsWidth() {
        return this.state.items.length * 270 - 10;
    }
    scrollItems(direction) {

        let newLeftPos;
            // d = Math.floor(this.visibleAreaWidth / this.itemWidth) * this.itemWidth;

        if (this.animationComplete) {
            if (direction === 'right') {
                // newLeftPos = parseInt(this.dom.itemContainer.css('left')) - d,
                // newLeftPos < 0 - (parseInt(this.allItemsWidth) - parseInt(this.visibleAreaWidth)) && (newLeftPos = 0 - (this.allItemsWidth - this.visibleAreaWidth),
                this.setArrowState(this.dom.arrowNext, 0);
                this.reachedEndScroll = true;
                this.animationComplete = false;
                this.setArrowState(this.dom.arrowPrev, 1);
                this.dom.itemContainer.animate({
                    'left': newLeftPos + 'px'
                }, 500, () => {
                    this.animationComplete = true;
                });
            }
            else {
                // newLeftPos = parseInt(this.dom.itemContainer.css('left')) + d,
                // newLeftPos > 0 && (newLeftPos = 0),
                this.animationComplete = false;
                this.setArrowState(this.dom.arrowNext, 1);
                this.dom.itemContainer.animate({
                    'left': newLeftPos + 'px'
                }, 500, () => {
                    this.animationComplete = true;
                    if ('0px' === this.dom.itemContainer.css('left')) {
                        this.setArrowState(this.dom.arrowPrev, 0);
                    }
                });
            }
        }
    }
    clearHistory() {
        let $component = $(ReactDOM.findDOMNode(this));
        let component = this;
        $.ajax({
            url: '/j-recently-viewed',
            type: 'DELETE',
            success() {
            },
            error() {
                $component.fadeOut(() => {
                    component.setState({ items: [] });
                });
            }
        });
    }
    render() {

        let RVAInstance = this;

        let btnLeftClass = 'arrow-prev-grey';
        if (this.state.leftDisabled) {
            btnLeftClass += ' disabled';
        }
        let btnRightClass = 'arrow-next-grey';
        if (this.state.rightDisabled) {
            btnRightClass += ' disabled';
        }
        if (this.state.items.length) {
            return (
                
                <div className="layout-0">
                    <section className="recently-viewed">
                        <header>
                            <h3>Recently Viewed</h3>
                            <a href="#" id="ClearHistoryRVA" onClick={this.clearHistory.bind(this)}>Clear History</a>
                        </header>
                        <div className="left-arrow"><button onClick={this.scrollItems.bind(this,'left')} className={btnLeftClass} disabled={this.state.leftDisabled ? 'disabled' : false} id="RVA-Prev" role="presentation">Previous</button></div>
                        <div className="right-arrow"><button onClick={this.scrollItems.bind(this,'right')} className={btnRightClass} disabled={this.state.rightDisabled ? 'disabled' : false} id="RVA-Next" role="presentation">Next</button></div>
                        <div className="full">
                            <div className="inner">
                                <ul style={this.listStyle}>
                                {this.state.items.map(function(item){
                                    return (
                                        <RVAItem key={item.adId} RVAInstance={RVAInstance} item={item} />
                                    );
                                })}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

RVAModule.displayName = 'RVAModule';

RVAModule.defaultProps = {
    listStyle: { width: '2000px' }
};

export default RVAModule;

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import RVAItem from './RVAItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

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
        this.context.store.dispatch(Actions.getAds());
        this.initRVA();
    }
    initRVA() {

        this.itemWidth = 270;
        this.allItemsWidth = this.getAllItemsWidth();

        this.visibleAreaWidth = $('.recently-viewed .inner').outerWidth();
        this.animationComplete = true;
        this.reachedEndScroll = false;
        this.$itemContainer = $('section.recently-viewed ul');

        if (this.visibleAreaWidth > this.allItemsWidth) {
            this.setState({ rightDisabled: true });
        }
        this.setState({ leftDisabled: true });
    }
    getAllItemsWidth() {
        return this.state.items.length * this.itemWidth - 10;
    }
    scrollItems(direction) {

        let newLeftPos;
        let difference = Math.floor(this.visibleAreaWidth / this.itemWidth) * this.itemWidth;

        if (this.animationComplete) {
            if (direction === 'right') {

                newLeftPos = parseInt(this.$itemContainer.css('left')) - difference;

                this.setState({ leftDisabled: false });
                if (newLeftPos < 0 - (parseInt(this.allItemsWidth) - parseInt(this.visibleAreaWidth)) && (newLeftPos = 0 - (this.allItemsWidth - this.visibleAreaWidth))) {
                    this.setState({ rightDisabled: true });
                    this.reachedEndScroll = true;
                    this.animationComplete = false;
                    this.setState({ leftDisabled: false });
                }
                this.$itemContainer.animate({
                    'left': newLeftPos + 'px'
                }, 500, () => {
                    this.animationComplete = true;
                });
            }
            else {
                newLeftPos = parseInt(this.$itemContainer.css('left')) + difference;

                if (newLeftPos > 0) {
                    newLeftPos = 0;
                }

                this.animationComplete = false;
                this.setState({ rightDisabled: false });
                this.$itemContainer.animate({
                    'left': newLeftPos + 'px'
                }, 500, () => {
                    this.animationComplete = true;
                    if ('0px' === this.$itemContainer.css('left')) {
                        this.setState({ leftDisabled: true });
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
        if (this.props.ads.length) {
            return (

                <div className="layout-0">
                    <section className="recently-viewed">
                        <header>
                            <h3>Recently Viewed</h3>
                            <a href="#" id="ClearHistoryRVA" onClick={this.clearHistory.bind(this)}>Clear History</a>
                        </header>
                        <div className="left-arrow"><button onClick={this.scrollItems.bind(this,'left')} className={btnLeftClass} disabled={this.state.leftDisabled ? 'disabled' : false} id="RVA-Prev" aria-hidden="true">Previous</button></div>
                        <div className="right-arrow"><button onClick={this.scrollItems.bind(this,'right')} className={btnRightClass} disabled={this.state.rightDisabled ? 'disabled' : false} id="RVA-Next" aria-hidden="true">Next</button></div>
                        <div className="full">
                            <div className="inner">
                                <ul style={this.listStyle}>
                                {this.props.ads.map(function(item){
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

RVAModule.contextTypes = {
    store: React.PropTypes.object
};

RVAModule.displayName = 'RVAModule';

RVAModule.defaultProps = {
    listStyle: { width: '2000px' }
};

function mapStateToProps(state) {
    return {
        ads: state.ads
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RVAModule);

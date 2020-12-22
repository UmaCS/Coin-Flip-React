import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Coin from './Coin';
import './Coin.css'
import {choice} from './helpers.js';

class CoinContainer extends Component {
    static defaultProps = {
        coins: [
            {side:'heads', imgSrc: "https://coin-brothers.com/photos/Uzbekistan_Tiyin_1/1994_24.12.2016_01.38_02.jpg"},
            {side:'tails', imgSrc: "https://coin-brothers.com/photos/Uzbekistan_Tiyin_3/1994_24.12.2016_03.16.jpg"}
        ]
    }
    constructor(props){
        super(props);
        this.state = {
            currCoin: null,
            nFlips: 0,
            nHeads: 0,
            nTails: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    flipCoin(){
        const newCoin = choice(this.props.coins);
        return this.setState(st => {
            return {
                currCoin: newCoin, 
                nFlips: st.nFlips + 1,
                nHeads: st.nHeads + (newCoin.side === 'heads' ? 1 : 0),
                nTails: st.nHeads + (newCoin.side === 'tails' ? 1 : 0)
            };
        });
        
    }

    handleClick(e){
        this.flipCoin()
    }
    render(){
        return (
            <div className="Head">
                <h1>Let's flip a coin!</h1>
                {this.state.currCoin && <Coin info={this.state.currCoin} />}
                <button onClick={this.handleClick}>Flip me</button>
                <p>{`Out of ${this.state.nFlips} flips, there have been ${this.state.nHeads} heads and ${this.state.nTails} tails.`}</p>
            </div>
        );
    }
}

export default CoinContainer;
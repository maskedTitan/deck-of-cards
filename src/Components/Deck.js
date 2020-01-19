import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import '../Deck.css';

const api_base_url = 'https://deckofcardsapi.com/api/deck/';

class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: null,
			drawn: []
		};
		this.getCard = this.getCard.bind(this);
	}
	async componentDidMount() {
		let deck = await axios.get(`${api_base_url}/new/shuffle/`);
		this.setState({
			deck: deck.data
		});
	}
	async getCard() {
		const deck_id = this.state.deck.deck_id;
		try {
			const card_url = `${api_base_url}/${deck_id}/draw/`;
			let cardRes = await axios.get(card_url);
			if (!cardRes.data.success) {
				throw new Error('no cards remaining');
			}
			console.log(cardRes.data);
			let card = cardRes.data.cards[0];
			this.setState((st) => ({
				drawn: [
					...st.drawn,
					{
						id: card.code,
						image: card.image,
						name: `${card.value} of ${card.suit}`
					}
				]
			}));
		} catch (err) {
			alert(err);
		}
	}
	render() {
		const cards = this.state.drawn.map((card) => <Card name={card.name} image={card.image} key={card.id} />);
		return (
			<div>
				<h1 className="deck-title">Card Dealer</h1>
				<h2 className="deck-subtitle">A little demo made with React</h2>
				<button className="deck-btn" onClick={this.getCard}>
					Get Card
				</button>
				<div className="Deck-cardarea">{cards}</div>
			</div>
		);
	}
}

export default Deck;

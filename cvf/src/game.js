// import CuicosVsFlaitesBoard from './board';
import Card from './Card';
import React, { Component } from 'react';

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

function importAll(r) {
	// console.log(r);
	return r.keys().map(r);
}

function IsVictory(cells) {
	const positions = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 0, 4, 8 ],
		[ 2, 4, 6 ]
	];

	for (let pos of positions) {
		const symbol = cells[pos[0]];
		let winner = symbol;
		for (let i of pos) {
			if (cells[i] !== symbol) {
				winner = null;
				break;
			}
		}
		if (winner != null) return true;
	}

	return false;
}

const CuicosVsFlaitesGame = {
	name: 'cuicos-vs-flaites',

	setup: () => ({
		cells: Array(9).fill(null),
		initialCards: 7,
		images: importAll(require.context('../public/img', false, /\.(png|jpe?g|svg)$/)),
		p1Deck: [],
		p2Deck: [],
		p1Arena: [],
		p2Arena: [],
		p1Name: [ 'jhonny' ],
		p2Name: [ 'sebastian' ],
		p1Mano: [],
		p2Mano: [],
		p1Lukas: 0,
		p2Lukas: 0,
		p1Brigidez: 20,
		p2Brigidez: 20
	}),

	moves: {
		clickCell(G, ctx, id) {
			const cells = [ ...G.cells ];

			if (cells[id] === null) {
				cells[id] = ctx.currentPlayer;
				return { ...G, cells };
			}
		},
		// orginal draw card method
		// drawCard: (G, ctx) => {
		// 	const card = G.deck.pop();
		// 	G.hand.push(card);
		// },
		drawCard(img) {
			// console.log('drawCard: ', img.length);
			// this.item.push(<img className="card" src={img} alt={this.getCardName(img)} />);
			return <img src={img} alt={this.getCardName(img)} />;
		},

		addPlayersHands(P1items, P2items) {
			console.log('addPlayersHands : ', P1items, P2items);
		},

		getCardName(img) {
			let cardCode = img.split('/')[3].split('.')[0];
			// console.log('cardCode: ', cardCode);
			return cardCode;
		},
		getCardByCode(cardCode) {
			// cardCode = img.split('/')[3].split('.')[0];
			// console.log('cardCode: ', cardCode);

			// options.hasOwnProperty(value1)

			var data = this.state.images.filter((val) => val.includes('F004'));

			console.log(data);

			return data;
		},

		getCard(cardNum) {
			// this.setState({
			// 	arrayvar: this.state.arrayvar.concat([ this.drawCard(this.state.images[cardNum]) ])
			// });

			return this.drawCard(this.state.images[cardNum]);
		},

		makeHand(num) {
			return <Card img={this.getCard(Math.floor(this.getTotalDeck() * Math.random()))} />;
		}
	},

	turn: {
		moveLimit: 1
	},

	endIf: (G, ctx) => {
		if (IsVictory(G.cells)) {
			return { winner: ctx.currentPlayer };
		}
		if (G.cells.filter((c) => c === null).length === 0) {
			return { draw: true };
		}
	}
};

export default CuicosVsFlaitesGame;

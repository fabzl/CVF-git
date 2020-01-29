import styled from 'styled-components';
// import { Drop } from 'react-beautiful-dnd';
import Card from './Card';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

// mind to add react reavel

// import Fade from 'react-reveal/Fade';
// import Flip from 'react-reveal/Flip';

// fake data generator
// const getItems = (count) =>
// 	Array.from({ length: count }, (v, k) => k).map((k) => ({
// 		id: `item-${k}`,
// 		content: `item ${k}`
// 	}));
// a little function to help us with reordering the result

const Arena = styled.div`
	width: 500px;
	height: 100vh;
	background-color:blue;
	float:left;

`;
const Mano = styled.div`
	width: 50vw;
	background-color:purple;
	float:left;
`;

const DragDropContext = styled.div`

`;
const Droppable = styled.div`

`;
const Draggable = styled.div`
	 background-color:red; padding:10px; margin:10px;
`;

const DropItem = styled.div`
	 width:140px;
	 height:200px;
	 padding:10px; margin:10px;
	 background-color:white;
`;


const ArenaItem = styled.div`border: 1px solid goldenrod;`;

// player stats .
const P1NameHolder = styled.div`
	position: absolute;
	left: 10px;
	bottom: 0;
	z-index: 9;
`;
const P2NameHolder = styled.div`
	position: absolute;
	left: 10px;
	top: 0;
	z-index: 9;
`;

const P1LukasHolder = styled.div`
	position: absolute;
	right: 10px;
	bottom: 0;
	z-index: 9;
`;

const P2_LukasHolder = styled.div`
	position: absolute;
	right: 10px;
	top: 0;
	z-index: 9;
`;

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [ removed ] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 ${grid}px 0 0`,
	// change background colour if dragging
	// background: isDragging ? 'lightgreen' : 'transparent',
	width: `${100 / 10}` + 'vw',

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'white',
	display: 'flex',
	// padding: grid,
	bottom: '30px',
	position: 'fixed',
	overflow: 'auto',
	justifyContent: 'flex-end'
});

// props.moves is an object passed in by the framework that contains functions to dispatch moves.
// props.moves.clickCell dispatches the clickCell move, and any data passed in is made available in the move handler.
// props.events is an object that contains functions to control the flow of the game, including the ability to end the turn, pass or end the current game phase (see Phases).

class CuicosVsFlaitesBoard extends React.Component {
	constructor(props) {
		super(props);
		this.onDragEnd = this.onDragEnd.bind(this);

		this.state = {
			items: this.getCards(this.props.G.initialCards),
			deckTotal: this.props.G.images.length,
			enemyItems: this.getCards(this.props.G.initialCards),
			arenaItems: {},
			discardedItems: {},
			enemyCards: {},
			enemyArenaItems: {}
		};
	}

	static propTypes = {
		events: PropTypes.any.isRequired
	};

	playCard = (e) => {
		console.log('playCard');
		this.addCardToPlayableCard(e);
	};

	addCardToPlayableCard = (e) => {
		console.dir(e);
		this.setState({ arenaItems: e });
		console.log(this.state.arenaItems);
	};

	onDragEnd(e) {
		console.log(e, 'onDragEnd');
		this.playCard(e);
	}

	getCards = (count) =>
		Array.from({ length: count }, (v, k) => k).map((k) => ({
			id: `card-${k}`,
			content: this.drawCard(this.props.G.images[this.getRandomFromTotal()])
		}));

	componentDidMount() {
		// this.getTotalDeck();
		console.dir(this.props.G);
		console.dir(this.props.ctx);
		this.props.moves.addPlayersHands(this.state.items, this.state.enemyItems);
	}

	getTotalDeck() {
		let deck = this.props.G.images.length;
		console.log('deck : ', deck);
		return deck;
	}

	getRandomFromTotal() {
		let value = Math.floor(Math.random() * this.props.G.images.length);
		return value;
	}

	onClick(id) {
		if (this.isActive(id)) {
			this.props.moves.clickCell(id);
			this.props.events.endTurn();
		}
	}

	isActive(id) {
		if (!this.props.isActive) return false;
		if (this.props.G.cells[id] !== null) return false;
		return true;
	}

	drawCard(img) {
		// console.log('drawCard: ', img.length);
		// this.item.push(<img className="card" src={img} alt={this.getCardName(img)} />);
		return <Card src={img} id={this.getCardName(img)} alt={this.getCardName(img)} />;
	}

	getCardName(img) {
		let cardCode = img.split('/')[3].split('.')[0];
		console.log('cardCode: ', cardCode);
		return cardCode;
	}

	getCard(cardNum) {
		return this.drawCard(this.state.images[cardNum]);
	}

	/*---------------------------------------------------*/

	allowDrop(ev) {
		ev.preventDefault();
	  }
	  
	drag(ev) {
		console.log("drag",ev)
		ev.dataTransfer.setData("text", ev.target.id);
	  }
	  
	drop(ev) {
		ev.preventDefault();
		
		ev.target.appendChild(Card.lastID); 
	  
	}



	render() {
		let winner = '';

		// const images = this.importAll(require.context('../public/img', false, /\.(png|jpe?g|svg)$/));

		// 'images : ', this.state.images,

		if (this.props.ctx.gameover) {
			winner =
				this.props.ctx.gameover.winner !== undefined ? (
					<div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
				) : (
					<div id="winner">Draw!</div>
				);
		}

		return (
			<div>
				<div id="board">
					
						
						<Mano>

						{ 
						//odio las funciones de arrow esa huea era innecesaria.
						this.state.items.map((item, index) => (
										
							<Card id={item.id}  key={item.id} src={item.content.props.src}></Card>
 
						))
						}

						</Mano>

						<Arena>

							{ //drop culiao feo }
							<DropItem onDrop={this.drop} onDragOver={this.allowDrop}></DropItem>
							<DropItem onDrop={this.drop} onDragOver={this.allowDrop}></DropItem>
							<DropItem onDrop={this.drop} onDragOver={this.allowDrop}></DropItem>
							<DropItem onDrop={this.drop} onDragOver={this.allowDrop}></DropItem>
							
						</Arena>
						

				</div>
				{winner}
			</div>
		);
	}
}

export default CuicosVsFlaitesBoard;

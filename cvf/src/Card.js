import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	/* background-color: gray; */
	border: 5px solid black;
	border-radius: 6px;
	width: 20vw;
	height: auto;
	/* position: absolute; */
	transition: all 0.3s;

	&:hover {
		transform: scale(1.5);
		z-index: 10;
	}

	img {
		max-width: 100%;
		height: auto;
	}
`;

export default class Card extends React.Component {
	render() {
		return (
			<Container>
				<img src={this.props.src} />
			</Container>
		);
	}
}

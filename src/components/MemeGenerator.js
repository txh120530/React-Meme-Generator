import React, {Component} from 'react';

class MemeGenerator extends Component{
	constructor() {
		super();

		this.state = {
			font_size: "40",
			topText: "Example",
			bottomText: "Text",
			randomImg: "http://i.imgflip.com/1bij.jpg",
			memeID: "",
			allMemeImgs: []
		};
	};


	handleChange = event => {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleClick = () => {
		if(this.state.memeID === ""){
			let randomNumber = Math.floor(
				Math.random() * this.state.allMemeImgs.length
			);


			this.setState({randomImg: this.state.allMemeImgs[randomNumber].url});
		} else {
			const id = this.state.memeID;
			let obj = this.state.allMemeImgs.find(x => x.id === id);
			console.log(obj);
			this.setState({randomImg: obj.url});
		}
	}

	increaseFont = () => {};

	componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(data => data.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

	render (){

		return (
			<div>
				<div className="meme-form">
				  <label htmlFor="topText">Top Text</label>
					<input 
						type="text"
						name="topText"
						placeholder="top text"
						onChange={this.handleChange}
						value={this.state.topText}
					/>
					<label htmlFor="bottomText">Bottom Text</label>
					<input 
						type="text"
						name="bottomText"
						placeholder="bottom text"
						onChange={this.handleChange}
						value={this.state.bottomText}
					/>
					<label htmlFor="font_size">Font Size</label>
					<input 
						type="number"
						name="font_size"
						placeholder="font size"
						onChange={this.handleChange}
						value={this.state.font_size}
					/>

<label htmlFor="memeID">Meme List</label>
<select
	onChange={this.handleChange}
	name="memeID"
>
<option value="">Random</option>
  <option value="188390779">Woman Yelling at Cat</option>
  <option value="100777631">Is This A Pigeon</option>
  <option value="563423">That Would Be Great</option>
  <option value="3218037">This Is Where I'd Put My Trophy If I Had One</option>
  <option value="112126428">Distracted Boyfriend</option>
  <option value="102156234">Mocking Spongebob</option>
</select>

					<button onClick={this.handleClick}>Generate!</button>
				</div>

				<div className="meme">
					<h2
						style={{fontSize: Number(this.state.font_size) }}
						className="top"
					>
						{this.state.topText}
					</h2>

					<img src={this.state.randomImg} alt="" />

					<h2
						style={{fontSize: Number(this.state.font_size) }}
						className="bottom"
					>
						{this.state.bottomText}
					</h2>

				</div>
			</div>
		);
	}
}

export default MemeGenerator;
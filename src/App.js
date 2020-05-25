import React, { Component } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import covidImage from './images/covid19.jpg';

class App extends Component {
	state = {
		data: {},
		country: '',
	};
	async componentDidMount() {
		const fetchedData = await fetchData();
		console.log(fetchedData);

		this.setState({ data: fetchedData });
	}

	handleCountryChange = async (country) => {
		//fetch the data

		console.log(country);

		const fetchedData = await fetchData(country);
		this.setState({ data: fetchedData, country: country });
		console.log('selected a country: ', fetchedData);

		//set teh state
	};
	render() {
		const { data, country } = this.state;
		return (
			<div className={styles.container}>
				<img className={styles.image} src={covidImage} alt='covid-19' />
				<Cards data={data} />
				<CountryPicker handleCountryChange={this.handleCountryChange} />
				<Chart data={data} country={country} />
			</div>
		);
	}
}

export default App;

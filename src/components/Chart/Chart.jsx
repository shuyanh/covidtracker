import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		};
		// console.log(dailyData);
		fetchAPI();
	}, []);

	console.log(dailyData);

	let diffConfirmedArray = [];
	for (let i = 0; i < dailyData.length; i++) {
		if (i === 0) {
			diffConfirmedArray.push(0);
		} else {
			diffConfirmedArray.push(
				dailyData[i].confirmed - dailyData[i - 1].confirmed
			);
		}
	}

	let diffDeathArray = [];
	for (let i = 0; i < dailyData.length; i++) {
		if (i === 0) {
			diffDeathArray.push(0);
		} else {
			diffDeathArray.push(dailyData[i].deaths - dailyData[i - 1].deaths);
		}
	}

	console.log(diffConfirmedArray);

	const lineChart = dailyData.length ? (
		<Line
			data={{
				labels: dailyData.map(({ date }) => date),
				datasets: [
					{
						data: dailyData.map(({ confirmed }) => confirmed),
						label: 'Infected',
						borderColor: '#3333ff',
						fill: true,
					},
					{
						data: diffConfirmedArray,
						label: 'Increase',
						borderColor: 'purple',
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths),
						label: 'Deaths',
						borderColor: 'red',
						backgroundColor: 'rgba(255,0,0,0.5)',
						fill: true,
					},
					{
						data: diffDeathArray,
						label: 'Deaths increase',
						borderColor: 'orange',
						backgroundColor: 'rgba(255,0,0,0.5)',
						fill: true,
					},
				],
			}}
		/>
	) : null;

	console.log('confirmed for a country', confirmed);

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ['Infected', 'Recovered', 'Deaths'],
				datasets: [
					{
						label: 'People',
						backgroundColor: [
							'rgba(0, 0, 255, 0.5)',
							'rgba(0, 255, 0, 0.5)',
							'rgba(255, 0, 0, 0.5)',
						],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current state in ${country}` },
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>{country ? barChart : lineChart}</div>
	);
};

export default Chart;

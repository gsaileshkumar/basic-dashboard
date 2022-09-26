import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Counter from './Counter';

export default function CounterList() {
	const [counters, setCounters] = useState([]);

	useEffect(() => {
		const initialCounters =
			JSON.parse(window.sessionStorage.getItem('counters')) || [];
		if (initialCounters.length) {
			setCounters(initialCounters);
		}
	}, []);

	useEffect(() => {
		const stringifiedConuters = JSON.stringify(counters);
		window.sessionStorage.setItem('counters', stringifiedConuters);
	}, [counters]);

	const addCounter = () => {
		setCounters([
			...counters,
			{
				key: Math.random(),
				name: 'New',
				count: 0,
				isEditing: true,
			},
		]);
	};
	const deleteCounter = (key) => {
		const updatedCounters = counters.filter(
			(counter) => counter.key !== key
		);
		setCounters(updatedCounters);
	};

	const onUpdateHandler = (updatedCounter) => {
		const updatedCounters = counters.map((counter) => {
			if (counter.key === updatedCounter.key) {
				return updatedCounter;
			}
			return counter;
		});
		setCounters(updatedCounters);
	};

	return (
		<div style={{ marginTop: '1rem' }}>
			<Button
				data-testid="addCounter"
				style={{ marginLeft: '1rem' }}
				onClick={addCounter}
			>
				Add counter
			</Button>
			{counters?.map((counter) => (
				<Counter
					key={counter.key}
					counter={counter}
					onUpdate={onUpdateHandler}
					deleteCounter={() => deleteCounter(counter.key)}
				/>
			))}
		</div>
	);
}

import { Button, Input } from 'antd';
import Text from 'antd/lib/typography/Text';
import {
	PlusOutlined,
	MinusOutlined,
	SaveOutlined,
	EditOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import React from 'react';

const Counter = ({ counter, onUpdate, deleteCounter }) => {
	const { count, name, isEditing } = counter;
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: '1rem',
			}}
		>
			{isEditing ? (
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<Input
						type="text"
						value={name}
						onChange={(event) =>
							onUpdate({ ...counter, name: event.target.value })
						}
					/>
					<Text style={{ color: 'white' }}>{count}</Text>
				</div>
			) : (
				<div>
					<Text style={{ color: 'white' }}>
						{name} : {count}
					</Text>
				</div>
			)}
			<div style={{ display: 'flex', paddingTop: '0.5rem' }}>
				<Button
					icon={<PlusOutlined />}
					onClick={() => onUpdate({ ...counter, count: count + 1 })}
				/>
				<Button
					icon={<MinusOutlined />}
					onClick={() => onUpdate({ ...counter, count: count - 1 })}
				/>
			</div>
			<div style={{ display: 'flex', paddingTop: '0.5rem' }}>
				<Button
					icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
					onClick={() =>
						onUpdate({ ...counter, isEditing: !isEditing })
					}
				>
					{isEditing ? 'Save' : 'Edit'}
				</Button>
				<Button icon={<DeleteOutlined />} onClick={deleteCounter} />
			</div>
		</div>
	);
};

export default Counter;

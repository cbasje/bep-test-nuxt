import axios from 'axios';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
	const url = `https://api.openweathermap.org/data/2.5/weather`;

	// res.setHeader('Access-Control-Allow-Credentials', 'true');
	// res.setHeader('Access-Control-Allow-Origin', '*');

	await axios
		.get(url, { params: req.query })
		.then(({ data }) => {
			res.json(data);
		})
		.catch((error) => {
			console.log(error);
			res.send(400);
		});

	// res.json(data.data);
	// res.send(data.data)
};

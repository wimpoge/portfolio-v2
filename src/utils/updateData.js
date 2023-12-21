export const updateData = async (
	/** @type {RequestInfo | URL} */ url,
	/** @type {any} */ data,
	/** @type {string} */ method
) => {
	try {
		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data)
		});

	
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

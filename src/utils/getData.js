export const getData = async (/** @type {RequestInfo | URL} */ url) => {
	try {
	  const response = await fetch(url, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${localStorage?.getItem('token') ?? ''}`,
		},
	  });
  
	  const data = await response.json();
  
	  if (data.message === 'user already logged in' || data.message === 'token expired') {
		// Redirect to the login page
		window.location.href = '/login';
	  }
  
	  return data;
	} catch (error) {
	  throw new Error(error);
	}
  };
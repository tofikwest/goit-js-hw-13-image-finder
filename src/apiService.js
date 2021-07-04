const options = {
  API_KEY: '22355428-bdc6eaf2c1f0229d27359a629',
  BASE_URL: 'https://pixabay.com/api/?image_type=photo&orientation=horizontal',
  BASE_PAGE: '1'
}

async function searchPhoto (name = "q=") {
  const response = await fetch(`${options.BASE_URL}&${name}&page=${options.BASE_PAGE}&per_page=12&key=${options.API_KEY}`);
  return response.json
}
searchPhoto('q=cat').then(console.log)
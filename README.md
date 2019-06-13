
# ITC Products API
This project provides search and filter API to fetch a list of products( Source : https://mobile-tha-server.firebaseapp.com/)

**Start Server**
Command : npm start

**How To**
Url : /api/products
Query parameters : 

 - **search**  : Takes 'string' value, used to filter products on the basis of similar matching string pattern
	 - **Usage**
		 - /api/products?search=elle
 - **price** : Takes 'decimal' value, used to filter products based on their pricing.
	 - **Usage**
		 - /api/products?price=100
		 - /api/products?price[min]=100
		 - /api/products?price[max]=200
		 - /api/products?price[min]=100&price[max]=200
 - **reviewRating** : Takes 'decimal' value, used to filter products based on their review ratings.
	 - **Usage**
		 - /api/products?reviewRating=1
		 - /api/products?reviewRating[min]=1
		 - /api/products?reviewRating[max]=5
		 - /api/products?reviewRating[min]=1&reviewRating[max]=5
 - **reviewCount**
	 - **Usage**
		 -  /api/products?reviewCount=1
		 - /api/products?reviewCount[min]=1
		 - /api/products?reviewCount[max]=5
		 - /api/products?reviewCount[min]=1&reviewCount[max]=5
 - **inStock**
	 - **Usage**
		 - /api/products?inStock=true
		 - /api/products?inStock=false

var FbAPI = ((user)=>{

	user.registerUser = (credentials) =>{
		return new Promise ((resolve, reject) =>{
			firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
			.then((authData)=>{
				resolve(authData);
			}).catch((error)=>{
				reject(error);
			});
		});
	};

	return user;
})(FbAPI || {});
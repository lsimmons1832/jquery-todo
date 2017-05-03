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

	user.loginUser = (creds)=>{
		return new Promise((resolve, reject)=>{
			firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
			.then((authData)=>{
				resolve(authData);
			}).catch((error)=>{
				reject(error);
			});
		});
	};


	return user;
})(FbAPI || {});
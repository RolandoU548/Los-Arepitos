import { useNavigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: localStorage.getItem("token") || null,
			profile: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			newProduct: async (newProduct) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/products",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(newProduct)
						})
					const data = await resp.json()

					// setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			createCustomer: async (customer) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/accounts/customer",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(customer)
						})
					const data = await resp.json()
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			loginCustomer: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ email, password })
						})
					const data = await resp.json()
					localStorage.setItem("token", data.token) //guardar token en localstorage
					setStore({ token: data.token })
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			getCustomer: async () => {
				let store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/profile/customer",
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer " + store.token
							},
						})
					const data = await resp.json()
					setStore({ profile: data })
				} catch (error) {
					console.log("Error loading message from backend", error)
				}

			},

			createDriver: async (driver) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/accounts/driver",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(driver)
						})
					const data = await resp.json()
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},

			loginDriver: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ email, password })
						})
					const data = await resp.json()
					localStorage.setItem("token", data.token) //guardar token en localstorage
					setStore({ token: data.token })
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false
				}
			},
		}
	};
};
export default getState;

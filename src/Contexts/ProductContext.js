import axios from 'axios';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { calcSubPrice, calcTotalPrice } from '../Helpers/CalcPrice';
import { API, commentsAPI } from '../Helpers/Constants';
import { auth } from '../Firebase'; 
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const productContext = createContext()

const INIT_STATE = {
    products: null,
    edit: null,
    cart: {},
    cartLength: 0,
    paginatedPages: 1,
    detail: {},
    star: {},
    starLength: 0,
}

const reducer = (state = INIT_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case "GET_PRODUCTS":
            return {...state, products: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers["x-total-count"]/ 3)
            }
        case "GET_EDIT_PRODUCT":
            return {...state, edit: action.payload}
        case "CHANGE_CART_COUNT":
            return {...state, cartLength: action.payload}
        case "GET_CART":
            return {...state, cart: action.payload}    
        case "GET_DETAIL_PRODUCT":
            return {...state, detail: action.payload}
        case 'CHANGE_STAR_COUNT':
            return {...state, starLength: action.payload}
        case 'GET_STAR':
            return {...state, star: action.payload}
        default:
            return state
    }
}

const ProductContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    
    // Create product
    const addProduct = async (newProduct) => {
        try {
            await axios.post(API, newProduct)
            getProducts()
        } catch (error) {
            alert(error)
        }
    }

    // Read
    const getProducts = async () => {
        try {
            let res = await axios.get(`${API}${window.location.search}`)
            let action = {
                type: "GET_PRODUCTS",
                payload: res
            }
            dispatch(action)
        } catch (error) {
            alert(error)
        }
    }

    // update product
    const editProduct = async (id) => {
        try {
            let res = await axios(`${API}/${id}`)
            let action = {
                type: "GET_EDIT_PRODUCT",
                payload: res.data
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }

    // Save edited product
    const saveEditedProduct = async (updatedProduct) => {
        try {
            await axios.patch(`${API}/${updatedProduct.id}`, updatedProduct)
        } catch (error) {
            console.log(error);
        }
    }

    // Delete Product
    const deleteProduct = async (id) => {
        await axios.delete(`${API}/${id}`)
        getProducts()
    }

    //! Cart - add to cart 
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }
        let filteredCart = checkProductInCart(product.id)
        if(filteredCart) {
            cart.products = cart.products.filter(elem => elem.item.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }

        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        console.log(cart, 'after cart')
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }

    // Counting products in a cart
    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
            dispatch({
                type: "CHANGE_CART_COUNT",
                payload: cart.products.length
            })
        }
    }

    // fetching and reflecting data from cart (localstorage)
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(elem => {
            if (elem.item.id === id) {
                elem.count = count 
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    // check product in cart

    const checkProductInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false
    }

    // delete product in cart
    const deleteProductInCart = (id) => {
        let deleteCart = JSON.parse(localStorage.getItem('cart'))
        deleteCart.products = deleteCart.products.filter(
            (elem) => elem.item.id !== id
        )
        localStorage.setItem("cart", JSON.stringify(deleteCart))
        getCart()
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: deleteCart.products.length
        })
    }

    // get detail data
    const getDetail = async (id) => {
        const res = await axios(`${API}/${id}`)
        let action = {
            type: "GET_DETAIL_PRODUCT",
            payload: res.data
        }
        dispatch(action)
    }

    // sign up, sign in
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

    function useAuth(){
        const [ currentUser, setCurrentUser] = useState()
        useEffect(() => {
            const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
            return unsub
        }, [])
        return currentUser
    }

    //! Favorites
    const addToStar = (product) => {
        let star = JSON.parse(localStorage.getItem('star'));
        if(!star) {
            star = {
                products: [],
            }
        }
        let newProduct = {
            item: product,
            count: 1, 
        }

        let filteredStar = checkProductInStar(product.id)
        if(filteredStar) {
            star.products = star.products.filter(elem => elem.item.id !== product.id)
        }
        else {
            star.products.push(newProduct)
        }

        localStorage.setItem('star', JSON.stringify(star))
        dispatch({
            type: 'CHANGE_STAR_COUNT',
            payload: star.products.length
        })
    }

    const getStarLength = () => {
        let star = JSON.parse(localStorage.getItem('star'));
        if(!star) {
            star = {
                products: [],
            }
        }
        dispatch({
            type: 'CHANGE_STAR_COUNT',
            payload: star.products.length
        })
    }

    // fetch from favorites 
    const getStar = () => {
        let star = JSON.parse(localStorage.getItem('star'));
        if(!star) {
            star = {
                products: [],
            }
        }
        dispatch({
            type: "GET_STAR",
            payload: star
        })
    }

    const checkProductInStar = (id) => {
        let star = JSON.parse(localStorage.getItem('star'));
        if(!star) {
            star = {
                products: []
            }
        }
        let newStar = star.products.filter(elem => elem.item.id === id)
        return newStar.length > 0 ? true : false
    } 

    // delete products from favorites

    const deleteProductInStar = (id) => {
        let deleteStar = JSON.parse(localStorage.getItem('star'))
        deleteStar.products = deleteStar.products.filter(
            (elem) => elem.item.id !== id
        )
        localStorage.setItem('star', JSON.stringify(deleteStar))
        getStar()
        dispatch({
            type: "CHANGE_STAR_COUNT",
            payload: deleteStar.products.length
        })
    }

    return (
        <productContext.Provider value={{
            addProduct,
            getProducts,
            editProduct,
            saveEditedProduct,
            deleteProduct,
            addToCart,
            getCartLength,
            getCart,
            changeProductCount, 
            checkProductInCart,   
            deleteProductInCart,
            getDetail,
            useAuth,
            signUp,
            signIn,
            logout,
            addToStar,
            checkProductInStar,
            getStar,
            getStarLength,
            deleteProductInStar,
            products: state.products,
            edit: state.edit,
            paginatedPages: state.paginatedPages,
            cartLength: state.cartLength,
            cart: state.cart,
            detail: state.detail,
            star: state.star,
            starLength: state.starLength,
        }}>
            {children}
        </productContext.Provider>
    );
};

export default ProductContextProvider;
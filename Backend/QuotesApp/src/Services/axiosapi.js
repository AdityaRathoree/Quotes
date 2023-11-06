import axiosInstance from "./axiosinstance";
import { log } from "./logger";
import { toast } from "react-toastify";

async function handleRequest(requestFunction) {
    try {
        const response = await requestFunction();
        return response;
    } catch (ex) {
        log(ex);
        if (ex.code && ex.code === "ERR_NETWORK") {
            toast.warning("Can't connect to server at the moment! Please try again later.");
        } else {
            toast.error("Some error occurred! Please try again.");
        }
        // return null;
    }
}

//SIGN IN
export async function loginApi(email,password){
    const body = {email,password}
    return await handleRequest(()=>axiosInstance.post("/user/login",body));
}

//SIGN UP
export async function registerApi(email,firstName,lastName,contactNo,password){
    const body = {email,firstName,lastName,contactNo,password}
    return await handleRequest(()=>axiosInstance.post("/user/register",body));
}

// ADD QUOTE
export async function addQuote(text,author){
    const user_id = sessionStorage.getItem("id");
    const body = {user_id,text,author}
    return await handleRequest(()=>axiosInstance.post(`/quote/create`,body))
}

// UPDATE BLOG
export async function editQuote(quote,author,id){
    const user_id = sessionStorage.getItem("id");
    const body = {user_id,id,text:quote,author}
    return await handleRequest(()=>axiosInstance.put(`/quote/updateQuotes`,body))
}

// DEL QUOTE
export async function delQuote(id){
    const user_id = sessionStorage.getItem("id");
    return await handleRequest(()=>axiosInstance.delete(`/quote/deleteQuotes/${user_id}/${id}`))
}

//GET ALL QUOTES
export async function getAllQuotes(){
    return await handleRequest(()=>axiosInstance.get(`/quote/getAllQuotes`))
}

// GET MY QUOTES
export async function getQuotesById(id){
    console.log("id check : "+id)
    return await handleRequest(()=>axiosInstance.get(`/quote/getQuotesbyUser/${id}`))
}

// GET FAV QUOTES
export async function getFavQuotesById(userId){
    console.log("id check : "+userId)
    return await handleRequest(()=>axiosInstance.get(`/favquotes/getFavQuotes/${userId}`))
}

// GET MY QUOTES BY ID
export async function getQuoteById(id){
    const user_id = sessionStorage.getItem("id");
    return await handleRequest(()=>axiosInstance.get(`/quote/getQuotesbyId/${user_id}/${id}`))
}

// LIKE QUOTES
export async function likeQuotes(id){
    const user_id = sessionStorage.getItem("id");
    const body = {user_id,id};
    console.log("user_id: "+user_id +" id: "+id);
    return await handleRequest(()=>axiosInstance.post(`/favquotes/likeQuotes`,body))
}

// UNLIKE QUOTES
export async function unlikeQuotes(quote_id){
    const user_id = sessionStorage.getItem("id");
    console.log("yo user_id: "+user_id +" id: "+quote_id);
    return await handleRequest(()=>axiosInstance.delete(`/favquotes/deleteFavQuotes/${user_id}/${quote_id}`))
}

//LIKES COUNT
export async function likesCount(){
    return await handleRequest(()=>axiosInstance.get("/favquotes/likescount"));
}

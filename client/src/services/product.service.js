import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/products"

function createProduct(product){
    const productJSON = {"product": JSON.stringify(product)}
    return axios.post(API_URL + "/create", {}, {headers: authHeader(productJSON)})
}

function getProducts(){
    return axios.get(API_URL)
}

function getProductById(id){
    return axios.get("/products/" + id);
}
function updateProduct(product){
    const productJSON = {"product": JSON.stringify(product)}
    return axios.put(API_URL + "/" + product.id + "/update", {}, {headers: authHeader(productJSON)})
}

const productService = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct
}

export default productService;
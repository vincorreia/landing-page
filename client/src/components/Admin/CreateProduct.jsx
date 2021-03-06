import { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import productService from "../../services/product.service";

const plusSign = "https://i.imgur.com/pJYS4Df.png"

function CreateProduct({product = {
    name: "",
    price: "",
    image: plusSign,
    tags: "",
    id: null,
    isCreated: false,
    description: "",
    stock: 11
}}) {

    const refreshToken = useRefreshToken()
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [img, setImg] = useState(product.image)
    const [tags, setTags] = useState(product.tags)
    const [stock, setStock] = useState(product.stock)
    const [hidden, setHidden] = useState("")
    const imageInputRef = useRef()
    const imageRef = useRef()

    function handleSubmit(e){
        e.preventDefault();

        const newProduct = {
                name: name,
                price: price,
                image: img,
                tags: product.isCreated ? tags : tags.split(","),
                description: product.isCreated ? description : "",
                id: product.isCreated ? product.id : undefined,
                stock: stock
        }
    
        refreshToken()
        .then(
            () => {
                if(product.isCreated){
                    productService.updateProduct(newProduct)
                } 
                else {
                    productService.createProduct(newProduct)
                }
            
                window.location.reload()
            }
        )
    }

    useEffect(() => {
        if(imageRef.current){
            imageRef.current.addEventListener("click", () => {
                if(imageInputRef.current.className.trim().length > 0){
                    setHidden("")
                }
                else{
                    setHidden("hidden")
                }
            })
        }
    }, [imageRef])

    return (         
    <form className="flex-row center product-creator" onSubmit={handleSubmit}>
        <div className="flex-col center card">
            <figure className="flex-row center">
                <img ref={imageRef} src={img} alt="Placeholder" className="product-image"/>
            </figure>
            <input ref={imageInputRef} type="text" 
            className={hidden} 
            placeholder="insert image link" 
            value={img} 
            onChange={(e) => {
                setImg(e.target.value)
            }}/>

            <div className="card-details flex-col center">
                <input className="new-product-name" type="text" placeholder="New Product Name" value={name} 
                onChange={(e) => {
                    setName(e.target.value)
                }}/>
                <div className="tag-wrapper flex-row center">
                    <input type="text" className="new-tags" placeholder="Tag1,Tag2,Tag3" value={tags}
                        onChange={e => {
                            setTags(e.target.value)
                        }}
                    />
                </div>
                <span className="price">$<input className="new-price" type="text" placeholder="100" value={price}
                    onChange={e => {
                        setPrice(e.target.value)
                    }}
                />.00</span>
                <div className="buttons-wrapper flex-row space-around">
                    <button className="dark">Place Holder</button>
                    {product.isCreated ? 
                    <button className="primary" type="submit">Update Product</button> 
                    : 
                    <button className="allow" type="submit">Create Product</button>
                    }
                </div>
        </div>
    </div>
    {product.isCreated &&
    <div className="flex-col internal-update">
    <div>
        <textarea 
            name="description" 
            id="description" 
            cols="60" 
            rows="20" 
            value={description} 
            placeholder="new description goes here"
            onChange={(e) => {setDescription(e.target.value)}}
            >{description}</textarea>
    </div>
            <label htmlFor="stock">
                <span>Stock:</span>
                <input type="number" id="stock" value={stock} min={0} onChange={(e) => {
                    setStock(e.target.value)
                }}/>
            </label>
    </div>
    }
</form> );
}

export default CreateProduct;
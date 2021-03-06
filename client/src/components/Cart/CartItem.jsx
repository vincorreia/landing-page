import { useUpdateCart } from "../../context/CartContext"




export default function CartItem({item}) {

    const usdFormat = Intl.NumberFormat('en-IN').format /* this will format a number to the USD standards */
    const updateCart = useUpdateCart();

    return (
    <div className="cart-item flex-row space-between">
        <div className="flex-row">
            <img src={item.image} alt={item.name} className="item-image"/>
            <div className="item-details flex-col center">
                <h2 className="item-name">{item.name}</h2>
                <p>Amount: {item.amount}</p>
                <div className="buttons-wrapper flex-row center">
                    <button className="allow" onClick={() => {
                        updateCart("inc", item);
                    }}>Add</button>
                    <button className="simple" onClick={() => {
                        updateCart("dec", item);
                    }}>Remove one</button>
                </div>
            </div>
        </div>
        <div className="flex-col">
            <p className="price">{"$" + usdFormat(item.price * item.amount) + ".00"}</p>
            <p className="unit-price">{"($" + usdFormat(item.price) + ".00/u)"}</p>
        </div>
            
    </div>)
}
export const addItemToCart = (allExistingCartItems, cartItemToAdd) => {
    const doesCartItemExist = allExistingCartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (doesCartItemExist) {
        return allExistingCartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...allExistingCartItems, {...cartItemToAdd, quantity: 1}];
}
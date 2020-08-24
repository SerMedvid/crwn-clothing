import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import {connect} from 'react-redux';
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from "reselect";
import {withRouter} from 'react-router-dom';
import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {
    CartDropdownContainer,
    CartItemsContainer,
    CheckoutButtonContainer,
    EmptyMessageContainer} from './cart-dropdown.styles'

const CartDropdown = ({cartItems, history, dispatch}) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {
                cartItems.length ?
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
                :
                <EmptyMessageContainer className='empty-message'>Your cart is empty</EmptyMessageContainer>
            }
        </CartItemsContainer>
        <CheckoutButtonContainer>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}>
                GO TO CHECKOUT
            </CustomButton>
        </CheckoutButtonContainer>
    </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});


export default withRouter(connect(mapStateToProps)(CartDropdown));
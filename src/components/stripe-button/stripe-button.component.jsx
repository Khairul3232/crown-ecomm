import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => { 
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HtazEG0yuAijoc6AjcC6XHZeXhlXDUcbuLxBpmFIB10XYulTC7fHiyk48AXzpjJ7RWpIuWjCKdT5AVziFP51ySC005ab1OqeY';
    const onToken = token => { 
        console.log(token)
        alert('Payment successful');
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={ publishableKey }
        />
    );
}

export default StripeCheckoutButton;
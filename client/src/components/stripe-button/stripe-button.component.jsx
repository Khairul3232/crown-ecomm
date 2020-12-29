import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => { 
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HtazEG0yuAijoc6AjcC6XHZeXhlXDUcbuLxBpmFIB10XYulTC7fHiyk48AXzpjJ7RWpIuWjCKdT5AVziFP51ySC005ab1OqeY';
    const onToken = token => { 
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful')
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert("There was an issue with your payment. Please be sure you use the provided credit card.");
        });
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
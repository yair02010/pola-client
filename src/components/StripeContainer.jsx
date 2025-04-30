    // src/components/StripeContainer.jsx
    import { Elements } from "@stripe/react-stripe-js";
    import { loadStripe } from "@stripe/stripe-js";
    import Checkout from "./Checkout";

    const stripePromise = loadStripe("pk_test_..."); 

    export default function StripeContainer() {
    return (
        <Elements stripe={stripePromise}>
        <Checkout />
        </Elements>
    );
    }

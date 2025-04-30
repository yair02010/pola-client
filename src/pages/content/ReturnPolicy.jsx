    import { Container } from "react-bootstrap";
    import "../../styles/ContentPages.css";

    export default function ReturnPolicy() {
    return (
        <Container className="py-5">
        <h1 className="text-center mb-4">Return Policy</h1>
        <p className="lead text-center">
            We want you to love your purchase!
        </p>
        <p className="text-muted">
            If you are not completely satisfied with your purchase, you may return the item within 14 days of receiving it.
            Items must be in original condition, unworn, and with all tags attached.
        </p>
        <p className="text-muted">
            To initiate a return, please contact our support team with your order number and reason for return.
            Shipping costs for returns are the responsibility of the customer unless the item was defective or incorrect.
        </p>
        <p className="text-muted">
            Refunds will be issued to the original payment method once the item is received and inspected.
        </p>
        </Container>
    );
    }

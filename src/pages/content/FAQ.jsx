    import { Container, Accordion } from "react-bootstrap";
    import "../../styles/ContentPages.css";

    export default function FAQ() {
    return (
        <Container className="py-5">
        <h1 className="text-center mb-4">Frequently Asked Questions</h1>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
            <Accordion.Header>How can I place an order?</Accordion.Header>
            <Accordion.Body>
                Simply add items to your cart, proceed to checkout, and complete the payment process.
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
            <Accordion.Header>What payment methods do you accept?</Accordion.Header>
            <Accordion.Body>
                We accept credit cards, debit cards, and secure online payments.
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
            <Accordion.Header>Can I return an item?</Accordion.Header>
            <Accordion.Body>
                Yes! You can return items within 14 days according to our return policy.
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </Container>
    );
    }

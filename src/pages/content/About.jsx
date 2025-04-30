    import { Container } from "react-bootstrap";
    import "../../styles/ContentPages.css";

    export default function About() {
    return (
        <Container className="py-5">
        <h1 className="text-center mb-4">About Us</h1>
        <p className="lead text-center">
            Welcome to POLA – your trusted destination for second-hand fashion!
        </p>
        <p className="text-muted">
            At POLA, we believe in sustainable fashion. We carefully select every item to ensure the best quality for our customers. 
            From casual wear to elegant pieces, POLA offers something unique for everyone. 
            Our mission is to make fashion accessible, affordable, and environmentally friendly.
        </p>
        <p className="text-muted">
            Thank you for choosing POLA. We are excited to have you as part of our journey!
        </p>
        </Container>
    );
    }

import {Row, Col} from 'react-bootstrap';
import blueLogo from '../assets/tron-blue-vector.svg';

export default function Contract() {
    return (
        <Row>
            <Col sm={12} className="text-center">
                <p>HONEST AND TRANSPARENT</p>                
                <p>SMART-CONTRACT INDEPENDENT AUDITIONS AND REVIEWS</p>
            </Col>
            <Col className="text-center">
            <img src={blueLogo} alt="Tron logo" />
            <p>Auxilary platform smart-contract is published on TRX blockchain. Nobody can change its rules or algorithms, even administration. This provides our participants unconditional confidence in safety of their funds. Anyone can check smart-contract code and be sure that TRONAuxilary platform is honest.</p>
            </Col>
            <Col>
            <p>Smart-contract code:</p>
            </Col>
        </Row>
    )
}

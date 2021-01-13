import { Container, Row, Col } from "react-bootstrap";

export default function Contact({onToggleDeposit, onToggleStat}) {
  return (
    <Container fluid>
      <Row>
        <Col sm={12} className="text-center">
          <p>CONTACT US</p>
          <p>OUR SUPPORT TEAM 24/7 AVAILABLE</p>
        </Col>
        <Col sm={12} className="text-center mb-5 mt-5">
          <button className="btn btn-md btn-primary rounded">
            Telegram Group
          </button>
        </Col>
        <div className="bg-primary text-white col-12 mt-5" >
          <Row>
            <Col className="py-5 px-4">
              <div>
                <span className="d-block">Copyrights:</span>
                <span className="d-block">TRONEX3 LTD | https://...........net</span> 
                <span className="d-block">Blockchain investment platform</span>
                <span className="d-block">2020 © All Rights Reserved</span>
              </div>
            </Col>
            <Col className="py-5">
              <div>
                <span className="d-block">
                  Smart-contract address: TQEeNrenZsqNFc628Q4XQd8vRLv4mRVj7h
                </span>
                <span className="d-block mt-3">Powered by TRON blockchain</span>
              </div>
            </Col>
            <Col className="p-5">
              <button onClick={onToggleDeposit} className="btn btn-md bg-light w-100 mb-4">MAKE DEPOSIT</button>
              <button onClick={onToggleStat} className="btn btn-md bg-light w-100">WALLET STATISTIC</button>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
}

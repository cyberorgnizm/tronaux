import { Container, Row, Col } from "react-bootstrap";
import telegramLogo from "../assets/telegram-send.svg";
import whiteLogo from "../assets/tron-white-vector.svg";

export default function Contact({ onToggleDeposit, onToggleStat }) {
  return (
    <Container fluid id="about">
      <Row className="mt-4">
        <Col xs={11} className="text-center mx-auto">
          <p className="text-primary section-title">CONTACT US</p>
          <p className="text-primary section-sub-title">
            OUR SUPPORT TEAM 24/7 AVAILABLE
          </p>
        </Col>
        <Col sm={12} className="text-center mb-5 mt-5">
          <button
            style={{ width: "278px" }}
            className="btn btn-md btn-primary btn-action-primary d-block mb-3 mx-auto d-flex align-items-center"
          >
            <div className="d-inline-block bg-white rounded-circle white-round-background d-flex justify-content-center align-items-center">
              <img src={telegramLogo} height="50%" />
            </div>
            <span className="d-inline-block mx-auto">Telegram Group</span>
          </button>
        </Col>
        <div className="bg-primary text-white col-12 mt-5">
          <Row>
            <Col className="py-5 px-4 d-flex justify-content-center align-items-center">
              <img
                src={whiteLogo}
                className="d-inline-block mr-2"
                height="120"
                width="104"
              />
              <div className="d-inline-block">
                <span className="d-block">Copyrights:</span>
                <span className="d-block">
                  TRONEX3 LTD | https://...........net
                </span>
                <span className="d-block">Blockchain investment platform</span>
                <span className="d-block">2020 © All Rights Reserved</span>
              </div>
            </Col>
            <Col className="py-5">
              <p className="d-block">
                Smart-contract address: TQEeNrenZsqNFc628Q4XQd8vRLv4mRVj7h
              </p>
              <p className="d-block mt-3">Powered by TRON blockchain</p>
            </Col>
            <Col className="p-5">
              <button
                onClick={onToggleDeposit}
                className="btn btn-md bg-white rounded-pill shadow-lg text-primary font-weight-bold d-block w-100 my-3"
              >
                MAKE DEPOSIT
              </button>
              <button
                onClick={onToggleStat}
                className="btn btn-md bg-white rounded-pill shadow-lg text-primary font-weight-bold d-block w-100 my-3"
              >
                WALLET STATISTIC
              </button>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
}

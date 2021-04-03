import { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import whiteLogo from "../assets/tron-white-vector.svg";
import blueLogo from "../assets/tron-blue-vector.svg";
import cash from "../assets/cash.svg";
import TronWebContext from "../contexts";
import Constants from "../constants";

export default function Hero({ contract, onToggleDeposit }) {
  const [totalInvested, setTotalInvested] = useState("###");
  const [totalParticipants, setTotalParticipants] = useState("###");
  const refLink = useRef();

  const twc = useContext(TronWebContext);

  const copyToClipBoard = async () => {
    navigator.clipboard
      .writeText(refLink.current.dataset.referral)
      .then(() => {
        alert("Referral link successfully copied!");
      })
      .catch(() => {
        alert("Ooops! Failed to copy referral link.");
      });
  };

  useEffect(() => {
    async function fetchData() {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      if (contract) {
        // obtain total invested amount
        const totalInvestedResponse = await contract.totalInvested().call();
        setTotalInvested(
          parseInt(twc.toDecimal(totalInvestedResponse) / TRX_DIVIDER_AMOUNT)
        );

        // obtain total active participants
        const totalParticipantsResponse = await contract.totalUsers().call();
        setTotalParticipants(
          parseInt(twc.toDecimal(totalParticipantsResponse))
        );
      }
    }

    fetchData();
  }, [contract, twc]);

  return (
    <Container fluid className="pt-5 mt-md-5">
      <Row className="mt-5">
        <Col xs={11} sm={10} md={5} className="mb-4 mx-auto">
          <p className="h4 mt-3 mb-1 text-center text-primary">200%</p>
          <img src={cash} alt="Tron cashout" height="400" width="550" className="img-fluid" />
        </Col>
        <Col xs={11} sm={10} md={5} className="mx-auto mb-5">
          <div id="hero-description" className="bg-primary text-white">
            <p className="summary">A FINANCIAL SYSTEM BUILT ON SMART CONTRACT TECHNOLOGY.</p>
            <p className="summary">OPEN TO ALL, RELIABLE  AND TRANSPARENT TO ALL. </p>
            <div className="logo">
              <img
                src={whiteLogo}
                alt="Tron crypto logo"
                width="35"
                height="36"
                className="p-1 mr-1"
              />
              <span>Tron</span>
            </div>
            <p className="border-bottom my-2">GET +200% UP TO YOUR DEPOSITE</p>
            <div className="description-text">
              <ul className="pl-3">
                <li className="description-text-list-item">Blockchain decentrilize and Anonymouse platform</li>
                <li className="description-text-list-item">
                  <span>Total secure income base on</span>
                  <span style={{padding: "3.3px"}} className="bg-white mx-1 rounded-circle">
                    <img src={blueLogo} alt="Tron logo" width="14" height="12" />
                  </span>
                  <span>TRX smart contract</span>
                </li>
                <li className="description-text-list-item">
                  <span>Smart contract-verified and audited by independent company</span>
                </li>
              </ul>
            </div>
            <button className="btn btn-md bg-white rounded-pill shadow-lg text-primary font-weight-bold d-block w-100 my-3" onClick={onToggleDeposit}>
              MAKE INVESTMENT NOW
            </button>
            <button ref={refLink} data-referral={`${window.location.origin}/?ref=${twc && twc.defaultAddress.base58}`} className="btn btn-md bg-white rounded-pill shadow-lg text-primary font-weight-bold d-block w-100" onClick={copyToClipBoard}>
              COPY REFERRAL LINK
            </button>
            <p id="about-us" className="text-center mt-3 border-bottom">
              <a href="https://shasta.tronscan.org/#/contract/TK24Fi6dTYnNxeihPcp36pPX5TmX2DY1Jx" target="__blank" className="text-white text-decoration-none">Check TronAuxilary Smart contract</a>
            </p>
          </div>
        </Col>
        <Col xs={11} sm={10} className="mx-auto text-center d-flex flex-column mb-5">
          <span className="d-block section-title">We will triple your funds</span>
          <span className="d-block section-sub-title">without any risk</span>
        </Col>
      </Row>
      <Row>
        <Col xs={11} sm={8} md={4} className="text-center mx-auto mb-4">
          <p className="column-title">
            Unlimited earnings with always growing rates
          </p>
          <p className="column-description">
            We provide investment conditions with growing percentage, depending
            on basic interest rate, smart-contract total balance bonus and
            personal "hold-bonus". Maximal available profit: +200% per every
            deposit
          </p>
        </Col>
        <Col xs={11} sm={8} md={4} className="text-center mx-auto mb-4">
          <p className="column-title">
            Worldwide legal company with professional team
          </p>
          <p className="column-description">
            <span>
            We are the officially registered company with team of trusted
            professionals on blockchain market. We are working <strong>24/7</strong> to increase
            platform popularity and make it truly worldwide. Join us and get
            your profit!
            </span>
          </p>
        </Col>
        <Col xs={11} sm={8} md={5} className="text-center mx-auto mb-4 mt-3">
          <p className="column-title">Reliability of TRX smart-contract.<br/> Scam is impossible!</p>
          <p className="column-description">
            <span><strong>TRON AUXILARY</strong> runs automatically on the blockchain and  SMART-CONTRACT technology ensures full safety of all participants funds. Nobody can steal funds, delete or change contract functions.</span>
          </p>
        </Col>
        <Col xs={11} sm={11} className="mx-auto mb-4 d-flex flex-column">
          <p className="button-title-text mx-auto mx-md-0 mx-lg-0">Total invested amount (TRX)</p>
          <button className="btn btn-md btn-primary btn-action-primary mb-3 mx-auto mx-md-0 mx-lg-0">
            {totalInvested}
          </button>
          <p className="button-title-text mx-auto mx-md-0 mx-lg-0">Total active participants</p>
          <button id="investment-conditions" className="btn btn-md btn-primary btn-action-primary mb-5 mx-auto mx-md-0 mx-lg-0">{totalParticipants}</button>
        </Col>
      </Row>
    </Container>
  );
}

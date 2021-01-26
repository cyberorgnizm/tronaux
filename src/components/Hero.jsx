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
    <Container fluid className="pt-5">
      <Row className="mt-5">
        <Col xs={11} sm={10} lg={6} className="text-center mb-4">
          <p>300%</p>
          <img src={cash} alt="Tron cashout" className="w-50" />
        </Col>
        <Col xs={11} sm={10} lg={4} className="mx-auto mb-5">
          <p className="h5">Reliable Investments with</p>
          <div>
            <img
              src={whiteLogo}
              alt="Tron crypto logo"
              className="bg-primary rounded-circle p-1 mr-1"
            />
            <span>Tron</span>
          </div>
          <p className="border-bottom">GET +300% UP TO YPUR DEPOSITE</p>
          <div>
            <span className="d-block">
              Blockchain decentrilize and Anonymouse platform
            </span>
            <div>
              <span>Total secure income base on</span>
              <img src={blueLogo} alt="Tron logo" width="20" height="15" />
              <span>TRX smart contract</span>
            </div>
            <span className="d-block">
              Smart contract-verified and audited by independent company
            </span>
          </div>
          <button className="btn btn-md btn-primary d-block w-100 my-3" onClick={onToggleDeposit}>
            MAKE INVESTMENT NOW
          </button>
          <button ref={refLink} data-referral={`${window.location.origin}/?ref=${twc && twc.defaultAddress.base58}`} className="btn btn-md btn-primary d-block w-100" onClick={copyToClipBoard}>
            COPY REFERRAL LINK
          </button>
        </Col>
        <Col xs={11} sm={10} className="mx-auto text-center mb-4">
          <span className="d-block h5">We will triple your funds</span>
          <span className="d-block h5">without any risk</span>
        </Col>
      </Row>
      <Row>
        <Col xs={11} sm={5} className="text-center mx-auto mb-4">
          <p className="font-weight-bold">
            Unlimited earnings with always growing rates
          </p>
          <p>
            We provide investment conditions with growing percentage, depending
            on basic interest rate, smart-contract total balance bonus and
            personal "hold-bonus". Maximal available profit: +300% per every
            deposit
          </p>
        </Col>
        <Col xs={11} sm={5} className="text-center mx-auto mb-4">
          <p className="font-weight-bold">
            Worldwide legal company with professional team
          </p>
          <p>
            We are the officially registered company with team of trusted
            professionals on blockchain market. We are working 24/7 to increase
            platform popularity and make it truly worldwide. Join us and get
            your profit!
          </p>
        </Col>
        <Col xs={11} sm={8} className="text-center mx-auto mb-4">
          <p className="font-weight-bold">Reliability of TRX smart-contract. Scam is impossible!</p>
          <p>
            Smart-contract technology ensures full safety of all participants
            funds. Nobody can steal funds, or change contract functions.
          </p>
        </Col>
        <Col xs={11} sm={11} className="mx-auto mb-4">
          <p className="font-weight-bold">Total invested amount (TRX)</p>
          <button style={{width: '200px'}}className="btn btn-md btn-primary mb-3 mx-auto">
            {totalInvested}
          </button>
          <p className="font-weight-bold">Total active participants</p>
          <button style={{width: '200px'}}className="btn btn-md btn-primary mb-5">{totalParticipants}</button>
        </Col>
      </Row>
    </Container>
  );
}

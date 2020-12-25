import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import whiteLogo from "../assets/tron-white-vector.svg";
import blueLogo from "../assets/tron-blue-vector.svg";
import cash from "../assets/cash.svg";
import TronWebContext from "../contexts";
import Constants from "../constants";

export default function Hero({ contract }) {
  const [totalInvested, setTotalInvested] = useState("###");
  const [totalParticipants, setTotalParticipants] = useState("###");

  const twc = useContext(TronWebContext);

  useEffect(() => {
    async function fetchData() {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      if (contract) {
        // obtain total invested amount
        const totalInvestedResponse = await contract.getUserTotalDeposits(twc.defaultAddress.base58).call();
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
        <Col sm={7} className="text-center">
          <p>300%</p>
          <img src={cash} alt="Tron cashout" className="w-50" />
        </Col>
        <Col>
          <p>Reliable Investments with</p>
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
          <button className="btn btn-md btn-primary d-block w-100 my-3">
            MAKE INVESTMENT NOW
          </button>
          <button className="btn btn-md btn-primary d-block w-100">
            COPY REFERRAL LINK
          </button>
        </Col>
        <Col sm={12} className="text-center my-5">
          <span className="d-block">We will triple your funds</span>
          <span className="d-block">without any risk</span>
        </Col>
      </Row>
      <Row>
        <Col sm={6} className="text-center">
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
        <Col sm={6} className="text-center">
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
        <Col sm={8} className="text-center mx-auto my-3">
          <p>Reliability of TRX smart-contract. Scam is impossible!</p>
          <p>
            Smart-contract technology ensures full safety of all participants
            funds. Nobody can steal funds, or change contract functions.
          </p>
        </Col>
        <Col sm={6} className="my-3">
          <p className="text-center w-50">Total investment amount (TRX)</p>
          <button className="btn btn-md btn-primary w-50 mb-3">
            {totalInvested}
          </button>
          <p className="text-center w-50">Total active participants</p>
          <button className="btn btn-md btn-primary w-50 mb-5">{totalParticipants}</button>
        </Col>
      </Row>
    </Container>
  );
}

import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import blueLogo from "../assets/tron-blue-vector.svg";
import TronWebContext from "../contexts";
import Constants from "../constants";

export default function Guide({contract, onToggleInvest}) {
  const [amount, setAmount] = useState("");
  const [showErr, setShowErr] = useState(false);

  const twc = useContext(TronWebContext);

  // current user address
  const addr = twc && twc.defaultAddress.base58;

  const handleInvestment = async () => {
    if (contract) {
      try {
        if(amount === ""){
          return
        }
        const { TRX_DIVIDER_AMOUNT } = Constants;
        const amt = Math.floor(amount * TRX_DIVIDER_AMOUNT);
        await contract
          .invest(twc.defaultAddress.base58)
          .send({ callValue: amt });
          setAmount("")
      } catch (error) {
        toast.error(
          "An error occured, while trying to invest, please ensure your tronlink wallet in activated"
        );
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col id="investment" sm={12} className="text-center mt-5 mb-5">
          <p className="text-center text-primary section-title">How to work with the Platform</p>
          <p className="text-center text-primary section-sub-title">Simple 3 steps to get Earnings</p>
        </Col>
        <Col xs={11} sm={11} md={5} className="text-center mx-auto mt-4">
          <p className="guide-title">Step #1: Make deposit</p>
          <Row className="mb-2">
            <Col xs={11} sm={6} className="bg-primary text-white mr-1 mb-4 px-0 pt-3 rounded mx-auto">
              <p className="pt-2 pb-3 px-3 border-top">GET TRON (TRX)</p>
              <p className="text-left px-3 my-4">
                We recommend to use: TronLink browsers extensions, or
                KleverWallet / Banko mobile apps. You can get TRX coins via
                popular exchangers.
              </p>
              <button className="btn btn-md bg-white text-primary d-block my-5 mx-auto px-5 rounded-pill" onClick={onToggleInvest}>
                HOW TO GET TRX
              </button>
            </Col>
            <Col xs={11} sm={5} className="bg-primary text-white mr-1 mb-4 px-0 pt-3 rounded mx-auto">
              <p className="pt-2 pb-1 px-3 border-top">SEND TRX TO OUR SMART-CONTRACT</p>
              <p className="text-left px-3">
                Send any amount of TRX on smart-contract address and start to
                get earnings every moment. Minimal deposit amount is 10 TRX. No
                maximal amount.
              </p>
              <button className="btn btn-md bg-white text-primary d-block my-4 mx-auto px-5 rounded-pill">
                MAKE DEPOSIT
              </button>
            </Col>
          </Row>
          <Col md={11} className="mx-auto">
            <img src={blueLogo} alt="Tron logo" className="mt-4" />
            <p>Your TRX wallet address:</p>
            <button className="btn btn-md btn-border-primary d-block mb-3 mx-auto w-100">
              {addr || "###"}
            </button>
            <button className="btn btn-md btn-primary btn-action-primary d-block mb-3 mx-auto w-100">
              CHECK WALLET STATISTICS
            </button>
          </Col>
          <p className="guide-title mt-5">Step #3: Request withdraw</p>
          <Col md={11} className="bg-primary text-white mb-4 px-0 pt-3 pb-4 rounded mx-auto">
              <p className="pt-2 pb-3 px-3 border-top">REQUEST TRX WITHDRAW </p>
              <p className="text-left d-block mb-1 px-4">
                Your payout will come instantly
              </p>
              <p className="text-left d-block mb-1 px-4">
                Request withdraw from the same wallet you deposited
              </p>
              <p className="text-left d-block my-3 px-4">
              All your
                wallet deposits and referral earnings will be withdrawn with
                single transaction per 1 request
              </p>
          </Col>
        </Col>
        <Col xs={11} sm={11} md={5} className="text-center mx-auto mt-4">
          <img src={blueLogo} alt="Tron logo" />
          <p>Specify deposit TRX amount here:</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
              if(Object.is(Number(e.target.value), NaN)){
                setShowErr(true)
                return
              }
              setShowErr(false)
            }}
            className="form-control input-border-primary d-block mb-3 text-center mx-auto"
            placeholder="0"
          />
          {showErr && <span className="text-danger d-block mb-3">Please ensure you input numbers only</span>}
          <button disabled={showErr} onClick={handleInvestment} className="btn btn-md btn-action-primary text-white d-block mb-3 mx-auto">
            MAKE DEPOSIT HERE
          </button>
          <p className="guide-title mt-5">Step #2: Get earnings</p>
          <Row>
            <Col sm={12} className="bg-primary text-white mb-4 px-0 pt-3 rounded mx-auto">
                <p className="pt-2 pb-1 px-3 border-top">GET YOUR TRX EVERY MOMENT</p>
                <p className="text-left d-block px-5 mx-auto">
                  You can check all your wallet information, including your
                  deposits, earnings, withdraw and referral statistics in real
                  time. Additional earnings with referral program: 3 levels of
                  affiliate rewards: 5% - 2% - 0.5% Referral rewards comes
                  instantly on your wallet balance and can be withdrawn any time
                  along with earnings.
                </p>
                <button className="btn btn-md bg-white text-primary d-block my-4 mx-auto rounded-pill w-75">
                  YOUR WALLET STATISTICS
                </button>
            </Col>
          </Row>
          <img src={blueLogo} alt="Tron logo" className="mt-4" />
          <p>Your TRX wallet address:</p>
          <button className="btn btn-md btn-border-primary d-block mb-4 mx-auto w-100">
            {addr || "###"}
          </button>
          <button className="btn btn-md btn-primary btn-action-primary d-block mb-5 mx-auto w-100">
            REQUEST WITHDRAW HERE
          </button>
        </Col>
      </Row>
    </Container>
  );
}

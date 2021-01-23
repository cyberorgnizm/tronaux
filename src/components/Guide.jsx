import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import blueLogo from "../assets/tron-blue-vector.svg";
import TronWebContext from "../contexts";
import Constants from "../constants";

export default function Guide({contract}) {
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
        <Col id="investment" sm={12} className="text-center my-3">
          <p>How to work with the Platform</p>
          <p>Simple 3 steps to get Earnings</p>
        </Col>
        <Col className="text-center">
          <p>Step #1: Make deposit</p>
          <Row>
            <Col className="bg-primary text-white p-3 mr-1 rounded">
              <p>GET TRON (TRX)</p>
              <p className="text-left">
                We recommend to use: TronLink / TronMask browsers extensions, or
                TronWallet / Banko mobile apps. You can get TRX coins via
                popular exchangers.
              </p>
              <button className="btn btn-md bg-white w-100 mt-2">
                HOW TO GET TRX
              </button>
            </Col>
            <Col className="bg-primary text-white p-3 ml-1 rounded">
              <span>SEND TRX TO OUR SMART-CONTRACT</span>
              <p className="text-left">
                Send any amount of TRX on smart-contract address and start to
                get earnings every moment. Minimal deposit amount is 10 TRX. No
                maximal amount.
              </p>
              <button className="btn btn-md bg-white w-100">
                MAKE DEPOSIT
              </button>
            </Col>
          </Row>
          <img src={blueLogo} alt="Tron logo" className="mt-4" />
          <p>Your TRX wallet address:</p>
          <button className="btn btn-md border border-primary d-block mb-4 w-100">
            {addr || "###"}
          </button>
          <button className="btn btn-md btn-primary d-block mb-5 w-100">
            CHECK WALLET STATISTICS
          </button>

          <p>Step #3: Request withdraw</p>
          <Col className="px-0">
            <div className="bg-primary text-white text-left p-3 rounded">
              <span className="d-block mb-1">REQUEST TRX WITHDRAW </span>
              <span className="d-block mb-1">
                Your payout will come instantly
              </span>
              <span className="d-block mb-1">
                Request withdraw from the same wallet you deposited
              </span>
              <span className="d-block my-3">
              All your
                wallet deposits and referral earnings will be withdrawn with
                single transaction per 1 request
              </span>
            </div>
          </Col>
        </Col>
        <Col className="text-center">
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
            className="form-control border border-primary d-block mb-1 w-100 text-center"
            placeholder="0"
          />
          {showErr && <span className="text-danger d-block mb-3">Please ensure you input numbers only</span>}
          <button disabled={showErr} onClick={handleInvestment} className="btn btn-md btn-primary d-block mb-5 w-100">
            MAKE DEPOSIT HERE
          </button>
          <p className="pt-5">Step #2: Get earnings</p>
          <Row>
            <Col>
              <div className="bg-primary text-white p-3 rounded">
                <p>GET YOUR TRX EVERY MOMENT</p>
                <p className="text-left">
                  You can check all your wallet information, including your
                  deposits, earnings, withdraw and referral statistics in real
                  time. Additional earnings with referral program: 3 levels of
                  affiliate rewards: 5% - 2% - 0.5% Referral rewards comes
                  instantly on your wallet balance and can be withdrawn any time
                  along with earnings.
                </p>
                <button className="btn btn-md bg-white w-75">
                  YOUR WALLET STATISTICS
                </button>
              </div>
            </Col>
          </Row>
          <img src={blueLogo} alt="Tron logo" className="mt-4" />
          <p>Your TRX wallet address:</p>
          <button className="btn btn-md border border-primary d-block mb-4 w-100">
            {addr || "###"}
          </button>
          <button className="btn btn-md btn-primary d-block mb-5 w-100">
            REQUEST WITHDRAW HERE
          </button>
        </Col>
      </Row>
    </Container>
  );
}

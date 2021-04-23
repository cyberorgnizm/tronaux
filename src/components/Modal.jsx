import { useState, useContext, useEffect, useRef } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import whiteLogo from "../assets/tron-white-vector.svg";
import TronWebContext from "../contexts";
import Constants from "../constants";

export function DepositModal({ isOpen, onToggle, contract }) {
  const [amount, setAmount] = useState("");
  const [showErr, setShowErr] = useState(false);

  const twc = useContext(TronWebContext);

  const handleInvestment = async () => {
    if (contract) {
      try {
        if (amount === "") {
          return;
        }
        const { TRX_DIVIDER_AMOUNT } = Constants;
        const amt = Math.floor(amount * TRX_DIVIDER_AMOUNT);
        await contract
          .invest(twc.defaultAddress.base58)
          .send({ callValue: amt });
        setAmount("");
      } catch (error) {
        alert(
          "An error occured, while trying to invest, please ensure your tronlink wallet in activated"
        );
      }
    }
  };

  return (
    <Modal size="lg" show={isOpen} onHide={onToggle}>
      <Modal.Header
        toggle={onToggle}
        closeButton
        className="bg-primary text-white border-bottom-0"
      >
        <h4 className="text-center border-top pt-3 w-100">MAKE NEW DEPOSIT</h4>
      </Modal.Header>
      <Modal.Body className="bg-primary text-white border-top-0">
        <Col sm={6} className="mx-auto text-center">
          <p>Specify deposit TRX amount here:</p>
          <input
            placeholder="0"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (Object.is(Number(e.target.value), NaN)) {
                setShowErr(true);
                return;
              }
              setShowErr(false);
            }}
            className="form-control modal-input text-center"
          />
          {showErr && (
            <span className="text-danger">
              Please ensure you input numbers only
            </span>
          )}
          <button
            disabled={showErr}
            className="btn btn-md modal-btn-white w-100 mt-4"
            onClick={handleInvestment}
          >
            MAKE DEPOSIT HERE
          </button>
        </Col>
      </Modal.Body>
      <Modal.Footer className="bg-primary text-white border-top-0 p-3">
        <p>
          <strong>IMPORTANT!</strong> Do not forget about blockchain fee! You
          should have 2-5 TRX more on your wallet, or your transaction will get
          out of energy status!
        </p>
        <p>
          Minimal deposit amount: 10 TRX (no maximal limits) We are working only
          with TRON (TRX) cryptocurrency Your deposit will be activated after 1
          confirmation in blockchain Earnings comes every moment on your wallet
          balance, you can withdraw it any time you want.
        </p>
      </Modal.Footer>
    </Modal>
  );
}

export function StatisticsModal({ isOpen, onToggle, contract }) {
  const [balance, setBalance] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  // percentage rates
  const [userPercentRate, setUserPercentRate] = useState(0);
  const [contractBalanceRate, setContractBalanceRate] = useState(0);
  const basicPercentRate = 1;
  // end percentage rate
  const [nowAvailable, setNowAvailable] = useState(0);
  const [invested, setInvested] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositTime, setDepositTime] = useState("");
  const [refBonus, setRefBonus] = useState(0);
  const [refWithDraw, setRefWithDraw] = useState(0);
  const [withDrawn, setWithrawn] = useState(0);
  const refLink = useRef();

  const twc = useContext(TronWebContext);

  const copyToClipBoard = async () => {
    navigator.clipboard
      .writeText(refLink.current.textContent)
      .then(() => {
        setIsCopied(true);
      })
      .catch(() => {
        alert("Ooops! Failed to copy referral link.");
      });
  };

  const getDailyProfit = async () => {
    if (contract) {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract
        .getUserAvailableBalanceForWithdrawal(twc.defaultAddress.base58)
        .call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setBalance(amount);
    }
    return 0;
  };

  const getTotalInvested = async () => {
    if (contract) {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      // obtain user total invested amount
      const res = await contract
        .getUserTotalDeposits(twc.defaultAddress.base58)
        .call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setInvested(amount);
    }
    return 0;
  };

  const getReferralBonus = async () => {
    if (contract) {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract
        .getUserReferralBonus(twc.defaultAddress.base58)
        .call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setRefBonus(amount);
    }
  };

  const getReferralWithdrawal = async () => {
    if (contract) {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract
        .getUserReferralWithdraw(twc.defaultAddress.base58)
        .call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setRefWithDraw(amount);
    }
  };

  const getTotalWithdrawn = async () => {
    if (contract) {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract
        .getUserTotalWithdrawn(twc.defaultAddress.base58)
        .call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setWithrawn(amount);
    }
  };

  const getTotalNowAvailableBalance = async () => {
    if (contract) {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract
        .getUserAvailableBalanceForWithdrawal(twc.defaultAddress.base58)
        .call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setNowAvailable(amount);
    }
  };

  const getContractBalanceRate = async () => {
    if (contract) {
      const res = await contract.getContractBalanceRate().call();
      const amount = (twc.toDecimal(res) - 10) / 10;
      setContractBalanceRate(amount.toFixed(1));
    }
  };

  const getUserPercentRate = async () => {
    if (contract) {
      const res = await contract
        .getUserPercentRate(twc.defaultAddress.base58)
        .call();
      const amount = twc.toDecimal(res) / 10;
      setUserPercentRate(amount.toFixed(1));
    }
  };

  const getDepositInfo = async () => {
    function getFormattedDate(date) {
      const hour = ("0" + date.getUTCHours()).slice(-2);
      const minute = ("0" + date.getUTCMinutes()).slice(-2);
      const day = ("0" + date.getUTCDate()).slice(-2);
      const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
      const year = date.getUTCFullYear();
      return hour + ":" + minute + " " + day + "." + month + "." + year;
    }

    if (contract) {
      const res1 = await contract
        .getUserAmountOfDeposits(twc.defaultAddress.base58)
        .call();
      const deposit = twc.toDecimal(res1);
      setDepositAmount(deposit);

      const res2 = await contract
        .getUserDepositInfo(twc.defaultAddress.base58, deposit - 1)
        .call();
      const userLastDepositTime = twc.toDecimal(res2[2]);
      const userLastDepositTimeFormatted = getFormattedDate(
        new Date(userLastDepositTime * 1000)
      );

      setDepositTime(userLastDepositTimeFormatted);
    }
  };

  // TRX withdrawal function
  const handleWithdrawal = async () => {
    if (contract) {
      await contract.withdraw().send({ callValue: 0 });
    }
  };

  useEffect(() => {
    getTotalInvested();
    getReferralBonus();
    getReferralWithdrawal();
    getTotalWithdrawn();
    getTotalNowAvailableBalance();
    getDepositInfo();

    const intvl = setInterval(() => {
      getDailyProfit();
      getContractBalanceRate();
      getUserPercentRate();
    }, 2000);

    return () => {
      clearInterval(intvl);
    };
  });

  const getHoldBonus = () => {
    const bonus =
      userPercentRate - contractBalanceRate - basicPercentRate.toFixed(1);
    return bonus >= 0 ? `+${bonus.toFixed(1)}` : `+0`;
  };

  return (
    <Modal size="lg" show={isOpen} onHide={onToggle}>
      <Modal.Header
        toggle={onToggle}
        closeButton
        className="bg-primary text-white border-bottom-0"
      >
        <h4 className="text-center border-top pt-3 w-100">WALLET STATISTIC</h4>
      </Modal.Header>
      <Modal.Body className="bg-primary text-white border-top-0">
        <Col sm={8} className="mx-auto text-center">
          <p>Your TRN wallet address</p>
          <input
            placeholder=""
            value={twc && twc.defaultAddress.base58}
            className="form-control text-center"
          />
        </Col>
        <Col sm={10} className="mx-auto">
          <p>
            <span className="d-block my-3 text-center">
              Your referral link:
            </span>
            <span className="d-block text-center font-weight-bold my-3">
              https://troneauxilary.net/?ref=TDdr96DxirQBArbQzcFnph9Ffs8mifdQrn
            </span>
            <span className="d-block text-center">
              Share this link with your partners to get referral rewards - You
              should have active deposit to unlock affiliate bonuses! You will
              get no rewards without active deposit.
            </span>
          </p>
        </Col>
        <Col sm={12}>
          <div className="bg-white rounded text-dark px-4 mb-3">
            <Row>
              <Col className="my-3 border-right d-flex flex-column justify-content-center">
                <span>Your current daily profit</span>
                <strong className="text-primary h3">{`+${userPercentRate}%`}</strong>
              </Col>
              <Col className="my-3 p-2 px-4 border-left d-flex flex-column justify-content-center">
                <span>Basic profit: +{basicPercentRate.toFixed(1)}%</span>
                <span>Hold-bonus: {getHoldBonus()}%</span>
                <span>Contract bonus: +{contractBalanceRate}%</span>
              </Col>
            </Row>
          </div>
          <div className="bg-white rounded text-dark px-4 mb-3">
            <Row>
              <Col className="my-3 border-right d-flex flex-column justify-content-center">
                <span>Available withdraw balance</span>
                <strong className="text-primary h3">{balance}</strong>
              </Col>
              <Col className="my-3 p-2 px-4 border-left d-flex flex-column justify-content-center align-items-start">
                <span className="mb-3">Request withdraw:</span>
                <button
                  className="btn btn-sm btn-primary w-auto"
                  onClick={handleWithdrawal}
                >
                  Withdraw
                </button>
              </Col>
              <Col sm={12} className="px-3 py-2">
                <small style={{ fontStyle: "italic" }}>
                  Click Withdraw button, and you will get instantly all your
                  deposits earnings and affiliate bonuses with a single
                  transaction. Your personal hold-bonus will be reseted.
                </small>
              </Col>
            </Row>
          </div>
          <div className="bg-white rounded text-dark mb-3 px-4">
            <Row>
              <Col className="my-3 border-right d-flex flex-column justify-content-center">
                <span>Total invested</span>
                <strong className="text-primary h3">{invested}</strong>
              </Col>
              <Col className="my-3 p-2 px-4 border-left d-flex flex-column justify-content-center align-items-start">
                <span>Number of deposits: {depositAmount}</span>
                <span>Last deposit date:</span>
                <strong>{depositTime}</strong>
              </Col>
            </Row>
          </div>
          <div className="bg-white rounded text-dark mb-3 px-4">
            <Row>
              <Col className="my-3 border-right d-flex flex-column justify-content-center">
                <span>Total earned</span>
                <strong className="text-primary h3">
                  {nowAvailable + withDrawn + refWithDraw}
                </strong>
              </Col>
              <Col className="my-3 p-2 px-4 border-left d-flex flex-column justify-content-center align-items-start">
                <span>Total withdrawn</span>
                <strong className="text-primary h3">
                  {withDrawn + refWithDraw}
                </strong>
              </Col>
            </Row>
          </div>
          <div className="bg-white rounded text-dark mb-3 px-4">
            <Row>
              <Col className="my-3 border-right d-flex flex-column justify-content-center">
                <span>Referral rewards</span>
                <strong className="text-primary h3">
                  {refBonus + refWithDraw}
                </strong>
              </Col>
              <Col className="my-3 p-2 px-4 border-left d-flex flex-column justify-content-center align-items-start">
                <span>1st level: 0</span>
                <span>2nd level: 0</span>
                <span>3rd level: 0</span>
              </Col>
            </Row>
          </div>
        </Col>
      </Modal.Body>
      <Modal.Footer className="bg-primary text-white border-top-0 p-3">
        <p className="w-100 text-center py-2">Your referral link:</p>
        <div className="w-100 col-9 mx-auto h-auto">
          {isCopied ? (
            <>
            <button ref={refLink} className="btn btn-md bg-white w-100 mb-1">
              <mark>
                {window.location.origin}/?ref={twc && twc.defaultAddress.base58}
              </mark>
            </button>
            <small className="text-white text-center d-block w-100 mb-2">Link successfully copied</small>
            </>
          ) : (
            <button ref={refLink} className="btn btn-md bg-white w-100 mb-3">
              {window.location.origin}/?ref={twc && twc.defaultAddress.base58}
            </button>
          )}
          <button
            onClick={copyToClipBoard}
            className="btn btn-md bg-white w-100"
          >
            COPY REFERRAL LINK
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export function InvestModal({ isOpen, onToggle }) {
  return (
    <Modal size="lg" show={isOpen} onHide={onToggle}>
      <Modal.Header
        toggle={onToggle}
        closeButton
        className="bg-primary text-white border-bottom-0"
      >
        <p className="border-top pt-3 w-100">
          <strong>IMPORTANT!</strong> Do not forget about blockchain fee! You
          should have 2-5 TRX more on your wallet, or your transaction will get
          out of energy status!
        </p>
      </Modal.Header>
      <Modal.Body className="bg-primary text-white border-top-0 py-1">
        <Row>
          <Col sm={7} className="mx-auto">
            <p className="h5">How to invest on mobile?</p>
            <p>
              You can download <strong>Trust Wallet</strong> or{" "}
              <strong>Klever Wallet</strong> app from application store. After
              the installation, you can create a new TRX wallet or import an
              existing TRX wallet, and then transfer the TRX from the exchange
              to the wallet. Finally, find <strong>TRONAuxilary </strong>
              within the wallet app or browse our site with the browser in the
              app, and then go to invest or withdraw
            </p>
          </Col>
          <Col sm={3} className="mx-auto text-center d-flex">
            <img
              src={whiteLogo}
              alt="white logo"
              height="156"
              width="117"
              className="d-none d-md-block mr-auto"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="bg-primary text-white border-top-0 py-5">
        <Row>
          <Col sm={3} className="mx-auto text-center d-flex">
            <img
              src={whiteLogo}
              alt="white logo"
              height="156"
              width="117"
              className="d-none d-md-block ml-auto my-auto"
            />
          </Col>
          <Col sm={7} className="mx-auto">
            <p className="h5">How to invest on Desktop?</p>
            <p>
              You can install the TronLink or Tron Mask extension on Chrome.
              After the installation, you can create a new TRX wallet or import
              an existing TRX wallet, and then transfer the TRX from the
              exchange to the wallet. Finally, login on TronLink or TronPay to
              browse this website and invest.
            </p>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

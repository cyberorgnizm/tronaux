import { useState, useContext, useEffect, useRef } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import {toast} from 'react-toastify';
import TronWebContext from "../contexts";
import Constants from "../constants";

export function DepositModal({ isOpen, onToggle, contract }) {
  const [amount, setAmount] = useState(0);

  const twc = useContext(TronWebContext);

  const handleInvestment = async () => {
    if (contract) {
      try {
        const { TRX_DIVIDER_AMOUNT } = Constants;
        const amt = Math.floor(amount * TRX_DIVIDER_AMOUNT);
        await contract
          .invest(twc.defaultAddress.base58)
          .send({ callValue: amt });
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
            placeholder="###"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control text-center"
          />
          <button
            className="btn btn-md bg-white w-100 mt-4"
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
  const [balanceRate, setBalanceRate] = useState(0);
  const [nowAvailable, setNowAvailable] = useState(0);
  const [invested, setInvested] = useState(0);
  const [refBonus, setRefBonus] = useState(0);
  const [refWithDraw, setRefWithDraw] = useState(0);
  const [withDrawn, setWithrawn] = useState(0);
  const refLink = useRef()

  const twc = useContext(TronWebContext);

  const copyToClipBoard = async () => {
    navigator.clipboard.writeText(refLink.current.textContent).then(() => {
      toast("Referral link successfully copied!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }).catch(() => {
      toast.error("Ooops! Failed to copy referral link.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
  }

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
      const res = await contract.totalInvested().call();
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
      const amount = twc.toDecimal(res) / 10;
      setBalanceRate(amount);
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

    const intvl = setInterval(() => {
      getDailyProfit();
      getContractBalanceRate();
    }, 2000);

    return () => {
      clearInterval(intvl);
    };
  });

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
          <input placeholder="###" className="form-control text-center" />
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
                <span className="mb-2">Your current daily profit</span>
                <strong className="text-primary">{balanceRate}</strong>
              </Col>
              <Col className="my-3 p-2 border-left d-flex flex-column justify-content-center">
                <span>Basic profit: +1.0%</span>
                <span>Hold-bonus: +0.1%</span>
                <span>Contract bonus: +0.0%</span>
              </Col>
            </Row>
          </div>
          <div className="bg-white rounded text-dark px-4 mb-3">
            <Row>
              <Col className="my-3 border-right d-flex flex-column justify-content-center">
                <span className="mb-2">Available withdraw balance</span>
                <strong className="text-primary">{balance}</strong>
              </Col>
              <Col className="my-3 p-2 border-left d-flex flex-column justify-content-center align-items-start">
                <span className="mb-3">Request withdraw:</span>
                <button
                  className="btn btn-sm btn-primary w-50"
                  onClick={handleWithdrawal}
                >
                  Withdraw
                </button>
              </Col>
              <Col sm={12} className="px-3 py-2">
                <small>
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
                <span className="mb-2">Total invested</span>
                <strong className="text-primary">{invested}</strong>
              </Col>
              <Col className="my-3 p-2 border-left d-flex flex-column justify-content-center align-items-start">
                <span>Number of deposits: {1}</span>
                <span>Last deposit date:</span>
                <span>{Date.now()}</span>
              </Col>
            </Row>
          </div>
          <div className="bg-white rounded text-dark mb-3 px-4">
            <Row>
              <Col className="my-3 border-right d-flex flex-column justify-content-center">
                <span className="mb-2">Total earned</span>
                <strong className="text-primary">
                  {nowAvailable + withDrawn + refWithDraw}
                </strong>
              </Col>
              <Col className="my-3 p-2 border-left d-flex flex-column justify-content-center align-items-start">
                <span className="mb-2">Total withdrawn</span>
                <strong className="text-primary">
                  {withDrawn + refWithDraw}
                </strong>
              </Col>
            </Row>
          </div>
          <div className="bg-white rounded text-dark mb-3 px-4">
            <Row>
              <Col className="my-3 border-right d-flex flex-column justify-content-center">
                <span className="mb-2">Referral rewards</span>
                <strong className="text-primary">{refBonus + refWithDraw}</strong>
              </Col>
              <Col className="my-3 p-2 border-left d-flex flex-column justify-content-center align-items-start">
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
        <div className="w-100 col-9 mx-auto">
          <button ref={refLink} className="btn btn-md bg-white w-100 mb-3">
            {window.location.origin}/?ref={twc && twc.defaultAddress.base58}
          </button>
          <button onClick={copyToClipBoard} className="btn btn-md bg-white w-100">
            COPY REFERRAL LINK
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

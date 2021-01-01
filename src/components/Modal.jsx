import { useState, useContext, useEffect } from "react";
import { Modal, Col, Row } from "react-bootstrap";
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

  const twc = useContext(TronWebContext);

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
    if(contract){
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract.getUserReferralBonus(twc.defaultAddress.base58).call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setRefBonus(amount);
    }
  }

  const getReferralWithdrawal = async () => {
    if(contract){
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract.getUserReferralWithdraw(twc.defaultAddress.base58).call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setRefWithDraw(amount);
    }
  }

  const getTotalWithdrawn = async () => {
    if(contract){
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract.getUserTotalWithdrawn(twc.defaultAddress.base58).call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setWithrawn(amount);
    }
  }

  const getTotalNowAvailableBalance = async () => {
    if(contract){
      const { TRX_DIVIDER_AMOUNT } = Constants;
      const res = await contract.getUserAvailableBalanceForWithdrawal(twc.defaultAddress.base58).call();
      const amount = twc.toDecimal(res) / TRX_DIVIDER_AMOUNT;
      setNowAvailable(amount);
    }
  }

  const getContractBalanceRate = async () => {
    if(contract){
      const res = await contract.getContractBalanceRate().call();
      const amount = twc.toDecimal(res) / 10;
      setBalanceRate(amount);
    }
  }


  // TRX withdrawal function
  const handleWithdrawal = async () => {
    if(contract){
      await contract.withdraw().send({callValue: 0});
    }
  }

  useEffect(() => {
    
    getTotalInvested()
    getReferralBonus()
    getReferralWithdrawal()
    getTotalWithdrawn()
    getTotalNowAvailableBalance()
    
    const intvl = setInterval(() => {
      getDailyProfit();
      getContractBalanceRate()
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
          <div className="bg-white text-dark p-2 mb-3">
            <p>Your current daily profit: {balanceRate}</p>
          </div>
          <div className="bg-white text-dark mb-3 p-2">
            <Row>
              <Col>
                <p>Available withdraw balance: {balance}</p>
              </Col>
              <Col>
                <button className="btn btn-sm btn-primary" onClick={handleWithdrawal}>Withdraw</button>
              </Col>
            </Row>
          </div>
          <div className="bg-white text-dark mb-3 p-2">
            <p>Total invested: {invested}</p>
          </div>
          <div className="bg-white text-dark mb-3 p-2 d-flex">
            <p className="mr-4">Total earned: {nowAvailable + withDrawn + refWithDraw}</p>
            <p>Total withdrawn: {withDrawn + refWithDraw}</p>
          </div>
          <div className="bg-white text-dark mb-3 p-2">
            <p>Referral rewards: {refBonus +  refWithDraw}</p>
          </div>
        </Col>
      </Modal.Body>
      <Modal.Footer className="bg-primary text-white border-top-0 p-3">
        <p className="w-100 text-center py-2">Your referral link:</p>
        <div className="w-100 col-9 mx-auto">
          <button className="btn btn-md bg-white w-100 mb-3">
            {window.location.origin}/?ref={twc && twc.defaultAddress.base58}
          </button>
          <button className="btn btn-md bg-white w-100">
            COPY REFERRAL LINK
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

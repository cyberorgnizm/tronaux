import {useContext, useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import TronWebContext from "../contexts";
import Constants from "../constants";
import laptopSvg from '../assets/laptop.svg'


const descriptions = [
  {title: 'BASIC INTEREST RATE', bonus: '1% EVERY 24 HOURS', body: 'TRONAuxilary smart-contract calculate profit upto every deposit since the date it was made.'},
  {title: 'PERSONAL HOLD-BONUS', bonus: '+0.1% FOR EVERY 24 HOURS WITHOUT WITHDRAW', body: 'Smart-contract calculates hold-bonus from your deposit, or last withdraw date. If you did not request payment, you get-- an additional bonus. After 24 hours +0.1%, after 48 hours +0.2%, after 72 hours +0.3% and so on.'},
  {title: 'CONTRACT TOTAL AMOUNT BONUS', bonus: '+0.1% FOR EVERY 1,000,000 TRX ON PLATFORM BALANCE', body: 'Smart-contract check its current balance and charge an additional +0.1% up to your earnings for every 1,000,000 TRX on balance. CURRENT BONUS: +0%'}
]

export default function Description({contract}) {
  const [platformBalance, setPlatformBalance] = useState("###");

  const twc = useContext(TronWebContext);

  useEffect(() => {
    async function fetchData() {
      const { TRX_DIVIDER_AMOUNT } = Constants;
      if (contract) {
        // obtain platform balance
        const totalInvestedResponse = await contract.getContractBalance().call();
        setPlatformBalance(
          parseInt(twc.toDecimal(totalInvestedResponse) / TRX_DIVIDER_AMOUNT)
        );
      }
    }

    fetchData();
  }, [contract, twc]);

  return (
    <Container fluid className="dash-section-border">
      <Row>
        <Col xs={11} sm={12} className="mx-auto mb-5">
          <p className="text-center text-primary section-title">INVESTMENT CONDITIONS</p>
          <p className="text-center text-primary section-sub-title">THE BEST MARKET OFFER</p>
        </Col>
        <Col xs={11} sm={11} md={5} className="mx-sm-auto ml-md-auto">
          <img src={laptopSvg} alt="Latop SVG" className="mx-auto d-block" />
          <button className="btn btn-md btn-primary btn-action-primary d-block mb-3 mx-auto">Working only with  TRON (TRX) network</button>
          <button className="btn btn-md btn-primary btn-action-primary d-block mb-3 mx-auto">Minimal deposit: 10 TRX</button>
          <button className="btn btn-md btn-primary btn-action-primary d-block mb-3 mx-auto">Total income: 300% (deposit included)</button>
          <button className="btn btn-md btn-primary btn-action-primary d-block mb-3 mx-auto">Earnings every moment, withdraw any time</button>
        </Col>
        <Col xs={11} sm={11} md={5} className="mx-sm-auto mr-md-auto mt-5 mt-sm-5 mt-md-0">
          {descriptions.map(desc => (
          <div className="mb-5" key={desc.title}>
            <p className="investment-description-title mt-1 pl-3">{desc.title}</p>
            <p className="investment-description-bonus border-left border-primary left-border pl-2">{desc.bonus}</p>
            <p className="investment-description-body text-justify grey-description-text">{desc.body}</p>
          </div>))}
          <p className="font-weight-bold">Current platform balance (TRX)</p>
          <button className="btn btn-md btn-primary btn-action-primary mb-3">{platformBalance}</button>
        </Col>
      </Row>
    </Container>
  );
}

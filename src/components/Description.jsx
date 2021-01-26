import {useContext, useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import TronWebContext from "../contexts";
import Constants from "../constants";
import laptopSvg from '../assets/laptop.svg'


const descriptions = [
  {title: 'BASIC INTEREST RATE', bonus: '1% EVERY 24 HOURS', body: 'TRONAuxilary smart-contract calculate profit upto every deposit since the date it was made,everyday you will get 2%'},
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
    <Container fluid>
      <Row>
        <Col xs={11} sm={12} className="mx-auto">
          <p className="text-center font-weight-bold">INVESTMENT CONDITIONS</p>
          <p className="text-center font-weight-bold">THE BEST MARKET OFFER</p>
        </Col>
        <Col xs={11} sm={5} className="mx-auto">
          <img src={laptopSvg} alt="Latop SVG" />
          <button className="btn btn-md btn-primary d-block mb-3 w-100">Working only with  TRON (TRX) network</button>
          <button className="btn btn-md btn-primary d-block mb-3 w-100">Minimal deposit: 10 TRX</button>
          <button className="btn btn-md btn-primary d-block mb-3 w-100">Total income: 300% (deposit included)</button>
          <button className="btn btn-md btn-primary d-block mb-3 w-100">Earnings every moment, withdraw any time</button>
        </Col>
        <Col xs={11} sm={6} className="offset-1 mx-auto">
          {descriptions.map(desc => (
          <div className="my-5" key={desc.title}>
            <p className="h5">{desc.title}</p>
            <p className="font-weight-bold">{desc.bonus}</p>
            <p className="text-justify">{desc.body}</p>
          </div>))}
          <p className="font-weight-bold">Current platform balance (TRX)</p>
          <button style={{width: '230px'}} className="btn btn-md btn-primary mb-3">{platformBalance}</button>
        </Col>
      </Row>
    </Container>
  );
}

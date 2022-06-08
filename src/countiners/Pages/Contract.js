//--------------------- this page creating user Smartcontract ------------------------
//-- in this page user can creat NFT smartcontracts in 3 blockchain (CELO,ETH,Matic)--
//----------------------- and supported Royalti smartcontract-------------------------

import "../../Styles/Contract.css"
import FeeCurrency from '../../constance/feeCurrency.json';
import { alert, selectSmartContract, deploySmartContract, selectTxId, getContractAddress, selectAccont, modalChekWallet, selecAPI, setTxId, selectkms, selectNetwork } from '../../features/NFT/NFTSlice';
import { useEffect, useState } from 'react';
import '../../Styles/Create.css';
import { useDispatch, useSelector } from 'react-redux';
export default function Contract() {
  const BlockChaine = useSelector(selectNetwork);
  const dispatch = useDispatch();
  const [inputTxId, setInputTxId] = useState("");
  const smartContract = useSelector(selectSmartContract);
  const TXID = useSelector(selectTxId);
  const [deployChaine, setDeployChaine] = useState("");
  const [deployName, setDeployName] = useState("");
  const [deploySymbol, setDeploySymbol] = useState("");
  const accont = useSelector(selectAccont);
  const hasContract = useSelector(selecAPI).contract.hasContract;
  const kmsStatus = useSelector(selectkms).Status;
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
  const [intervalName, setintervalName] = useState(0);
  const [isCELO, setIsCELO] = useState(false);
  const [feeCurrency, setFeeCurrency] = useState("");
  const [percentage, setPercentage] = useState(false);
  const [fixCashback, setFixCashback] = useState(false);
  const [royalti, setRoyalti] = useState(false);
  // for Deplloy new smart Contract
  const deployNew = () => {
    if (deployChaine === "" || deployName === "" || deployChaine === "" || (deployChaine === "CELO" && feeCurrency === "") || (royalti && (!fixCashback && !percentage))) {
      dispatch(alert({ massage: "Fill all Required Items", type: "danger", show: true }));
      document.getElementById('deploy').classList.add('Invalid');
    } else {
      if (!accont) {
        dispatch(alert({ massage: "Conect To Metamask Wallet and try again", type: "primary", show: true }));
        dispatch(modalChekWallet());
      } else {
        dispatch(deploySmartContract(deployName, deploySymbol, deployChaine, feeCurrency, percentage, fixCashback));
      }
    }
  }
  // for check and get transaction and contract address
  const checkContract = () => {
    if (deployChaine === "" || inputTxId === "") {
      dispatch(alert({ massage: "Fill all Required Items", type: "danger", show: true }));
      document.getElementById('checkTxId').classList.add('Invalid');
    } else {
      dispatch(setTxId(inputTxId))
      dispatch(getContractAddress({ chain: deployChaine, txId: inputTxId }))
    }
  }
  // for check and get and contract address interval
  const checkinterval = () => {
    if (hasContract === "pending" || hasContract === null || hasContract === "") {
      dispatch(getContractAddress({ chain: deployChaine, txId: TXID }))
      setCounter(counter + 1);
    }
  }
  // for call chek api evry minuts 
  useEffect(() => {
    const timerCheckContract = () => {
      if (intervalName) clearInterval(intervalName);
      if ((hasContract === "pending" || hasContract === null || hasContract === "") && TXID) {
        var tempTime = 30;
        const interval = setInterval(() => {
          if (tempTime > 0) {
            setTimer(tempTime);
            tempTime--
          } else {
            checkinterval();
            return clearInterval(interval);
          };
        }, 1000);
        setintervalName(interval);
      }
    }
    if (counter < 10) timerCheckContract();
  }, [counter, TXID, hasContract]);
  useEffect(() => {
    (kmsStatus === "loading") && dispatch(alert({ massage: "Conferm transaction in metamask window", type: "primary", show: true, time: 3000 }));
    (kmsStatus === "rejected") && dispatch(alert({ massage: "transaction not completed", type: "danger", show: true, time: 3000 }));
  }, [kmsStatus])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className="Contract">
        <h1 className="modal-title" id="ManageDeployLabel">Deployer Smart Contract</h1>
        <div className="contractIMG">
          <img src="Images/smartContract.png" />
        </div>
        <div>
          {((hasContract === "pending")) &&
            <div className="pending alert alert-primary">
              le Statut de la transaction en attente ... reChek après {timer} secondes
            </div>
          }
          {((kmsStatus === "idle" && TXID !== "" && hasContract === "")) &&
            <div className="pending alert alert-primary">
              le Statut de la transaction en attente ... reChek après {timer} secondes
            </div>
          }
          {(hasContract === "rejected") &&
            <div className="pending alert alert-danger">
              ce txId n'a pas de smartContact
            </div>
          }
          {(hasContract === "idle") &&
            <div className="pending alert alert-success showTxId">
              Votre adresse de contrat est : <a className="d-flex justify-content-center align-items-center" href={BlockChaine.list.find((item) => item.simbol === deployChaine).params.blockExplorerUrls + "/address/" + smartContract}>{smartContract.substring(0, 10)}...{smartContract.substring(smartContract.length - 10, smartContract.length)}<span className="icon">open_in_new</span></a>
              <span className='icon' onClick={() => navigator.clipboard.writeText(smartContract)}>copier</span>
            </div>
          }

          {(TXID && kmsStatus === "idle" && inputTxId === "") &&
            <div className="pending alert alert-success showTxId">
              votre txId est :<a className="d-flex justify-content-center align-items-center" href={BlockChaine.list.find((item) => item.simbol === deployChaine).params.blockExplorerUrls + "/tx/" + TXID}>{TXID.substring(0, 10)}...{TXID.substring(TXID.length - 10, TXID.length)}<span className="icon">open_in_new</span></a>
              <span className='icon' onClick={() => navigator.clipboard.writeText(TXID)}>copier</span>
            </div>
          }
        </div>
        <p className='m-0'>pour déployer NFT SmartContract Cliquez sur "Déployer nouveau" et attendez de confirmer ou d'enregistrer votre txId pour le vérifier plus tard dans cette page ou dans <a href='https://etherscan.io/'>etherscan.io</a>. </p>
        <div className="row">
          <div className="col-sm-6">
            <h5>Deployer Smart Contract</h5>
            <p>Entrez le nom et le symbole et sélectionnez Chaîne pour l'espace de votre contrat intelligent</p>
            <div id="deploy" className="formSection formModal">
              <label className="lable">Choissisez votre Chaines</label>
              <div className='row px-2'>
                {BlockChaine.list.map((row, index) =>
                  <div key={index} className='col-sm-6 col-md-4  p-1 position-relative'>
                    <input name='blockChaine' required type='radio' onChange={(e) => { e.target.checked === true ? setDeployChaine(row.simbol) : setDeployChaine(""); (e.target.checked === true && row.simbol === "CELO") ? setIsCELO(true) : setIsCELO(false) }} />
                    <div className='category catModal'>
                      <span>
                        <img src={row.image} alt='' />
                      </span>
                      <div>{row.Name}</div>
                    </div>
                  </div>
                )}
              </div>
              {isCELO && <div className='row px-2'>
                <label className="lable">
                La blockchain CELO doit sélectionner la devise des frais :
                </label>
                {FeeCurrency.list.map((row, index) =>
                  <div key={index} className='col-sm-6 col-md-4  p-1 position-relative'>
                    <input name='feeCurrency' required type='radio' onChange={(e) => { e.target.checked === true ? setFeeCurrency(row.simbol) : setFeeCurrency("") }} />
                    <div className='category catModal'>
                      <span>
                        <img src={row.image} alt='' />
                      </span>
                      <div>{row.Name}</div>
                    </div>
                  </div>
                )}
              </div>}
              <div className='royaltyDeploy '>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <label className="lable">
                    Créer des royalties<a href="/blog/RoyaltyNFTs"> plus d'infos</a>
                  </label>
                  <div className="check">
                    <input type="checkbox" onChange={(e) => { if (e.target.checked) { setRoyalti(true) } else { setRoyalti(false); setPercentage(false); setFixCashback(false) } }} />
                    <div className='back'></div>
                    <div className='circle'></div>
                  </div>
                </div>
                {royalti &&
                  <div className="d-flex align-items-center">
                    <div className="col-sm-6 p-1 position-relative">
                      <input name='royalty' required type='radio' checked={percentage} onChange={(e) => { setPercentage(true); setFixCashback(false); }} />
                      <div className='category catModal'>
                        <div>Pourcentage cashback</div>
                      </div>
                    </div>
                    <div className="col-sm-6 p-1 position-relative">
                      <input name='royalty' required type='radio' checked={fixCashback} onChange={(e) => { setFixCashback(true); setPercentage(false) }} />
                      <div className='category catModal'>
                        <div>Fixe cashback</div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className='row py-2'>
                <div className='col-sm-6'>
                  <label className="lable">Nom:</label>
                  <input className='formInput p-2' placeholder="Name" type="text" required value={deployName} onChange={(e) => setDeployName(e.target.value)} />
                </div>
                <div className='col-sm-6'>
                  <label className="lable">Symbole :</label>
                  <input className='formInput p-2' placeholder="Symbol" type="text" required value={deploySymbol} onChange={(e) => setDeploySymbol(e.target.value)} />
                </div>
              </div>
              <div className='d-flex justify-content-center align-items-center my-2'>
                <button className='btn btn-primary col-sm-6 addCollection' onClick={() => deployNew()}>Deployer nouveau Contrat</button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h5>Check txId</h5>
            <p>Collez txId pour le vérifier. si la transaction est confirmée, l'adresse du contrat est indiquée dans cette section</p>
            <div id="checkTxId" className='getContractAddress'>
              <label className="lable">Obtenir l'adresse du contrat par txId</label>
              <input type="text" className='formInput' required value={inputTxId} onChange={(e) => setInputTxId(e.target.value)} placeholder="Enter Your TxId" />
              <div className="formSection">
                <label className="lable">Choisissez votre Chaine</label>
                <div className='row px-2'>
                  {BlockChaine.list.map((row, index) =>
                    <div key={index} className='col-sm-6 col-md-4  p-1 position-relative'>
                      <input name='blockChainetx' required type='radio' onChange={(e) => { e.target.checked === true ? setDeployChaine(row.simbol) : setDeployChaine("") }} />
                      <div className='category catModal'>
                        <span>
                          <img src={row.image} alt='' />
                        </span>
                        <div>{row.Name}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button className='btn btn-outline-primary my-0 mx-auto d-block' onClick={() => checkContract()} >Obtenir l'adresse du Contrat</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
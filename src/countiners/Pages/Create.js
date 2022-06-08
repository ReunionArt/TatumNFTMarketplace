//------------------- this page for creat NFT ----------------------------
//--------------------- supported all kind of NFT ------------------------
//-- user can Create Experss NFTs without fee by using Tatum ExpressNFT --
//------------ user can create NFT in custom contractAddress -------------
//--------------------- user can creat Royalti NFT -----------------------

import {  useState } from 'react';
import '../../Styles/Create.css';
import { creatNFT, alert, selectAccont, selectkms, modalChekWallet, selectMintNFT, selectIPFS, selectNetwork, selectWallet, selectAlert } from '../../features/NFT/NFTSlice';
import { useDispatch, useSelector } from 'react-redux';
import FeeCurrency from '../../constance/feeCurrency.json';
import Alert from '../../components/Alert';
import { Link } from 'react-router-dom';
export default function Create() {
  const BlockChaine = useSelector(selectNetwork);
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const [imgfile, setImgfile] = useState("");
  const [nameNFT, setNameNFT] = useState("");
  const [userSmartContract, setUserSmartContract] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [youtube_url, setYoutube_url] = useState("");
  const [blockChain, setBlockChain] = useState("");
  const [proOption, setProOption] = useState([{ trait_type: "", value: "" }])
  const [levelOption, setLevelOption] = useState([{ trait_type: "", value: "3", value2: "5" }])
  const [statsOption, setStatsOption] = useState([{ trait_type: "", value: "3", value2: "5" }])
  const [isCELO, setIsCELO] = useState(false);
  const [feeCurrency, setFeeCurrency] = useState("");
  const [percentage, setPercentage] = useState("1");
  const [fixCashback, setFixCashback] = useState("0");
  const [royalti, setRoyalti] = useState(false);
  const [isExpress, setIsExpress] = useState(true);
  const [sensitiveContent, setSensitiveContent] = useState(false);
  const accont = useSelector(selectAccont);
  const ipfs = useSelector(selectIPFS);
  const mintNFT = useSelector(selectMintNFT);
  const showModalAler = useSelector(selectAlert).showModal;
  const kms = useSelector(selectkms);
  const wallet = useSelector(selectWallet)
  // for show img in form
  const onImageChange = (e) => {
    const [file] = e.target.files;
    console.log(file.size)
    if (file.size < 50000000)
    {
    setImg(URL.createObjectURL(file));
    setImgfile(e.target.files[0]);
  }else{
      setImg("");
      setImgfile("");
      dispatch(alert({ massage: "file size larger than 50MB", type: "danger", show: true }))
    }
  };
  // handel remove Property Option
  const handelRemovePro = (index) => {
    const list = [...proOption];
    list.splice(index, 1);
    setProOption(list);
  }
  // handel inputing value of name and type of property Option
  const handelChangePro = (e, index) => {
    const { name, value } = e.target;
    const list = [...proOption];
    list[index][name] = value;
    setProOption(list);
  }
  // handel remove Level Option 
  const handelRemoveLevel = (index) => {
    const list = [...levelOption];
    list.splice(index, 1);
    setLevelOption(list);
  }
  // handel inputing value of name and value of Level Option
  const handelChangeLevel = (e, index) => {
    const { name, value } = e.target;
    const list = [...levelOption];
    list[index][name] = value;
    setLevelOption(list);
  }
  // handel remove Stats Option 
  const handelRemoveStats = (index) => {
    const list = [...statsOption];
    list.splice(index, 1);
    setStatsOption(list);
  }
  // handel inputing value of name and value of Stats Option
  const handelChangeStats = (e, index) => {
    const { name, value } = e.target;
    const list = [...statsOption];
    list[index][name] = value;
    setStatsOption(list);
  }
  // handel form submit
  const handelSubmitForm = (e) => {
    e.preventDefault();
    if (img === "" || nameNFT === "" || blockChain === "" || (userSmartContract === "" && !isExpress) || (isCELO && feeCurrency === "") || (royalti && (fixCashback === "0" && percentage === "0"))) {
      document.getElementsByClassName('creatForm')[0].classList.add('Invalid');
      if (royalti && (fixCashback === "0" && percentage === "0")) {
        dispatch(alert({ massage: "In Royalty NFT not alowed both fixCashback & percentage equal to 0", type: "danger", show: true, time: "4000" }))
      } else {
        dispatch(alert({ massage: "Fill all Required Items", type: "danger", show: true }))
        window.scrollTo(0, 0)
      }
    } else {
      var Metadata = {
        "description": description,
        "external_url": externalLink,
        "image": imgfile,
        "name": nameNFT,
        "background_color": "Hex color witout #",
        "youtube_url": youtube_url,
        "attributes": [...proOption, ...levelOption, ...statsOption],
        "sensitiveContent": sensitiveContent
      }
      if (!accont) {
        dispatch(alert({ massage: "Conect To Metamask Wallet and try again", type: "primary", show: true, time: "4000" }));
        dispatch(modalChekWallet());
      } else {
        dispatch(creatNFT({ Metadata, Chain: blockChain, Provenance: royalti, CashbackValues: percentage, FixedValues: fixCashback, FeeCurrency: feeCurrency, ContractAddress: userSmartContract }));
        dispatch(alert({ showModal: true }));
      }
    }
  }
  return (
    <>
      <div className="Create">
        <h1>Créer un nouveau NFT</h1>
        <div className='tabDiv'>
          <div className='tabItem'>
            <input type="radio" name='express' checked={isExpress} onChange={() => { setIsExpress(true); setUserSmartContract(""); setRoyalti(false) }} />
            <div>
              <h3>Express NFT</h3>
              <small>créer un NFT sans frais</small>
              <span></span>
            </div>
          </div>
          <div className='tabItem'>
            <input type="radio" name='express' checked={!isExpress} onChange={() => { setIsExpress(false) }} />
            <div>
              <h3>Custom NFT</h3>
              <small>Créer un NFT dans un Smart contract</small>
              <span></span>
            </div>
          </div>
        </div>
        <form id="CreateForm" className="creatForm">
          <p className="detaileForm">
            <i >*</i> Champs obligatoires
          </p>
          <div className="formSection">
            <label className="lable">
              Image, Video, Audio et 3D Model<i> *</i>
            </label>
            <span className="detaileForm">
              Fichiers supportés : JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,GLB, GLTF. Taille maximale: 50 MB
            </span>
            <div className='inputImage'>
              <input id="media" onChange={(e) => onImageChange(e)} name="media" accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf" type="file" autoComplete="off" tabIndex="-1" required="required" />
              <div className='bredered'>
                {img === "" ? <span className="icon">image</span>
                  : <img src={img} alt="" />
                }

              </div>
            </div>
          </div>
          <div className='formSection'>
            <label className="lable">Nom<i> *</i></label>
            <input value={nameNFT} onChange={(e) => setNameNFT(e.target.value)} autoCapitalize="off" autoComplete="off" autoCorrect="off" className="formInput" data-testid="Input" id="name" name="name" placeholder="Item name" required="required" spellCheck="false" type="text" />
          </div>
          <div className="formSection">
            <label className="lable">Lien externe</label>
            <span className="detaileForm"> RIAD inclura un lien vers cette URL sur la page de détail de cet article, afin que les utilisateurs puissent cliquer pour en savoir plus à son sujet. Vous êtes invités à créer un lien vers votre propre page Web avec plus de détails.</span>
            <input onChange={(e) => setExternalLink(e.target.value)} autoCapitalize="off" autoComplete="off" autoCorrect="off" className="formInput" data-testid="Input" id="external_link" name="external_link" placeholder="https://yoursite.io/item/" spellCheck="false" type="text" />
          </div>
          <div className="formSection">
            <label className="lable">Lien Youtube</label>
            <span className="detaileForm"> RIAD inclura un lien vers cette URL sur la page de détail de cet article, afin que les utilisateurs puissent cliquer pour en savoir plus à son sujet. Vous êtes invités à créer un lien vers votre propre page Web avec plus de détails.</span>
            <input onChange={(e) => setYoutube_url(e.target.value)} autoCapitalize="off" autoComplete="off" autoCorrect="off" className="formInput" data-testid="Input" id="external_link" name="external_link" placeholder="https://yoursite.io/item/" spellCheck="false" type="text" />
          </div>
          <div className="formSection">
            <label className="lable">Description</label>
            <span className="detaileForm">La description sera incluse sur la page de détail de l'article sous son image.</span>
            <textarea onChange={(e) => setDescription(e.target.value)} id="description" name="description" placeholder="Provide a detailed description of your item." rows="4" className="formInput">
            </textarea>
          </div>
          {!isExpress && <div className='formSection'>
            <label className="lable">Smart Contract<i> *</i></label>
            <span className="detaileForm">importez votre Smart Contract pour frapper votre Nft ou sélectionnez par défaut et utilisez notre contrat intelligent</span>
            <div className='choosDefultContract'>
              <div className="lable"  >J'ai une adresse de Samrt Contract :</div>
              <div>
                <input required onChange={(e) => setUserSmartContract(e.target.value)} autoCapitalize="off" autoComplete="on" autoCorrect="on" className="formInputsmartContract col-sm-8" data-testid="Input" id="smartContract" name="smartContract" placeholder="Smart Contract Address" spellCheck="false" type="text" />
                <Link to={"/Contract"} className='btn btn-primary col-sm-3 addCollection'>Deployer le Contrat</Link>
              </div>
            </div>
          </div>}
          {/* this option need backend to save info copmlete in next updat */}
          {/* <div className="formSection">
            <label className="lable">Collection</label>
            <p className="propertyDetails">This is the collection where your item will appear.</p>
            <div className=' d-flex justify-content-between'>
              <label className="select col-sm-8" >
                <select id="slct" defaultValue="" >
                  <option value="" disabled="disabled">Select option</option>
                  <option value="#">Collection 1</option>
                  <option value="#">Collection 2</option>
                  <option value="#">Collection 3</option>
                  <option value="#">Collection 4</option>
                  <option value="#">Collection 5</option>
                </select>
                <svg>
                  <use xlinkHref="#select-arrow-down"></use>
                </svg>
              </label>
              <svg className="sprites">
                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                  <polyline points="1 1 5 5 9 1"></polyline>
                </symbol>
              </svg>
              <button className='btn btn-primary col-sm-3 addCollection'><Link to={'/CreateCollection'}>Add Collection</Link></button>
            </div>
          </div> */}
          <div className="formSection">
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='d-flex align-items-center'>
                  <span className="icon pe-2">label_important</span>
                  <span className="lable">Propriétés</span>
                </div>
                <p className="propertyDetails">Traits textuels qui apparaissent sous forme de rectangles</p>
              </div>
              <button aria-label="Add properties" type="button" className="btn btn-outline-primary addProperty" data-bs-toggle="modal" data-bs-target="#ModalProperty">
                <span className="icon">add</span>
              </button>
            </div>
            <div className='row'>
              {proOption.map((row, index) =>
                row.value !== "" &&
                <div className='col-sm-2 ProOpt' key={index}>
                  <div>{row.value}</div>
                  <div>{row.trait_type}</div>
                </div>
              )}
            </div>
          </div>
          <div className="formSection">
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='d-flex align-items-center'>
                  <span className="icon pe-2">star_rate</span>
                  <span className="lable">Niveaux</span>
                </div>
                <p className="propertyDetails">Caractéristiques numériques qui s'affichent sous forme de barre de progression</p>
              </div>
              <button aria-label="Add properties" type="button" className="btn btn-outline-primary addProperty" data-bs-toggle="modal" data-bs-target="#ModalLevel">
                <span className="icon">ajouter</span>
              </button>
            </div>
            <div className='row '>
              {levelOption.map((row, index) =>
                row.trait_type !== "" &&
                <div className=' col-sm-4 p-2' key={index}>
                  <div className='levelOpt'>
                    <div className='d-flex justify-content-between'>
                      <span>{row.trait_type}</span>
                      <span>{row.value} of {row.value2}</span>
                    </div>
                    <div className='w-100'>
                      <progress className='w-100' value={(row.value / row.value2) * 100} max="100"></progress>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="formSection">
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='d-flex align-items-center'>
                  <span className="icon pe-2">bar_chart</span>
                  <span className="lable">Stats</span>
                </div>
                <p className="propertyDetails">Caractéristiques numériques qui s'affichent simplement sous forme de nombres</p>
              </div>
              <button aria-label="Add properties" type="button" className="btn btn-outline-primary addProperty" data-bs-toggle="modal" data-bs-target="#ModalStats">
                <span className="icon">add</span>
              </button>
            </div>
            <div className='row '>
              {statsOption.map((row, index) =>
                row.trait_type !== "" &&
                <div className=' col-sm-4 p-2' key={index}>
                  <div className='levelOpt'>
                    <div className='d-flex justify-content-between'>
                      <span>{row.trait_type}</span>
                      <span>{row.value} of {row.value2}</span>
                    </div>
                    <div className='w-100'>
                      <progress className='w-100' value={(row.value / row.value2) * 100} max="100"></progress>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="formSection">
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='d-flex align-items-center'>
                  <span className="icon pe-2">warning</span>
                  <span className="lable">Explicite &amp; Contenu sensible</span>
                </div>
                <p className="propertyDetails">Définissez cet élément comme contenu explicite et sensible.<span className="icon toolip" tolip="Définir votre actif comme un contenu explicite et sensible, comme la pornographie et d'autres contenus non sûrs pour le travail (NSFW), protégera les utilisateurs avec une recherche sécurisée lors de la navigation sur NFT Market.">info</span></p>
              </div>
              <div className="check">
                <input type="checkbox" onChange={(e) => { e.target.checked ? setSensitiveContent(true) : setSensitiveContent(false) }} />
                <div className='back'></div>
                <div className='circle'></div>
              </div>
            </div>
          </div>
          <div className="formSection">
            <label className="lable">Blockchain</label>
            <p className="propertyDetails">CHOISISSEZ VOTRE ESPACE</p>
            <div className='row'>
              {BlockChaine.list.map((row, index) =>
                <div key={index} className='col-lg-3 col-sm-4 col-6 p-2 position-relative'>
                  <input name='blockChaine' required type='radio' onChange={(e) => { e.target.checked === true ? setBlockChain(row.simbol) : setBlockChain(""); (e.target.checked === true && row.simbol === "CELO") ? setIsCELO(true) : setIsCELO(false) }} />
                  <div className='category'>
                    <span>
                      <img src={row.image} alt='' />
                    </span>
                    <div>{row.Name}</div>
                  </div>
                </div>
              )}
            </div>
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
          {!isExpress && <div className='royaltyDeploy '>
            <div className="d-flex justify-content-between align-items-center py-2">
              <label className="lable">
                Créer des royalties<small>votre smartcontract doit être pris en charge</small><a href="/blog/RoyaltyNFTs"> plus d'infos</a>
              </label>
              <div className="check">
                <input type="checkbox" onChange={(e) => { if (e.target.checked) { setRoyalti(true) } else { setRoyalti(false); setPercentage(false); setFixCashback(false) } }} />
                <div className='back'></div>
                <div className='circle'></div>
              </div>
            </div>
            {royalti &&
              <div className="choosDefultContract">
                <div className="p-1">
                  <div className='d-flex align-items-center '>
                    <span className='d-flex'>Pourcentage cashback</span>
                    <div><input className='inputNumber' required type="Number" min="0" max="10" value={percentage} onChange={(e) => { setPercentage(e.target.value) }} />% du prix</div>
                  </div>
                </div>
                <div className="p-1 ">
                  <div className='d-flex align-items-center '>
                    <span className='d-flex'>Fixe cashback</span>
                    <div><input className='inputNumber' required type="Number" min="0" max="10" value={fixCashback} onChange={(e) => { setFixCashback(e.target.value) }} />de Token(s)</div>
                  </div>
                </div>
              </div>
            }
          </div>
          }
          <div className="formSection">
            <div className='d-flex justify-content-between px-4'>
              <button type='submit' onClick={(e) => { handelSubmitForm(e) }} className="btn btn-primary" disabled="">Créer</button>
            </div>
          </div>
        </form >
      </div >
      {/* ---------MOdals--------- */}
      {/* ---> ModalProperty <---- */}
      <div className="modal fade" id="ModalProperty" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalPropertyLabel">Ajouter des propriétés</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body modal-dialog-scrollable">
              <h6>Les propriétés s'affichent sous votre article, sont cliquables et peuvent être filtrées dans la barre latérale de votre collection.</h6>
              <div className='addOption'>
                <div className='rowFirst'>
                  <h6>Genre</h6>
                  <h6>Nom</h6>
                </div>
                {proOption.map((row, index) =>
                  <div key={index} className='option'>
                    <span className='icon' onClick={() => { handelRemovePro(index) }}>close</span>
                    <input className='optionName' type="text" name='value' onChange={(e) => { handelChangePro(e, index) }} value={row.value} placeholder="Male" ></input>
                    <input className='optionType' type="text" name='trait_type' onChange={(e) => { handelChangePro(e, index) }} value={row.trait_type} placeholder="Character" ></input>
                  </div>
                )}
              </div>
              <button className='btn btn-outline-primary mt-3' onClick={() => setProOption([...proOption, { trait_type: "", value: "" }])} >Ajouter plus</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-primary mx-auto" data-bs-dismiss="modal">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>
      {/* ---> ModalLevel <---- */}
      <div className="modal fade" id="ModalLevel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLevelLabel">Ajouter des niveaux</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body modal-dialog-scrollable">
              <h6>Les niveaux s'affichent sous votre article, sont cliquables et peuvent être filtrés dans la barre latérale de votre collection.</h6>
              <div className='addOption'>
                <div className='rowFirst'>
                  <h6>Nom</h6>
                  <h6>Valeur</h6>
                </div>
                {levelOption.map((row, index) =>
                  <div key={index} className='option'>
                    <span className='icon' onClick={() => { handelRemoveLevel(index) }}>Fermer</span>
                    <input className='optionType' type="text" name='trait_type' onChange={(e) => { handelChangeLevel(e, index) }} value={row.trait_type} placeholder="speed" ></input>
                    <div className='optLevel'>
                      <input className='level1' type="number" min={0} max={row.value2} name='value' onChange={(e) => { handelChangeLevel(e, index) }} value={row.value}></input>
                      <span>de</span>
                      <input className='level2' type="number" min={0} name='value2' onChange={(e) => { handelChangeLevel(e, index) }} value={row.value2}></input>
                    </div>
                  </div>
                )}
              </div>
              <button className='btn btn-outline-primary mt-3' onClick={() => setLevelOption([...levelOption, { trait_type: "", value: "3", value2: "5" }])} >Add More</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-primary mx-auto" data-bs-dismiss="modal">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>
      {/* ---> ModalStats <---- */}
      <div className="modal fade" id="ModalStats" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalStatsLabel">Ajouter des statistiques</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body modal-dialog-scrollable">
              <h6>Les statistiques s'affichent sous votre article, sont cliquables et peuvent être filtrées dans la barre latérale de votre collection.</h6>
              <div className='addOption'>
                <div className='rowFirst'>
                  <h6>Nom</h6>
                  <h6>Valeur</h6>
                </div>
                {statsOption.map((row, index) =>
                  <div key={index} className='option'>
                    <span className='icon' onClick={() => { handelRemoveStats(index) }}>Fermer</span>
                    <input className='optionType' type="text" name='trait_type' onChange={(e) => { handelChangeStats(e, index) }} value={row.trait_type} placeholder="speed" ></input>
                    <div className='optLevel'>
                      <input className='level1' type="number" min={0} max={row.value2} name='value' onChange={(e) => { handelChangeStats(e, index) }} value={row.value}></input>
                      <span>de</span>
                      <input className='level2' type="number" min={0} name='value2' onChange={(e) => { handelChangeStats(e, index) }} value={row.value2}></input>
                    </div>
                  </div>
                )}
              </div>
              <button className='btn btn-outline-primary mt-3' onClick={() => setStatsOption([...statsOption, { trait_type: "", value: "3", value2: "5" }])} >Add More</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-primary mx-auto" data-bs-dismiss="modal">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>
      {(showModalAler && isExpress) && <Alert info={{ title: "showing steps to mint Express NFT", steps: [{ name: "upload Image to ipfs", api: ipfs.status }, { name: "upload metadata to ipfs", api: ipfs.status }, { name: "minting NFT EXpress", api: mintNFT.Status }], massage: "Your NFT is minted successfully yor txId is:" + mintNFT.NFT.txId, copy: mintNFT.NFT.txId }} ></Alert>}
      {(showModalAler && !isExpress) && <Alert info={{ title: "showing steps to mint Custom NFT", steps: [{ name: "upload Image to ipfs", api: ipfs.status }, { name: "upload metadata to ipfs", api: ipfs.status }, { name: "get signtureId for minting", api: mintNFT.Status }, { name: "get KMS for transaction", api: kms.Status }, { name: "conect to Wallet and confirme transaction", api: wallet.transActionRequestStatus }], massage: "Your NFT is minted successfully yor txId is:" + wallet.txId, copy: wallet.txId }} ></Alert>}
    </>
  )
}
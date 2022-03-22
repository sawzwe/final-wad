import { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { useLocalStorage } from "react-use";
import QuotationTable from "./QuotationTable";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function Quotation() {
  const API_URL = process.env.REACT_APP_API_URL;
  const itemRef = useRef();
  const priceRef = useRef();
  const qtyRef = useRef();


  const [localDataItems, setLocalDataItems] = useLocalStorage(
    "data-items",
    JSON.stringify([])
  );

  const [dataItems, setDataItems] = useState(JSON.parse(localDataItems));
  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [price, setPrice] = useState(0);

  
  //Fetch the products 
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        data = data.filter((e) => "code" in e);

        console.log(data);
        const z = data.map((v) => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ));
        setProducts(data);
        setProductOptions(z);
      });
  }, []);


  //Save the entire json quotation list one by one
  const saveCollection = () => {
    
    //get the elements from the data
    let arrayLength=dataItems.length;
    //console.log(arrayLength);
    for (var i = 0; i < arrayLength; i++) {
      //console.log(dataItems[i]);
    
      const newProduct = {
        item:dataItems[i].name,
        priceperunit: dataItems[i].price,
        quantity: dataItems[i].qty,
        amount: dataItems[i].price *dataItems[i].price,
        date: new Date(),
        
      };
      //console.log(newProduct);
  
      fetch(`${API_URL}/quotations`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newProduct), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully added the product
          console.log("POST Result", json);
          products.push(json);
        });
      
  }
  toast.success('Collection Added to Database', {position: toast.POSITION.TOP_RIGHT })

  }



  const addItem=()=>{
    let item = products.find((v) => itemRef.current.value === v._id);
    console.log(item);
    var itemObj = {
      _id: item._id,
      code: item.code,
      name: item.name,
      price: priceRef.current.value,
      qty: qtyRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
    console.log("Added Item", dataItems);
  }

  
  const updateDataItems = (dataItems) => {
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
  };

  const clearDataItems = () => {
    setDataItems([]);
    setLocalDataItems(JSON.stringify([]));
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v._id);
    console.log("New Selected Product", item);
    priceRef.current.value = item.price;
    //itemName.current.value = item.name;
  };  


  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {productOptions}
              </Form.Select>
            </Col>
          </Row>
          <Row>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                disabled={true}
                ref={priceRef}
                value={price}
                onChange={(e) => setPrice(priceRef.current.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
            <Button variant="primary" onClick={saveCollection}>
              Save
            </Button>
          </div>
          {/* {JSON.stringify(dataItems)} */}
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            updateDataItems={updateDataItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Quotation;   
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
} from "react-bootstrap";
import { FaTrashAlt,FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";
import { useNavigate } from "react-router-dom";
import { useSortBy } from 'react-table';
export default function QuotationManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [quotations, setQuotations] = useState([]);
  const [quotationRows, setQuotationRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [order,setOrder]=useState("ASC");

  //Get data from the quotation database
  useEffect(() => {
    let sum = 0;
    fetch(`${API_URL}/quotations`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.map((e, i) => {
          sum=sum+e.amount;
          return (
            <tr key={i}>
              <td>
                <FaTrashAlt
                  onClick={() => {
                    handleDelete(e);
                  }}
                />
              </td>
              <td>{e.item}</td>
              <td>{e.priceperunit}</td>
              <td>{e.quantity}</td>
              <td>{e.amount}</td>
              <td>{e.date}</td>
            </tr>
          );
        });

        setQuotations(data);
        setQuotationRows(rows);
        setTotal(sum);
      });
  }, []);




  const handleDelete = (quotation) => {
    console.log(quotation);
    if (window.confirm(`Are you sure to delete quotation [${quotation.item}]?`)) {
      fetch(`${API_URL}/quotations/${quotation._id}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully delete quotation
          console.log("DELETE Result", json);
          for (let i = 0; i < quotations.length; i++) {
            if (quotations[i]._id === quotation._id) {
              quotations.splice(i,1);
              break;
            }
          }

          const rows = quotations.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.item}</td>
                <td>{e.priceperunit}</td>
                <td>{e.quantity}</td>
                <td>{e.amount}</td>
                <td>{e.date}</td>
              </tr>
            );
          });
  
          setQuotations(quotations);
          setQuotationRows(rows);
          window.location.reload();     
        });
    }
  };



  //To change the route to the quotation building page
  let navigate = useNavigate(); 
  const routeQuotation = () =>{ 
    let path = `/quotation`; 
    navigate(path);
  }

  
  //Calculate the total quotation
  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sortDate=(col)=>{
    if (order==="ASC"){
      const sorted = [...quotations].sort((a,b)=>
      a[col].toLowerCase() > b[col].toLowerCase()? 1:-1
      );
      setQuotations(sorted);
      setOrder("DSC");

    }
    if (order==="DSC"){
      const sorted = [...quotations].sort((a,b)=>
      a[col].toLowerCase() < b[col].toLowerCase()? 1 : -1
      );
      setQuotations(sorted);
      setOrder("ASC");

    }
    console.log(quotations);
    console.log(quotationRows);
  }

  /*const sortDate=()=>{
    console.log("Quorarion Rows",quotations);
  }*/


  return (
    <>
      <Container>
        <h1>Quotation Management</h1>
          {/*API_URL: {API_URL}*/}
        {/*<Button variant="outline-dark" onClick={handleShowAdd}>
          <FaPlus /> Add
          </Button>*/}
        <Button variant="outline-dark" onClick={routeQuotation}>
          <FaPlus /> Add More Quotation
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>&nbsp;</th>
              <th className={style.textCenter}>Item</th>
              <th className={style.textCenter}>Price/Unit</th>
              <th className={style.textCenter}>Quantity</th>
              <th className={style.textCenter}>Amount</th>
              <th className={style.textCenter} onClick={()=>sortDate("date")}>Purchase Date</th>
              
            </tr>
          </thead>
          <tbody>{quotationRows}</tbody>
          <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
        </Table>
      
      </Container>
    </>
  );
}

import React, { useState } from 'react'
import { evaluate, sum } from 'mathjs';
import graph from './graph';
import { Container, Table } from 'react-bootstrap';

export default function Bisection() {
  var x_array = []
  var x1_array = []
  var xm_array = []

  const [Xm_table, setXm_table] = useState([{ it: [], show_xR: [], show_xL: [], show_xM: [], show_check: [] }]);
  const [xr, setxr] = useState(0);
  const [xl, setxl] = useState(0);
  const [err, seterr] = useState(0);
  const [xm, setxm] = useState(0);
  const [x, setx] = useState("");
  //set graph
  const [options, setObject] = useState({
    chars: {
      id: ''
    },
    xaxis: {
      categories: x_array
    }
  })
  const [series, setSeries] = useState([{
    name: '',
    data: x_array
  }, {
    name: '',
    data: x1_array
  }, {
    name: '',
    data: xm_array
  }])
  const cal_result = () => {
    var table = [{ it: [], show_xR: [], show_xL: [], show_xM: [], show_check: [] }]
    var scope
    var iteration = 0
    var array_x = [1]
    var array_x1 = [1]
    var array_xm = [1]
    var round = [1]
    var xM = 0
    var check = 1
    var xOld = 0;
    var fxM = 0, fxR = 0;
    var xL = Number(xl)
    var xR = Number(xr)
    while (check > 0.0000002) {
      xOld = xM;

      xM = (xL + xR) / 2
      scope = {
        x: xM
      }
      fxM = evaluate(x, scope);
      scope = {
        x: xR
      }
      fxR = evaluate(x, scope);
      if (fxM * fxR > 0) {
        xR = xM;
      }
      else if (fxM * fxR < 0) {
        xL = xM;
      }
      check = Math.abs((xM - xOld) / xM) * 100;
      // console.log(xM.toFixed(6));
      array_x[iteration] = xR;
      array_x1[iteration] = xL; 
      array_xm[iteration] = xM;
      round[iteration] = iteration;
      table.push({ it: iteration, show_xR: xR.toFixed(6), show_xL: xL.toFixed(6), show_xM: xM.toFixed(6), show_check: check.toFixed(6) })
      iteration++
    }
    setxm(xM.toFixed(6))
    seterr(check.toFixed(7))
    setXm_table(table)
    // show_Ans_Graph
    setObject({
      chars: {
        id: 'Bisection'
      },
      xaxis: {
        categories: round
      }
    })
    setSeries([{
      name: 'xR',
      data: array_x
    }, {
      name: 'XL',
      data: array_x1
    }
      , {
      name: 'xM',
      data: array_xm
    }])
  }
  const calxr = (even) => {
    setxr(even.target.value);
  }
  const calxl = (even) => {
    setxl(even.target.value);
  }
  // console.log({Xm_table});
  return (
    <div>
      <center><h1>Bisection Method</h1>
        <h2>XR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="number" value={xr} onChange={calxr} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          XL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="number" value={xl} onChange={calxl} /></h2>           <br />
        <h2>Input value&nbsp;&nbsp;<input type="text" value={x} onChange={(event) => { setx(event.target.value) }} /></h2>
        <button onClick={event => cal_result()}> Result</button>
        <h2>XM is {xm}</h2>
        <h2>Error is {err}</h2>
        {/* <h2>test is {Xm_table}</h2> */}
        {graph(options, series)}

        <Container>
          <Table striped bordered hover variant="secondary">
            <thead>
              <tr>
                <th >iteration</th>
                <th>XR</th>
                <th>XL</th>
                <th>XM</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {Xm_table.map((user) => (
                <tr>
                  <td>{user.it}</td>
                  <td>{user.show_xR}</td>
                  <td>{user.show_xL}</td>
                  <td>{user.show_xM}</td>
                  <td>{user.show_check}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </center>
    </div>
  );
}
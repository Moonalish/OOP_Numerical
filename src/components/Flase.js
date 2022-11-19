import React, { useState } from 'react'
import { evaluate } from "mathjs"
import graph from './graph';
import { Container, Table } from 'react-bootstrap';

export default function Flase_position() {
    var x_array = []
    const [xm_table, setxm_table] = useState([{ it: [], show_xR: [], show_xL: [], show_xM: [], show_error: [] }]);
    const [xr, setxr] = useState(0);
    const [x_input, set_input] = useState("");
    const [xl, setxl] = useState(0);
    const [fxm, setfxm] = useState(0);
    const [err, seterr] = useState(0);

    const [options_flase, setObject_flase] = useState({
        chars: {
            id: ''
        },
        xaxis: {
            categories: x_array
        }
    })
    const [series_flase, setSeries_flase] = useState([{
        name: '',
        data: x_array
    }])

    const cal_flase = () => {
        var table = [{ it: [], show_xR: [], show_xL: [], show_xM: [], show_error: [] }]
        var iteration = 0
        var array_x = [1]
        var round = [1]
        var fxl
        var xM = 0
        var fxM
        var fxr
        var equation
        var error = 100
        var xOld = 0
        var xL = Number(xl)
        var xR = Number(xr)
        do {
            xOld = fxM
            equation = {
                x: xL
            }
            fxl = evaluate(x_input, equation);
            equation = {
                x: xR
            }
            fxr = evaluate(x_input, equation);
            xM = ((xL * fxr) - (xR * fxl)) / (fxr - fxl)
            console.log(fxl * fxr);
            if (fxl * fxr > 0) {
                xR = xM
            }
            else if (fxl * fxr < 0) {
                xL = xM;
            }
            error = Math.abs((xM - xOld) / xM) * 100;
            x_array[iteration] = xM
            round[iteration] = iteration
            table.push({ it: iteration, show_xR: xR.toFixed(6), show_xL: xL.toFixed(6), show_xM: xM.toFixed(6), show_error: error.toFixed(6) })
            console.log(xM);
            console.log(error);
        } while (error > 0.000001);
        //ans
        setfxm(xM.toFixed(6))
        seterr(error.toFixed(8))
        //graph
        setObject_flase({
            chars: {
                id: 'Flase'
            },
            xaxis: {
                categories: round
            }
        })
        setSeries_flase([{
            name: 'xM',
            data: array_x
        }])
        setxm_table(table)

    }
    return (
        <div>
            <center><h1>Flase_Position</h1><br />
                <h2>XR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="number" value={xr} onChange={(event) => { setxr(event.target.value) }} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    XL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="number" value={xl} onChange={(event) => { setxl(event.target.value) }} /></h2>           <br />
                <h2>Input value&nbsp;&nbsp;<input type="text" value={x_input} onChange={(event) => { set_input(event.target.value) }} /></h2>
                <button onClick={even => cal_flase()}> Result</button>
                <h2>FXM is {fxm}</h2>
                <h2>Error is {err}</h2>

                {graph(options_flase, series_flase)}
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
                            {xm_table.map((table) => (
                                <tr>
                                    <td>{table.it}</td>
                                    <td>{table.show_xR}</td>
                                    <td>{table.show_xL}</td>
                                    <td>{table.show_xM}</td>
                                    <td>{table.show_error}</td>

                                </tr>

                            ))}
                        </tbody>
                    </Table>
                </Container>
            </center>
        </div>
    )
}
import { sum, det } from 'mathjs';
import { useState } from 'react';
import { Container, Form, Button, Table, Row } from 'react-bootstrap';
import graph from '../graph';
export default function MultiRegression() {
    var change_num = 0
    var array_getX = []
    var array_getY = []
    const [value_x, setValx] = useState([]);
    const [value_y, setValy] = useState([]);
    const [array_cal, setCalArrA] = useState([]);
    const [array_Delta, setDelta] = useState([]);
    const [set_size,setArr] = useState (0)
    // const [show_mat,setShowMat] = useState([]);
    // const [show_sum_reg,setSumReg] = useState([]);
    // const [array_calB, setCalArrB] = useState([]);
    // const [det_reg,set_det_reg] = useState([]);
    // const [ans_regression, setAnsReg] = useState([]);
    const [getX, setX] = useState({
        chars: {
            id: ''
        },
        xaxis: {
            categories: 0
        }
    })
    const [getY, setY] = useState([{
        name: '',
        data: array_getX
    }, {
        name: '',
        data: array_getY
    }
    ])
    const changeNum = (e) => {
        change_num = Number(e.target.value)
    }

    const addPointA = (event, changeNum) => {
        if (Number(event.target.value) >= 1) {
            var a = []
            var b = []
            for (var i = 0; i < Number(event.target.value); i++) {
                a[i] = []
                for (var j = 0; j < changeNum; j++) {
                    a[i][j] = 0;
                }
            }
            for (var i = 0; i < changeNum; i++) {
                b[i] = 0
            }
            setValx(a)
            setValy(b)
        }
        else {
            var a = []
            var b = []
            setValx(a)
            setValy(b)
        }
    }
    const copyMat = (matrix) => {
        var array = []
        for (var i = 0; i < matrix.length; i++) {
            array[i] = [];
            for (var k = 0; k < matrix.length; k++) {
                array[i][k] = matrix[i][k];
            }
        }
        return array
    }

    const cal_matrix = (v_x, v_y) => {
        // console.log(v_x)
        var size = v_x.length
        // console.log(size);
        var array = [size]
        var ansB = 0
        console.log(v_y);
        for (var i = 0; i < size; i++) {
            array[i] = 0
        }
        for (var i = 0; i < v_x.length; i++) {
            // console.log(array[i]);
            if (v_x[i] != 0 && v_y[i] != 0) {
                ansB = v_x[i] * v_y[i]
                array[i] = ansB
                // console.log(array)
            }
        }
        ansB = sum(array)
        // console.log("Ans= ", ansB);
        return ansB
    }
    const cal_Ans = (s_matrixA, s_matrixB) => {
        var matrixA = s_matrixA
        var matrixB = s_matrixB
        var size_matrix = 0
        var arrayAns = []
        var determinant = []
        determinant.push(Math.round(det(matrixA)))
        while (size_matrix != matrixA.length) {
            var transMatrix = copyMat(matrixA)
            for (var i = 0; i < matrixA.length; i++) {
                for (var j = 0; j < matrixA.length; j++) {
                    if (j == size_matrix) {
                        transMatrix[i][j] = matrixB[i]
                        break;
                    }
                }
                // console.log(transMatrix);
            }
            arrayAns[size_matrix] = Math.round(det(transMatrix)) / Math.round(det(matrixA))
            determinant.push(Math.round(det(transMatrix)))
            // console.log(Delta);
            size_matrix++
        }
        console.log(arrayAns);
        setCalArrA(arrayAns)
        setDelta(determinant)
    }

    const set_value = () => {
        if (value_x.length == 1) {
            var round = 0
            var s = 1
            var x = value_x[0]
            var y = value_y
            setX({
                chars: {
                    id: 'Multi-Reg'
                },
                xaxis: {
                    categories: []
                }
            })
            setY([{
                name: 'X1',
                data: x
            }, {
                name: 'Y',
                data: y
            }
            ])
        } else {
            var val_x = value_x
            var val_y = value_y
            var ans_y = 0;
            var ans = 0;
            var save_matrixA = [];
            var save_matrixB = [];
            var check_sum_pow = 1;
            ans_y = sum(val_y)
            for (var i = 0; i < val_x.length + 1; i++) {
                save_matrixA[i] = []
                for (var j = 0; j < val_x.length + 1; j++) {
                    save_matrixA[i][j] = 0
                    save_matrixB[i] = 0
                }
            }
            // console.log(save_matrixA);
            // console.log(save_matrixB);
            for (var i = 0; i < val_x.length + 1; i++) {
                if (i == 0) {
                    save_matrixA[0][i] = val_x[i].length
                    save_matrixB[i] = ans_y
                } else {
                    ans = cal_matrix(val_x[i - 1], val_y)
                    save_matrixA[0][i] = sum(val_x[i - 1])
                    save_matrixA[i][0] = sum(val_x[i - 1])
                    save_matrixB[i] = ans
                }
            }
            // console.log(save_matrixA);
            // console.log(save_matrixB);
            for (var i = 1; i < val_x.length + 1; i++) {
                var sumPow = 0
                for (var j = 1; j < val_x.length + 1; j++) {
                    if (check_sum_pow == j) {
                        for (var k = 0; k < val_x[1].length; k++) {
                            sumPow += Math.pow(val_x[i - 1][k], 2);
                        }
                        save_matrixA[i][j] = sumPow;
                    } else {
                        save_matrixA[i][j] = cal_matrix(val_x[i - 1], val_x[j - 1])
                    }
                }
                check_sum_pow++;
            }
            cal_Ans(save_matrixA, save_matrixB)
        }
    }
    const ChangePointA = (event, x, point) => {

        value_x[x][point] = parseFloat(event.target.value)
        console.log(value_x);
    }
    const ChangePointB = (event, y) => {

        value_y[y] = parseFloat(event.target.value)
        console.log(value_y);
    }

    // const api = () => {
    //     fetch("http://localhost:3005/MultiRegression")
    //         .then((res) => res.json())
    //         .then((e) => {
    //             e.map((x) => {
    //                 changeNum(x.changeNum)
    //                 addPointA(x.addPointA)
    //                 var a = []
    //                 var b = []
    //                 for (var i = 0; i < 1; i++) {
    //                     a[i] = []
    //                     for (var j = 0; j < changeNum; j++) {
    //                         a[i][j] = 0;
    //                     }
    //                 }
    //                 for (var i = 0; i < changeNum; i++) {
    //                     b[i] = 0
    //                 }
    //                 for (var i = 0; i < a.length; i++) {
    //                     for (var j = 0; j < a[i].length; j++) {
    //                         a[i][j] = x.arr_x[i][j]
    //                     }
    //                 for (var i = 0; i < b.length; i++) {
    //                     b[i] = x.arr_y[i]
                        
    //                 }   
    //             }
    //             setValx(a)
    //             setValy(b)
    //                 }
    //             )
    //         })
    // }

    return (<div>
        <center>
            <h2> Multi-Regression</h2>
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control size="lg" type="text" name="Point" onChange={changeNum} placeholder="Input Number Point" />
                        <Form.Control size="lg" type="text" onChange={event => addPointA(event, change_num)} placeholder="Input Number X" />
                    </Form.Group>
                </Form>
                {value_x.map((ValueA, i) => (<div>
                    <Table responsive="sm">
                        <tbody>
                            <tr>
                                <h4>X{i + 1}</h4>
                                {ValueA.map((Change_point, j) => (
                                    <td><input onChange={event => ChangePointA(event, i, j)} /></td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </div>))}
                <h2>Y</h2>
                {value_y.map((ValueB, i) => (<div>
                    <Row>
                        <td><input onChange={event => ChangePointB(event, i)} /></td>
                    </Row>
                    |</div>))}
                <Button style={{ fontWeight: "bold" }} as="input" value="Submit" onClick={() => set_value()} />
                {/* <Button style={{ fontWeight: "bold" }} as="input" value="API" onClick={() => api()} /> */}
            </Container>
            {graph(getX, getY)}

            <br></br>
            <h1 style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>Answer This Multi-Regression with CramerRule</h1>
            <br /><br />
            {array_cal.map((ans, i) => (
                <h1>a{i + 1}= (delta{i + 1}/delta0  )=({array_Delta[i + 1]} /{array_Delta[0]} ) =   {ans.toFixed(6)}   </h1>

            ))}
        </center>
    </div>);
}
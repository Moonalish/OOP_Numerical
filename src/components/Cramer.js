import { useState } from "react"
import { Container, Form, Button, Table } from 'react-bootstrap';
import { det } from 'mathjs'

export default function Cramer() {
    const [matA, setA] = useState([])
    const [matB, setB] = useState([])
    const [ans, setAns] = useState([])
    const [Delta, setDet] = useState([])

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

    const setMatrix = (event) => {
        if (Number(event.target.value) > 1) {
            var a = []
            var b = []
            for (var i = 0; i < Number(event.target.value); i++) {
                a[i] = []
                for (var k = 0; k < Number(event.target.value); k++) {

                    a[i][k] = 0
                    b[i] = 0

                }
                setA(a)
                setB(b)
            }
        }
        else{
            var a = [] 
            var b = []
            setA(a)
            setB(b)
        }
    }

    const cal_cramer = () => {
        var matrixA = matA
        var matrixB = matB
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
            console.log(Delta);
            size_matrix++
        }

        setAns(arrayAns)
        setDet(determinant)
    }

    const ChangematrixA = (event, row, column) => {

        matA[row][column] = parseFloat(event.target.value)
    }
    const ChangematrixB = (event, row) => {

        matB[row] = parseFloat(event.target.value)
    }

    return (
        <div>
            <center>
                <h2>Cramer's Rule</h2>
                <Container>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control size="lg" type="text" onChange={setMatrix} placeholder="Input Number" />
                        </Form.Group>
                    </Form>
                    {matA.map((matrixValueA, i) => (<div>
                        <Table responsive="sm">
                            <tbody>
                                <tr>
                                    {matrixValueA.map((Change_row_column, j) => (
                                        <td><input onChange={event => ChangematrixA(event, i, j)} /></td>
                                    ))}
                                    |<td><input onChange={event => ChangematrixB(event, i)} /></td>
                                </tr>

                            </tbody>
                        </Table>
                    </div>))}

                    <Button style={{ fontWeight: "bold" }} as="input" value="Submit" onClick={() => cal_cramer()} />

                </Container>

                <br></br>
                <h1 style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>Answer This Cramer</h1>
                <br /><br />
                {ans.map((ans, i) => (
                    <h1>X{i + 1}= (delta{i + 1}/delta0  )=({Delta[i + 1]} /{Delta[0]} ) =   {ans.toFixed(6)}   </h1>

                ))}
            </center>
        </div>

    )
}


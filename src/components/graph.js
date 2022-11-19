import Chart from "react-apexcharts";

function graph(it, xm) {
    return (
        <>

            <center>

                <Chart options={it} series={xm} width={1000} height={500} />

            </center>
        </>

    )
}

export default graph;
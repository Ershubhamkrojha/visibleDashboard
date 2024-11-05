import React from "react";
import "./Dashboard.css"
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // Chart data
    const data = {
        labels: ["01", "02", "03", "04", "05", "06", "07"],
        datasets: [
            {
                label: "Views per day",
                data: [5,10,15,10,20,10,31],
                borderColor: "#ffa600",
                backgroundColor: "rgba(255, 166, 0, 0.2)",
                border:"2px soli white"
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="dashboard">
            {/* <h1>Dashboard</h1> */}
            <div className="top-sec">
                <div className="stats">

                    <div className="stat-cards">
                        <div>
                            <h2>Images</h2>
                            <p>100</p>
                        </div>
                        <div>
                            <h2>Users</h2>
                            <p>10</p>
                        </div>
                        <div>
                            <h2>Latest</h2>
                            <p>5</p>
                        </div>
                    </div>
                    <div className="top-performers">
                        <h3>Top Users</h3>
                        <ul>
                            <li>Valy Antonova - 39%</li>
                            <li>Nenci Villy - 25%</li>
                            <li>Mark Noil - 18%</li>
                        </ul>
                    </div>
                </div>

                <div className="activity-chart">
                    <h3>Activity</h3>
                    <Line data={data} options={options} />
                </div>
            </div>


            
        </div>
    );
};

export default Dashboard;

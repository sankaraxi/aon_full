import React,{useState,useEffect} from "react";

export function Workspace(){
    const[testdata,setTestdata]=useState([])
    const [progressValue, setProgressValue] = useState(0);
    useEffect(() => {
        
        fetch("http://192.168.253.118:3000/testcase.json")
        .then(res=>res.json())
        .then(data=>{
            setTestdata(data);
            calculateProgress(data); 
    })
        }, []);
        const getStatusColor = (status) => {
            return status === 0 ? "red" : "green";
        };
        const calculateProgress = (data) => {
            const totalTestCases = data.length;
            const passedTestCases = data.filter(testCase => testCase.Status === 1).length;
            const overallPercentage = (passedTestCases / totalTestCases) * 100;
            setProgressValue(overallPercentage);
        };
    
    return(
        <>
            <div className="">
                <p >Overall Progress: {progressValue}%</p>
                <progress value={progressValue} max={100}/>
            </div>
        <div className="container mx-auto border">
            <div className=" float-right bg-success">
            <table class="table table-hover table-nowrap">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">test case id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Input</th>
                        <th scope="col">Expected Output</th>
                        <th scope="col">Output</th>
                        <th scope="col">Status</th>
                    
                    </tr>
                </thead>
                <tbody>
                {
                testdata.map((value,index)=>(
                    
                    <tr>
                    <td>{value.test_case_id}</td>
                    <td>{value.TC_Name}</td>
                    <td>{value.Input}</td>
                    <td>{value.Expected_Output}</td>
                    <td>{value.Output}</td>
                    <td style={{ backgroundColor: getStatusColor(value.Status) }}>{value.Status === 0 ? "Failed" : "Passed"}</td>
                    </tr>
                ))
                }
                </tbody>
            </table>
            </div>
        </div>
           
            
        </>
    );
}
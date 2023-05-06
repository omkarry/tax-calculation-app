import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { EmployeeData } from "../Data/EmployeeData";
import axios from "axios";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([])

  const getEmployeeData = () => {
    axios.get("https://localhost:7141/api/Employee")
      .then(res => {
        setEmployees(res.data.result);
      })
  }
  useEffect(() => {
    getEmployeeData();
  }, [])
  return (
    <div className="container mt-3">
      <Table responsive bordered>
        <thead>
          <tr className='bg-light'>
            <th>Id
            </th>

            <th>Name
              {/* <button type="button"
                className='btn no-border'
                onClick={() => toggleSortDirection('firstName')}><FaSort /></button> */}
            </th>
            <th>Username
              {/* <button type="button"
                className='btn no-border'
                onClick={() => toggleSortDirection('lastName')}><FaSort /></button> */}
            </th>
            <th>Email
            </th>
          </tr>
        </thead>
        <tbody>
          {
            employees && employees?.map((data, index) => {
              return (
                <tr key={data.id} className='bg-light my-1'>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeTable;
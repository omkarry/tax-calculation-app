import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userData } from '../Data/UserData';
import TaxResult from './TaxResult';

interface Section {
  id: number;
  sectionName: string;
  subSections?: SubSection[];
}

interface SubSection {
  id: number;
  subSectionName: string;
  maxLimit?: number;
}

interface InvestmentData {
  id: number;
  employeeId: string;
  subSectionId: number;
  investedAmount: number;
}

const InvestmentDeclaration: React.FC<{ user: userData }> = (user) => {
  const [userId, setUserId] = useState<string>(user.user.userId);
  const [empInvestment, setEmpInvestment] = useState<InvestmentData[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [investmentData, setinvestmentData] = useState<InvestmentData[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const subSectionId = Number(name.replace("subSection", ""));
    const updatedInvestmentData = investmentData.map((data) => {
      if (data.subSectionId === subSectionId) {
        return {
          ...data,
          investedAmount: Number(value),
        };
      }
      return data;
    });
    setinvestmentData(updatedInvestmentData);
  };

  const getEmpInvestment = () => {
    axios.get(`https://localhost:7141/api/EmployeeInvestment/${userId}`)
      .then(res => {
        setEmpInvestment(res.data.result)
      })
  }

  useEffect(() => {
    debugger
    axios.get("https://localhost:7141/api/Section")
      .then(res => {
        setSections(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
    getEmpInvestment();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const investmentData: InvestmentData[] = [];

    sections.forEach((section) => {
      section.subSections?.forEach((subSection) => {
        const inputName = `subSection${subSection.id}`;
        const inputValue = parseFloat((event.target as any)[inputName].value);

        if (inputValue > 0) {
          investmentData.push({
            id: 0,
            employeeId: userId,
            subSectionId: subSection.id,
            investedAmount: inputValue,
          });
        }
      });
    });

    try {
      const response = await axios.post(
        `https://localhost:7141/api/EmployeeInvestment`,
        investmentData, {
        params: { empId: userId }
      }
      );

      if (response.status === 200) {
        console.log('Investment details added successfully');
        getEmpInvestment();
      } else {
        console.error('Error adding investment details');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {empInvestment.length != 0 ?
        <div>
          <TaxResult user={userId} regimeType="old" />
        </div>
        :
        <div className="container mt-3 border rounded w-50 p-3">
          <h2 className='border-bottom pb-2'>Investment Declaration</h2>
          <form onSubmit={handleSubmit}>
            {sections.map((section) => (
              <div key={section.id} className="row border-bottom ">
                <div className='text-start h4'>{section.sectionName}</div>
                {section.subSections?.map((subSection) => (
                  <div key={subSection.id} className="form-group row">
                    <div className="col-md-6 p-2">
                      <label>{subSection.subSectionName}</label>
                    </div>
                    <div className="col-md-6 p-2">
                      <input
                        type="number"
                        name={`subSection${subSection.id}`}
                        onChange={handleChange}
                        max={subSection.maxLimit?.toString()}
                        className="form-control"
                        onWheel={event => event.currentTarget.blur()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      }
    </>
  );
};

export default InvestmentDeclaration;

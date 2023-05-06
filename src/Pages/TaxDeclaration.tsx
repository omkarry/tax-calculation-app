import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

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

interface InvestmentData{
  id: string;
  sectionId: number;
  subSectionId: number;
  investedAmount: number;
}

interface FormData {
  [key: string]: any;
}

const InvestmentDeclaration: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [investmentData, setinvestmentData] = useState<InvestmentData[]>([])
  // const [proofs, setProofs] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get("https://localhost:7141/api/Section")
      .then(res => {
        setSections(res.data.result);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  // const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setProofs([...proofs, e.target.files[0]]);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }
    // proofs.forEach((proof) => {
    //   data.append('proofs', proof);
    // });
    try {
      await axios.post('/api/employee-investment', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Employee Investment added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
                  />
                </div>
                {/* <input
                  type="file"
                  name={`proofs${subSection.id}`}
                  onChange={handleProofChange}
                  className="form-control-file"
                /> */}
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  );
};

export default InvestmentDeclaration;

import axios from "axios";
import { useEffect, useState } from "react";
import { userData } from "../Data/UserData";
import useHttp from "../Config/https";

interface Props {
  user: string;
  regimeType: string;
}

const TaxResult: React.FC<Props> = ({ user, regimeType }) => {
  const [tax, setTax] = useState<number | null>(null);
  const [userId, setUserId] = useState<string>(user);

  const {axiosInstance, loading} = useHttp();

  useEffect(() => {
    debugger
    if (regimeType == "new") {
      axiosInstance.get(`TaxCalculation/newRegime`,
        {
          params: { empId: userId }
        }
      )
        .then(res => {
          setTax(res.data.result);
        })
        .catch(err => {
          console.log(err)
        })
    }
    else{
      axiosInstance.get(`TaxCalculation/oldRegime`,
    {
      params:{empId: userId}
    }
    )
    .then(res => {
      setTax(res.data.result);
    })
    .catch(err =>{
      console.log(err)
    })
    }
  }, [])
  return (
    <>
      <div className="container mx-auto my-3">
        {tax != null ?
          <div>
            <div className="row">
              <h3>Your Tax for 2023 will be</h3>
            </div>
            <div className="row text-primary">
              <h3>{tax}</h3>
            </div>
          </div>
          :
          <div className="row">
            No details found for tax calculation...
          </div>
        }
      </div>
    </>
  );
}

export default TaxResult;
import React, {useEffect,useState} from 'react'

function FetchApi() {
    
    const [details, setdetails] = useState(JSON.parse(localStorage.getItem('userInfo') || "[]"));
    const [searchInfo, setsearchInfo] = useState('');
    useEffect(() => {
        fetch('https://randomuser.me/api/?results=10')
        .then((info)=>{
            info.json().then((details)=>{
                details.results.map(obj =>{
                  obj.amount = {
                    "salary" : "$100000",
                    "expense" : "[No any updates]"
                  }
                })
                console.log(details.results);
                setdetails(details.results);
                localStorage.setItem('userDetail',JSON.stringify(details.results));
            })
        })

    }, [])

    const searchButtons = () =>{
      let searchedData = details.filter((item)=>item.name.first===searchInfo)
      setdetails(searchedData);
      localStorage.setItem('details',JSON.stringify(searchedData));
    }

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setsearchInfo(e.target.value)} placeholder='Search by name'/>
        <button onClick={() => searchButtons()}>Get user details</button>
        <select name="search by" id="">
          <option value=""></option>
          <option value="">Search by country</option>
          <option value="">Search by DOB</option>
        </select>
      </div>
      <div>
          {
            (details.length > 0) && details.map((obj,index)=>(
              <div key={index}>
                <img src={obj.picture.large} alt="" />
                <h4>Name : {obj.name.title} {obj.name.first} {obj.name.last}</h4>
                <p>Date of Birth : {obj.dob.date}</p>
                <p>Gender : {obj.gender}</p>
                <p>Location : {obj.location.city},{obj.location.country}</p>
                <p>Salary : {obj.amount.salary}</p>
                <p>Expense : {obj.amount.expense}</p>
              </div>
            ))
          }oops!...sorry...No such data found...
      </div>
    </div>
  )
}

export default FetchApi
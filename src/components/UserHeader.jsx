import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import countryServices from '../services/country.services';
import { API, WORLD_TIME_URL } from '../services/config';

export default function UserHeader() {
    let [countrys, setCountrys] = useState([]);
    let [countryTime, setCountryTime] = useState();
    
    const [option, setOption] = useState(countrys[0]);
    
    const getCountryList = () => {
        const result = countryServices.getCountry()
            .then((res) => {
                if (res.status === 200) {
                    setCountrys(res.data);
                } 
            }).catch((error) => {
                console.log('Get CountryList Error', error);
            })
    }

    const setSelectedOption = event => {
        const option = countrys
            .find(option => option === event.target.value)
        setOption(option)
    }

    useEffect(() => {
        getCountryList();       
    }, [])

    const getCountryTime = async () => {
        const result = await API.get(`${WORLD_TIME_URL}/api/timezone/${option ? option : countrys[0]}`)
        if(result.status === 200){
            let cnt_time =  result?.data?.utc_datetime?.split('T')
         
            cnt_time = cnt_time[1]?.split('+')
            cnt_time = cnt_time[0]
            setCountryTime(cnt_time);
         
        }
        
        
    }

    useEffect(() => {       
        getCountryTime();
    }, [getCountryTime])



    return (
        <div className='user-details-header'>
            <Link to="/" className='btn'>Back</Link>
            <div className='ud_header-right'>
                <div className='select-cuntory'>
                    <label htmlFor="country">Country</label>
                    <select name="country" id="country"
                        onChange={setSelectedOption}
                        defaultValue={option}
                    >
                       
                        { countrys.map((option, i) => (
                            <option value={option} key={i}>{option}</option>
                        ))}
                    </select>
                </div>
                {countryTime ? <p className='country-time'>{countryTime}</p> : ''}
                <button type='button'>Pause/Start</button>
            </div>
        </div>
    )
}

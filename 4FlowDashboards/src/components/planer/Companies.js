import React, {useState, useEffect} from 'react';
import './companies.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../firebase/Firebase";
import Grid from "./Grid";
import Form from "./Form";


const SORT_OPTIONS = {
    'TIME_ASC': {column: 'type', direction: 'asc' },
    'TIME_DESC': {column: 'type', direction: 'desc' },

    'NAME_ASC': {column: 'name', direction: 'asc' },
    'NAME_DESC': {column: 'name', direction: 'desc' }
}

const SEARCH = {
    'SNAME': {column: 'name'}
}



function camelCase(str){
    return (str.slice(0,1)).toUpperCase()+str.slice(1).toLowerCase();
}
function useDbData(sortBy='NAME_ASC', searchBy='SNAME'){
        
    const [dbData, setDbData] = useState([]);
    useEffect(() => {
      if(searchBy != "SNAME" && searchBy.length != 0){
        firebase.firestore()
        .collection('CompanyDetails')
        .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
        .where("name","in", [searchBy, searchBy.toUpperCase(), searchBy.toLowerCase(), camelCase(searchBy)])
        .onSnapshot((snapshot) =>{
            const newDbData = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))   
            setDbData(newDbData);
        })
        }else {

            firebase.firestore()
        .collection('CompanyDetails')
        .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
        .onSnapshot((snapshot) =>{
            const newDbData = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))   
            setDbData(newDbData);
        })            
        }        
    }, [sortBy,searchBy]);
    return dbData;
}

function Companies() {

    const [sortBy, setSortBy] = useState('NAME_ASC')
    const [searchBy, setSearchBy] = useState('SNAME')
    const dbData = useDbData(sortBy,searchBy);

    function handleSearch(e){
        setSearchBy(e.currentTarget.value);
    }
    function handleClick(data){
        firebase.firestore().collection('CompanyDetails').add({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            type: data.type
        })
    }
        return (
            <div>
                <fieldset className="contact">
                   <Form  onHandleClick={handleClick}/>
                    <div className="grid-view">
                        <div className="grid-container" >
                            <div className="company-grid-header">
                                <div className="grid-header" ><span>Name</span></div>
                                <div className="grid-header"><span>Email</span></div>
                                <div className="grid-header"><span>Phone</span></div>
                                <div className="grid-header"><span>Address</span></div>
                                <div className="grid-header"><span>Type</span></div>
                            </div>
                            <div style={{marginTop: "30px"}}>
                                {dbData.map((doc) =>{
                                        return <Grid 
                                        key = {doc.id}
                                        id = {doc.id}
                                        name = {doc.name}
                                        email = {doc.email}
                                        phone = {doc.phone}
                                        address = {doc.address}
                                        type = {doc.type}
                                    />
                                })}
                            </div>
                        </div>
                        <div className="company-grid-bottom">
                            <input   className="grid-search" type="text" placeholder="Search company by name" 
                            onChange={handleSearch}/>
                            <select value={sortBy} onChange={e =>setSortBy(e.currentTarget.value)} style={{marginTop:"2px",height:"20px",width:"216px"}}>
                                <option value="NAME_ASC">Name (a-z)</option>
                                <option value="NAME_DESC">Name (z-a)</option>
                                <option disabled>----</option>
                                <option value="TIME_ASC">Type (a-z)</option>
                                <option value="TIME_DESC">Type (z-a)</option>
                                
                                
                            </select>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
}
export default Companies;
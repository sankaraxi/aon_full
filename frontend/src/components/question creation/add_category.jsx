import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
export function Addcategory(){
    const[displaycategory,setdisplaycategory]=useState([])
    function handleadd(event){
        event.preventDefault()
        var selectcategory=document.getElementById("selectcategory").value
        var getcategory=document.getElementById("getcategory").value
        var category={
            getcategory:getcategory
        }
        var subcategory={
            selectcategory:selectcategory,
            getcategory:getcategory
        }
        if(selectcategory===""){
            axios.post("http://localhost:5001/addcategory",category)
            .then((res)=>{
                if(res.data.status==="inserted"){
                    alert("category is created")
                    window.location.reload()
                }
                else{
                    alert("category is not created")
                }
            })
        }
        else{
            if(getcategory===""){
                alert("Please enter the category")
            }
            else{
                
                axios.post("http://localhost:5001/subcategory",subcategory)
                .then((res)=>{
                    if(res.data.status==="inserted"){
                        alert("sub-category is created")
                        window.location.reload()
                    }
                    else{
                        alert("sub-category is not created")
                    }
                })
            }
        }

    }
    useEffect(()=>{
        fetch("http://localhost:5001/getcategory")
        .then(res=>res.json())
        .then(data=>setdisplaycategory(data))
    },[])
    return(
        <>
             <div class="card-header d-flex justify-content-around">
                <h1 class="mb-0 btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModalca">Add Category</h1>
                
            </div>
            <div class="modal fade" id="exampleModalca" tabindex="1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header modleborderbottom">
                        <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-5">
                        <p>Add your quiz Category</p>
                        <div className="">
                                <form onSubmit={handleadd}>
                                <select class="form-select form-select-lg mb-3" aria-label="Large select example" id="selectcategory">
                                    <option value="">Open this select menu</option>
                                    {
                                        displaycategory.map((value,index)=>(
                                            <option value={value.category_name}>{value.category_name}</option>

                                        ))
                                    }
                                </select>
                                    <br/>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" id="getcategory" placeholder="Enter the Category or sub-Category" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div><br/>
                                    <input type="submit" className="btn btn-success" value="ADD"/> 
                                </form>
                          
                            
                        </div>

                    </div>
                    
                    </div>
                </div>
            </div>
        </>
    );
}
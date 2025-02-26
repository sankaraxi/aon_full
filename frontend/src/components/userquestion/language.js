import React from "react";
import html from '../Assest/html.png'
import css from '../Assest/css.png'
import js from '../Assest/js.png'
import reactjs from '../Assest/reactjs.png'
import nodejs from '../Assest/nodejs.png'
export function Language(){
    return(
        <>
        <div className="container-fluid  mt-4">
            <div className=" row d-flex justify-content-around">
                
            <div class="card col-lg-3" >
                <img src={html} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">HTML</h5>
                    <p class="card-text">Basic web Application to get into a industry</p>
                    <a href="#" class="btn btn-primary">Start course</a>
                </div>
            </div>
            <div class="card col-lg-3">
                <img src={css} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">CSS</h5>
                    <p class="card-text">Basic web Application to get into a industry</p>
                    <a href="#" class="btn btn-primary">Start course</a>
                </div>
            </div>
            <div class="card col-lg-3" >
                <img src={js} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">JavaScript</h5>
                    <p class="card-text">Basic web Application to get into a industry</p>
                    <a href="#" class="btn btn-primary">Start course</a>
                </div>
            </div>
            <div class="card col-lg-3" >
                <img src={reactjs} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">React JS</h5>
                    <p class="card-text">Basic web Application to get into a industry</p>
                    <a href="#" class="btn btn-primary">Start course</a>
                </div>
            </div>
            <div class="card col-lg-3" >
                <img src={nodejs} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">Node JS</h5>
                    <p class="card-text">Basic web Application to get into a industry</p>
                    <a href="#" class="btn btn-primary">Start course</a>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
import { useState, useEffect } from "react";
import AllServicesDetails from "../assets/AllServicesDetails";

const PriceCalcComp = () => {
    let [categoryState, setCategoryState] = useState(null);
    let servameValue, numpeopleValue, outfitsValue, edphotosValue;

    useEffect(() => {
        servameValue = document.querySelector('#servname-state');
        numpeopleValue = document.querySelector('#numpeople-state');
        outfitsValue = document.querySelector('#outfits-state');
        edphotosValue = document.querySelector('#edphotos-state');
    });

    function handleCategoryState() {
        categoryState = document.querySelector('#category-state').value;
        setCategoryState(categoryState);

        servameValue.value = 0;
        numpeopleValue.value = 0;
        numpeopleValue.disabled = false;
        outfitsValue.value = 0;
        edphotosValue.innerHTML = "_";
    }

    function handleServNameState() {

        if (AllServicesDetails.find(serviceDetails => serviceDetails.name === servameValue.value
            && serviceDetails.category === categoryState).numPeople === 1) {
            numpeopleValue.value = 1;
            numpeopleValue.disabled = true;
        }
        else if (AllServicesDetails.find(serviceDetails => serviceDetails.name === servameValue.value
            && serviceDetails.category === categoryState).numPeople === 2) {
            numpeopleValue.value = 2;
            numpeopleValue.disabled = true;
        }
        else if (AllServicesDetails.find(serviceDetails => serviceDetails.name === servameValue.value
            && serviceDetails.category === categoryState).numPeople === 3) {
            numpeopleValue.value = 3;
            numpeopleValue.disabled = false;
            numpeopleValue.children[1].disabled = true;
            numpeopleValue.children[2].disabled = true;
        }
    }

    function handleNumpeopleState() {
        console.log(servameValue.value);
        console.log(numpeopleValue.value);
    }

    function handleOutfitsState() {

        console.log(categoryState);
        console.log(servameValue.value);
        console.log(numpeopleValue.value);
        console.log(outfitsValue.value);

        if (numpeopleValue.value == 1 && outfitsValue.value == 1) {
            edphotosValue.innerHTML = 2;
        } else if (numpeopleValue.value == 1 && outfitsValue.value == 2) {
            edphotosValue.innerHTML = 5;
        } else if (numpeopleValue.value == 1 && outfitsValue.value == 3) {
            edphotosValue.innerHTML = 8;
        } else if (numpeopleValue.value == 1 && outfitsValue.value == 4) {
            edphotosValue.innerHTML = 11;
        }
    }

    const categories = [...new Set(AllServicesDetails.map((serviceDetail) => serviceDetail.category))];
    const servNames = [...new Set(AllServicesDetails.filter(serviceDetails => serviceDetails.category === categoryState).map((serviceDetail) => serviceDetail.name))];
    const numPeople = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const numOutfits = [1, 2, 3, 4];

    return (
        <div className="price-calculator-component">
            <label>Service Category</label>
            <select id="category-state" onChange={handleCategoryState} defaultValue="0">
                <option disabled value="0">Chose One</option>
                {
                    categories.map((category, i) => (
                        <option key={i} value={category}>{category}</option>
                    ))
                }
            </select><br />
            <label>Service Name</label>
            <select id="servname-state" onChange={handleServNameState} defaultValue="0">
                <option disabled value="0">Chose One</option>
                {
                    servNames.map((servName, i) => (
                        <option key={i} value={servName}>{servName}</option>
                    ))
                }
            </select><br />
            <fieldset>
                <legend>Details</legend>
                <label>How many people?</label>
                <select id="numpeople-state" onChange={handleNumpeopleState} defaultValue="0">
                    <option disabled value="0">Select</option>
                    {
                        numPeople.map((numbPerson, i) => (
                            <option key={i} value={numbPerson}>{numbPerson}</option>
                        ))
                    }
                </select>
                <br />
                <label>How many outfits?</label>
                <select id="outfits-state" onChange={handleOutfitsState} defaultValue="0">
                    <option disabled value="0">Select</option>
                    {
                        numOutfits.map((numOutfit, i) => (
                            <option key={i} value={numOutfit}>{numOutfit}</option>
                        ))
                    }
                </select>
                <p>Comes with <span id="edphotos-state">_</span> edited photos.</p>
                <label>Add more edited photos</label>
                <input type="number" id="addphotos-state" max="30" defaultValue="0" />
                <fieldset>
                    <legend>Do you need make-up with us?</legend>

                    <input type="radio" value="Yes" />
                    <label>Yes</label>
                    <input type="radio" value="No" />
                    <label>No</label>
                </fieldset>
            </fieldset>
        </div>
    );
}

export default PriceCalcComp;
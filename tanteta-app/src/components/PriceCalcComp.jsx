import { useState, useEffect } from "react";
import AllServicesDetails from "../assets/AllServicesDetails";

const PriceCalcComp = () => {
    let [categoryState, setCategoryState] = useState(null);
    let servnameValue, numpeopleValue, outfitsValue, edphotosValue, addphotosValue, makeupValue, priceValue;

    useEffect(() => {
        servnameValue = document.querySelector('#servname-state');
        numpeopleValue = document.querySelector('#numpeople-state');
        outfitsValue = document.querySelector('#outfits-state');
        edphotosValue = document.querySelector('#edphotos-state');
        addphotosValue = document.querySelector('#addphotos-state');
        makeupValue = document.querySelector('#makeup-state');
        priceValue = document.querySelector('#price-state');
    });

    function handleCategoryState() {
        categoryState = document.querySelector('#category-state').value;
        setCategoryState(categoryState);

        servnameValue.value = 0;
        resetDetails();
    }

    function handleServNameState() {

        resetDetails();

        let currentService = AllServicesDetails.find(serviceDetails => serviceDetails.name === servnameValue.value);

        if (AllServicesDetails.find(serviceDetails => serviceDetails.name === servnameValue.value
            && serviceDetails.category === categoryState).numPeople === 1) {
            numpeopleValue.value = 1;
            numpeopleValue.disabled = true;
            priceValue.innerHTML = "Starting at " + currentService.startprice;
        }
        else if (AllServicesDetails.find(serviceDetails => serviceDetails.name === servnameValue.value
            && serviceDetails.category === categoryState).numPeople === 2) {
            numpeopleValue.value = 2;
            numpeopleValue.disabled = true;
            priceValue.innerHTML = "Starting at " + currentService.startprice;
        }
        else if (AllServicesDetails.find(serviceDetails => serviceDetails.name === servnameValue.value
            && serviceDetails.category === categoryState).numPeople === 3) {
            numpeopleValue.value = 3;
            numpeopleValue.disabled = false;
            numpeopleValue.children[1].disabled = true;
            numpeopleValue.children[2].disabled = true;
            priceValue.innerHTML = "Starting at " + currentService.startprice;
        }
    }

    function handleNumpeopleState() {
        console.log(servnameValue.value);
        console.log(numpeopleValue.value);
    }

    function handleOutfitsState() {
        calcPrice();
    }

    function handleAddphotos() {
        calcPrice();
    }

    function handleMakeupState() {
        calcPrice();
    }

    function calcPrice() {
        makeupValue.checked ? makeupValue.value = 1 : makeupValue.value = 0;

        for (let i = 0; i <= numOutfits.length; i++) {
            if (numpeopleValue.value == 1 && outfitsValue.value == i) {
                edphotosValue.innerHTML = 3 * i - 1;
                priceValue.innerHTML = (5 * i) * 1000 + makeupValue.value * 3000 + addphotosValue.value * 2000;
            }
            else if (numpeopleValue.value == 2 && outfitsValue.value == i) {
                edphotosValue.innerHTML = 3 * i;
                priceValue.innerHTML = (6 * i + 3) * 1000 + makeupValue.value * 3000 + addphotosValue.value * 2000;
            }
        }
    }

    function resetDetails() {
        numpeopleValue.value = 0;
        numpeopleValue.disabled = false;
        outfitsValue.value = 0;
        edphotosValue.innerHTML = "_";
        addphotosValue.value = 0;
        makeupValue.checked = false;
        priceValue.innerHTML = "_";
    }

    const categories = [...new Set(AllServicesDetails.map((serviceDetail) => serviceDetail.category))];
    const servNames = [...new Set(AllServicesDetails.filter(serviceDetails => serviceDetails.category === categoryState).map((serviceDetail) => serviceDetail.name))];
    const numPeople = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const numOutfits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
                <input type="number" id="addphotos-state" onChange={handleAddphotos} defaultValue="0" max="30" min="0" />
                <fieldset>
                    <legend>Do you need make-up with us?</legend>

                    <input type="radio" name="makeup" onChange={handleMakeupState} id="makeup-state" defaultValue="0" />
                    <label>Yes</label>
                    <input type="radio" name="makeup" onChange={handleMakeupState} defaultChecked />
                    <label>No</label>
                </fieldset>
                <p>Price: <strong><span id="price-state">_</span></strong>&nbsp;<abbr title="Francs CFA">XAF</abbr></p>
            </fieldset>
        </div>
    );
}

export default PriceCalcComp;
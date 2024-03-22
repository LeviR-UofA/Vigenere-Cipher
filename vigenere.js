/*
    Levi Reyes
    CSCV337 Web Programming
    Assignment #4
    
    Notes:  You may add functions to this script to organize your code.  I've included JavaScript-based QUnit tests
    you can use to validate your implementation of the algorithm, which refer to the encrypt/decrypt functions.
    Include vigenere.js within your HTML file.
*/


function encrypt(plaintext, key) {
    var ciphertext = "";

    //Error Checking if boxes are left empty
    if (plaintext.length === 0 || key.length === 0) {
        throw false;
    }

    //Removing spaces from the key
    key = key.replace(/\s/g, '').toUpperCase();

    //Checking key for only characters, once spaces are gone
    if (!/^[a-zA-Z]+$/.test(key)) {
        throw false;
    }

    for (let i = 0, j = 0; i < plaintext.length; i++) {
        const x = plaintext.charAt(i);
        
        if (isLetter(x)) {
            let y = '';
            //Check to make sure character keeps its uppercase if it is uppercase
            if (isUpperCase(x)) {
                y = String.fromCharCode((x.charCodeAt(0) + key.charCodeAt(j) - 65 - 65) % 26 + 65);
            } 
            else {  //If the character is lowercase
                y = String.fromCharCode((x.charCodeAt(0) + key.charCodeAt(j) - 65 - 97) % 26 + 97);
            }
            ciphertext += (isUpperCase(x) ? y.toUpperCase() : y.toLowerCase());
            j = ++j % key.length;
        }
        else {
            //Adding the character if its things like commas, space, etc.
            ciphertext += x;
        }
    }

    //alert(ciphertext)

    return ciphertext;
}

function decrypt(ciphertext, key) {
    var plaintext = "";

    //Error Checking if boxes are left empty
    if (ciphertext.length === 0 || key.length === 0) {
        throw false;
    }

    //Removing spaces from the key
    key = key.replace(/\s/g, '').toUpperCase();

    //Checking key for only characters, once spaces are gone
    if (!/^[a-zA-Z]+$/.test(key)) {
        throw false;
    }

    for (let i = 0, j = 0; i < ciphertext.length; i++) {
        const x = ciphertext.charAt(i);

        if (isLetter(x)) {
            let shift = key.charCodeAt(j) - 65; //The character's uppercase value
            let y = '';
            //Check to make sure character keeps its uppercase if it is uppercase
            if (isUpperCase(x)) {
                y = String.fromCharCode((x.charCodeAt(0) - shift - 65 + 26) % 26 + 65);
            } else { //If the character is lowercase
                y = String.fromCharCode((x.charCodeAt(0) - shift - 97 + 26) % 26 + 97);
            }
            plaintext += y;
            j = ++j % key.length;
        } 
        else {
        //Adding the character if its things like commas, space, etc.
        plaintext += x;
        }
    }

    return plaintext;
}

function getValue() {
    var txtValue = txtInput.value;

    alert("Text Input value: " + txtValue);
  }

//Function to check if character is a letter
function isLetter (str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i)
}

//Function to check if character is Upper/lowercase
function isUpperCase (character) {
    if (character === character.toUpperCase()) {
      return true
    }
    if (character === character.toLowerCase()) {
      return false
    }
  }